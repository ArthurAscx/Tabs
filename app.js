const peliculas = require("./movies.js");

const moviesDH = {
    peliculas: peliculas,

    listMovies: () => peliculas.forEach((elemento) => console.log(elemento)),

    searchMovie: (aBuscar) => {
        let encontrada = peliculas.filter((pelicula) => ((pelicula.id === aBuscar) || (pelicula.title === aBuscar)));
        return encontrada.length ? encontrada[0] : null
    },

    searchMovieByGenre: (genero) => {
        let encontradas = peliculas.filter((pelicula) => (pelicula.genre === genero));
        return encontradas.length ? encontradas : null;
    },

    totalPrice: () => peliculas.reduce((acumulador, elemento) => acumulador + elemento.price, 0),

    changeMovieGenre: function(id, genero) {
        let cambio = this.searchMovie(id);
        //let cambio = moviesDH.searchMovie(id);
        return cambio.genre = genero;
    }

};


moviesDH.changeMovieGenre(3, "accion");
console.log(moviesDH.listMovies());