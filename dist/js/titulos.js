let url = serverurl;
let usuario = user;

let redes = [];


$(document).ready(function () {

    loadstart();

});


function editar(value) {
    location.href = "./editartitulo.html?id=" + value;
}

function eliminar(value) {
    let loadurl = url + 'titulo/eliminar';

    let data = {
        'id': value
    };

    let init = makeinit(data)


    if (confirm("eliminar titulo?") == true) {
        fetch(loadurl, init)
                .then((resp) => resp.json())
                .then(function (data) {

                    loadstart();

                });
    }
}



function loadstart() {

    let idurl = new URLSearchParams({
        id: usuario.id,
    });

    let loadurl = url + 'titulo/listuser?' + idurl;
    let init = makeinitnodat();


    $('#titulotabla').empty();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

                if (data.msg) {
                    console.log(data)
                    return;
                }
                let fill = ''
                $.each(data, function (i, item) {
                    fill += '<tr>' +
                            '<td>' + item.titulo + '</td>' +
                            '<td>' + item.institucion + '</td>' +
                            '<td>' +
                            '<button type="button" class="btn btn-info" value="' + item.certificado + '" onclick="descarga(this.value)" title="decargar certificado">' +
                            '<i class="fas fa-download"></i>' +
                            '</button>' +
                            '<button type="button" class="btn btn-danger" value="' + item.id + '" onclick="eliminar(this.value)" title="eliminar">' +
                            '<i class="fas fa-trash"></i>' +
                            '</button>' +
                            '</td>' +
                            '</tr>';




                });

                $('#titulotabla').append(fill);

            });
}


function descarga(value) {
    let file = base64StringToFile(value);
    console.log(file);

    descargarArchivo(file, 'file.pdf');
}

function descargarArchivo(file, fileName) {
    const url = URL.createObjectURL(file);

    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = url;
    enlaceDescarga.download = fileName;

    document.body.appendChild(enlaceDescarga);
    enlaceDescarga.click();

    setTimeout(function () {
        document.body.removeChild(enlaceDescarga);
        URL.revokeObjectURL(url);
    }, 0);
}


function base64StringToFile(base64String) {
    const base64Data = base64String.split(',')[1]; // Eliminar los metadatos


    let meta = base64String.split(',')[0]
    console.log(meta);

    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: 'application/octet-stream'});

    // Crear un objeto File con un nombre ficticio
    const file = new File([blob], 'archivo', {type: blob.type});

    return file;
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