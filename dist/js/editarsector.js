let url = serverurl;
let usuario = user;
let sect = "";

$(document).ready(function () {
    $("#publiform").submit(function (e) {
        e.preventDefault();

        guardar();
    });

    cargar();

});

function getId() {
    let url = new URL(window.location);

    let searchParams = url.searchParams;

    return searchParams.get('id'); // 'node'

}

function cargar() {

    let idu = getId();

    let idurl = new URLSearchParams({
        id: idu,
    });

    let loadurl = url + 'sector/consulta?' + idurl;

    let init = makeinitnodat();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                sect = data;
                console.log(data);
                
                $("#sector").val(data.nombre);

            });

}

function guardar() {
    let loadurl = url + 'sector/editar';

    let tit = $("#sector").val();



    let data = {
        id: sect.id,
    	nombre: tit
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
                alert("se ha actualizado el sector");
                location.href = "./sector.html";

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