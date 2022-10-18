import { validationResult } from 'express-validator';
import { Categoria, Campania } from "../models/index.js";

// Admin
const admin = async (req, res) => { 

  const { id } = req.usuario

  const campanias = await Campania.findAll ({
    where: {
        usuarioId: id
    },
    include: [
        {model: Categoria, as: 'Categoria' }
    ]
})

  res.render('campanias/admin', {
    pagina: 'Campañas',
    campanias
  })
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


// Campaigns
const campania = (req, res) => {
  res.render('campanias/campania', {
    pagina: 'Ejecutar Campaña'
  })
}

export {
  admin,
  crear,
  guardar,
  agregarSql,
  almacenarSql,
  editar,
  campania
}