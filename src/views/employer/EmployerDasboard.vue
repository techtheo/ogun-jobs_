<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { useDisplay } from "vuetify";
import logo from "../../../assets/img/logo/ogun_state_logo.svg";

const route = useRoute();
const router = useRouter();
const display = useDisplay();

const sidebarMenu = ref(true);
const toggleMini = ref(false);

const user = ref({});

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem("loggedInUser") || "{}");
});

const menuItems = [
  {
    title: "Post Jobs",
    route: "/employer-dashboard/post-jobs",
    icon: "fas fa-plus-circle",
  },
  {
    title: "Posted Jobs",
    route: "/employer-dashboard/posted-jobs",
    icon: "fas fa-list",
  },
  {
    title: "Applicants",
    route: "/employer-dashboard/applicants",
    icon: "fas fa-users",
  },
];

const userLinks = [
  { title: "Edit Profile", to: "/edit-profile" },
  { title: "Check Status", to: "/check-status" },
];

const showLinks = ref(false);

const toggleLinks = () => {
  showLinks.value = !showLinks.value;
};

const mini = computed(() => {
  return display.smAndDown.value || toggleMini.value;
});

const navigate = (path) => {
  router.push(path);
};

const isActive = (path) => {
  return (
    route.path === path ||
    (path === "/employer-dashboard" &&
      route.path === "/employer-dashboard/post-jobs")
  );
};

const logOut = () => {
  localStorage.removeItem("loggedInUser");
  router.push("/").then(() => {
    window.location.reload();
  });
};
</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer v-model="sidebarMenu" :mini-variant="mini">
        <div class="px-2 d-flex justify-center items-center my-5">
          <img :src="logo" alt="" />
        </div>

        <v-list density="compact" nav>
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            @click="navigate(item.route)"
            :class="{ 'v-list-item--active': isActive(item.route) }"
            link
          >
            <template v-slot:prepend>
              <v-icon>{{ item.icon }}</v-icon>
            </template>
            <v-list-item-title class="font-bold">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar class="bg-success" prominent>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="sidebarMenu = !sidebarMenu"
        ></v-app-bar-nav-icon>
        <h4>
          Welcome <span class="text-white">{{ user.name }}</span>
        </h4>

        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>fa-bell</v-icon>
        </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn text v-bind="props" @click="toggleLinks">
              <v-avatar size="32" class="mr-2">
                <v-img :src="`/images/${user.photo}`"></v-img>
              </v-avatar>
              <v-icon icon="fas fa-chevron-down" />
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(link, index) in userLinks"
              :key="index"
              :to="link.to"
            >
              <v-list-item-title>{{ link.title }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logOut">
              <v-list-item-title>Log Out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-main>
        <v-container fluid>
          <RouterView />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
</template>
