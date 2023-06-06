let url = serverurl;
let usuario = user;

$(document).ready(function () {

    let idprofesional = getProfesionalid();
    console.log(idprofesional);

    loadstart(idprofesional);
});

function getProfesionalid() {
    let url = new URL(window.location);

    let actual = window.location;

    let searchParams = url.searchParams;

    return searchParams.get('id'); // 'node'

}

function contratar(value) {

    idpro = value;
    idc = user.id;
    console.log(value);
    console.log(user.id);


    let loadurl = url + 'servicio/registro';

    data = {
        id: "",
        idCliente: idc,
        idProfesional: idpro
    }

    let init = makeinit(data);

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                if (data) {
                    console.log(data);
                    location.href = "./contratos.html";

                }



            });

}

function mostrarBotones(idprofesional) {
    console.log(idprofesional);
    $('#campo-botones').empty();

    let boton2 = '<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>' +
            '<button type="button" class="btn btn-primary" value="' + idprofesional + '" data-dismiss="modal" onclick=contratar(this.value)>Contratar</button>'


    $('#campo-botones').append(boton2);
}



function loadstart(idprofesional) {

    let idurl = new URLSearchParams({
        id: idprofesional
    });

    let loadurl = url + 'profesional/consulta?' + idurl;
    console.log(loadurl);
    let init = makeinitnodat();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                if (data) {

                    if (data) {
                        console.log(data);


                        let profesional = data.profesional;

                        let publicaciones = data.publicaciones;


                        if (user.id == profesional.idpersona) {
                            console.log('no puede contratarse a si mismo');
                            $('contact-button').prop('disabled', true);
                        } else {
                            mostrarBotones(profesional.id);
                        }



                        $('#nombre-profesional').append(profesional.nombre + ' ' + profesional.apellido);


                        $('#ubicacion-profesional').append(profesional.ciudad);

                        let mailsend = '<a href = "mailto: ' + profesional.email + '">Email: ' + profesional.email + '</a>'

                        $('#campo-email').append(mailsend);

                        $('#campo-telefono').append(profesional.telefono);

                        let habilidades = '';

                        $.each(profesional.profesiones, function (i, habil) {

                            habilidades += ' <span class="tag tag-danger">' + habil.profesion + '</span><br>';


                        });

                        $('#habilidades-profesional').append(habilidades);

                        let contenidopublicaciones = "";

                        $.each(publicaciones, function (i, item) {

                            contenidopublicaciones += '<div class="card">' +
                                    '<div class="card-header"><h1 class="card-title">' + item.titulo + '</h1></div>' +
                                    '<div class="card-body">' + item.resumen + '</div>' +
                                    '<div class="card-footer">' +
                                    '<button type="button" class="btn btn-block btn-outline-primary" value="' +
                                    item.id + '" onclick="verpublicacion(this.value)">' +
                                    'Ver publicacion completa' +
                                    '</button></div></div>';

                        });

                        $('#listado-publicaciones').append(contenidopublicaciones);

                    }

                }
            });

}

function verpublicacion(value) {
    location.href = "./publicacion.html?id=" + value;
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