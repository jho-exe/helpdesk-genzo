function init(){
   
}

$(document).ready(function(){
    var tick_id = getUrlParameter('ID');

    listardetalle(tick_id);

    /* TODO: Inicializamos summernotejs */
    $('#tickd_descrip').summernote({
        height: 400,
        lang: "es-ES",
        popover: {
            image: [],
            link: [],
            air: []
        },
        callbacks: {
            onImageUpload: function(image) {
                console.log("Image detect...");
                myimagetreat(image[0]);
            },
            onPaste: function (e) {
                console.log("Text detect...");
            }
        },
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']]
        ]
    });

    /* TODO: Inicializamos summernotejs */
    $('#tickd_descripusu').summernote({
        height: 400,
        lang: "es-ES",
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']]
        ]
    });  

    $('#tickd_descripusu').summernote('disable');

    /* TODO: Listamos documentos en caso hubieran */
    tabla=$('#documentos_data').dataTable({
        "aProcessing": true,
        "aServerSide": true,
        dom: 'Bfrtip',
        "searching": true,
        lengthChange: false,
        colReorder: true,
        buttons: [
                'copyHtml5',
                'excelHtml5',
                'csvHtml5',
                'pdfHtml5'
                ],
        "ajax":{
            url: '../../controller/documento.php?op=listar',
            type : "post",
            data : {tick_id:tick_id},
            dataType : "json",
            error: function(e){
                console.log(e.responseText);
            }
        },
        "bDestroy": true,
        "responsive": true,
        "bInfo":true,
        "iDisplayLength": 10,
        "autoWidth": false,
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    }).DataTable();

});

function listardetalle(usu_id){
    
    /* TODO: Mostramos informacion del ticket en inputs */
    $.post("../../controller/ticket.php?op=mostrar", { usu_id : usu_id }, function (data) {
        data = JSON.parse(data);
        $('#usu_id').html(data.usu_id);
        $('#usu_nom').html(data.usu_nom);
        $('#lblfechcrea').html(data.fech_crea);

        $('#lblnomidticket').html("Detalle Ticket - "+data.tick_id);

        $('#cat_nom').val(data.cat_nom);
        $('#cats_nom').val(data.cats_nom);
        $('#tick_titulo').val(data.tick_titulo);
        $('#tickd_descripusu').summernote ('code',data.tick_descrip);

        $('#prio_nom').val(data.prio_nom);

        if (data.tick_estado_texto == "Cerrado"){
            /* TODO: Ocultamos panel de detalle */
            $('#pnldetalle').hide();
        }
    });
}

init();


////////////////////////////////////////////////////////////////////////

$(document).on("click","#btnactualizar", function(){
   var pass = $("#txtpass").val();
   var newpass = $("#txtpassnew").val();

   /* TODO: validamos que los campos no esten vacios antes de guardar */
    if (pass.length == 0 || newpass.length == 0) {
        swal("Error!", "Campos Vacios", "error");
    }else{
        /* TODO: validamos que la contraseñas sean iguales */
        if (pass==newpass){

            /* TODO: Procedemos con la actualizacion */
            var usu_id = $('#user_idx').val();
            $.post("../../controller/usuario.php?op=password", {usu_id:usu_id,usu_pass:newpass}, function (data) {
                swal("Correcto!", "Actualizado Correctamente", "success");
            });

        }else{
            /* TODO: Mensaje de alerta en caso de error */
            swal("Error!", "Las contraseñas no coinciden", "error");
        }
    }
});
