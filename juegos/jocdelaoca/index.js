let posicionJugador1 = 0;
let posicionJugador2 = 0;
let turnoJugador = true; // alternar turnos

const botonTirarDado = document.querySelector("#tirarDado");
const divPosicionJugador1 = document.querySelector("#posicionJugador1");
const divPosicionJugador2 = document.querySelector("#posicionJugador2");
const divResultadoDado = document.querySelector("#resultadoDado");
const mostrarPreguntas = document.querySelector("#mostrarPreguntas");
const preguntas = [
  // HTML
  {
    pregunta: "¿Qué significa HTML y para qué se utiliza?",
    respuestas: [
      "HyperText Markup Language, para estructurar páginas web.",
      "Home Tool Markup Language, para crear imágenes.",
      "Hyper Transfer Markup Language, para transferir archivos."
    ],
    correcta: 0
  },
  {
    pregunta: "¿Cuál es la función de la etiqueta head en un documento HTML?",
    respuestas: [
      "Mostrar el contenido principal de la página.",
      "Contener metadatos y enlaces a recursos externos.",
      "Crear enlaces de navegación."
    ],
    correcta: 1
  },
  {
    pregunta: "¿Cómo se inserta una imagen en HTML?",
    respuestas: [
      "img src='ruta'",
      "image src='ruta'",
      "src img='ruta'"
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué atributo se usa para abrir un enlace en una nueva pestaña?",
    respuestas: [
      "target='_blank'",
      "newtab='true'",
      "open='new'"
    ],
    correcta: 0
  },
  {
    pregunta: "¿Para qué sirve la etiqueta form?",
    respuestas: [
      "Para crear tablas.",
      "Para crear formularios.",
      "Para crear listas."
    ],
    correcta: 1
  },
  // CSS
  {
    pregunta: "¿Qué es CSS y cuál es su propósito?",
    respuestas: [
      "Un lenguaje para programar aplicaciones.",
      "Un lenguaje para dar estilo a páginas web.",
      "Un lenguaje para crear bases de datos."
    ],
    correcta: 1
  },
  {
    pregunta: "¿Cómo se aplica una clase CSS a un elemento HTML?",
    respuestas: [
      "Usando el atributo class.",
      "Usando el atributo style.",
      "Usando el atributo css."
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué propiedad CSS se usa para cambiar el color de fondo?",
    respuestas: [
      "background-color",
      "color",
      "font-color"
    ],
    correcta: 0
  },
  {
    pregunta: "¿Cómo se centra un elemento horizontalmente usando CSS?",
    respuestas: [
      "margin: auto;",
      "center: true;",
      "align: center;"
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué diferencia hay entre margin y padding?",
    respuestas: [
      "Margin es espacio interno, padding es externo.",
      "Margin es espacio externo, padding es interno.",
      "No hay diferencia."
    ],
    correcta: 1
  },
  // JavaScript
  {
    pregunta: "¿Qué es JavaScript y para qué se utiliza?",
    respuestas: [
      "Un lenguaje para dar interactividad a páginas web.",
      "Un lenguaje para crear hojas de estilo.",
      "Un lenguaje para estructurar contenido."
    ],
    correcta: 0
  },
  {
    pregunta: "¿Cómo se declara una variable en JavaScript?",
    respuestas: [
      "var nombre;",
      "variable nombre;",
      "declare nombre;"
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué método se usa para mostrar un mensaje emergente en el navegador?",
    respuestas: [
      "alert()",
      "show()",
      "popup()"
    ],
    correcta: 0
  },
  {
    pregunta: "¿Cómo se accede a un elemento HTML por su id usando JavaScript?",
    respuestas: [
      "getElementById()",
      "getById()",
      "queryId()"
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué es una función en JavaScript?",
    respuestas: [
      "Un bloque de código reutilizable.",
      "Un tipo de variable.",
      "Un método para crear estilos."
    ],
    correcta: 0
  },
  // Mixtas
  {
    pregunta: "¿Cómo se enlaza un archivo CSS externo en HTML?",
    respuestas: [
      "link rel='stylesheet' href='estilos.css'",
      "css src='estilos.css'",
      "style href='estilos.css'"
    ],
    correcta: 0
  },
  {
    pregunta: "¿Cómo se enlaza un archivo JavaScript externo en HTML?",
    respuestas: [
      "script src='script.js'></script",
      "js src='script.js'",
      "javascript href='script.js'"
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué es el DOM?",
    respuestas: [
      "Un modelo de objetos para documentos HTML.",
      "Un tipo de variable en JavaScript.",
      "Una hoja de estilos."
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué selector CSS selecciona todos los elementos de tipo párrafo?",
    respuestas: [
      "p {}",
      "#p {}",
      ".p {}"
    ],
    correcta: 0
  },
  {
    pregunta: "¿Cómo se comenta una línea en JavaScript?",
    respuestas: [
      "// Esto es un comentario",
      "!-- Esto es un comentario --",
      "/* Esto es un comentario */"
    ],
    correcta: 0
  },
  {
    pregunta: "¿Cómo se hacen arrowFunctions?",
    respuestas: [
      "=>",
      "->",
      ">-"
    ],
    correcta: 0
  },
  {
    pregunta: "¿Cómo se le puede llamar a un evento?",
    respuestas: [
      "e",
      "event",
      "Las dos"
    ],
    correcta: 2
  },
  {
    pregunta: "¿Cómo accedo a un objeto de mi array?",
    respuestas: [
      "array[index]",
      "event",
      "Las dos"
    ],
    correcta: 0
  },
  {
    pregunta: "¿Qué método se utiliza para agregar un elemento al final de un array en JavaScript?",
    respuestas: [
      "array.pop()",
      "array.push()",
      "array.unshift()"

    ],
    correcta: 1
  }
]

const posiciones = [
  { x: 734, y: 538, function: "Normal" },
  { x: 733, y: 468, function: "salta21" },
  { x: 730, y: 397, function: "Normal" },
  { x: 751, y: 343, function: "Normal" },
  { x: 756, y: 272, function: "pierdeTurno" },
  { x: 769, y: 209, function: "Normal" },
  { x: 841, y: 199, function: "avanzaEstrella" },
  { x: 916, y: 209, function: "Normal" },
  { x: 980, y: 205, function: "Normal" },
  { x: 1039, y: 207, function: "Normal" },
  { x: 1096, y: 208, function: "Normal" },
  { x: 1182, y: 200, function: "volverPrincipio" },
  { x: 1195, y: 280, function: "Normal" },
  { x: 1192, y: 336, function: "salta29" },
  { x: 1212, y: 431, function: "Normal" },
  { x: 1215, y: 528, function: "Normal" },
  { x: 1125, y: 527, function: "Normal" },
  { x: 1043, y: 508, function: "pierdeTurno" },
  { x: 936, y: 525, function: "Normal" },
  { x: 854, y: 525, function: "Normal" },
  { x: 824, y: 459, function: "Normal" },
  { x: 828, y: 365, function: "avanzar24" },
  { x: 836, y: 296, function: "Normal" },
  { x: 901, y: 278, function: "Normal" },
  { x: 967, y: 271, function: "retrocede9" },
  { x: 1039, y: 277, function: "Normal" },
  { x: 1116, y: 278, function: "Normal" },
  { x: 1121, y: 326, function: "Normal" },
  { x: 1122, y: 375, function: "Normal" },
  { x: 1117, y: 420, function: "retrocede27" },
  { x: 1040, y: 420, function: "tirarOtraVez" },
  { x: 973, y: 439, function: "Normal" },
  { x: 906, y: 416, function: "retrocede20" },
  { x: 904, y: 356, function: "Normal" },
  { x: 970, y: 358, function: "Normal" },
  { x: 1040, y: 359, function: "finalJuego" },
];

// if (posiciones.funcion === "salta21") {
//   posicionJugador1 = 21;
// }


document.addEventListener("click", function (event) {
  console.log("X: " + event.clientX + " Y: " + event.clientY);
})


const Jugador1 = [
  { x: 745, y: 595 },
];

const Jugador2 = [
  { x: 775, y: 595 },
]

// Actualiza texto inicial
actualizarPosiciones();
//declaro las funciones de mover ficha, uno para cada jugador
moverFicha(1, 0);
moverFicha(2, 0);


botonTirarDado.addEventListener("click", tirarDado);

function tirarDado() {
  // Generar número aleatorio entre 1 y 6
  const dado = Math.floor(Math.random() * 6) + 1;

  // Definir dinámicamente el jugador actual y su posición
  let jugadorActual, posicionActual;

  if (turnoJugador) {
    jugadorActual = 1;
    posicionJugador1 += dado;

    if (posicionJugador1 > 36) {
      posicionJugador1 = 36;
    }

    posicionActual = posicionJugador1; // ✅ siempre se actualiza

  } else {
    jugadorActual = 2;
    posicionJugador2 += dado;

    if (posicionJugador2 > 36) {
      posicionJugador2 = 36;
    }

    posicionActual = posicionJugador2; // ✅ siempre se actualiza
  }


  // Mover la ficha del jugador actual
  moverFicha(jugadorActual, posicionActual);

  // Mostrar posiciones actualizadas
  actualizarPosiciones();

  // Mostrar resultado del dado
  divResultadoDado.textContent = `Jugador ${jugadorActual} sacó un ${dado}`;

  // Verificar ganador
  if (posicionActual === 36) {
    divResultadoDado.textContent = `🎉 ¡Jugador ${jugadorActual} ha ganado!`;
    botonTirarDado.disabled = true;
  }

  // Cambiar turno
  turnoJugador = !turnoJugador;
}


function actualizarPosiciones() {

  divPosicionJugador1.innerHTML = `<h2 id="dadoJugador1">${posicionJugador1}</h2>`;
  divPosicionJugador2.innerHTML = `<h2 id="dadoJugador2">${posicionJugador2}</h2>`;

}

function moverFicha(jugador, posicion) {
  const ficha = document.querySelector(`#fichaJugador${jugador}`);

  let casilla;

  // Si está en la casilla 0 (inicio)
  if (posicion === 0) {
    casilla = jugador === 1 ? Jugador1[0] : Jugador2[0];
  } else {
    casilla = posiciones[posicion - 1]; // el array empieza en 0
  }

  // Mover la ficha a las coordenadas indicadas
  ficha.style.left = `${casilla.x}px`;
  ficha.style.top = `${casilla.y}px`;

  // Verificar si la casilla tiene una función especial, empezamos por la segunda
  //si casilla es la segunda (salta21) haz: 


  //le hago un setTimeout para decirle que a todas estas funciones pues que la animacion tenga una duración de 1000ms, asi no apareceria la ficha directamente en la casilla que sea
  setTimeout(() => {

    if (casilla.function === "Normal") {


      //para la pregunta accedo a mi array, con posicion, que es el numero random, selecciono la pregunta actual, si toca 5, sera la pregunta 5,  y con .pregunta accedo al texto de la pregunta correspondiente, y para respuestas lo mismo pero accedo a la respuesta 1, 2 y 3

      //cojo num random
      let numRandom = Math.floor(Math.random() * preguntas.length);

      
      mostrarPreguntas.innerHTML = `
        <div class="preguntaActual">
          <h2>${preguntas[numRandom].pregunta}</h2>
          <h3>Respuestas:</h3>
          <div class="divRespuestas">
              <button data-resp="0" class="botonesRespuesta">${preguntas[numRandom].respuestas[0]}</button>
              <button data-resp="1" class="botonesRespuesta">${preguntas[numRandom].respuestas[1]}</button>
              <button data-resp="2" class="botonesRespuesta">${preguntas[numRandom].respuestas[2]}</button>
          </div>
        </div>
        `;


      let botones = document.querySelectorAll(".botonesRespuesta");



      for (let i = 0; i < botones.length; i++) {

        botones[i].addEventListener("click", function (event) {

          //convierto el resultado del event, que es string, en integer para que pueda utilizarlo para saber si la respuesta es la correcta o no, ya que utilizo numeros en data resp de los botones
          const respuestaSeleccionada = parseInt(event.target.dataset.resp);
          const correcta = preguntas[numRandom].correcta;

          if (jugador === 1) {

            if (respuestaSeleccionada === correcta) {

              posicionJugador1 = posicionJugador1 + 1;

              if (posicionJugador1 > 36) {

                posicionJugador1 = 36;

              }

            } else {

              posicionJugador1 = posicionJugador1 - 1;

              if (posicionJugador1 < 0) {

                posicionJugador1 = 0;

              }
            }

            }else {

            if (respuestaSeleccionada === correcta) {

              posicionJugador2 = posicionJugador2 + 1;

              if (posicionJugador2 > 36){

                posicionJugador2 = 36;

              }
            } else {
              posicionJugador2 = posicionJugador2 - 1;

              if (posicionJugador2 < 0){
                posicionJugador2 = 0;
              }
            }
          }
          //limpiamos el div de las preguntas para cuando salga la siguiente
          mostrarPreguntas.innerHTML = "";
          actualizarPosiciones();

          // mover ficha del jugador actual a su nueva posición
          //este ternario dice que si jugador === 1, entonces posicionJugador1 true si no posicionJugador2 true, y esto lo metemos en moverFicha de jugador que puede ser 1 o 2, y la posicion pues le damos la posicionJugador 1 o 2 dependiendo de cual de los 2 sea true
          const nuevaPos = jugador === 1 ? posicionJugador1 : posicionJugador2;
          moverFicha(jugador, nuevaPos);

        });
      }


    } else if (casilla.function === "salta21") {

      // Saltar directamente a la posición 21

      const nuevaCasilla = posiciones[20]; // la 21 es 20
      ficha.style.left = `${nuevaCasilla.x}px`;
      ficha.style.top = `${nuevaCasilla.y}px`;

      // Actualizar también la posición del jugador
      if (jugador === 1) {

        posicionJugador1 = 21;

      } else {

        posicionJugador2 = 21;

      }

    } else if (casilla.function === "pierdeTurno") {

      // Tira dos veces
      turnoJugador = !turnoJugador;


    } else if (casilla.function === "avanzaEstrella") {

      nuevaCasilla = posiciones[10]; // la 11 es 10
      ficha.style.left = `${nuevaCasilla.x}px`;
      ficha.style.top = `${nuevaCasilla.y}px`;

      // Actualizar también la posición del jugador
      if (jugador === 1) {

        posicionJugador1 = 11;

      } else {

        posicionJugador2 = 11;

      }


    } else if (casilla.function === "volverPrincipio") {

      nuevaCasilla = posiciones[0]; // la 1 es 0
      ficha.style.left = `${nuevaCasilla.x}px`;
      ficha.style.top = `${nuevaCasilla.y}px`;

      // Actualizar también la posición del jugador
      if (jugador === 1) {

        posicionJugador1 = 1;

      } else {

        posicionJugador2 = 1;

      }

    } else if (casilla.function === "salta29") {

      nuevaCasilla = posiciones[28]; // la 29 es 28
      ficha.style.left = `${nuevaCasilla.x}px`;
      ficha.style.top = `${nuevaCasilla.y}px`;

      // Actualizar también la posición del jugador
      if (jugador === 1) {

        posicionJugador1 = 29;

      } else {

        posicionJugador2 = 29;

      }


    } else if (casilla.function === "avanzar24") {

      nuevaCasilla = posiciones[23]; // la 24 es 23
      ficha.style.left = `${nuevaCasilla.x}px`;
      ficha.style.top = `${nuevaCasilla.y}px`;

      // Actualizar también la posición del jugador
      if (jugador === 1) {

        posicionJugador1 = 24;

      } else {

        posicionJugador2 = 24;

      }


    } else if (casilla.function === "retrocede9") {

      nuevaCasilla = posiciones[8]; // la 9 es 8
      ficha.style.left = `${nuevaCasilla.x}px`;
      ficha.style.top = `${nuevaCasilla.y}px`;

      // Actualizar también la posición del jugador
      if (jugador === 1) {

        posicionJugador1 = 9;

      } else {

        posicionJugador2 = 9;

      }


    } else if (casilla.function === "retrocede27") {

      nuevaCasilla = posiciones[26]; // la 27 es 26
      ficha.style.left = `${nuevaCasilla.x}px`;
      ficha.style.top = `${nuevaCasilla.y}px`;

      // Actualizar también la posición del jugador
      if (jugador === 1) {

        posicionJugador1 = 27;

      } else {

        posicionJugador2 = 27;

      }


    } else if (casilla.function === "tirarOtraVez") {

      // Tira dos veces
      turnoJugador = !turnoJugador;

    } else if (casilla.function === "retrocede20") {

      nuevaCasilla = posiciones[19]; // la 20 es 19
      ficha.style.left = `${nuevaCasilla.x}px`;
      ficha.style.top = `${nuevaCasilla.y}px`;

      // Actualizar también la posición del jugador
      if (jugador === 1) {

        posicionJugador1 = 20;

      } else {

        posicionJugador2 = 20;

      }


    }






  }, 1000);
}
