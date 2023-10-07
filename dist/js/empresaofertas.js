let url = serverurl;
let usuario = user;
var listadopublicaciones;


$(document).ready(function () {

    loadstart();

});



function editar(value) {
    location.href = "./editar.html?id=" + value;
}

function eliminar(value) {
    let loadurl = url + 'oferta/eliminar';

    let data = {
        'id': value
    };

    let init = makeinit(data)


    if (confirm("eliminar oferta?") == true) {
        fetch(loadurl, init)
                .then((resp) => resp.json())
                .then(function (data) {

                    loadstart();

                });
    }
}

function loadstart() {

    let idurl = new URLSearchParams({
        id: usuario.id,
    });

    let loadurl = url + 'oferta/porusuario?' + idurl;
    let init = makeinitnodat();




    $('#publicacionestabla').empty();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

                console.log(data);

                if (data.msg) {
                    console.log(data);
                    return;
                }
                let fill = ''
                $.each(data, function (i, item) {

                    let experiencia = "sin experiencia"

                    if(item.experiencia>0){
                        experiencia= item.experiencia + ' años'
                    }

                    fill += '<tr>' +
                            '<td>' + item.titulo + '</td>' +
                            '<td>' + item.salario + '</td>' +
                            '<td>' + item.jornada + '</td>' +
                            '<td>' + item.fecha + '</td>' +
                            '<td>' + experiencia + '</td>' +
                            '<td>' + item.idSector.nombre + '</td>' +
                            '<td>' + item.idTipoContrato.nombre + '</td>' +
                            '<td>' +
                            '<a href="./veroferta.html?id='+item.id+'">'+ 
                            '<button type="button" class="btn btn-info" title="ver oferta">' +
                            '<i class="fas fa-eye"></i>' +
                            '</button></a>' +

                            '<a href="./postulaciones.html?id='+item.id+'">'+ 
                            '<button type="button" class="btn btn-info" title="ver postulaciones">' +
                            '<i class="fas fa-list-check"></i>' +
                            '</button></a>' +

                            '<button type="button" class="btn btn-info" value="' + item.id + '" onclick="editar(this.value)" title="editar oferta">' +
                            '<i class="fas fa-pen"></i>' +
                            '</button>' +
                            '<button type="button" class="btn btn-danger" value="' + item.id + '" onclick="eliminar(this.value)" title="eliminar oferta">' +
                            '<i class="fas fa-trash"></i>' +
                            '</button>' +
                            '</td>' +
                            '</tr>';


                });

                $('#publicacionestabla').append(fill);

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
