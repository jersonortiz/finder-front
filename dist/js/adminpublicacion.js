let url = serverurl;

var listadoprofesionales;


$(document).ready(function () {

    loadstart();
    loadSectores()
    loadProfesiones()

});


function findprofesional() {
    $('#tabla-profesionales').empty();

    let profesionales = listadoprofesionales;


    let profesion = $("#profesionselect").val();
    let sector = $("#sectorselect").val();

    let result = [];

    if (sector != 0) {
        $.each(profesionales, function (i, item) {

            $.each(item.profesiones, function (i, listprofs) {

                if (listprofs.id == profesion || (profesion == 0 && listprofs.sector.id == sector)) {
                    result.push(item);
                    return false;
                }
            });

        });
    } else {
        result = profesionales;
    }





    let fill = ''
    $.each(result, function (i, item) {

        console.log(item);

        let profesiones = ""
        $.each(item.profesiones, function (i, prof) {
            profesiones += prof.profesion + ' ';
        });

        let estadoprofesional = 'suspendido';
        let accionsuspension = 'retirar suspension'

        if (item.profesional.estado) {
            estadoprofesional = 'activo';
            accionsuspension = 'suspender';
        }

        $.each(item.publicaciones, function (i, publicacion) {
            console.log(publicacion);

            fill += '<tr>' + '<td>' + publicacion.titulo + '</td>' +
                    '<td>' + publicacion.costo + '</td>' +
                    '<td>' + item.profesional.idPersona.nombre + ' ' + item.profesional.idPersona.apellido + '</td>' +
                    '<td>' +
                    '<a href="./profesional/usermode/publicacion.html?='+publicacion.id+'">'+ 
                    '<button type="button" class="btn btn-info" title="Ver publicacion">' +
                    '<i class="fas fa-eye"></i></button></a>'+
                    '<button type="button" class="btn btn-danger" title="Eliminar" value="' + publicacion.id + '" onclick="eliminarpublicacion(this.value)" >' +
                    '<i class="fas fa-trash"></button></td></tr>';

        });
    });


    $('#tabla-profesionales').append(fill);

}

function loadstart() {
    let loadurl = url + 'profesional/gestion';
    let init = makeinitnodat();
    console.log('dadadaa');

    $('#tabla-profesionales').empty();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

                listadoprofesionales = data;

                let fill = ''
                $.each(data, function (i, item) {

                    console.log(item);

                    let profesiones = ""
                    $.each(item.profesiones, function (i, prof) {
                        profesiones += prof.profesion + ' ';
                    });

                    let estadoprofesional = 'suspendido';
                    let accionsuspension = 'retirar suspension'

                    if (item.profesional.estado) {
                        estadoprofesional = 'activo';
                        accionsuspension = 'suspender';
                    }



                    $.each(item.publicaciones, function (i, publicacion) {
                        console.log(publicacion);

                        fill += '<tr>' + '<td>' + publicacion.titulo + '</td>' +
                                '<td>' + publicacion.costo + '</td>' +
                                '<td>' + item.profesional.idPersona.nombre + ' ' + item.profesional.idPersona.apellido + '</td>' +
                                '<td>' +
                                '<a href="./profesional/usermode/publicacion.html?id='+publicacion.id+'">'+ 
                                '<button type="button" class="btn  btn-info" title="Ver publicacion">' +
                                '<i class="fas fa-eye"></i></button></a>'+
                                '<button type="button" class="btn btn-danger" title="Eliminar" value="' + publicacion.id + '" onclick="eliminarpublicacion(this.value)" >' +
                                '<i class="fas fa-trash"></button></td></tr>';

                    });


                });


                $('#tabla-profesionales').append(fill);

            });
}


function eliminarpublicacion(value) {
    let loadurl = url + 'publicacion/eliminar';
    let data = {
        'id': value
    };

    let init = makeinit(data)

    if (confirm("eliminar usuario") == true) {
        console.log('borrar');
        fetch(loadurl, init)
                .then((resp) => resp.json())
                .then(function (data) {
                    console.log(data);
                    loadstart();

                });

    }

}


function loadSectores() {
    let loadurl = url + 'sector/list';
    let init = makeinitnodat();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                if (!data) {
                    return;
                }
                console.log(data);

                let sectores = "";
                $.each(data, function (i, item) {
                    sectores += '<option value="' + item.id + '">' + item.nombre + '</option>';

                });

                $('#sectorselect').append(sectores);


            });

}

function showprofs(val) {
    console.log(val);
    profs = profesiones

    let profesion = '<option value="0">Todos</option>';
    $('#profesionselect').empty();

    $.each(profs, function (i, item) {

        if (item.sector.id == val || val == 0) {

            profesion += '<option value="' + item.id + '">' + item.profesion + '</option>';

        }

    });
    $('#profesionselect').append(profesion);

}

function loadProfesiones() {

    let loadurl = url + 'profesion/list';
    let init = makeinitnodat();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

                profesiones = data;

                let profesion = "";
                $.each(data, function (i, item) {
                    //if (item.sector.id == idsec) {
                    profesion += '<option value="' + item.id + '">' + item.profesion + '</option>';
                    //}


                });

                $('#profesionselect').append(profesion);

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
