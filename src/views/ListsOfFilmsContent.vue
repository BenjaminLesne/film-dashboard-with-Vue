<script setup>
import { onMounted, ref } from "vue";

import { useMoviesStore } from "../stores/movies";
import { mapActions } from "pinia";

import MyCard from "../components/MyCard.vue";
import setClickedFilterAsActive from "../utils/functions/setClickedFilterAsActive";
import fetchDataBasedOnGivenFilterId from "../utils/functions/fetchDataBasedOnGivenFilterId";

const moviesStore = useMoviesStore();
const { addToMovies } = moviesStore;

const moviesToDisplay = ref(moviesStore.popular);

const filters = [
  { FR: "Populaire", id: "" },
  { FR: "Favoris", id: "favorite" },
  { FR: "Action", id: 28 },
  { FR: "Animation", id: 16 },
  { FR: "Aventure", id: 12 },
  { FR: "Comédie", id: 35 },
  { FR: "Documentaire", id: 99 },
];

function handleDisplayedMovies() {
  //check which filter is active
  const activeFilterId = document.querySelector(".active").dataset.filterId;

  if (activeFilterId === "favorite") {
    moviesToDisplay.value = moviesStore.favorite.movies;
  } else {
    fetchDataBasedOnGivenFilterId(activeFilterId)
      .then((returnedObject) => {
        const { whereToAddTheData } = returnedObject;
        const moviesFetched = returnedObject.data;

        addToMovies(moviesFetched, whereToAddTheData);

        return whereToAddTheData;
      })
      .then(
        //add to moviesToDisplay ref the movies we added to the pinia state
        (whereTheDataGotStored) =>
          (moviesToDisplay.value = moviesStore[whereTheDataGotStored])
      );
  }
}

onMounted(() => {
  //show as active the default filter which is the first one, here popular
  const firstFilter = document.querySelector(".Films-showcase__filter");
  firstFilter.classList.add("active");

  //check if movies are being displayed
  if (moviesToDisplay.value.length === 0) {
    handleDisplayedMovies();
  }
});

function handleFilterClick(e) {
  setClickedFilterAsActive(e.target).then(() => {
    //remove all movies from dom
    moviesToDisplay.value = [];

    handleDisplayedMovies();
  });
}
</script>

<template>
  <main class="ListsOfFilmsContent">
    <section class="ListsOfFilms__section">
      <h2 class="ListsOfFilms__heading section-heading">Listes de films</h2>
      <div class="Films-showcase">
        <ul class="Films-showcase__filters-wrapper">
          <li
            class="Films-showcase__filter"
            v-for="filter in filters"
            :key="filter + filters.indexOf(filter)"
            @click="handleFilterClick"
            :data-filter-id="filter.id"
          >
            {{ filter.FR }}
          </li>
        </ul>
        <ul class="Films-showcase__films">
          <li class="Films-showcase__no-film" v-if="moviesToDisplay.length < 1">
            Oh, il n'y a pas de film :(
          </li>
          <li
            class="Films-showcase__film"
            v-for="movie in moviesToDisplay"
            :key="movie.id"
          >
            <MyCard
              :movie="movie"
              :favorite="moviesStore.favorite.moviesId.includes(movie.id)"
            />
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<style scoped>
.ListsOfFilmsContent {
  padding-top: var(--header-height);
}

.Films-showcase__filters-wrapper {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 10px;
  flex-wrap: wrap;
}

.Films-showcase__filter {
  padding: 5px 10px;
  cursor: pointer;
  transition: 0.25s;
  border-radius: 10px;
  text-align: center;
  text-transform: capitalize;
}

.Films-showcase__filter:hover {
  background-color: var(--primary-color);
  transition: 0.25s;
}

.Films-showcase__filter.active {
  background-color: var(--primary-color);
  font-weight: bold;
}

.Films-showcase__films {
  display: flex;
  justify-content: center;
  gap: var(--movies-gap);
  width: 100%;
  margin: 0px;
  flex-wrap: wrap;
}
</style>
