<script setup>
import MyCard from "../components/MyCard.vue";
import env from "../env";
import getRandomIndexesFromArray from "../utils/functions/getRandomIndexesFromArray";

import { ref } from "vue";
import { useMoviesStore } from "../stores/movies";
import { mapActions } from "pinia";

const moviesStore = useMoviesStore();

const { addToTrending } = moviesStore;

let chosenTrendingMovies = ref([]);

//if we didnt fetch the trending movies from themoviedb yet, we do it.
if (moviesStore.trendingMovies.length === 0) {
  fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${env.apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      addToTrending(data.results);
    })
    .then(() => {
      updateChosenTrendingMovies();
    });
} else {
  updateChosenTrendingMovies();
}

function updateChosenTrendingMovies() {
  const chosenIndexes = getRandomIndexesFromArray(
    4,
    moviesStore.trendingMovies.length
  );

  chosenTrendingMovies.value = chosenIndexes.map(
    (value) => moviesStore.trendingMovies[value]
  );
}
</script>

<template>
  <main class="HomePageContent">
    <section class="trend-section">
      <h2 class="trend-section__heading section-heading">Films du moment</h2>
      <ul class="trend-section__movies-wrapper">
        <li
          class="trend-section__movie"
          v-for="movie in chosenTrendingMovies"
          :key="movie.id"
        >
          <MyCard
            :movie="movie"
            :favorite="moviesStore.favorite.moviesId.includes(movie.id)"
          />
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.HomePageContent {
  width: 100%;
  min-height: 100vh;

  display: flex;
  place-items: center;

  background: url("../assets/homepage-background.jpg") no-repeat center / cover;
  backdrop-filter: opacity(20%);
}
.HomePageContent::before {
  content: "";
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 40%;
}

.trend-section {
  width: 100%;
  padding: 0 var(--movies-gap);
}

.trend-section__movies-wrapper {
  display: flex;
  gap: var(--movies-gap);
  width: 100%;
  min-width: 300px;
  max-width: 1400px;
  margin: auto;
  flex-wrap: wrap;
  justify-content: center;
}
.trend-section__movie {
  min-width: 0;
  max-width: 300px;
  position: relative;
}

.trend-section__movie-img {
  max-height: 100%;
  max-width: 100%;
}
@media screen and (max-width: 1250px) {
  .trend-section {
    padding-top: var(--header-height);
  }
}
@media screen and (max-width: 635px) {
  .HomePageContent {
    background: none;
  }
}
</style>
