let url = serverurl;

var listadoprofesionales;


$(document).ready(function () {

    loadstart();
    loadSectores();
    loadProfesiones();

});


function findprofesional() {
    $('#tabla-profesionales').empty();

    let profesionales = listadoprofesionales;


    let profesion = $("#profesionselect").val();
    let sector = $("#sectorselect").val();
    let edad = $("#edad").val();

    let busq = $("#campobusqueda").val();

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

    if (edad) {
        let result2 = [];
        $.each(result, function (i, item) {
            
            let edd = calcularEdad(new Date(item.profesional.idPersona.fechaNacimiento));
          
            if (edd== edad) {
                result2.push(item);
            }

        });

        result = result2;
    }


    if (busq) {
        let result3 = [];
        $.each(result, function (i, item) {

            if ((item.profesional.ciudad.indexOf(busq) >= 0) || (item.profesional.idPersona.nombre.indexOf(busq) >= 0) || (item.profesional.idPersona.apellido.indexOf(busq) >= 0)) {
                result3.push(item);
            }

        });
        result = result3;

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

        let edd = calcularEdad(new Date(item.profesional.idPersona.fechaNacimiento));

        fill += '<tr>' + '<td>' + item.profesional.idPersona.nombre + ' ' + item.profesional.idPersona.apellido + '</td>' +
                '<td>' + edd+ '</td>' +
                '<td>' + item.profesional.idPersona.email + '</td>' +
                '<td>' + profesiones + '</td>' +
                '<td>' + estadoprofesional + '</td>' +
                '<td>' +
                '<a href="./profesional/usermode/profesional.html?id='+item.profesional.id +'">'+
                '<button type="button" class="btn btn-info" '+
                'ver </button></a>' +
                '<button type="button" class="btn btn-info" value="' + item.profesional.id + '" onclick="suspenderprofesional(this.value)"  >' +
                accionsuspension +
                '</button>' +
                '<button type="button" class="btn btn-danger" value="' + item.profesional.id + '" onclick="eliminarprofesional(this.value)" >' +
                'Eliminar</button></td></tr>';
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
                    let edd = calcularEdad(new Date(item.profesional.idPersona.fechaNacimiento));


                    fill += '<tr>' + '<td>' + item.profesional.idPersona.nombre + ' ' + item.profesional.idPersona.apellido + '</td>' +
                            '<td>' + edd + '</td>' +
                            '<td>' + item.profesional.idPersona.email + '</td>' +
                            '<td>' + profesiones + '</td>' +
                            '<td>' + estadoprofesional + '</td>' +
                            '<td>' +
                            '<a href="./profesional/usermode/profesional.html?id='+item.profesional.id +'">'+
                            '<button type="button" class="btn btn-info"  >' +
                            'ver </button></a>' +
                            '<button type="button" class="btn btn-info" value="' + item.profesional.id + '" onclick="suspenderprofesional(this.value)"  >' +
                            accionsuspension +
                            '</button>' +
                            '<button type="button" class="btn btn-danger" value="' + item.profesional.id + '" onclick="eliminarprofesional(this.value)" >' +
                            'Eliminar</button></td></tr>';
                });


                $('#tabla-profesionales').append(fill);

            });
}


function suspenderprofesional(value) {

    let loadurl = url + 'profesional/suspender';

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
    let loadurl = url + 'profesional/eliminar';
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

function calcularEdad(fechaNacimiento) {
  var fechaActual = new Date();
  var edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
  
  // Verificar si aún no ha pasado el cumpleaños de este año
  var mesActual = fechaActual.getMonth();
  var diaActual = fechaActual.getDate();
  var mesNacimiento = fechaNacimiento.getMonth();
  var diaNacimiento = fechaNacimiento.getDate();
  
  if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
    edad--;
  }
  
  return edad;
}