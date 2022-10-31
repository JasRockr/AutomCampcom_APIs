import { Dropzone } from "dropzone"

Dropzone.options.consulta = {
    dictDefaultMessage: 'Arrastra el archivo SQL en esta zona',
    acceptedFiles: '.sql',
    maxFilesize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Eliminar Archivo',
    dictMaxFilesExceeded: 'El limite es de 1 archivo',
    
    paramName: 'consulta',
    init: function() {
        const dropzone = this 
        const btnPublicar = document.querySelector('#publicar')

        btnPublicar.addEventListener('click', function() {
          dropzone.processQueue()
        })

        dropzone.on('queuecomplete', function() {
            if( dropzone.getActiveFiles().length == 0 ) {
                window.location.href = '/campanias'
            }
        })

    }
}