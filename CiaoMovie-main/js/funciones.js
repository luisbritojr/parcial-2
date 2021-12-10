
var numProximo = 1
var totalPelis = 0




// estado offline/online
const alert = document.getElementById('alert')

addEventListener('online', (e) => {
    setAlert(1)
})

addEventListener('offline', (e) => {
    setAlert(0)
})

const setAlert = (status) => {
    alert.classList.remove('alert--online')
    alert.classList.remove('alert--offline')

    status === 0 ?
        setTimeout(() => {
            alert.textContent = 'Ups, parece que estas desconectado de la red'
            alert.classList.add('alert--offline')
        }, 100)
        :
        setTimeout(() => {
            alert.textContent = 'Usted se encuentra en conectado a la red'
            alert.classList.add('alert--online')
        }, 100)
}

function eventoBtn() {
    const searchText = document.getElementById('searchText');

    let url = `https://www.omdbapi.com/?s=${searchText.value}&apikey=9177a8fa&plot=full`;
    cargarDatos(url);
}
function cargarDatos(txto) {
    console.log(txto);
    var detalles = "";
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText)
            data.Search.forEach(movie => {
                //console.log(movie.imdbID)
                detalles +=
                    "<div class=mcol-lg-3 >" +
                    "<div class=modal-content sm>" +
                    "<div class=modal-body><h1>" +
                    movie.Title + "</h1><br>" +
                    "<img class=card-img, src='" + movie.Poster + "'><br>" +
                    "<h3> Lanzamiento: " + movie.Year + "</h3>" +
                    "<h3> Tipo: " + movie.Type + "</h3>" +
                    "<a class=btn btn-primary btn-lg btn purple-gradient data-toggle=modal href='#dat' onclick=\"buscaId('" + movie.imdbID + "')\">Mas Detalles</a>" + "</div>" + "</div>" + "</div>";
            });
            document.getElementById('answer').innerHTML = detalles;
        } else {
            document.getElementById('answer').innerHTML = "<h2> No se a encontrado resultados. </h2>"
        }
    };
    xmlhttp.open("GET", txto, true);
    xmlhttp.send();

}
function buscaId(id) {
    console.log(id);
    let deta = '';
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const peli = JSON.parse(this.responseText)
            //console.log(peli);
            deta = `
            <div class="modal-dialog">
            <div class="bg-success text-white">
                <div class="modal-header">
                    <h4 class=modal-title>Titulo: ${peli.Title}</h4>
                </div>
                <div class="modal-body">
                <p class=text-success>Año de Lanzamiento: ${peli.Year}</p>
                <p class=text-success>Fecha de Estreno: ${peli.Released}</p>
                <p class=text-success>Duracion: ${peli.Runtime}</p>
                <p class=text-success>Genero: ${peli.Genre}</p>
                <p class=text-success>Director: ${peli.Director}</p>
                <p class=text-success>Escrita por: ${peli.Writer}</p>
                <p class=text-success>Actores: ${peli.Actors}</p>
                <p class=text-success>Trama: ${peli.Plot}</p>
                <p class=text-success>Language: ${peli.Language}</p>
                <p class=text-success>País: ${peli.Country}</p>
                <p class=text-success>Premios: ${peli.Awards}</p>
                <p class=text-success>Metascore: ${peli.Metascore}</p>
                <p class=text-success>imdbRating: ${peli.imdbRating}</p>
                <p class=text-success>DVD: ${peli.DVD}</p>
                <p class=text-success>imdbVotos: ${peli.imdbVotes}</p>

                </div>
            </div>
        </div>`;
            //console.log(deta);

            document.getElementById("dat").innerHTML = deta
        }
    };
    xmlhttp.open("GET", "https://www.omdbapi.com/?apikey=9177a8fa&i=" + id, true);
    xmlhttp.send();
}

function pag(pg) {
    var titulo = document.getElementById("searchText").value;
    numProximo = numProximo + (pg);
    console.log(numProximo)


    if (numProximo <= 1) {
        numProximo = 1
        document.getElementById('back').classList.add("disabled");

    } else {
        document.getElementById('back').classList.remove("disabled");
    }

    var totalPel = totalPelis / 10
    console.log(totalPel)

    let html = `
        <div style="display: flex; align-items: center; justify-content: center;" id="numPg">
                <li class="previous">
                    <a class="page-link"> Pagina ${numProximo}/${Math.round(totalPel)} </a>
                </li>
        </div>
    `;
    document.querySelector('#numPg').innerHTML = html

    let url = `https://www.omdbapi.com/?apikey=9177a8fa&s=${titulo}&page=${numProximo}`
    //console.log(url)
    cargarDatos(url)
}

