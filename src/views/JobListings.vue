<script setup>
import AvailableJobs from "./employer/AvailableJobs.vue";
</script>

<template>
  <div class="find-jobs">
    <main>
      <!-- Hero Area Start-->
      <div class="slider-area">
        <div
          class="single-slider section-overlay slider-height d-flex align-items-center"
        >
          <div class="container">
            <div class="row">
              <div class="col-xl-12">
                <div class="hero-cap text-center">
                  <h2>Get your job</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AvailableJobs />

      <!-- Job List Area End -->
      <!--Pagination Start  -->
      <div class="pagination-area pb-115 text-center">
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              <div class="single-wrap d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-start">
                    <li class="page-item active">
                      <a class="page-link" href="#">01</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">02</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">03</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#"
                        ><span class="ti-angle-right"></span
                      ></a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Pagination End  -->
    </main>
  </div>
</template>
