let url = serverurl;
let usuario = user;
let profesional = "";

$(document).ready(function () {
    $("#publiform").submit(function (e) {
        e.preventDefault();

        registrar();
    });

    loadSectores();

});

function registrar() {
    let loadurl = url + 'profesion/registro';

    let tit = $("#profesion").val();
    let sec = $("#sectorlist").val();

    let data = {
        profesion: tit,
        sector: {
            id:sec,
        },
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
                alert("se ha registrado la profesion");
                location.href = "./profesion.html";

            });

}


function loadSectores() {
    let loadurl = url + 'sector/list';
    let init = makeinitnodat();

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {
                if (!data) {
                    return;
                }
                console.log(data);

                let sectores = "";
                $.each(data, function (i, item) {
                    sectores += '<option value="' + item.id + '">' + item.nombre + '</option>';

                });

                $('#sectorlist').append(sectores);

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