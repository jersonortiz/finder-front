let url = serverurl;
let usuario = user;
let titulo = "";

$(document).ready(function () {
    $("#publiform").submit(function (e) {
        e.preventDefault();

        guardar();
    });

    cargarTipo();

});

function getTipoId() {
    let url = new URL(window.location);

    let searchParams = url.searchParams;

    return searchParams.get('id'); // 'node'

}

function cargarTipo() {

    let idu = getTipoId();

    let idurl = new URLSearchParams({
        id: idu,
    });

    let loadurl = url + 'titulo/consultatipo?' + idurl;

    let init = makeinitnodat();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                titulo = data;

                console.log(titulo);

                $("#tipo").val(data.tipo);



            });

}

function guardar() {
    let loadurl = url + 'titulo/editartipo';

    let tit = $("#tipo").val();

    let data = {
        id: titulo.id,
        tipo: tit
    };

    console.log(data);
    let init = makeinit(data)

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                if (data.msg) {
                    console.log(data);
                    return;
                }
                console.log(data);

                console.log(data);
                alert("se ha actualizado el tipo de titulo");
                location.href = "./tipotitulo.html";

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