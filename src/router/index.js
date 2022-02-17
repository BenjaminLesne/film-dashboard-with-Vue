import { createRouter, createWebHistory } from "vue-router";
import HomePageContent from "../views/HomePageContent.vue";
import ListsOfFilmsContent from "../views/ListsOfFilmsContent.vue";

const routes = [
  { path: "/le-collectionist-test/", component: HomePageContent, name: "home" },
  {
    path: "/le-collectionist-test/liste",
    component: ListsOfFilmsContent,
    name: "list",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
