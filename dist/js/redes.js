let url = serverurl;
let usuario = user;

let redes= [];

$(document).ready(function () {



});

function añadir(){

    let tipored = $("#tipored").val();
    let enlacered = $("#enlacered").val();
    val = redes.length;

    let red= {
        id: val,
        tipo:tipored,
        enlace:enlacered
            };

    redes.push(red);

    console.log(redes);

    console.log(JSON.stringify(redes));

mostrar();


}

function mostrar(){
   $('#actuales-list').empty();
   let fill ='';
   $.each(redes, function (i, item) {

        fill += '<tr><th>'+item.tipo+'</th>'+
                '<th>'+item.enlace+'</th>'+
                '<th>'+
                '<button class="btn btn-primary" >eliminar</button>'+
                '</th></tr>';

   });

   $('#actuales-list').append(fill);
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