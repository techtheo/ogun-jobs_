<script setup>
import { useRoute } from 'vue-router';
import Footer from "./Footer.vue";
import Navbar from "./Navbar.vue";
import { computed } from 'vue';

const route = useRoute();

// Define a computed property to check if the current route is within a dashboard
const isDashboardRoute = computed(() => {
  return route.path.startsWith('/employer-dashboard') || route.path.startsWith('/applicant-dashboard');
});
</script>


<template>
  <div>
    <!-- Check if the route is not a dashboard route -->
    <Navbar v-if="!isDashboardRoute" />
    <main>
      <slot></slot>
    </main>
    <Footer v-if="!isDashboardRoute" />
  </div>
</template>

