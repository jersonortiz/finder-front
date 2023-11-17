let url = serverurl;

var listadoprofesionales;


$(document).ready(function () {

    loadstart();

});



function findprofesional() {
    $('#tabla-profesionales').empty();

    let profesionales = listadoprofesionales;

    let busq = $("#campobusqueda").val();

    let result = profesionales;

    if (busq) {
        let result3 = [];
        $.each(result, function (i, item) {

            if ((item.nombre.indexOf(busq) >= 0) ) {
                result3.push(item);
            }

        });
        result = result3;

    }



    let fill = ''
    $.each(result, function (i, item) {

        let estadoprofesional = 'suspendido';
        let accionsuspension = 'retirar suspension'

        if (item.estado) {
            estadoprofesional = 'activo';
            accionsuspension = 'suspender';
        }

        fill += '<tr>' + '<td>' + item.nombre +'</td>' +
               
                '<td>' + item.email + '</td>' +
            
                '<td>' + estadoprofesional + '</td>' +
                '<td>' +
                '<button type="button" class="btn btn-info" value="' + item.id + '" onclick="suspenderprofesional(this.value)"  >' +
                accionsuspension +
                '</button>' +
                '<button type="button" class="btn btn-danger" value="' + item.id + '" onclick="eliminarprofesional(this.value)" >' +
                'Eliminar</button></td></tr>';
    });


    $('#tabla-profesionales').append(fill);

}

function loadstart() {
    let loadurl = url + 'empresa/listadm';
    let init = makeinitnodat();
  

    $('#tabla-profesionales').empty();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

             

                listadoprofesionales = data;

                let fill = ''
                $.each(data, function (i, item) {

        
                    let estadoprofesional = 'suspendido';
                    let accionsuspension = 'retirar suspension'

                    if (item.estado) {
                        estadoprofesional = 'activo';
                        accionsuspension = 'suspender';
                    }
                


                    fill += '<tr>' + '<td>' + item.nombre + '</td>' +
                            '<td>' + item.email + '</td>' +
                            
                            '<td>' + estadoprofesional + '</td>' +
                            '<td>' +
                            '<button type="button" class="btn btn-info" value="' + item.id + '" onclick="suspenderprofesional(this.value)"  >' +
                            accionsuspension +
                            '</button>' +
                            '<button type="button" class="btn btn-danger" value="' + item.id + '" onclick="eliminarprofesional(this.value)" >' +
                            'Eliminar</button></td></tr>';
                });


                $('#tabla-profesionales').append(fill);

            });
}


function suspenderprofesional(value) {

    let loadurl = url + 'empresa/suspender';

    let data = {
        'id': value
    };

    let init = makeinit(data)

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

                loadstart();

            });

}

function eliminarprofesional(value) {
    let loadurl = url + 'empresa/eliminar';
    let data = {
        'id': value
    };

    let init = makeinit(data)

    if (confirm("eliminar empresa") == true) {
    
        fetch(loadurl, init)
                .then((resp) => resp.json())
                .then(function (data) {
             
                    loadstart();

                });

    }

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