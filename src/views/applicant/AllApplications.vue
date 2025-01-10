<script setup>
import { ref, onMounted, computed } from "vue";

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const jobs = ref([]);
const applications = ref([]);

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

const appliedJobs = computed(() => {
  const userApplications = applications.value.filter(
    (app) => app.applicantId === loggedInUser.id
  );
  return userApplications.map((app) => {
    const job = jobs.value.find((j) => j.id === app.jobId);
    return {
      ...job,
      appliedAt: app.appliedAt,
    };
  });
});
</script>

<template>
  <div>
    <h3>Your Applied Jobs</h3>
    <div v-if="appliedJobs.length === 0" class="alert alert-info">
      You haven't applied to any jobs yet.
    </div>
    <div v-else>
      <div
        v-for="job in appliedJobs"
        :key="job.id"
        class="single-job-items mb-30 shadow rounded"
      >
        <div class="job-items">
          <div class="company-img">
            <a href="#">
              <img :src="job.imageUrl" alt="" />
            </a>
          </div>
          <div class="job-tittle job-tittle2">
            <a href="#">
              <h4>{{ job.title }}</h4>
            </a>
            <ul>
              <li class="d-flex flex-wrap">{{ job.description }}</li>
              <br />
              <li><i class="fas fa-map-marker-alt"></i>{{ job.location }}</li>
              <li>{{ job.salary }}</li>
              <li>{{ job.job_type }}</li>
              <li>{{ job.date }}</li>
            </ul>
          </div>
        </div>
        <p class="text-muted">
          Applied on: {{ new Date(job.appliedAt).toLocaleDateString() }}
        </p>
      </div>
    </div>
  </div>
</template>
