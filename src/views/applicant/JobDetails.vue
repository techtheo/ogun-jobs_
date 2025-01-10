<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const job = ref(null);
const applications = ref([]);
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

onMounted(() => {
  loadJob();
  loadApplications();
});

const loadJob = () => {
  const jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
  job.value = jobs.find((j) => j.id === parseInt(route.params.id));
  if (!job.value) {
    router.push("/login");
  }
};

const loadApplications = () => {
  applications.value = JSON.parse(localStorage.getItem("applications") || "[]");
};

const hasApplied = computed(() => {
  if (!loggedInUser) return false;
  return applications.value.some(
    (app) => app.jobId === job.value?.id && app.applicantId === loggedInUser.id
  );
});

const applyForJob = () => {
  if (!loggedInUser) {
    toast.warning("Please log in to apply for this job.");
    return;
  }

  if (!hasApplied.value) {
    const newApplication = {
      id: Date.now(),
      jobId: job.value.id,
      applicantId: loggedInUser.id,
      email: loggedInUser.email,
      appliedAt: new Date().toISOString(),
    };
    applications.value.push(newApplication);
    localStorage.setItem("applications", JSON.stringify(applications.value));
    // Optionally, you can show a success message or redirect the user
  }
};

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
</script>

<template>
  <div v-if="job" class="container p-5 rounded border form_data">
    <h2>{{ job.title }}</h2>
    <p><strong>Company: </strong> {{ job.company }}</p>
    <p>
      <strong>Location: </strong><i class="fas fa-map-marker-alt">&nbsp;</i
      >{{ job.location }}
    </p>
    <p class="card-text">Company: {{ job.company }}</p>

    <div class="d-flex justify-content-between">
      <p class="card-text">
        <strong>Salary: </strong>₦{{ formatNumber(job.salary) }}
      </p>
      <p class="card-text"><strong>Job Type: </strong>{{ job.job_type }}</p>
      <p class="card-text"><strong>Date: </strong>{{ job.date }}</p>
    </div>
    <h3>Job Description</h3>
    <p>{{ job.description }}</p>
    <h3>Requirements</h3>
    <ul>
      <li v-for="(requirement, index) in job.requirements" :key="index">
        {{ requirement }}
      </li>
    </ul>
    <button
      class="btn"
      :class="hasApplied ? 'btn-secondary' : 'btn-outline-success'"
      @click="applyForJob"
      :disabled="hasApplied"
    >
      {{ hasApplied ? "Applied" : "Apply" }}
    </button>
  </div>
  <div v-else>Loading job details...</div>
</template>
