let url = serverurl;
let usuario = user;
let competencia = "";

$(document).ready(function () {
    $("#publiform").submit(function (e) {
        e.preventDefault();

        guardar();
    });

    cargarCompetencia();

});

function getCompetenciaId() {
    let url = new URL(window.location);

    let searchParams = url.searchParams;

    return searchParams.get('id'); // 'node'

}

function cargarCompetencia() {

    let idu = getCompetenciaId();

    let idurl = new URLSearchParams({
        id: idu,
    });

    let loadurl = url + 'competencia/consulta?' + idurl;

    let init = makeinitnodat();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                competencia = data;

                console.log(competencia);

                $("#competencia").val(data.competencia);

                $("#descripcion").val(data.descripcion);

            });

}

function guardar() {
    let loadurl = url + 'competencia/editar';

    let tit = $("#competencia").val();

    let desc = $("#descripcion").val();


    let data = {
        id: competencia.id,
        competencia: tit,
        descripcion: desc,
        idProfesional: usuario.id
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
                alert("se ha actualizado la competencia");
                location.href = "./competencia.html";

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