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

function rechazar(value) {
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

function loadstart(idoferta) {

    let idurl = new URLSearchParams({
        id: idoferta
    });

    let loadurl = url + 'postulacion/listoferta?' + idurl;
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

                     let botones = '<a href="./profesional.html?id='+item.idProfesional.id+'">'+ 
                            '<button type="button" class="btn btn-info" title="ver contratista">' +
                            '<i class="fas fa-eye"></i>' +
                            '</button></a>' +
                            '<button type="button" class="btn btn-info" value="' + item.id + '" onclick="aceptar(this.value)" title="Aceptar">' +
                            '<i class="fa fa-check"></i>' +
                            '</button>' +
                            '<button type="button" class="btn btn-danger" value="' + item.id + '" onclick="rechazar(this.value)" title="Rechazar">' +
                            '<i class="fas fa-xmark"></i>' +
                            '</button>';

                            if(item.estado != 0){
                        botones = '<a href="./profesional.html?id='+item.idProfesional.id+'">'+ 
                            '<button type="button" class="btn btn-info" title="ver contratista">' +
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
                            '<td>' + item.idProfesional.nombre +' '+item.idProfesional.apellido  +'</td>' +
                            '<td>' + item.idProfesional.email + '</td>' +
                            '<td>' + item.idProfesional.telefono + '</td>' +
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
