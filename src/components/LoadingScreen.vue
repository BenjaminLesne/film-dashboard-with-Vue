<script>
export default {
  props: {
    isLoading: Boolean,
  },
};
</script>

<template>
  <div v-if="this.isLoading" class="LoadingScreen"></div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Lobster");
.LoadingScreen {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: var(--secondary-color);
  z-index: 99;
}
.LoadingScreen:after {
  content: "";
  width: 50px;
  height: 50px;
  position: absolute;
  top: -30px;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  border: 6px solid #f2f2f2;
  border-top: 6px dotted #f2f2f2;
  border-bottom: 6px dotted #f2f2f2;
  border-radius: 50%;
  animation: LoadingScreen 2s infinite;
}
.LoadingScreen:before {
  font-family: "Lobster", cursive;
  font-size: 20px;
  letter-spacing: 1px;
  color: white;
  content: "Loading...";
  position: absolute;
  top: 57%;
  text-align: center;
  right: 0;
  left: 0;
  margin: auto;
}

@keyframes LoadingScreen {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(360deg);
  }
}
</style>
