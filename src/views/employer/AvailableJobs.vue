<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const jobs = ref([]);
const applications = ref([]);
const router = useRouter();
const route = useRoute();
const toast = useToast();

// Filter States
const selectedCategory = ref("");
const selectedTypes = ref([]);
const selectedLocation = ref("");
const searchQuery = ref("");

onMounted(() => {
  loadJobs();
  loadApplications();
});

const loadJobs = () => {
  const savedJobs = localStorage.getItem("jobs");
  if (savedJobs) {
    jobs.value = JSON.parse(savedJobs);
  }
};

const loadApplications = () => {
  const savedApplications = localStorage.getItem("applications");
  if (savedApplications) {
    applications.value = JSON.parse(savedApplications);
  }
};

// Apply filters
const filteredJobs = computed(() => {
  return jobs.value.filter((job) => {
    return (
      (!selectedCategory.value || job.category === selectedCategory.value) &&
      (selectedTypes.value.length === 0 ||
        selectedTypes.value.includes(job.job_type)) &&
      (!selectedLocation.value || job.location === selectedLocation.value) &&
      (!searchQuery.value ||
        job.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.value.toLowerCase()))
    );
  });
});

const applyForJob = (jobId) => {
  if (!loggedInUser) {
    toast.warning("Please log in to apply for this job. Redirecting...");
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  } else if (!hasApplied(jobId)) {
    const newApplication = {
      id: Date.now(),
      jobId: jobId,
      applicantId: loggedInUser.id,
      email: loggedInUser.email,
      appliedAt: new Date().toISOString(),
    };
    applications.value.push(newApplication);
    localStorage.setItem("applications", JSON.stringify(applications.value));
  }
};

const hasApplied = (jobId) => {
  if (!loggedInUser) return false;
  return applications.value.some(
    (app) => app.jobId === jobId && app.applicantId === loggedInUser.id
  );
};

const getJobDetailRoute = (jobId) => {
  return route.path.startsWith("/applicant-dashboard")
    ? `/applicant-dashboard/job/${jobId}`
    : `/job/${jobId}`;
};

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
</script>

<template>
  <div>
    <!-- Job List Area Start -->
    <div class="job-listing-area pt-120 pb-120">
      <div class="container">
        <h2>List of Available Jobs</h2>
        <div class="row">
          <!-- Left content -->
          <div class="col-xl-3 col-lg-3 col-md-4">
            <div class="row">
              <div class="col-12">
                <div class="small-section-tittle2 mb-45">
                  <div class="ion">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      width="20px"
                      height="12px"
                    >
                      <path
                        fill-rule="evenodd"
                        fill="rgb(27, 207, 107)"
                        d="M7.778,12.000 L12.222,12.000 L12.222,10.000 L7.778,10.000 L7.778,12.000 ZM-0.000,-0.000 L-0.000,2.000 L20.000,2.000 L20.000,-0.000 L-0.000,-0.000 ZM3.333,7.000 L16.667,7.000 L16.667,5.000 L3.333,5.000 L3.333,7.000 Z"
                      />
                    </svg>
                  </div>
                  <h4>Filter Jobs</h4>
                </div>
              </div>
            </div>
            <!-- Job Category Listing start -->
            <div class="job-category-listing mb-50">
              <!-- single one -->
              <div class="single-listing">
                <div class="small-section-tittle2">
                  <h4>Job Category</h4>
                </div>
                <!-- Select job items start -->
                <div class="select-job-items2">
                  <select
                    v-model="selectedCategory"
                    class="nice-select form-control mb-2"
                  >
                    <option value="">All Categories</option>
                    <option value="IT">IT</option>
                    <option value="Design">Design</option>
                    <option value="Management">Management</option>
                    <option value="Data">Data</option>
                  </select>
                </div>
                <!--  Select job items End-->
                <!-- select-Categories start -->
                <div class="select-Categories pt-80 pb-50">
                  <div class="small-section-tittle2">
                    <h4>Job Type</h4>
                  </div>
                  <label class="container"
                    >Full Time
                    <input
                      type="checkbox"
                      v-model="selectedTypes"
                      value="Full Time"
                    />
                    <span class="checkmark"></span>
                  </label>
                  <label class="container"
                    >Part Time
                    <input
                      type="checkbox"
                      v-model="selectedTypes"
                      value="Part Time"
                    />
                    <span class="checkmark"></span>
                  </label>
                  <label class="container"
                    >Remote
                    <input
                      type="checkbox"
                      v-model="selectedTypes"
                      value="Remote"
                    />
                    <span class="checkmark"></span>
                  </label>
                  <label class="container"
                    >Freelance
                    <input
                      type="checkbox"
                      v-model="selectedTypes"
                      value="Freelance"
                    />
                    <span class="checkmark"></span>
                  </label>
                </div>
                <!-- select-Categories End -->
              </div>
              <!-- single two -->
              <div class="single-listing">
                <div class="small-section-tittle2">
                  <h4>Job Location</h4>
                </div>
                <!-- Select job items start -->
                <div class="select-job-items2">
                  <select
                    v-model="selectedLocation"
                    class="nice-select form-control mb-2"
                  >
                    <option value="">Anywhere</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Ogun">Ogun</option>
                    <option value="Osun">Osun</option>
                    <option value="Anywhere">Anywhere</option>
                  </select>
                </div>

                <!-- select-Categories End -->
              </div>
            </div>
            <!-- Job Category Listing End -->
          </div>
          <!-- Right content -->
          <div class="col-xl-9 col-lg-9 col-md-8">
            <!-- Featured_job_start -->
            <section class="featured-job-area">
              <div class="container">
                <!-- Count of Job list Start -->
                <div class="row">
                  <div class="col-lg-12">
                    <div class="count-job mb-35">
                      <span>39, 782 Jobs found</span>
                      <!-- Select job items start -->
                      <div class="select-job-items">
                        <span>Sort by</span>
                        <select name="select">
                          <option value="">None</option>
                          <option value="">job list</option>
                          <option value="">job list</option>
                          <option value="">job list</option>
                        </select>
                      </div>
                      <!--  Select job items End-->
                    </div>
                  </div>
                </div>
                <!-- Count of Job list End -->
                <!-- Job List Area Start -->
                <div class="job-listing-area pt-120 pb-120">
                  <div class="containers">
                    <div class="row">
                      <!-- Right content/ available jobs -->
                      <!-- Job Listings -->
                      <div
                        v-for="job in filteredJobs"
                        :key="job.id"
                        class="single-job-items mb-30 shadow rounded"
                      >
                        <router-link :to="getJobDetailRoute(job.id)">
                          <div class="job-items">
                            <div class="company-img">
                              <a href=""
                                ><img
                                  src="/assets/img/icon/job-list4.png"
                                  alt=""
                              /></a>
                            </div>
                            <div class="job-tittle">
                              <h5 class="card-text">{{ job.title }}</h5>
                              <p style="width: 400px" class="">
                                {{ job.description.substring(0, 25) }}...
                              </p>
                              <p class="card-text">
                                <i class="fas fa-map-marker-alt"> &nbsp;</i
                                >{{ job.location }}
                              </p>
                              <p class="card-text">{{ job.company }}</p>
                              <div class="d-flex justify-content-between">
                                <p class="card-text">
                                  ₦{{ formatNumber(job.salary) }}
                                </p>
                                <p class="card-text">{{ job.job_type }}</p>
                                <p class="card-text">{{ job.category }}</p>
                                <p class="card-text">{{ job.date }}</p>
                              </div>
                            </div>
                          </div>
                        </router-link>
                        <div class="">
                          <button
                            class="btn"
                            :class="
                              hasApplied(job.id)
                                ? 'btn-secondary'
                                : 'btn btn-outline-success'
                            "
                            @click="applyForJob(job.id)"
                            :disabled="hasApplied(job.id) && loggedInUser"
                          >
                            {{
                              hasApplied(job.id) && loggedInUser
                                ? "Applied"
                                : "Apply"
                            }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Job List Area End -->
              </div>
            </section>
            <!-- Featured_job_end -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
