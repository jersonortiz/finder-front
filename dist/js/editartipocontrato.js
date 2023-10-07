let url = serverurl;
let usuario = user;
let tipo = "";

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

    let loadurl = url + 'tipocontrato/consulta?' + idurl;

    let init = makeinitnodat();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                tipo = data;

                console.log(tipo);

                $("#tipo").val(data.nombre);
                $("#descripcion").val(data.descripcion);



            });

}

function guardar() {
    let loadurl = url + 'tipocontrato/editar';

   let tit = $("#tipo").val();
    let des = $("#descripcion").val();

    let data = {
        id: tipo.id,
        nombre: tit,
        descripcion: des
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
                alert("se ha actualizado el tipo de contrato");
                location.href = "./tipocontrato.html";

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