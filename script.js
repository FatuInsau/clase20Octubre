// elementos del html
let divPersonajes = document.getElementById("personajes");
let botonFiltroSinGenero = document.getElementById('filtroSinGenero');
let botonFiltroTodo = document.getElementById('filtroTodos');
let botonSiguientePagina = document.getElementById("siguiente");
let botonPrimeraPagina = document.getElementById('primeraPagina');
let botonAnteriorPagina = document.getElementById('anterior');
let botonUltimaPagina = document.getElementById('ultimaPagina');

// Variables
let totalPersonajes;
let paginaActual = 1;

// funcion para mostrar los personajes en el html
function mostrarEnElHtml(arrPersonajes) {
    // vaciamos el div o sacamos los personajes que habian antes
    divPersonajes.innerHTML='';
    // y ahora agregamos los nuevos
    arrPersonajes.forEach((itemPersonajes)=>{
        divPersonajes.innerHTML+=`<div class="personaje">
                                    <img src=${itemPersonajes.image}>
                                    <h2>Nombre: ${itemPersonajes.name} </h2>
                                    <p>Genero: ${itemPersonajes.gender} </p>
                                </div>`
    })
}

// pedido de fetch
function pedidoFetch(pagina) {
    fetch("https://rickandmortyapi.com/api/character/?page="+pagina)
    .then((data)=>{
        return data.json();
    }).then((data)=>{
        // es un array de objetos (array de personajes)
        totalPersonajes = data.results;
        mostrarEnElHtml(totalPersonajes); 
    })
}

pedidoFetch(1);


// Funciones para los filtros
function filtroSinGenero () {
    let sinGenero = totalPersonajes.filter((itemPersonajes)=>{
        return itemPersonajes.gender==='Genderless';
    });
    if(sinGenero.length===0){
        divPersonajes.innerHTML='<p>No hay Sin Genero en esta pagina</p>'
    } else {
       mostrarEnElHtml(sinGenero); 
    }
}

function filtroTodo () {
    mostrarEnElHtml(totalPersonajes);
};

// Deshabilitando botones
botonAnteriorPagina.disabled=true;
botonPrimeraPagina.disabled=true;

// FALTA AGREGAR COSAS
function controlBotones () {
    if(paginaActual===42){
        botonSiguientePagina.disabled=true;
        botonUltimaPagina.disabled=true;
    }else if (paginaActual===1){
        // deshabilitar los que sean necesarios
    }else {
        botonAnteriorPagina.disabled=false;
        botonPrimeraPagina.disabled=false;
        // agregar dos botones más
    }
}


// Funciones del Paginado

function siguientePagina () {
    paginaActual++;
    pedidoFetch(paginaActual);
    console.log(paginaActual)
    controlBotones()
}

function anteriorPagina () {
    paginaActual--;
    pedidoFetch(paginaActual);
    console.log(paginaActual)
    controlBotones()
}

function primeraPagina () {
    paginaActual=1;
    pedidoFetch(1);
    console.log(paginaActual)
    controlBotones()
}

// hay 42 paginas
function ultimaPagina() {
    paginaActual=42;
    pedidoFetch(42);
    console.log(paginaActual)
    controlBotones()
}

// Creacion de Eventos
botonFiltroTodo.addEventListener('click',filtroTodo);
botonFiltroSinGenero.addEventListener('click',filtroSinGenero);
botonSiguientePagina.addEventListener('click',siguientePagina);
botonAnteriorPagina.addEventListener('click',anteriorPagina);
botonPrimeraPagina.addEventListener('click',primeraPagina);
botonUltimaPagina.addEventListener('click',ultimaPagina);

