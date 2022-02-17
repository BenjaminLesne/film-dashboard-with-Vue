<script>
import LoadingScreen from "../components/LoadingScreen.vue";

// title: String,
// rating: Number,
// poster: String,
//   id: Number,
export default {
  props: {
    favorite: Boolean,

    movie: Object,
  },
  components: { LoadingScreen },
  data() {
    return {
      isLoading: true,
    };
  },
};
</script>
<script setup>
import { useMoviesStore } from "../stores/movies";
import { mapActions } from "pinia";

const moviesStore = useMoviesStore();
const { handleFavorite } = moviesStore;
</script>

<template>
  <article class="MyCard">
    <LoadingScreen :isLoading="this.isLoading" />
    <div class="MyCard__rating MyCard__flag">{{ this.movie.vote_average }}</div>
    <div
      class="MyCard__favorite MyCard__flag"
      :class="{ active: this.favorite }"
      @click="handleFavorite(this.movie)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"
        />
      </svg>
    </div>
    <figure class="MyCard__main-content">
      <img
        class="MyCard__img"
        :src="'https://image.tmdb.org/t/p/original/' + movie.poster_path"
        :alt="this.movie.title"
        @load="this.isLoading = false"
      />
      <figcaption class="MyCard__title">
        {{ this.movie.title }}
      </figcaption>
    </figure>
  </article>
</template>

<style scoped>
.MyCard {
  position: relative;
  max-width: 400px;
  min-width: 250px;
  height: 100%;
  min-height: 375px;
  width: 100%;
}

.MyCard__flag {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  margin: 5px;
}

.MyCard__rating {
  z-index: 5;

  position: absolute;
  inset: 0;
  background: var(--secondary-color);
  width: var(--flags-width);
  aspect-ratio: 1;
  font-weight: bold;
}
.MyCard__favorite {
  cursor: pointer;
  z-index: 5;
  position: absolute;
  top: 0;
  right: 0;

  width: var(--flags-width);
  aspect-ratio: 1;
  padding: 10px;

  background: var(--secondary-color);
  fill: black;
  opacity: 0.5;
}
.MyCard__favorite.active {
  background: pink;
  fill: var(--primary-color);
  opacity: 1;
}

.MyCard__main-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.MyCard__img {
  height: 100%;
  width: 100%;
}

.MyCard__title {
  background-color: rgba(var(--secondary-rgb-color), 0.9);
  padding: 10px;
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
