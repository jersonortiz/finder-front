let url = serverurl;
let usuario = user;

$(document).ready(function () {

    loadActuales();
    loadDisponibles();

});

function remover(value){

    let loadurl = url + 'profesion/desasignarwithuserid';


   data = {
        idProfesion: value,
        idProfesional: usuario.id

    }
    let init = makeinit(data);
    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                if (data) {
                    console.log(data);
				    loadActuales();
				    loadDisponibles();
                }
            });
}

function añadir(value){

    let loadurl = url + 'profesion/asignarwithuseid';


    data = {
        idProfesion: value,
        idProfesional: usuario.id

    }
    let init = makeinit(data);
    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                if (data) {
                    console.log(data);
				    loadActuales();
				    loadDisponibles();
                }
     });
}


function loadActuales() {
 let idurl = new URLSearchParams({
        id: usuario.id,
    });

    let loadurl = url + 'profesional/consultauser?' + idurl;
    let init = makeinitnodat();


    $('#actuales-list').empty();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

            	console.log(data);

                if (data.msg) {
                    console.log(data)
                    return;
                }

                profesiones = data.profesional.profesiones;

 

                let fill = ''
                $.each(profesiones, function (i, item) {

                	console.log(item);

                	let button = '<button type="button" class="btn btn-app" value="' + item.id + '"  onclick="remover(this.value)">' +
                                'remover</button>'
                    
                      fill += '<tr><td>' + item.profesion + '</td>' +
                            '<td>'+button+'</td></tr>';

                });

                $('#actuales-list').append(fill);

            });
}

function loadDisponibles(){
let idurl = new URLSearchParams({
        id: usuario.id,
    });

    let loadurl = url + 'profesion/listprofdisponiblewithuserid?' + idurl;
    let init = makeinitnodat();


    $('#disponibles-list').empty();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

            	console.log(data);

                if (data.msg) {
                    console.log(data)
                    return;
                }

                profesiones = data;

 

                let fill = ''
                $.each(profesiones, function (i, item) {

                	console.log(item);

                	let button = '<button type="button" class="btn btn-app" value="' + item.id + '"  onclick="añadir(this.value)">' +
                                'añadir</button>'
                    
                      fill += '<tr><td>' + item.profesion + '</td>' +
                            '<td>'+button+'</td></tr>';

                });

                $('#disponibles-list').append(fill);

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