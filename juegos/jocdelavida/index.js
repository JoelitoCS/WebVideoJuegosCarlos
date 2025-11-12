// Definimos el tamaño del tablero: 25 filas y 25 columnas
let files = 25;         // Número de filas
let columnes = 25;      // Número de columnas
let tablero = [];       // Aquí se guardará la matriz (universo) del juego

// Dibujamos inicialmente el universo vacío (sin estado)
dibuixaUnivers(columnes, files);

/* 
   FUNCIÓN: dibuixaUnivers(columnes, files)
 
   Crea visualmente un tablero vacío en HTML con las dimensiones
   indicadas. Usa un doble bucle para generar filas y celdas.
  */
function dibuixaUnivers(columnes, files) {

  let html = `<div class="univers">`;  // Contenedor principal

  // Bucle para las filas
  for (let f = 0; f < columnes; f++) {
    html += `<div class="fila">`; // Cada fila es un div

    // Bucle para las columnas dentro de la fila
    for (let c = 0; c < files; c++) {
      // Cada célula es un div individual
      html += `<div class="celula"></div>`;
    }

    html += `</div>`; // Cierra la fila
  }

  html += `</div>`; // Cierra el contenedor del universo

  
}


/* 
   FUNCIÓN: aleatori()
  
   Devuelve un valor booleano (true/false) al azar, con una
   probabilidad del 50%. Sirve para decidir si una célula
   empieza viva o muerta.
*/
function aleatori() {
  return Math.random() < 0.5; // true si el número aleatorio < 0.5
}


/* 
   FUNCIÓN: aleatoriPercentatge(percentatge)
  
   Igual que la anterior, pero permite decidir el porcentaje
   de probabilidad (por ejemplo 30% de que sea true).
  */
function aleatoriPercentatge(percentatge) {
  return Math.random() * 100 < percentatge;
}


/* 
   FUNCIÓN: crearMatriu(columnes, files)
  
   Crea una matriz bidimensional (array de arrays) con el
   tamaño indicado, donde cada posición contiene true (viva)
   o false (muerta), según el resultado de la función aleatori().
   */
function crearMatriu(columnes, files) {
  let matriu = [];

  for (let f = 0; f < files; f++) {
    matriu[f] = []; // Crea una nueva fila vacía

    for (let c = 0; c < columnes; c++) {
      matriu[f][c] = aleatori(); // Asigna un estado aleatorio
    }
  }

  return matriu; // Devuelve la matriz creada
}


/* 
   FUNCIÓN: dibuixaUniversAmbEstat(matriu)
  
   Genera el HTML del tablero según el estado actual de cada
   célula (viva o muerta) y lo muestra en el elemento con id "tablero".
*/
function dibuixaUniversAmbEstat(matriu) {

  let html = `<div class="univers">`;

  for (let f = 0; f < matriu.length; f++) {
    html += `<div class="fila">`;

    for (let c = 0; c < matriu[f].length; c++) {

      // Si matriu[f][c] es true, la célula está viva; si no, muerta
      let estat = matriu[f][c] ? "viva" : "morta";

      // Se agrega la clase correspondiente para que el CSS pinte su color
      html += `<div class="celula ${estat}"></div>`;
    }

    html += `</div>`;
  }

  html += `</div>`;

  // Inyecta el tablero en el HTML (dentro del div con id "tablero")
  document.querySelector("#tablero").innerHTML = html;
}


/* 
   FUNCIÓN: comptarVeinsVius(matriu, x, y)
   Cuenta cuántos vecinos vivos tiene una célula en la posición
   (x, y). Revisa las 8 posiciones alrededor, sin salirse de los
   límites de la matriz.
    */
function comptarVeinsVius(matriu, x, y) {
  let files = matriu.length;
  let columnes = matriu[0].length;
  let veins = 0;

  // Recorre el entorno 3x3 alrededor de la célula
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {

      // Ignora la propia célula
      if (i === 0 && j === 0) continue;

      // Calcula las coordenadas vecinas
      let nouX = x + i;
      let nouY = y + j;

      // Comprueba que esté dentro de los límites y si está viva
      if (
        nouX >= 0 && nouX < files &&
        nouY >= 0 && nouY < columnes &&
        matriu[nouX][nouY]
      ) {
        veins++;
      }
    }
  }

  return veins; // Devuelve el número de vecinos vivos
}


/* 
   FUNCIÓN: evolucionarCelula(matriu, x, y)
  
   Aplica las reglas del Juego de la Vida a una célula concreta:
   - Una célula viva con menos de 2 vecinos vivos muere (soledad)
   - Una célula viva con más de 3 vecinos vivos muere (superpoblación)
   - Una célula muerta con exactamente 3 vecinos vivos nace
    */
function evolucionarCelula(matriu, x, y) {

  const viva = matriu[x][y]; // Estado actual
  const veinsVius = comptarVeinsVius(matriu, x, y); // Vecinos vivos

  if (viva && (veinsVius < 2 || veinsVius > 3)) {

    return false; // Muere

  } else if (!viva && veinsVius === 3) {

    return true; // Nace

  } else {

    return viva; // Se mantiene igual
  }
}


/* 
   FUNCIÓN: crearMatriuEvolucionada(matriu)
  
   Crea una nueva matriz aplicando las reglas de evolución a
   todas las células del tablero original.
*/
function crearMatriuEvolucionada(matriu) {
  let novaMatriu = [];

  for (let f = 0; f < matriu.length; f++) {
    novaMatriu[f] = [];

    for (let c = 0; c < matriu[f].length; c++) {
      // Calcula el nuevo estado de cada célula
      novaMatriu[f][c] = evolucionarCelula(matriu, f, c);
    }
  }

  return novaMatriu;
}


/* 
   PROCESO PRINCIPAL DEL JUEGO
   
   1. Se crea la matriz inicial con estados aleatorios
   2. Se dibuja en pantalla
   3. Cada 350ms se calcula una nueva generación y se actualiza
 */

// 1️. Generamos el tablero inicial con celdas vivas/muertas al azar
tablero = crearMatriu(columnes, files);

// 2️. Dibujamos el tablero en pantalla
dibuixaUniversAmbEstat(tablero);

// 3️. Cada 350 milisegundos, el tablero evoluciona y se repinta
setInterval(function() {
  tablero = crearMatriuEvolucionada(tablero);
  dibuixaUniversAmbEstat(tablero);
}, 350);