let url = serverurl;
let usuario = user;
let profesional = "";

$(document).ready(function () {
    $("#publiform").submit(function (e) {
        e.preventDefault();

        registrar();
    });
    cargarprofesional();


});



function cargarprofesional() {

    let idurl = new URLSearchParams({
        id: usuario.id,
    });

    let loadurl = url + 'profesional/obtenerporusuario?' + idurl;

    let init = makeinitnodat();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                profesional = data;

                console.log(profesional);

            });

}

function registrar() {
    let loadurl = url + 'publicacion/registro';

    let tit = $("#titulo").val();

    let resu = $("#resumen").val();
    let cost = $("#costo").val();
    content = encodeURIComponent($("#summernote").summernote('code'));
    let data = {
        titulo: tit,
        resumen: resu,
        contenido: content,
        costo: cost,
        idProfesional: profesional.id
    };

    let init = makeinit(data)

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

                console.log(data);

                console.log(data);
                alert("se ha registrado la publicacion");
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