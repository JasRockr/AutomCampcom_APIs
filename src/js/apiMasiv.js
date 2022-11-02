// Import Axios
import axios from 'axios';

const destinatario = '573175553796'
const mensaje = 'CAMPCOM: Este es un mensaje de pruebas, si desea conocer más información puede hacer click en este enlace: \n SHORTURL'
const urlMensaje = 'https://www.youtube.com'

const metodo = 'POST'
const urlApi = 'https://api-sms.masivapp.com/send-message-batch'
const auth = 'Basic QXBpX1BHUkI2OjFRRVVTWldQVFU='


const data = [
  {
	to: destinatario,
	text: mensaje,
	shortUrlConfig: {
    url: urlMensaje,
    domainShorturl:"http://ma.sv/"
    }
  }
];

const config = {
  method: metodo,
  url: urlApi,
  headers: { 
    'Authorization': auth
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
