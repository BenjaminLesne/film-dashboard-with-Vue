<script setup>
import MyHeader from "./components/MyHeader.vue";
import HomePageContent from "@/views/HomePageContent.vue";
import ListsOfFilmsContent from "@/views/ListsOfFilmsContent.vue";
</script>

<template>
  <MyHeader />

  <router-view></router-view>
</template>

<style>
@import "./assets/base.css";
</style>
