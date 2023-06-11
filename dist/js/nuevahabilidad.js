let url = serverurl;
let usuario = user;
let profesional = "";

$(document).ready(function () {
    $("#publiform").submit(function (e) {
        e.preventDefault();

        registrar();
    });
});

function registrar() {
    let loadurl = url + 'habilidad/registrouser';

    let tit = $("#nombre").val();

    let certi = $("#certificado")[0].files[0];


    const reader = new FileReader();
    reader.onload = function (event) {
        const base64String = event.target.result;
    

        let cercode = base64String;

        let file = certi.name

        let extension = obtenerExtension(file);

        console.log(extension);

        if(extension!=='pdf'){
            alert('el archivo debe de ser .pdf');
            return;
        }

        let data = {

            nombre: tit,
            certificado: cercode,
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
                    alert("se ha registrado la habilidad");
                    location.href = "./habilidades.html";

                });

    };
    reader.readAsDataURL(certi);
}

function obtenerExtension(nombreArchivo) {
    return nombreArchivo.split('.').pop();
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