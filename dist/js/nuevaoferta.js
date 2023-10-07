let url = serverurl;
let usuario = user;
let empresa = "";

$(document).ready(function () {
    $("#publiform").submit(function (e) {
        e.preventDefault();

        registrar();
    });
    cargarempresa();
    loadSectores();
    loadTipoContrato();


});

function cargarempresa() {

    let idurl = new URLSearchParams({
        id: usuario.id,
    });

    let loadurl = url + 'empresa/consultauser?' + idurl;

    let init = makeinitnodat();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                empresa = data;

                console.log(empresa);

            });

}

function registrar() {
    let loadurl = url + 'oferta/registro';

    let tit = $("#titulo").val();
    let sal = $("#salario").val();
    let exp = $("#experiencia").val();
    let jorn = $("#jornada").val();
    let sect = $("#sectorselect").val();
    let tipo = $("#tipocontratoselect").val();
    let fecha = $("#fecha").val();
   
    content = encodeURIComponent($("#summernote").summernote('code'));
    let data = {
        id:0,
        titulo: tit,
        contenido: content,
        salario:sal,
        jornada: jorn,
        idTipoContrato:{id:tipo},
        fecha:fecha,
        experiencia: exp,
        idEmpresa:empresa.id,
        idSector:{id:sect}
    };

    console.log(data);

    let init = makeinit(data)

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

                console.log(data);

                console.log(data);
                alert("se ha registrado la oferta");
                location.href = "./ofertas.html";

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

function loadTipoContrato() {
    let loadurl = url + 'tipocontrato/list';
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