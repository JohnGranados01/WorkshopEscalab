let btnEnviar = document.querySelector('.btn-enviar');

const nameContact = document.getElementsByName('name_contact')[0];
const email = document.getElementsByName('email_contact')[0];
const phone = document.getElementsByName('phone_contact')[0];
const type_service = document.getElementById('type_service');
const commit = document.getElementsByName('commit_contact')[0];

const errorList = document.getElementById('error');

function showError(elemento, mensaje){
    elemento.classList.toggle('error');
    errorList.innerHTML += `<li>${mensaje}</li>`;
    // errorList.innerHTML += `<li> `+mensaje+`</li>`;
}

function cleanError(){
    errorList.innerHTML='';

}

async function senMail(name, email, phone, select, comment){
    const rawResponse = await fetch('https://30kd6edtfc.execute-api.us-east-1.amazonaws.com/prod/send-email',{
    method: 'POST',
    headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, phone, select, comment })
});
const content = await rawResponse.json();
    if(Object.keys(content.errors).length > 0){
        alert("Error al tratar de enviar el correo!");
    }else{
        alert("Correo enviado Satisfactoriamente!");
    }

}

btnEnviar.addEventListener('click', (event)=>{
    event.preventDefault();
    cleanError();
    let hasError = false;
    const nameMinimized = nameContact.value.trim();
    if(nameMinimized.length ===0 || nameMinimized.indexOf(' ') < 0){
        showError(nameContact, 'Ingrese un nombre y apellido valido!');
        hasError = true;
    }
    const correctEmail = /\w+@\w+\.\w{2,7}/;
    if(!correctEmail.exec(email.value)){
        showError(email, 'Correo Invalido!');
        hasError = true;
    }
    const correctPhone = /^\+?\d{7,15}$/;
    if(!correctPhone.exec(phone.value)){
        showError(phone, 'Verifique el telefono!');
        hasError = true;
    }
    const minimizedCommit = commit.value.trim();
    if(minimizedCommit.length < 20){
        showError(commit, 'El comentario debe tener 20 o mas caracteres!');
        hasError = true;
    }

    if(!hasError){
        senMail(nameMinimized, email.value, phone.value, type_service.value, minimizedCommit);
    }
});

