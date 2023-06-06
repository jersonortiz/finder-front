user = JSON.parse(sessionStorage.getItem("USER_SESSION"));

$(document).ready(function () {


    console.log(user);

    if (user) {
        $('#username').empty();

        $('#username').append(user.nombre + ' ' + user.apellido);
    }
});