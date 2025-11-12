//Necesito hacer un numero random que recorra del 1 al 20
//1- Definir variables y mensajes
//2- Interficie
//3- Primer mensaje
//4- Detectando evento
//5- Capturar el numero y convertirlo a numero
//6- Funcion iniciar --> Random, mostrar mensaje inicial
//7- Creear funcion comparar --> Coger el random y el numero introducido y compararlos (en el addEventListener)
//8- Mostrar los intentos
//9- Validar intentos maximos
//10- Añadir numeros


/* Math.random() genera un número decimal aleatorio entre 0 (incluido) y 1 (excluido).
Al multiplicar por 20 (* 20), el rango pasa a ser de 0 (incluido) a 20 (excluido).
Math.floor(...) redondea hacia abajo, eliminando la parte decimal. Así, obtienes un número entero entre 0 y 19.
Al sumar 1 (+ 1), el rango final es de 1 a 20, ambos incluidos.*/ 

let numeroRandom = Math.floor(Math.random() * 100 + 1);
let btnComprobar = document.querySelector("#comprobarButton");
let inputNum = document.querySelector("#adivinaInput");
let mensajeDiv = document.querySelector("#mensajeAnunciado");
let intentosDiv = document.querySelector("#numIntentos");
const INTENTOS_MAX = 5;
let intentos = INTENTOS_MAX;

mensajeDiv.innerHTML = "Adivina un numero entre 1 y 100";
intentosDiv.innerHTML = "Intentos restantes: " + intentos;

btnComprobar.addEventListener("click", comparar);

let numerosIntroducidos = " ";

function comparar(){

    
    let numeroUsuario = parseInt(inputNum.value);
    if (numeroUsuario < 1 || numeroUsuario > 100) {

        mensajeDiv.innerHTML = "Por favor, ingresa un número válido entre 1 y 100.";
    
    }else{

        if (numeroUsuario === numeroRandom){
            mensajeDiv.innerHTML = "¡Felicidades! Has adivinado el número. <button id='reiniciarButton'>Juega de nuevo</button>";
        }else if (numeroUsuario < numeroRandom){
            mensajeDiv.innerHTML = "El número es mayor. Inténtalo de nuevo.";
        }else{
            mensajeDiv.innerHTML = "El número es menor. Inténtalo de nuevo.";
        }
    }

    if (numeroUsuario !== numeroRandom) {
        
        intentos--;
        numerosIntroducidos = numerosIntroducidos + numeroUsuario + "  ";
        intentosDiv.innerHTML = "Intentos restantes: " + intentos + "<br>Numeros introducidos: " + numerosIntroducidos;
        
    } 

    if (intentos === 0){
        mensajeDiv.innerHTML = "Has agotado tus intentos, intentalo de nuevo. <button id='reiniciarButton'>Juega de nuevo</button>";
    }

    let botonReiniciar = document.querySelector("#reiniciarButton");

    if (botonReiniciar) {
    botonReiniciar.addEventListener("click", reiniciarJuego);
    }
    
    function reiniciarJuego(){
        numeroRandom = Math.floor(Math.random() *100 + 1); //para buscar otro numero random
        intentos = INTENTOS_MAX; //para reiniciar los intentos
        intentosDiv.innerHTML = "Intentos restantes: " + intentos;
        mensajeDiv.innerHTML = "Adivina un numero entre 1 y 100";
        inputNum.value = "";
        numerosIntroducidos = " ";
    }
}


