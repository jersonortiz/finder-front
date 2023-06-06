let url = serverurl;

console.log(url);

var profesionales = {};
var profesiones = {}

$(document).ready(function () {

    loadstart();
    loadSectores()
    loadProfesiones()

});

function findprofesional() {

    $('#lista-profesionales').empty();

    let profs = profesionales;
    let profesion = $("#profesionselect").val();
    let sector = $("#sectorselect").val();
    let edad = $("#edad").val();

    let busq = $("#campobusqueda").val();



    console.log(edad)

    let result = [];

    if (sector != 0) {
        $.each(profs, function (i, item) {

            $.each(item.profesiones, function (i, listprofs) {
                if (listprofs.id == profesion || profesion == 0) {


                    result.push(item);
                    return false;
                }
            });

        });

    } else {
        result = profs;
    }




    if (edad) {
        let result2 = [];
        $.each(result, function (i, item) {
            if (item.edad == edad) {
                result2.push(item);
            }


        });

        result = result2;
    }

    if (busq) {
        let result3 = [];
        $.each(result, function (i, item) {
            if ((item.nombre.indexOf(busq) >= 0) || (item.apellido.indexOf(busq) >= 0)) {
                result3.push(item);
            }


        });
        result = result3;

    }


    let fill = ''
    $.each(result, function (i, item) {

        let profesiones = "";
        $.each(item.profesiones, function (i, item) {
            profesiones += item.profesion + ', ';
        });


        let interna = '<h3>' + item.nombre + ' ' + item.apellido + '</h3>' +
                '<p class="mb-0">' + profesiones + '</p>' +
                '<div class="row">' +
                '<div class="col-md-6"></div>' +
                '<div class="col-md-6 ">' +
                '<button type="button" class="btn btn-block btn-outline-primary" value="' + item.id + '" onclick="verprofesional(this.value)">' +
                'Ver profesional' +
                '</button></div></div>';

        let ext = '<div class="list-group-item">' +
                '<div class="row">' +
                `<div class="col px-4"><div>` +
                interna +
                '</div></div></div></div>';

        fill += ext
    });
    $('#lista-profesionales').append(fill);




    console.log(result);

}

function showprofs(val) {
    console.log(val);
    profs = profesiones

    let profesion = "";

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




function loadstart() {
    let loadurl = url + 'profesional/list';
    let init = makeinitnodat();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                if (data) {

                    if (data) {
                        profesionales = data;

                    }
                    console.log(data);
                    let fill = ''
                    $.each(data, function (i, item) {

                        let profesiones = "";
                        $.each(item.profesiones, function (i, item) {
                            profesiones += item.profesion + ', ';
                        });


                        let interna = '<h3>' + item.nombre + ' ' + item.apellido + '</h3>' +
                                '<p class="mb-0">' + profesiones + '</p>' +
                                '<div class="row">' +
                                '<div class="col-md-6"></div>' +
                                '<div class="col-md-6 ">' +
                                '<button type="button" class="btn btn-block btn-outline-primary" value="' + item.id + '" onclick="verprofesional(this.value)">' +
                                'Ver profesional' +
                                '</button></div></div>';

                        let ext = '<div class="list-group-item">' +
                                '<div class="row">' +
                                `<div class="col px-4"><div>` +
                                interna +
                                '</div></div></div></div>';

                        fill += ext
                    });
                    $('#lista-profesionales').append(fill);
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


function verprofesional(value) {
    location.href = "./profesional.html?id=" + value;
}




/*
 
 <div class="list-group-item">
 <div class="row">
 <div class="col-auto">
 <img class="img-fluid" src="../../dist/img/user2-160x160.jpg" alt="Photo"
 style="max-height: 160px;">
 </div>
 <div class="col px-4">
 <div>
 <div class="float-right">2023-04-20 10:14pm</div>
 <h3>pepe paez</h3>
 <p class="mb-0">Desarrollador con conocimiento en html , css, javascript, vue.js, java, ruby on
 rails, spring boot, python, flask</p>
 <div class="row">
 <div class="col-md-6">
 <button type="button" class="btn btn-block btn-outline-primary">
 <a href="·">Ver publicacion completa</a>
 </button>
 </div>
 <div class="col-md-6">
 <button type="button" class="btn btn-block btn-outline-primary">
 <a href="·">Ver profesional</a>
 </button>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 
 */