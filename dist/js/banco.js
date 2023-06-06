let url = serverurl;

var listadoprofesionales;


$(document).ready(function () {

    loadBanco();

});


function registroBanco() {

    let cuenta = $("#Cuentabancaria").val();
    let nom = $("#nombre").val();

    let loadurl = url + 'banco/actualizar';
    let data = {
        id: '1',
        nombre: nom,
        contenido: cuenta
    };
    console.log(data);

    let init = makeinit(data);


    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                if (data) {

                    console.log(data);

                    if (data.msg == "ok") {
                        alert("actualizacion exitosa");

                    }

                }
            });

}


function loadBanco() {

    let loadurl = url + 'banco/consulta';

    let init = makeinitnodat();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                if (data) {

                    console.log(data);

                    $("#Cuentabancaria").val(data.contenido);
                    let nom = $("#nombre").val(data.nombre);

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