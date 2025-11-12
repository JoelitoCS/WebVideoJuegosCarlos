
//Declaramos las dos arrays, la de enemigos y la de matriz fuera de las funciones
const enemigos = [];
const matriz = [];
let pacman = { f: 4, c: 4 }; //// Pac-Man empieza arriba a la izquierda
let nivelSiguiente = document.querySelector("#siguienteNivel");
let nivel = 1;


crearMatriz();
crearEnemigos();
moverPacMan();
let pacmanImg = matriz[pacman.f][pacman.c] = `<img  id="jugadorPacman" src="https://upload.wikimedia.org/wikipedia/commons/2/26/Pacman_HD.png" alt="Pacman">`;
renderArray(matriz);


function crearMatriz() {

    for (let f = 0; f < 9; f++) {

        matriz[f] = [];

        for (let c = 0; c < 9; c++) {

            matriz[f][c] = " ";

        }
    }
}

console.log(matriz);


//creo la funcion de crear enemigos, donde genero 5 enemigos en posicione aleatorias, los cuales tiene su propioArray,
// y luego inserto estos enemigos en mi matriz principal, que en principio se vera como un asterisco pero luego mas adelante lo cambio por un emoji

function crearEnemigos() {

    for (let i = 0; i < 5; i++) {

        let filaEnemigo = Math.floor(Math.random() * 8);
        let columnaEnemigo = Math.floor(Math.random() * 8);

        enemigos[i] = {
            f: filaEnemigo,
            c: columnaEnemigo,

        }

        matriz[enemigos[i].f][enemigos[i].c] = "*";

    }

}


function renderArray(matriz) {

    let divMatriz = " ";
    for (let f = 0; f < 9; f++) {

        divMatriz += "<div class='fila'>";

        for (let c = 0; c < 9; c++) {

            let contenido = matriz[f][c];

            //Si mi contenido de la matriz es igual a mi imagen del pacman, mostrar en mi div matriz la imagen, igual con el enemigo, si contenido es igual a *, que es enemigo, entonces mostrarme un emoji de un marciano y si no pues que directamente me muestre las casillas del tablero
            if (contenido === pacmanImg) {

                divMatriz += `<div class="casilla"><img  id="jugadorPacman" src="https://upload.wikimedia.org/wikipedia/commons/2/26/Pacman_HD.png" alt="Pacman"></div>`;

            } else if (contenido === "*") {

                divMatriz += `<div class="casilla">👾</div>`;

            } else {

                divMatriz += `<div class="casilla"></div>`;
            }
        }

        divMatriz += "</div>";

    }

    document.querySelector(".matriz").innerHTML = divMatriz;

}

function moverPacMan() {
    document.addEventListener("keydown", function (event) {

        // Limpiamos la posición actual de Pac-Man
        matriz[pacman.f][pacman.c] = "";
        
        // Calculamos la nueva posición según la tecla y los límites del tablero
        if (event.key === "ArrowUp" && pacman.f > 0) {

            pacman.f--;

        } else if (event.key === "ArrowDown" && pacman.f < matriz.length - 1) {

            pacman.f++;

        } else if (event.key === "ArrowLeft" && pacman.c > 0) {

            pacman.c--;

        } else if (event.key === "ArrowRight" && pacman.c < matriz[0].length - 1) {

            pacman.c++;

        }
        //Si mi pacman se mueve en una casilla donde hay un enemigo,
        //entonces hacemos un bucle que recorre mi array de enemigos, 
        // y le digo que si me pongo encima de la casilla, que borre al fantasma del array

        if (matriz[pacman.f][pacman.c] === "*") {
            for (let i = 0; i < enemigos.length; i++) {
                if (enemigos[i].f === pacman.f && enemigos[i].c === pacman.c) {

                    enemigos.splice(i, 1);
                    break;

                }
            }
            // limpiar la casilla antes de colocar a Pac-Man
            matriz[pacman.f][pacman.c] = " ";
        }


        // Si hay un enemigo, lo borramos automáticamente porque lo reemplazamos
        matriz[pacman.f][pacman.c] = '<img  id="jugadorPacman" src="https://upload.wikimedia.org/wikipedia/commons/2/26/Pacman_HD.png" alt="Pacman">';

        // Volvemos a dibujar la matriz actualizada
        renderArray(matriz);

        //para ver si se han comido a todos los enemigos y pasar de nivel
        nivelCompletado();

    });
}

//para subir de nivel cuando se han comido a todos los enemigos
function nivelCompletado() {

    if (enemigos.length === 0) {
            
        nivelSiguiente.innerHTML = `<h2>¡Felicidades! Has completado el nivel ${nivel} </h2>`;
        nivel ++;
        crearEnemigos(); //Aumenta la cantidad de enemigos en cada nivel
        matriz[pacman.f][pacman.c] = pacmanImg; //Reubica a Pacman en la matriz
        renderArray(matriz);

    }
}