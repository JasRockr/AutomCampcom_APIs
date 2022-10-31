import { unlink } from 'node:fs/promises';
import { validationResult } from 'express-validator';
import { Categoria, Campania } from "../models/index.js";

// Admin
const admin = async (req, res) => { 

  // Read queryString
  const { pagina: paginaActual } = req.query
    
    const expresion = /^[1-9]$/

    if(!expresion.test(paginaActual)) {
        return res.redirect('/campanias?pagina=1')
    }

    try {
      const { id } = req.usuario

      // Limits & Offset for the pagination
      const limit = 3
      const offset = ((paginaActual * limit) - limit)

      const [campanias, total] = await Promise.all([
        Campania.findAll ({
          limit,
          offset,
          where: {
              usuarioId: id
          },
          include: [
              {model: Categoria, as: 'Categoria' }
          ]
        }),
        Campania.count({
          where: {
            usuarioId : id
          }
        })
      ])

      res.render('campanias/admin', {
        pagina: 'Campañas',
        campanias,
        paginas: Math.ceil(total / limit),
        paginaActual: Number(paginaActual),
        total,
        offset,
        limit
      })
    } catch (error) {
      console.log(error)
    }

};

// Create campaign
const crear = async (req, res) => {
  
  const [categorias] = await Promise.all([
    Categoria.findAll()
  ])
  
  res.render('campanias/crear', {
    pagina: 'Crear Campaña',
    categorias,
    datos: {}
  })
}

// Add campaign
const guardar = async (req, res) => {

  // Validation
  let resultado = validationResult(req)
  
  if (!resultado.isEmpty()) {

    const [categorias] = await Promise.all([
      Categoria.findAll()
    ])
    
    return res.render('campanias/crear', {
      pagina: 'Cargar Campaña',
      categorias,
      errores: resultado.array(),
      datos: req.body
    })
  }

  // Save
  const { campania, regla, categoria: categoriaId } = req.body

  const { id : usuarioId } = req.usuario
  
  try {
    const campaniaGuardada = await Campania.create({
      campania,
      regla, 
      categoriaId,
      usuarioId,
      consulta: ''
    })

      const { id } =  campaniaGuardada
      res.redirect(`/campanias/agregar-sql/${id}`)

  } catch (error) {
      console.log(error)
  }

}

const agregarSql= async (req, res) => {
  const { id } = req.params
  
  // Validate that the campaign exists
  const campaign = await Campania.findByPk(id)
  if(!campaign) {
      return res.redirect('/campanias')
  }
  
  // Validate that the campaign is not published
  if(campaign.estado) {
    return res.redirect('/campanias')
  }

  // Validate that the campaign belongs to the visitor of this page
  if( campaign.usuarioId.toString() !== req.usuario.id.toString() ) {
    return res.redirect('/campanias')
  }


  res.render('campanias/agregar-sql', {
    pagina: `Agregar Consulta SQL: ${campaign.campania}`,
    campaign
  })
}

const almacenarSql = async ( req, res, next ) => {
  const { id } = req.params

  // Validate that the campaign exists
  const campaign = await Campania.findByPk(id)
  if(!campaign) {
      return res.redirect('/campanias')
  }
  
  // Validate that the campaign is not published
  if(campaign.estado) {
    return res.redirect('/campanias')
  }

  // Validate that the campaign belongs to the visitor of this page
  if( campaign.usuarioId.toString() !== req.usuario.id.toString() ) {
    return res.redirect('/campanias')
  }

  try {
      // Store this campaign
      campaign.consulta = req.file.filename

      // Publish this campaign
      campaign.estado = 1
      await campaign.save()

      next()

  } catch (error) {
      console.log(error)
  }
}

const editar = async (req, res) => {

  const { id } = req.params
  // Validate that the campaign exists
  const campaign = await Campania.findByPk(id)
  if(!campaign) {
      return res.redirect('/campanias')
  }

  // Validate that the campaign belongs to the visitor of this page
  if( campaign.usuarioId.toString() !== req.usuario.id.toString() ) {
    return res.redirect('/campanias')
  }
  
  // Category model
  const [categorias] = await Promise.all([
      Categoria.findAll()
  ])

  res.render('campanias/editar', {
      pagina: `Editar Campaña: ${campaign.campania}`,
      categorias,
      datos: campaign
  })
}

const guardarCambios = async (req, res) => {
    
  // Validation
  let resultado = validationResult(req)

  if (!resultado.isEmpty()) {

      // Category model
      const [categorias] = await Promise.all([
          Categoria.findAll()
      ])

      return res.render('campanias/editar', {
          pagina: 'Editar Campaña',
          categorias,
          errores: resultado.array(),
          datos: req.body
      })
  }

  const { id } = req.params
  
  // Validate that the campaign exists
  const campaign = await Campania.findByPk(id)
  if(!campaign) {
      return res.redirect('/campanias')
  }

  // Validate that the campaign belongs to the visitor of this page
  if( campaign.usuarioId.toString() !== req.usuario.id.toString() ) {
    return res.redirect('/campanias')
  }

  // Rewrite object and update data
  try {
    const { campania, regla, categoria: categoriaId } = req.body

      campaign.set({
        campania,
        regla, 
        categoriaId
      })
      
      await campaign.save();

      res.redirect('/campanias')

  } catch (error) {
      console.log(error)
  }
}

const eliminar = async (req, res) => {
    
  const { id } = req.params

  // Validate that the campaign exists
  const campaign = await Campania.findByPk(id)

  if(!campaign) {
      return res.redirect('/campanias')
  }

  // Validate that the campaign belongs to the visitor of this page
  if( campaign.usuarioId.toString() !== req.usuario.id.toString() ) {
      return res.redirect('/campanias')
  }

  // Validate query associated with the campaign
  if(!campaign.consulta) {
    console.log( `No se encontró una consulta asociada para la campaña: ${campaign.campania}`)
  } else {
    // Delete query
    await unlink(`public/uploads/${campaign.consulta}`)
    console.log(`se eliminó la consulta asociada para la campaña: ${campaign.campania}`)
  }

  // Delete campaign
  await campaign.destroy()
  res.redirect('/campanias')

}

// Show campaign
const mostrarCampania = async (req, res) => {
  const { id } = req.params

  console.log(req.usuario)
  
  // Validacion de propiedad existente
  const campaign = await Campania.findByPk(id, {
      include: [
          { model: Categoria, as: 'Categoria' }
      ]
  })

  if(!campaign) {
      return res.redirect('/404')
  }

  res.render('campanias/mostrar', {
      campaign,
      pagina: campaign.campania,
      usuario: req.usuario
  })
}

// ! ------
// Campaigns
const campania = (req, res) => {
  res.render('campanias/campania', {
    pagina: 'Ejecutar Campaña'
  })
}
//! -------

export {
  admin,
  crear,
  guardar,
  agregarSql,
  almacenarSql,
  editar,
  guardarCambios,
  eliminar,
  mostrarCampania,
  campania
}