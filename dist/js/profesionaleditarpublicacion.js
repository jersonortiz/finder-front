let url = serverurl;
let usuario = user;
let publicacion = "";

$(document).ready(function () {
    $("#publiform").submit(function (e) {
        e.preventDefault();

        guardar();
    });
    cargarpublicacion();
});


function getPublicacionId() {
    let url = new URL(window.location);

    let searchParams = url.searchParams;

    return searchParams.get('id'); // 'node'

}

function cargarpublicacion() {

    let idu = getPublicacionId();

    let idurl = new URLSearchParams({
        id: idu,
    });

    let loadurl = url + 'publicacion/obtener?' + idurl;

    let init = makeinitnodat();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                publicacion = data;

                console.log(publicacion);

                $("#titulo").val(data.titulo);

                $("#resumen").val(data.resumen);
                $("#costo").val(data.costo);



                let cont = decodeURIComponent(data.contenido);
                $("#summernote").summernote("code", cont);


            });

}

function guardar() {

    let idp = getPublicacionId();

    let loadurl = url + 'publicacion/editar';

    let tit = $("#titulo").val();
    let resu = $("#resumen").val();
    let cost = $("#costo").val();

    content = encodeURIComponent($("#summernote").summernote('code'));

    let data = {
        id: idp,
        titulo: tit,
        resumen: resu,
        contenido: content,
        costo: cost
    };

    let init = makeinit(data)

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

                if (data.msg) {
                    alert("hubo un problema")
                }


                console.log(data);
                alert("se han guardado los cambios");
                location.href = "./publicaciones.html";

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