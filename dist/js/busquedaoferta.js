let url = serverurl;

var publicaciones;

$(document).ready(function () {

    loadstart();
    loadTipoContrato();
    loadSectores();

});

function findpublication() {

    $('#busqueda-publicacion').empty();

    let sect = $("#sectorselect").val();
    let tipoc = $("#tipocontratoselect").val();
    let jornada = $("#jornada").val();
    let experiencia = $("#experiencia").val();
    let precio = $("#precio").val();
    let campo = $("#campobusqueda").val();

    let pubs = publicaciones;

    console.log(pubs);

    let result = [];

    if (sect != 0) {
        $.each(pubs, function (i, item) {
            if(item.idSector.id == sect){
                result.push(item);
            }
        });
    } else {
        result = pubs;
    }

    console.log(result);

    let result2 = [];
    if (tipoc != 0) {
        $.each(result, function (i, item) {
            if(item.idTipoContrato.id == tipoc){
                result2.push(item);
            }
        });

    } else {
        result2 = result;
    }

    console.log(result2);

    let result3 = [];
    if (jornada != 0) {
        $.each(result2, function (i, item) {
            if(item.jornada == jornada){
                result3.push(item);
            }
        });

    } else {
        result3 = result2;
    }

    console.log(result3);
    let result4 = [];
    if (precio) {
        $.each(pubs, function (i, item) {
            if (parseInt(item.salario)  <= precio) {
                result4.push(item);
            }
        });


    } else {
        result4 = result3;
    }

    console.log(result4);
    let result5 = [];
    if (experiencia) {
        $.each(result4, function (i, item) {
            if (parseInt(item.experiencia)  <= experiencia) {
                result5.push(item);
            }
        });


    } else {
        result5 = result4;
    }

    console.log(result5); 
    let result6 = [];
    if (campo) {
        
        $.each(result5, function (i, item) {
            if (item.titulo.indexOf(campo) >= 0) {
                result6.push(item);
            }

        });
        

    } else {
    result6 = result5;  
    }

    console.log(result6);




    let fill = ''
   
    $.each(result6, function (i, item) {

        let experiencia = "sin experiencia"

        if(item.experiencia>0){
            experiencia= item.experiencia + ' años'
        }

        let interna = '<div class="float-right">' + item.salario + '</div>' +
            '<h3>' + item.titulo + '</h3>' +
            '<p class="mb-0">experiencia:  ' + experiencia+ '</p>' +
            '<div class="row">' +
            '<div class="col-md-6">' +
            '<button type="button" class="btn btn-block btn-outline-primary" value="' + item.id + '" onclick="veroferta(this.value)">' +
            'Ver oferta' +
            '</button> </div>' +
            '<div class="col-md-6 ">' +
            '</div></div>';

        let ext = '<div class="list-group-item">' +
                '<div class="row">' +
                `<div class="col px-4"><div>` +
                interna +
                '</div></div></div></div>';

        fill += ext
    });

    $('#busqueda-publicacion').append(fill);

}

function veroferta(value) {
    location.href = "./veroferta.html?id=" + value;
}


function loadstart() {
    let loadurl = url + 'oferta/list';
    let init = makeinitnodat();


    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                if (data) {

                    console.log(data);

                    publicaciones = data;

                    let fill = ''
                    $.each(data, function (i, item) {

                    let experiencia = "sin experiencia"

                    if(item.experiencia>0){
                        experiencia= item.experiencia + ' años'
                    }

                        let interna = '<div class="float-right">' + item.salario + '</div>' +
                                '<h3>' + item.titulo + '</h3>' +
                                '<p class="mb-0">experiencia:  ' + experiencia+ '</p>' +
                                '<div class="row">' +
                                '<div class="col-md-6">' +
                                '<button type="button" class="btn btn-block btn-outline-primary" value="' + item.id + '" onclick="veroferta(this.value)">' +
                                'Ver oferta' +
                                '</button> </div>' +
                                '<div class="col-md-6 ">' +
                                '</div></div>';

                        let ext = '<div class="list-group-item">' +
                                '<div class="row">' +
                                `<div class="col px-4"><div>` +
                                interna +
                                '</div></div></div></div>';

                        fill += ext
                    });
                    $('#busqueda-publicacion').append(fill);
                }
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
              

                let sectores = "";
                $.each(data, function (i, item) {
                    sectores += '<option value="' + item.id + '">' + item.nombre + '</option>';

                });

                $('#sectorselect').append(sectores);


            });

}

function loadTipoContrato() {
    let loadurl = url + 'tipocontrato/list';
    let init = makeinitnodat();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                if (!data) {
                    return;
                }
        
                let sectores = "";
                $.each(data, function (i, item) {
                    sectores += '<option value="' + item.id + '">' + item.nombre + '</option>';

                });

                $('#tipocontratoselect').append(sectores);


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
