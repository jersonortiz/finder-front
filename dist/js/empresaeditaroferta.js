let url = serverurl;
let usuario = user;
let publicacion = "";

$(document).ready(function () {
    $("#publiform").submit(function (e) {
        e.preventDefault();

        guardar();
    });
    
    loadSectores();
    loadTipoContrato();
    cargaroferta();
});


function getPublicacionId() {
    let url = new URL(window.location);

    let searchParams = url.searchParams;

    return searchParams.get('id'); // 'node'

}

function cargaroferta() {

    let idu = getPublicacionId();

    let idurl = new URLSearchParams({
        id: idu,
    });

    let loadurl = url + 'oferta/consulta?' + idurl;

    let init = makeinitnodat();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                publicacion = data;

                console.log(publicacion);

                $("#titulo").val(data.titulo);

                $("#salario").val(data.salario);
                $("#experiencia").val(data.experiencia);
                $("#fecha").val(data.fecha);
                $("#jornada").val(data.jornada);
                $("#sectorselect").val(data.idSector.id);
                $("#tipocontratoselect").val(data.idTipoContrato.id);

                let cont = decodeURIComponent(data.contenido);
                $("#summernote").summernote("code", cont);


            });

}

function guardar() {

    let idp = getPublicacionId();

    let loadurl = url + 'oferta/editar';

    let tit = $("#titulo").val();
    let sal = $("#salario").val();
    let exp = $("#experiencia").val();
    let jorn = $("#jornada").val();
    let sect = $("#sectorselect").val();
    let tipo = $("#tipocontratoselect").val();
    let fecha = $("#fecha").val();

    content = encodeURIComponent($("#summernote").summernote('code'));

    let data = {
        id:idp,
        titulo: tit,
        contenido: content,
        salario:sal,
        jornada: jorn,
        idTipoContrato:{id:tipo},
        fecha:fecha,
        experiencia: exp,
        idEmpresa:0,
        idSector:{id:sect}
        
    };

    console.log(data);

    let init = makeinit(data)

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

                if (data.msg) {
                    alert("hubo un problema")
                }


                console.log(data);
                alert("se han guardado los cambios");
                //location.href = "./ofertas.html";

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