let url = serverurl;
let usuario = user;
$(document).ready(function () {

    loadstart();

    $('#nombre-profesional').append(usuario.nombre + ' ' + usuario.apellido);
});



$("#registform").submit(function (e) {
    e.preventDefault();
});


$(function () {
    $.validator.setDefaults({
        submitHandler: function () {
            console.log('');
            guardar();
        }
    });
    $('#registform').validate({
        rules: {
            nombre: {
                required: true,
            },
            apellido: {
                required: true,
            },
            correo: {
                required: true,
            },
            telefono: {
                required: true,
            },
            documento: {
                required: true,
            },
            edad: {
                required: true,
            }
        },
        messages: {
            nombre: {
                required: "Introdusca el nombre de usuario",
            },
            apellido: {
                required: "Introdusca el apellido del usaurio",
            },
            correo: {
                required: "Introdusca el correo del usuario",
            },
            telefono: {
                required: "Introdusca el telefono del usuario",
            },
            documento: {
                required: "Introdusca el documento del usuario",
            },
            edad: {
                required: "Introdusca la edad del usuario",
            },

        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });
});


function guardar() {
    let nom = $("#nombre").val();
    let apel = $("#apellido").val();
    let correo = $("#correo").val();
    let tel = $("#telefono").val();
    let doc = $("#documento").val();
    let ed = $("#edad").val();

    let data = {
        id: usuario.id,
        nombre: nom,
        apellido: apel,
        email: correo,
        telefono: tel,
        documento: doc,
        rol: 2,
        edad: ed
    };

    let loadurl = url + 'user/edit';
    console.log(loadurl);
    let init = makeinit(data);

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

                console.log(data);

                let fill = '<p class="text-success">Actualizacion exitosa</p>'

                if (data.msg) {

                    fill = '<p class="text-danger">Ocurrio un error</p>'

                    $('#mensajeguardado').append(fill);
                    return

                }
                $('#mensajeguardado').empty();

                $('#mensajeguardado').append(fill);

                console.log(JSON.parse(sessionStorage.getItem("USER_SESSION")));

                sessionStorage.setItem("USER_SESSION", JSON.stringify(data));



                loadstart();

            });


}

function loadstart() {

    let idurl = new URLSearchParams({
        id: usuario.id
    });

    let loadurl = url + 'user/consulta?' + idurl;
    let init = makeinitnodat();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

                $("#nombre").val(data.nombre);
                $("#apellido").val(data.apellido);
                $("#correo").val(data.email);
                $("#telefono").val(data.telefono);
                $("#documento").val(data.documento);
                $("#edad").val(data.edad);


            });



}

function makeinit(data) {
    let heads = new Headers();
    heads.append("Accept", "application/json");
    heads.append("Content-Type", "application/json");
    //heads.append("Authorization", authToken);
    heads.append("Access-Control-Allow-Origin", '*');
    let init = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: heads
    };
    return init;
}

function makeinitnodat() {
    let heads = new Headers();
    heads.append("Accept", "application/json");
    heads.append("Content-Type", "application/json");
    //heads.append("Authorization", authToken);
    heads.append("Access-Control-Allow-Origin", '*');
    let init = {
        method: 'GET',
        mode: 'cors',
        headers: heads
    };
    return init;
}