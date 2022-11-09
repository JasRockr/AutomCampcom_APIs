import Swal from 'sweetalert2'
// Import Axios
import axios from 'axios';

const urlApi = 'https://api-sms.masivapp.com/send-message-batch'
const metodo = 'POST'
const auth = 'Basic QXBpX1BHUkI2OjFRRVVTWldQVFU='

const destinatario = '573175553796'
const mensaje = 'CAMPCOM: Este es un mensaje de pruebas, si desea conocer más información puede hacer click en este enlace: \n SHORTURL'
const urlMensaje = 'https://www.youtube.com'

// Data
const _data = [
  {
	to: destinatario,
	text: mensaje,
	shortUrlConfig: {
    url: urlMensaje,
    domainShorturl:"http://ma.sv/"
    }
  }
];

// Config
const config = {
  method: metodo,
  url: urlApi,
  headers: { 
    'Authorization': auth
  },
  data : _data
};

// Axios configuration
axios(config)
.then(function (response) {
  //const resApi = JSON.stringify(response.data, undefined, 2)
  //console.log(resApi)
  //console.log(response.data);
  console.log(response.status);
  console.log(response.statusText);
  //console.log(response.headers);
  //console.log(response.config);
  if (response.status === 200) {
    Swal.fire({
      icon: 'success',
      title: 'SMS Enviado',
      showCancelButton: false,
      showConfirmButton: false,
      timer: 1500
    })
  }

})

.catch(function (error) {
  if (error.response) {
    // La respuesta fue hecha y el servidor respondió con un código de estado
    // que esta fuera del rango de 2xx
    //console.log(error.response.status);
    //console.log(error.response.statusText);
    const eresApi = ('Error ' +  error.response.status)
    console.log(eresApi)

    Swal.fire({
      icon: 'error',
      title: eresApi,
      text: 'Código de estado fuera del rango de 2xx'
    })

  } else if (error.request) {
    // La petición fue hecha pero no se recibió respuesta
    // `error.request` es una instancia de XMLHttpRequest en el navegador y una instancia de
    // http.ClientRequest en node.js
    const ereqApi = error.request
    console.log('Error', ereqApi)

    Swal.fire({
      icon: 'error',
      title: errApi,
      text: 'Sin respuesta del servidor'
    })
  } else {
    // Algo paso al preparar la petición que lanzo un Error
    const emesApi = error.message
    console.log('Error', emesApi)

    Swal.fire({
      icon: 'error',
      title: emesApi,
      text: 'A ocurrido un error al preparar la petición'
    })
  }
  const econApi = error.config
  console.log('Error', econApi)

  Swal.fire({
    icon: 'error',
    title: errApi,
    //text: 'A ocurrido un error en el servidor'
  })
})

