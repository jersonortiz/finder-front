let url = serverurl;
let usuario = user;

let redes = [];


$(document).ready(function () {

    loadstart();

});

function aprobar(value){

    let data = {
        id: value
    };


    let loadurl = url + 'empresa/aprobar';
    let init = makeinit(data)

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

                console.log(data);
                if (data.msg) {
                    console.log(data);
                    return;
                }
            loadstart();

            });

}

function rechazar(value){
    let data = {
        id: value
    };

    let loadurl = url + 'user/cancelar';
   
    let init = makeinit(data);

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

                console.log(data);

                if (data.msg) {
                    alert("hubo un error")
                    return;
                }

                loadstart();



            });
}

function loadstart() {




    let idurl = new URLSearchParams({
        id: 6
    });

    let loadurl = url + 'user/listarol?'+idurl;
    let init = makeinitnodat();


    $('#profesiontabla').empty();

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
                            '<td>' + item.nombre +' '+ item.apellido+'</td>' +
                            '<td>' + item.documento +' '+ item.apellido+'</td>' +
                            '<td>' + item.email +' '+ item.apellido+'</td>' +
                            '<td>' + item.telefono +' '+ item.apellido+'</td>' +
                            '<td>' + item.nombre +' '+ item.apellido+'</td>' +
                     
                            '<td>' +
                            '<button type="button" class="btn btn-info" value="' + item.id + '" onclick="aprobar(this.value)" title="aprobar">' +
                            '<i class="fa fa-check"></i>' +
                            '</button>' +
                            '<button type="button" class="btn btn-danger" value="' + item.id + '" onclick="rechazar(this.value)" title="rechazar">' +
                            '<i class="fas fa-xmark"></i>' +
                            '</button>' +
                            '</td>' +
                            '</tr>';




                });

                $('#profesiontabla').append(fill);

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