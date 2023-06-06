/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

$(document).ready(function () {
    loadbuttons();

});


function loadbuttons() {
    $('#botonaccion').empty();
    let fill = "";

    if (usuario.rol === 2) {
        fill = ' <button type="button" class="btn btn-primary btn-block" value="' + usuario.id + '" onclick="toProfesional(this.value)" >Convertirse en profesional</button>';
    }

    if (usuario.rol === 3) {
        fill = ' <button type="button" class="btn btn-primary btn-block" value="' + usuario.id + '" onclick="toUsuario(this.value)">Dejar de ser profesional</button>'+ 
            '<a href="./profesiones.html"><button type="button" class="btn btn-primary btn-block">Ajustar profesiones</button></a>';
    }

    if(usuario.rol==1){
        fill = '<a href="./profesiones.html"><button type="button" class="btn btn-primary btn-block">Ajustar profesiones</button></a>';
 
    }

    $('#botonaccion').append(fill);
}

function toUsuario(value) {


    let data = {
        id: value
    };

    let loadurl = url + 'profesional/cambiousuarioconusuario';
    console.log(loadurl);
    let init = makeinit(data);

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

                console.log(data);

                if (data.msg) {
                    alert("ya es usuario")
                    return;
                }

                sessionStorage.setItem("USER_SESSION", JSON.stringify(data));

                location.href = "../../user/dashboard.html";

            });
}

function toProfesional(value) {

    let data = {
        id: value
    };

    let loadurl = url + 'profesional/cambioprofesional';
    console.log(loadurl);
    let init = makeinit(data);

    fetch(loadurl, init)
            .then((resp) => resp.json())
            .then(function (data) {

                console.log(data);

                if (data.msg) {
                    alert("ya es profesional")
                    return;
                }

                console.log(JSON.parse(sessionStorage.getItem("USER_SESSION")));

                sessionStorage.setItem("USER_SESSION", JSON.stringify(data));

                location.href = "../profesional/dashboard.html";

            });

}

