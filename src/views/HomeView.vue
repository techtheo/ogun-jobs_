<script setup>
import { onMounted, ref } from "vue";

const loading = ref(true);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 2000);
});
</script>

<template>
  <!-- Preloader Start -->
  <div id="app">
    <div id="preloader-active" v-if="loading">
      <div class="preloader d-flex align-items-center justify-content-center">
        <div class="preloader-img">
          <img
            style="width: 100%"
            src="/assets/img/logo/Ogun-State-government.jpg"
            alt="Preloader Image"
          />
        </div>
      </div>
    </div>
    <div v-else class="slider-area">
      <div class="slider-active">
        <div class="single-slider slider-height d-flex align-items-center">
          <div class="container">
            <div class="row">
              <div class="col-xl-6 col-lg-9 col-md-10">
                <div class="hero__caption">
                  <h1 class="text-white">
                    Welcome to Ogun State Job Application Portal
                  </h1>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="">
                <div class="d-flex action_buttons">
                  <div class="">
                    <router-link
                      to="/job-listings"
                      class="btn btn-outline-success me-2 text-white"
                      >Find Jobs</router-link
                    >
                  </div>
                  <div>
                    <router-link
                      to="/apply"
                      class="btn btn-outline-success text-white"
                      >Upload Resume</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Blog Area End -->
</template>

<style scoped>
.preloader {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes spin {
  from {
    transform: rotate(0deg) scale(2);
  }
  to {
    transform: rotate(360deg) scale(3);
  }
}

.preloader-img img {
  animation: spin 1s linear infinite;
}
</style>
