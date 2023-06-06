let url = serverurl;

var publicaciones;


$(document).ready(function () {

    loadstart();

});

function findpublication() {

    $('#busqueda-publicacion').empty();

    let precio = $("#precio").val();
    let campo = $("#campobusqueda").val();

    let pubs = publicaciones;

    console.log(pubs);

    let result = [];


    if (precio) {

        $.each(pubs, function (i, item) {
            if (item.costo <= precio) {
                result.push(item);
                console.log(item.costo);
            }
        });


    } else {
        result = pubs;
    }

    console.log(result);




    if (campo) {
        let result2 = [];
        $.each(result, function (i, item) {
            if ((item.titulo.indexOf(campo) >= 0) || (item.resumen.indexOf(campo) >= 0)) {
                result2.push(item);
            }


        });
        result = result2;

    }




    let fill = ''
    console.log(result);
    $.each(result, function (i, item) {

        let interna = '<div class="float-right">' + item.costo + '</div>' +
                '<h3>' + item.titulo + '</h3>' +
                '<p class="mb-0">' + item.resumen + '</p>' +
                '<div class="row">' +
                '<div class="col-md-6">' +
                '<button type="button" class="btn btn-block btn-outline-primary" value="' + item.id + '" onclick="verpublicacion(this.value)">' +
                'Ver publicacion completa' +
                '</button> </div>' +
                '<div class="col-md-6 ">' +
                '<button type="button" class="btn btn-block btn-outline-primary" value="' + item.idProfesional + '" onclick="verprofesional(this.value)">' +
                'Ver profesional' +
                '</button></div></div>';

        let ext = '<div class="list-group-item">' +
                '<div class="row">' +
                `<div class="col px-4"><div>` +
                interna +
                '</div></div></div></div>';

        fill += ext
    });

    $('#busqueda-publicacion').append(fill);

}

function verpublicacion(value) {
    location.href = "./publicacion.html?id=" + value;
}

function verprofesional(value) {

    location.href = "./profesional.html?id=" + value;
}

function loadstart() {
    let loadurl = url + 'publicacion/listactivo';
    let init = makeinitnodat();
    console.log('dadadaa');

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                if (data) {

                    console.log(data);
                    publicaciones = data;

                    let fill = ''
                    $.each(data, function (i, item) {

                        let interna = '<div class="float-right">' + item.costo + '</div>' +
                                '<h3>' + item.titulo + '</h3>' +
                                '<p class="mb-0">' + item.resumen + '</p>' +
                                '<div class="row">' +
                                '<div class="col-md-6">' +
                                '<button type="button" class="btn btn-block btn-outline-primary" value="' + item.id + '" onclick="verpublicacion(this.value)">' +
                                'Ver publicacion completa' +
                                '</button> </div>' +
                                '<div class="col-md-6 ">' +
                                '<button type="button" class="btn btn-block btn-outline-primary" value="' + item.idProfesional + '" onclick="verprofesional(this.value)">' +
                                'Ver profesional' +
                                '</button></div></div>';

                        let ext = '<div class="list-group-item">' +
                                '<div class="row">' +
                                `<div class="col px-4"><div>` +
                                interna +
                                '</div></div></div></div>';

                        fill += ext
                    });
                    $('#busqueda-publicacion').append(fill);
                }
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
