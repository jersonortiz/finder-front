let url = serverurl;

$(document).ready(function () {

    let idpublicacion = getPublicacionid();
    console.log(idpublicacion);

    loadstart(idpublicacion);
});

function postularse(idoferta){

    let loadurl = url + 'postulacion/postularusuario';

    let data = {
        idOfertaTrabajo: idoferta,
        idProfesional: user.id
    };

    let init = makeinit(data)

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                console.log(data);

                if(data.msg){
                   alert(data.msg);
                } else {
                    alert('se ha postulado');
                    location.href = "./ofertas.html";
                }
            });    
}


function loadstart(idpublicacion) {



    let idurl = new URLSearchParams({
        id: idpublicacion
    });

    let loadurl = url + 'oferta/consulta?' + idurl;
    console.log(loadurl);
    let init = makeinitnodat();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

                console.log(data);

                let experiencia = 'sin experiencia';

                if(data.experiencia>0){
                    experiencia = data.experiencia + ' años de experiencia';
                }

                $('#titulo-publicacion').append(data.titulo);

                $('#publicacion-contenido').append(decodeURIComponent(data.contenido));

                $('#publicacion-costo').append('$ ' + data.salario);

                $('#publicacion-experiencia').append( experiencia);

               // let feet = '<button type="button" class="btn btn-block btn-outline-primary"' +
               //         'value="' + data.idProfesional + ' "  onclick="verprofesional(this.value)">Ver contratista</button>'

                //$('#pie-publicacion').append(feet);
                let feet = '<a href="./postulaciones.html"><button type="button" class="btn btn-block btn-outline-primary">regresar</button>';

                //if(user.rol==3){
                //    feet = '<a href="./postulaciones.html"><button type="button" class="btn btn-block btn-outline-primary">regresar</button></a>'+
                //    '<button type="button" class="btn btn-block btn-outline-primary" value="'+data.id+'" onclick="postularse(this.value)" >postularse</button>';
                //}

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

function verprofesional(value) {

    location.href = "./profesional.html?id=" + value;
}
