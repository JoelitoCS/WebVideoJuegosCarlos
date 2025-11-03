    let files = 25;
    let columnes = 25;
    let tablero = [];


    dibuixaUnivers(columnes,files);

    //esta es una funcion que pinta el tablero, crear las filas y las columnas, un doble bucle para generarlo, 
    // el data id que hay es para identificar hasta cuando hay que crear filas y columnas
    function dibuixaUnivers(columnes, files) {

      let html = `<div class="univers">`;

      for (let f = 0; f < columnes; f++) {

        html += `<div class="fila">`;

        for (let c = 0; c < files; c++) {

          html += `<div class="celula"></div>`;
        }

        html += `</div>`;
      }

      html += `</div>`;
      
    }

    //esta funcion genera un numero aleatorio y lo devuelve para utilizarlo más adelante
    function aleatori() {

      // devuelve true o false con 50% de probabilidad, ya que le estamos haciendo multiplicar por 0.5
      return Math.random() < 0.5;

    }

    //sirve para hacer el numero que consigamos en porcentaje
    function aleatoriPercentatge(percentatge) {

      return Math.random() * 100 < percentatge;

    }

    //esto crea una nueva matriz, de columnas y filas y lo que hacemos es ponerle 
    // que matriz contenga el numero aleatorio, y así hacemos que sea 50 50 el que si la celula esta viva o muerta
    // y la devolvemos al final para utilizarla en siguientes funciones

    function crearMatriu(columnes, files) {
      let matriu = [];

      for (let f = 0; f < files; f++) {

        matriu[f] = [];

        for (let c = 0; c < columnes; c++) {

          matriu[f][c] = aleatori();

        }
        
      }
      return matriu;
    }



    //aqui lo que hacemos es dibujar otra vez el universo pero con los estados

    function dibuixaUniversAmbEstat(matriu) {

      let html = `<div class="univers">`;

      for (let f = 0; f < matriu.length; f++) {

        html += `<div class="fila">`;

        for (let c = 0; c < matriu[f].length; c++) {

          let estat = matriu[f][c] ? "viva" : "morta"; //esto dice, estat almacena mi matriz de f y c, si es true pone viva si no morta
          //añadimos el estado, y así se puede determinar si la celula estara viva o muerta
          html += `<div class="celula ${estat}"></div>`;
        }
        html += `</div>`;
      }
      html += `</div>`;
      document.querySelector("#tablero").innerHTML = html;
    }

    //esta funcion, le pasamos matriu que contiene el aleatorio para el 50 50 de viva o muerta
    function comptarVeinsVius(matriu, x, y) {
      let files = matriu.length;
      let columnes = matriu[0].length;
      let veins = 0;

      for (let i = -1; i <= 1; i++) {

        for (let j = -1; j <= 1; j++) {
            
          if (i === 0 && j === 0) continue; // Saltar la mateixa cèl·lula
          let nouX = x + i;
          let nouY = y + j;
          if (nouX >= 0 && nouX < files && nouY >= 0 && nouY < columnes && matriu[nouX][nouY]) {
            veins++;
          }
        }
      }
      return veins;
    }

    function evolucionarCelula(matriu, x, y) {

      const viva = matriu[x][y];
      const veinsVius = comptarVeinsVius(matriu, x, y);

      if (viva && (veinsVius < 2 || veinsVius > 3)) {
        return false; // mor
      } else if (!viva && veinsVius === 3) {
        return true; // neix
      } else {
        return viva; // es manté igual
      }
    }

    function crearMatriuEvolucionada(matriu) {
      let novaMatriu = [];
      for (let f = 0; f < matriu.length; f++) {
        novaMatriu[f] = [];
        for (let c = 0; c < matriu[f].length; c++) {
          novaMatriu[f][c] = evolucionarCelula(matriu, f, c);
        }
      }
      return novaMatriu;
    }

    tablero = crearMatriu(columnes, files);
    dibuixaUniversAmbEstat(tablero);

    setInterval(function() {
      tablero = crearMatriuEvolucionada(tablero);
      dibuixaUniversAmbEstat(tablero);
    }, 350);