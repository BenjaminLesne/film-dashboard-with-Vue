import { defineStore } from "pinia";

export const useMoviesStore = defineStore({
  id: "movies",
  state: () => ({
    trendingMovies: [],
    popular: [],
    favorite: { moviesId: [], movies: [] },
    action: [],
    animation: [],
    adventure: [],
    comedy: [],
    documentary: [],
  }),
  actions: {
    handleFavorite(movieClicked) {
      if (this.favorite.moviesId.includes(movieClicked.id)) {
        //remove movie from state

        const index = this.favorite.movies.indexOf(movieClicked);

        //remove from movies the with slice to avoid array mutations
        this.favorite.movies = [
          ...this.favorite.movies.slice(0, index),
          ...this.favorite.movies.slice(index + 1, this.favorite.movies.length),
        ];

        //idem with moviesId
        this.favorite.moviesId = [
          ...this.favorite.moviesId.slice(0, index),
          ...this.favorite.moviesId.slice(
            index + 1,
            this.favorite.moviesId.length
          ),
        ];
      } else {
        //add the movie to state
        this.favorite.movies = [...this.favorite.movies, movieClicked];
        this.favorite.moviesId = [...this.favorite.moviesId, movieClicked.id];
      }
    },
    async addToTrending(moviesToAdd) {
      try {
        this.trendingMovies = [...this.trendingMovies, ...moviesToAdd];
      } catch (error) {
        console.log(error);
      }
    },
    addToMovies(movieToAdd, category) {
      this[category] = [...this[category], ...movieToAdd];
    },
  },
  getters: {
    getMovies: (state) => state.movies.map((item) => item),
  },
});
