import { Campania } from "../../models/index.js"

(function() {

  const obtenerCampanias = async () => {
  
    try {
  
      const url = '/api/campanias'
      const respuesta = await fetch(url)
      const campanias = respuesta.json()
  
      mostrarCampanias(campanias)
  
    } catch (error) {
      console.log(error)
    }
  }
  
  const mostrarCampanias = campanias => {

  }
  
  obtenerCampanias()
})()
