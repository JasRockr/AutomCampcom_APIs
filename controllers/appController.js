import { Sequelize } from 'sequelize'; 
import { Campania, Categoria, Cliente } from '../models/index.js';

const inicio = async (req, res) => {

  const [ categorias, bienvenidas, renovaciones ] = await Promise.all([
    Categoria.findAll({raw: true}),
    Campania.findAll({
      limit: 3,
      where: {
        categoriaId: 1,
        estado: 1
      },
      order: [
        ['createdAt', 'DESC']
      ]
    }),
    Campania.findAll({
      limit: 3,
      where: {
        categoriaId: 2,
        estado: 1

      },
      order: [
        ['createdAt', 'DESC']
      ]
    })
  ])
  
  res.render('inicio', {
    pagina: 'Inicio',
    categorias,
    bienvenidas,
    renovaciones
  })
}

const categoria = async (req, res) => {
  const { id } = req.params

  // Validate that exists the category
  const categoria = await Categoria.findByPk(id)
  if(!categoria) {
    return res.redirect('/404')
  }

  // Get campaigns for the category seleted
  const campanias = await Campania.findAll({
    where: {
      categoriaId: id
    }
  })

  res.render('categoria', {
    pagina: `${categoria.nombre}`,
    campanias
  })
}

const noEncontrado = (req, res) => {
  res.render('404', {
    pagina: 'No Encontrada'
  })
}

const buscador = async (req, res) => {
  const { termino } = req.body 

  // Validate that termino is not empty
  if(!termino.trim()) {
    return res.redirect('back')
  }

  // Get campaigns for searched termino
  const campanias = await Campania.findAll({
    where: {
      campania: {
        [Sequelize.Op.like] : '%' + termino + '%'
      }
    }
  })

  res.render('busqueda', {
    pagina: 'Resultados de la Búsqueda',
    campanias
  })

}

export {
  inicio,
  categoria,
  noEncontrado,
  buscador
}