let url = serverurl;
let usuario = user;
console.log(url);

var contratos = {};
var reseñar = 0;

$(document).ready(function () {

    loadstart();


});

function reseña(value) {

    let reseña = $("#reseña-contrato").val();

    console.log(reseña);
    console.log(value);

    let loadurl = url + 'servicio/reseñar';


    data = {
        id: value,
        reseña: reseña

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

function mostrarformulario(value) {
    console.log(value);
    $('#campo-botones').empty();

    let boton = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
            '<button type="button" class="btn btn-primary" value="' + value + '" onclick="reseña(this.value)" data-dismiss="modal">guardar</button>'
    $('#campo-botones').append(boton);
}

function  loadstart() {


    $('#contratos-list').empty();

    let idurl = new URLSearchParams({
        id: usuario.id
    });

    let loadurl = url + 'servicio/listusuario?' + idurl;
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
                    let nombre = item.idProfesional.idPersona.nombre + ' ' + item.idProfesional.idPersona.apellido;

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

                    if (item.estado == 4) {
                        botones = '<button type="button" class="btn btn-app" value="' + item.id + '"  data-toggle="modal" data-target="#modal-default" onclick="mostrarformulario(this.value)" >' +
                                'Reseñar</button>';
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