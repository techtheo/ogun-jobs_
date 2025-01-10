<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isMenuOpen = ref(false);

const isSubmenuOpen = ref(false);

const closeMenu = () => {
  isMenuOpen.value = false;
  isSubmenuOpen.value = false;
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <router-link
        @click="closeMenu"
        class="navbar-brand"
        aria-current="page"
        to="/"
      >
        <img
          style="width: 130px"
          src="/assets/img/logo/ogun_state_logo.svg"
          alt="Logo"
      /></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav me-5 mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              @click="closeMenu"
              class="nav-link active"
              aria-current="page"
              to="/"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link @click="closeMenu" class="nav-link" to="/about"
              >About</router-link
            >
          </li>
          <li class="nav-item">
            <router-link @click="closeMenu" class="nav-link" to="/job-listings"
              >Find Jobs</router-link
            >
          </li>
          <li class="nav-item">
            <router-link @click="closeMenu" class="nav-link" to="/contact"
              >Contact</router-link
            >
          </li>
        </ul>
        <ul class="d-flex">
          <li>
            <router-link
              @click="closeMenu"
              to="/login"
              class="btn btn-outline-success"
              >Login</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
