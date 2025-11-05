//import {sumar,restar} from "./funciones/auxiliares.js"
//Sirve para importar las funciones que tengo en otro archivo

//sumar(3,5);

let incidencies = [
  {
    id: 1,
    titol: "Error d'inici de sessió",
    descripcio: "Els usuaris no poden iniciar sessió al sistema",
    estat: "obert",
    prioritat: "alta",
    dataCreacio: "2024-01-15",
    assignat: "Joan García",
  },
  {
    id: 2,
    titol: "Problema amb la impressora",
    descripcio: "La impressora de l'oficina no imprimeix correctament",
    estat: "en_proces",
    prioritat: "mitjana",
    dataCreacio: "2024-01-14",
    assignat: "Maria López",
  },
  {
    id: 3,
    titol: "Actualització de programari",
    descripcio: "Actualitzar el programari de seguretat dels ordinadors",
    estat: "tancat",
    prioritat: "baixa",
    dataCreacio: "2024-01-10",
    assignat: "Pere Martínez",
  },
  {
    id: 4,
    titol: "Actualització de programari",
    descripcio: "El monitor mostra línies estranyes.",
    estat: "obert",
    prioritat: "mitjana",
    dataCreacio: "2024-02-23",
    assignat: "Anna Torres",
  },
  {
    id: 5,
    titol: "Recuperació de fitxers",
    descripcio: "S'han esborrat fitxers importants.",
    estat: "en_proces",
    prioritat: "alta",
    dataCreacio: "2024-03-18",
    assignat: "Carlos Ruiz",
  }
];

let coloresEstado = {
  "obert": "bg-success",       // verde con bootstrap
  "en_proces": "bg-warning",   // amarillo
  "tancat": "bg-secondary"     // gris
};

let coloresPrioritat = {
  "alta": "bg-danger",
  "mitjana": "bg-success",
  "baixa": "bg-primary"
}



renderitzarTaula();
actualitzarEstadistiques();
cambiarFiltro();
netejarFiltres();
obrirModalNova();
afegirNovaIncidencia();

function renderitzarTaula() {

  let noIncidencias = document.querySelector("tbody");

  //Si no hay incidencias, entonces mostrar un mensaje que diga, no hay incidencias

  if (incidencies.length === 0) {

    noIncidencias.innerHTML = "<tr>No data.</tr>"

  } else {

    //limpio incidencias para asegurarme que no salga ningún mensaje si hay incidencias
    noIncidencias.innerHTML = " ";
    let tabla = document.querySelector("tbody");

    for (let i = 0; i < incidencies.length; i++) {

      //Esto sirve para que en las descripciones de mi array incidencias salga puntos suspensivos cuando hay mas de 25 carácteres contando espacios, para eso sirve el slice.

      const textoTruncado = incidencies[i].descripcio.slice(0, 25) + "...";

      //creo una variable tr, donde dentro estará toda la tabla generada dinámicamente

      let tr = `
    
      <tr>
            <td>${incidencies[i].id}</td>
            <td>${incidencies[i].titol}</td>
            <td>${textoTruncado}</td>
            <td><span class="badge ${coloresEstado[incidencies[i].estat]}">${incidencies[i].estat}</span></td>
            <td><span class="badge ${coloresPrioritat[incidencies[i].prioritat]}">${incidencies[i].prioritat}</span></td>
            <td>${incidencies[i].assignat}</td>
            <td>${incidencies[i].dataCreacio}</td>
            <td>
            <button class="btn btn-sm btn-success">Edita</button>
            <button class="btn btn-sm btn-danger">Elimina</button>
            </td>
      </tr>

    `;

      //hago un inner para meter la tabla 
      tabla.innerHTML += tr;

    }

  }


  document.querySelector("tbody").addEventListener("click", function (event) {

    if (event.target.classList.contains("btn-success")) {

      console.log("Has pulsado el botón de editar")

    }

    if (event.target.classList.contains("btn-danger")) {

       // Consigue la fila y el id de la incidencia, COMO dice la propiedad, 
       // coge lo mas cercano al tr, entonces como pulsas en un boton coge, 
       // el tr entero del boton que pulses

        const fila = event.target.closest("tr");
        const idIncidencia = fila.querySelector("td").innerHTML;

        // Compara el id de cada incidencia con el id de la incidencia que quieres eliminar, 
        // si el id no es igual al que quieres borrar, esa incidencia se queda en el nuevo array y asi eliminara la incidencia cuyo id coincida con eldd de idIncidencia
        incidencies = incidencies.filter(inc => inc.id != idIncidencia);

        // Vuelve a renderizar la tabla y actualizar estadísticas
        renderitzarTaula();
        actualitzarEstadistiques();
    }

  });

}


function cambiarFiltro() {

  let filtroPrioridad = document.querySelector("#filtrePrioritat");
  let filtroEstado = document.querySelector("#filtreEstat");
  let tablaBody = document.querySelector("tbody");

  // --- FILTRO POR PRIORIDAD ---
  filtroPrioridad.addEventListener("change", function () {

    console.log("Has cambiado la prioridad");

    let filtroPrioVal = filtroPrioridad.value;
    let filtroEstVal = filtroEstado.value;

    //filtramos nuestra array y le decimos que haga una funcion donde creamos las variabless coincidePrioritat y coincideEstat, cada una dice que si filtroPrioVal o filtroEstVal es igual a lo que esta en mi array incidencies en prioritat, que sera obert, tancat, en proces etc, entonces que me devuelva los valores de esas variables

    //cabe recalcar que también decimos que filtroPrioVal y filtroEstVal esten vacios porque asi cuando no haya ninguna prioridad seleccionada pues que se muestren todas las prioridades en este caso

    let incidenciesFiltrades = incidencies.filter(function (inc) {

      let coincidePrioritat =(filtroPrioVal === "" || inc.prioritat === filtroPrioVal);

      let coincideEstat =(filtroEstVal === "" || inc.estat === filtroEstVal);

      return coincidePrioritat && coincideEstat;
    });

    tablaBody.innerHTML = "";

    // Recorremos con for clásico
    for (let i = 0; i < incidenciesFiltrades.length; i++) {
      let inc = incidenciesFiltrades[i];
      let textoTruncado = inc.descripcio.slice(0, 25) + "...";

      let tr = `
        <tr>
          <td>${inc.id}</td>
          <td>${inc.titol}</td>
          <td>${textoTruncado}</td>
          <td><span class="badge ${coloresEstado[inc.estat]}">${inc.estat}</span></td>
          <td><span class="badge ${coloresPrioritat[inc.prioritat]}">${inc.prioritat}</span></td>
          <td>${inc.assignat}</td>
          <td>${inc.dataCreacio}</td>
          <td>
              <button class="btn btn-sm btn-success">Edita</button>
              <button class="btn btn-sm btn-danger">Elimina</button>
          </td>
        </tr>
      `;
      tablaBody.innerHTML += tr;
    }

    actualitzarEstadistiques();
  });


  // --- FILTRO POR ESTADO ---
  filtroEstado.addEventListener("change", function () {

    console.log("Has cambiado el estado");

    let filtroPrioVal = filtroPrioridad.value;
    let filtroEstVal = filtroEstado.value;

    // Filter con function y lógica AND
    //lo mismo que lo anterior pero esta vez para el otro select de estado
    let incidenciesFiltrades = incidencies.filter(function (inc) {

      let coincidePrioritat = (filtroPrioVal === "" || inc.prioritat === filtroPrioVal);

      let coincideEstat = (filtroEstVal === "" || inc.estat === filtroEstVal);

      return coincidePrioritat && coincideEstat;
    });

    tablaBody.innerHTML = "";

    // Recorremos con for mi array de Filtrades
    for (let i = 0; i < incidenciesFiltrades.length; i++) {
      let inc = incidenciesFiltrades[i];
      let textoTruncado = inc.descripcio.slice(0, 25) + "...";

      let tr = `
        <tr>
          <td>${inc.id}</td>
          <td>${inc.titol}</td>
          <td>${textoTruncado}</td>
          <td><span class="badge ${coloresEstado[inc.estat]}">${inc.estat}</span></td>
          <td><span class="badge ${coloresPrioritat[inc.prioritat]}">${inc.prioritat}</span></td>
          <td>${inc.assignat}</td>
          <td>${inc.dataCreacio}</td>
          <td>
              <button class="btn btn-sm btn-success">Edita</button>
              <button class="btn btn-sm btn-danger">Elimina</button>
          </td>
        </tr>
      `;
      tablaBody.innerHTML += tr;
    }

    actualitzarEstadistiques();
  });

}





function netejarFiltres() {

  const btnLimpiar = document.querySelector(".btn-secondary");

  btnLimpiar.addEventListener("click", function () {
    filtreEstat.value = "";
    filtrePrioritat.value = "";
    renderitzarTaula(); // muestra todas las incidencias
  });

}


function actualitzarEstadistiques() {

  const totalIncidencies = document.querySelector("#divEstadistica1");

  totalIncidencies.textContent = `${incidencies.length}`;

  const incidenciesObertes = document.querySelector("#divEstadistica2");
  const incidenciesObertesNum = incidencies.filter((incidencia) => incidencia.estat == "obert").length;
  incidenciesObertes.textContent = incidenciesObertesNum;

  const incidenciesEnProces = document.querySelector("#divEstadistica3");
  const incidenciesEnProcesNum = incidencies.filter((incidencia) => incidencia.estat == "en_proces").length;
  incidenciesEnProces.textContent = incidenciesEnProcesNum;

  const incidenciesTancades = document.querySelector("#divEstadistica4");
  const incidenciesTancadesNum = incidencies.filter((incidencia) => incidencia.estat == "tancat").length;
  incidenciesTancades.textContent = incidenciesTancadesNum;


}

function obrirModalNova(){
  
  const btnNovaIncidencia = document.querySelector(".btn-primary");
  btnNovaIncidencia.addEventListener("click", function(e){

      const exampleModal = document.getElementById('exampleModal')
      if (exampleModal) {
      exampleModal.addEventListener('show.bs.modal', event => {
      // Button that triggered the modal
      const button = event.relatedTarget
      // Extract info from data-bs-* attributes
      const recipient = button.getAttribute('data-bs-whatever')
      // If necessary, you could initiate an Ajax request here
      // and then do the updating in a callback.

      // Update the modal's content.
      const modalTitle = exampleModal.querySelector('.modal-title')
      const modalBodyInput = exampleModal.querySelector('.modal-body input')

      modalTitle.textContent = `New message to ${recipient}`
      modalBodyInput.value = recipient
  })
  }



  });

}

  function afegirNovaIncidencia(){

    let btnAñadir = document.querySelector("#btnAfegirIncidencia");

    btnAñadir.addEventListener("click", function(){
      
      const nuevoTitulo = document.querySelector("#incidencia-titol").value;
      const nuevaDescripcion = String(document.querySelector("#incidencia-descripcio").value);
      const nuevoEstado = document.querySelector("#incidencia-estat").value;
      const nuevaPrioridad = document.querySelector("#incidencia-prioritat").value;
      const nuevoAsignado = String(document.querySelector("#incidencia-assignat").value);
      const nuevaFecha = document.querySelector("#incidencia-data").value;


      incidencies.push({
        id: incidencies.length + 1,
        titol: nuevoTitulo,
        descripcio: nuevaDescripcion ,
        estat: nuevoEstado,
        prioritat: nuevaPrioridad,
        assignat: nuevoAsignado,
        dataCreacio: nuevaFecha,
        
      })

      renderitzarTaula();

    });
    
    
    

  }
