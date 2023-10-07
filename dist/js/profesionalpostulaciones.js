let url = serverurl;
let usuario = user;
var listadopublicaciones;
var oferta;

$(document).ready(function () {
    let idoferta = getPostulacionid();
    console.log(idoferta);
    oferta= idoferta;
    loadstart(idoferta);
    

});


function getPostulacionid() {
    let url = new URL(window.location);

    let actual = window.location;

    let searchParams = url.searchParams;

    return searchParams.get('id');

}

function aceptar(value) {
    let loadurl = url + 'postulacion/aceptar';

    let data = {
        'id': value
    };

    let init = makeinit(data)


 
        fetch(loadurl, init)
                .then((resp) => resp.json())
                .then(function (data) {

                    loadstart(oferta);

                });
    
}

function cancelar(value) {
    let loadurl = url + 'postulacion/rechazar';

    let data = {
        'id': value
    };

    let init = makeinit(data)



        fetch(loadurl, init)
                .then((resp) => resp.json())
                .then(function (data) {
                    console.log(data);

                    loadstart(oferta);

                });
    
}

function loadstart() {

    let idurl = new URLSearchParams({
        id: user.id
    });

    let loadurl = url + 'postulacion/listusuario?' + idurl;
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

                    let estado = "pendiente"

                     let botones = '<a href="./verofertapostulacion.html?id='+item.idOfertaTrabajo.id+'">'+ 
                            '<button type="button" class="btn btn-info" value="'+item.idOfertaTrabajo.id+'" title="ver oferta de trabajo">' +
                            '<i class="fas fa-eye"></i>' +
                            '</button></a>' +
                            '<button type="button" class="btn btn-danger" value="' + item.id + '" onclick="cancelar(this.value)" title="cancelar postulacion">' +
                            '<i class="fas fa-xmark"></i>' +
                            '</button>';

                            if(item.estado != 0){
                        botones = '<a href="./verofertapostulacion.html?id='+item.idOfertaTrabajo.id+'">'+ 
                            '<button type="button" class="btn btn-info" title="ver oferta de trabajo">' +
                            '<i class="fas fa-eye"></i>' +
                            '</button></a>';
                            }
            
                        switch(item.estado){
                            case 1:
                                estado="aceptada";
                                break;

                            case 2:
                                estado="rechazada";
                                break;
                            }  
                    



                  

               


                    fill += '<tr>' +
                            '<td>' + item.idOfertaTrabajo.titulo +'</td>' +
                            '<td>' + item.idOfertaTrabajo.idTipoContrato.nombre + '</td>' +
                            '<td>' + item.idOfertaTrabajo.salario + '</td>' +
                            '<td>' + estado+ '</td>' +
                            '<td>' + botones+ '</td>' +
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
