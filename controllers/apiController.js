import { Campania, Categoria, Cliente } from '../models/index.js';

const campanias = async (req, res) => {

  const campanias = await Campania.findAll({
    include: [
      {model: Categoria, as: 'Categoria'}
    ]
  })

  res.json(campanias)
}

const clientes = async (req, res) => {

  //const { id } = req.usuario
  //console.log(id)

  const clientes = await Cliente.findAll({
    attributes: [
      ['nombre', 'nombreCliente'], 'telefono'
    ],
    include: [
      {model: Campania, as: 'Campania'}
    ],

  })

  res.json(clientes)
}

const sms = async (req, res) => {

  const sms = await Cliente.findAll({
    include: [
      {model: Campania, as: 'Campania'}
    ]
  })

  res.json(sms)
}



export {
  campanias,
  clientes,
  sms
}