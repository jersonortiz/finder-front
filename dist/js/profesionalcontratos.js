let url = serverurl;
let usuario = user;
var contratos = {};


$(document).ready(function () {

    loadstart();

});


function aceptar(value) {


    console.log('asdf');

    let costo = $("#costomodal").val();

    let loadurl = url + 'servicio/aceptar';


    data = {
        id: value,
        costo: costo

    }
    let init = makeinit(data);
    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                if (data) {
                    console.log(data);
                    loadstart();
                }



            });

}

function rechazar(value) {

    let loadurl = url + 'servicio/rechazar';


    data = {
        id: value,

    }
    let init = makeinit(data);
    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                if (data) {
                    console.log(data);
                    loadstart();
                }
            });
}

function terminar(value) {
    let loadurl = url + 'servicio/terminar';


    data = {
        id: value,

    }
    let init = makeinit(data);
    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                if (data) {
                    console.log(data);
                    loadstart();
                }
            });
}

function mostrarmodalguardar(value) {

    $('#modalaceptarbotones').empty();
    let fill = '<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>' +
            '<button type="button" class="btn btn-primary" data-dismiss="modal" value="' + value + '" onclick="aceptar(this.value)">Aceptar</button>';

    $('#modalaceptarbotones').append(fill);
}

function loadstart() {


    $('#contratos-list').empty();

    let idurl = new URLSearchParams({
        id: usuario.id
    });

    let loadurl = url + 'servicio/listprofesionalusuario?' + idurl;
    let init = makeinitnodat();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

                contratos = data;
                console.log(data);

                let fill = "";
                $.each(data, function (i, item) {

                    let estado = "";
                    let botones = ""
                    let nombre = item.idCliente.nombre + ' ' + item.idCliente.apellido;

                    switch (item.estado) {
                        case 1:
                            estado = 'pendiente de aprobacion del profesional';
                            break;
                        case 2:
                            estado = 'aceptado';
                            break;
                        case 3:
                            estado = 'rechazado';
                            break;
                        case 4:
                            estado = 'terminado, reseña pendiente';
                            break;
                        case 5:
                            estado = 'terminado';
                            break;
                    }

                    if (item.estado == 1) {
                        botones += '<button type="button" class="btn btn-app" value="' + item.id + '"  onclick="mostrarmodalguardar(this.value)" data-toggle="modal" data-target="#modal-default">' +
                                'Aceptar</button>';
                        botones += '<button type="button" class="btn btn-app" value="' + item.id + '"  onclick="rechazar(this.value)" >' +
                                'Rechazar</button>';
                    }

                    if (item.estado == 2) {
                        botones += '<button type="button" class="btn btn-app" value="' + item.id + '"  onclick="terminar(this.value)" >' +
                                'Terminar</button>';
                    }





                    let reseña = "";

                    if (item.reseña != null) {
                        reseña = item.reseña;

                    }


                    fill += '<tr><td>' + nombre + '</td>' +
                            '<td>' + estado + '</td>' +
                            '<td>' + item.costo + '</td>' +
                            '<td>' + reseña + '</td>' +
                            '<td>' + botones + '</td></tr>';

                });

                $('#contratos-list').append(fill);

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