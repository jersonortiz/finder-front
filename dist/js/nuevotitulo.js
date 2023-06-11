let url = serverurl;
let usuario = user;
let profesional = "";

$(document).ready(function () {
    $("#publiform").submit(function (e) {
        e.preventDefault();

        registrar();
    });

    loadtipos();

});

function registrar() {
    let loadurl = url + 'titulo/registrouser';

    let tit = $("#titulo").val();

    let inst = $("#institucion").val();

    let tipo = $("#tituloselect").val();

    let certi = $("#certificado")[0].files[0];


    const reader = new FileReader();
    reader.onload = function (event) {
        const base64String = event.target.result;
        console.log(event.target);
        //console.log(base64String);

        let file = certi.name

        let extension = obtenerExtension(file);

        console.log(extension);

        if(extension!=='pdf'){
            alert('el archivo debe de ser .pdf');
            return;
        }

        let cercode = base64String;

        let data = {

            titulo: tit,
            institucion: inst,
            certificado: cercode,
            idTipoTitulo: tipo,
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
                    alert("se ha registrado el titulo");
                    location.href = "./titulos.html";

                });
                

    };
    reader.readAsDataURL(certi);
}

function loadtipos() {
    let loadurl = url + 'titulo/listtipo';
    let init = makeinitnodat();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                if (!data) {
                    return;
                }

                console.log(data);

                let tipos = "";
                $.each(data, function (i, item) {
                    tipos += '<option value="' + item.id + '">' + item.tipo + '</option>';

                });

                $('#tituloselect').append(tipos);


            });

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