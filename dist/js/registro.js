let url = serverurl;



$("#registform").submit(function (e) {
    e.preventDefault();
});

$(function () {
    $.validator.setDefaults({
        submitHandler: function () {
            console.log('test');
            registro();
            let fecha =   $("#fecha").val();


  
            
         
        }
    });
    $('#registform').validate({
        rules: {
            nombre: {
                required: true,
                lettersonly: true,
            },
            apellido: {
                required: true,
                lettersonly: true,
            },
            correo: {
                required: true,
            },
            telefono: {
                required: true,
            },
            documento: {
                required: true,
                digits: true,
            },
            edad: {
                required: true,
            },
            contraseña: {
                required: true,
                minlength: 4
            },
            confcontraseña: {
                minlength: 4,
                equalTo: "#contraseña"
            },
            terms:{
                required: true,
            }
        },
        messages: {
            nombre: {
                required: "Introdusca el nombre de usuario",
                lettersonly: "El nombre no debe de contener numeros o demas carateres especiales",
            },
            apellido: {
                required: "Introdusca el apellido del usaurio",
                lettersonly: "El apellido no debe de contener numeros o demas carateres especiales"
            },
            correo: {
                required: "Introdusca el correo del usuario",
            },
            telefono: {
                required: "Introdusca el telefono del usuario",
            },
            documento: {
                required: "Introdusca el documento del usuario",
                digits: "El documento no debe de contener letras",
            },
            edad: {
                required: "Introdusca la edad del usuario",
            },
            contraseña: {
                minlength: "Contraseña minimo 4 caracteres"
            },
            confcontraseña: {
                minlength: "Contraseña minimo 4 caracteres",
                equalTo: "debe de ser igual a contraseña"
            },
            terms:{
                required: "Acepte los terminos y condiciones",
            },



        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.input-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });
});


/*
$(document).ready(function () {
    $("#registform").submit(function (e) {
        e.preventDefault();
    });

    $("#agreeTerms").click(function () {
        $("#registro").attr("disabled", !this.checked);
    });

    $("#registro").click(function () {

        registro();

    });




});

*/


function registro(){
    let nom = $("#nombre").val();
        let apel = $("#apellido").val();
        let correo = $("#correo").val();
        let tel = $("#telefono").val();
        let doc = $("#documento").val();
        let pass = $("#contraseña").val();
        //let confpass = $("#confcontraseña").val();
    
        let fecha =   $("#fecha").val();

        let edd = calcularEdad(new Date(fecha));
        
        if(edd <18){
            alert("debe de ser mayor de edad");
            return;
        }


        let loadurl = url + 'user/registro';
        //let url = 'http://localhost:8080/user/registro';
        let auth = {};
        let data = {
            id: '',
            nombre: nom,
            apellido: apel,
            email: correo,
            telefono: tel,
            documento: doc,
            contraseña: pass,
            rol: 2,
            fechaNacimiento: fecha,
        };
        console.log(data);

        let init = {
            method: 'POST',
            headers: {
                mode: 'cors',
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data),
            cache: 'default'
        };


        fetch(loadurl, init)
                .then((resp) => resp.json())
                .then(function (data) {
                    if (data) {

                        console.log(data);

                        if (data.email == correo) {
                            alert("registro exitoso");

                            location.href = "./login.html";
                        }

                        if (data.msg == "usuario ya existe") {
                            alert("ya hay un usuario con este correo");
                        }


                    }
                });

}

function calcularEdad(fechaNacimiento) {
  var fechaActual = new Date();
  var edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
  
  // Verificar si aún no ha pasado el cumpleaños de este año
  var mesActual = fechaActual.getMonth();
  var diaActual = fechaActual.getDate();
  var mesNacimiento = fechaNacimiento.getMonth();
  var diaNacimiento = fechaNacimiento.getDate();
  
  if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
    edad--;
  }
  
  return edad;
}

