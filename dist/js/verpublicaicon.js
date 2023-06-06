let url = serverurl;

$(document).ready(function () {

    let idpublicacion = getPublicacionid();
    console.log(idpublicacion);

    loadstart(idpublicacion);
});


function loadstart(idpublicacion) {



    let idurl = new URLSearchParams({
        id: idpublicacion
    });

    let loadurl = url + 'publicacion/obtener?' + idurl;
    console.log(loadurl);
    let init = makeinitnodat();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

                console.log(data);

                $('#titulo-publicacion').append(data.titulo);

                $('#publicacion-contenido').append(decodeURIComponent(data.contenido));

                $('#publicacion-costo').append('$ ' + data.costo);

                let feet = '<button type="button" class="btn btn-block btn-outline-primary"' +
                        'value="' + data.idProfesional + ' "  onclick="verprofesional(this.value)">Ver profesional</button>'

                $('#pie-publicacion').append(feet);


            });

}

function getPublicacionid() {
    let url = new URL(window.location);

    let actual = window.location;

    let searchParams = url.searchParams;

    return searchParams.get('id');

}

function makeinit(data) {
    let heads = new Headers();
    heads.append("Accept", "application/json");
    heads.append("Content-Type", "application/json");
    //heads.append("Authorization", authToken);
    heads.append("Access-Control-Allow-Origin", '*');
    let init = {
        method: 'get',
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

function verprofesional(value) {

    location.href = "./profesional.html?id=" + value;
}
