let url = serverurl;
let usuario = user;

let redes = [];


$(document).ready(function () {

    loadstart();

});


function editar(value) {
    location.href = "./editartipotitulo.html?id=" + value;
}

function eliminar(value) {
    let loadurl = url + 'titulo/eliminartipo';

    let data = {
        'id': value
    };

    let init = makeinit(data)


    if (confirm("eliminar tipo de titulo?") == true) {
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

    let loadurl = url + 'titulo/listtipo?' + idurl;
    let init = makeinitnodat();


    $('#tipotabla').empty();

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
                    fill += '<tr>' +
                            '<td>' + item.tipo + '</td>' +
                            '<td>' +
                            '<button type="button" class="btn btn-info" value="' + item.id + '" onclick="editar(this.value)" title="editar publicacion">' +
                            '<i class="fas fa-pen"></i>' +
                            '</button>' +
                            '<button type="button" class="btn btn-danger" value="' + item.id + '" onclick="eliminar(this.value)" title="eliminar">' +
                            '<i class="fas fa-trash"></i>' +
                            '</button>' +
                            '</td>' +
                            '</tr>';




                });

                $('#tipotabla').append(fill);

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