<script setup>
import { ref, onMounted, computed } from "vue";

const applications = ref([]);
const jobs = ref([]);
const selectedJob = ref(null);

onMounted(() => {
  loadApplications();
  loadJobs();
});

const loadApplications = () => {
  const savedApplications = localStorage.getItem("applications");
  if (savedApplications) {
    applications.value = JSON.parse(savedApplications);
  }
};

const loadJobs = () => {
  const savedJobs = localStorage.getItem("jobs");
  if (savedJobs) {
    jobs.value = JSON.parse(savedJobs);
  }
};

const selectedJobApplicants = computed(() => {
  if (!selectedJob.value) return [];
  return applications.value.filter((app) => app.jobId === selectedJob.value.id);
});

const employerJobs = computed(() => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  return jobs.value.filter((job) => job.employerId === loggedInUser.id);
});

const getApplicantCount = (jobId) => {
  return applications.value.filter((app) => app.jobId === jobId).length;
};
</script>

<template>
  <div>
    <h3>Applicants</h3>
    <div class="mb-3">
      <label for="jobSelect" class="form-label">Select a job:</label>
      <select id="jobSelect" class="form-select" v-model="selectedJob">
        <option v-for="job in employerJobs" :key="job.id" :value="job">
          {{ job.title }} ({{ getApplicantCount(job.id) }} applicants)
        </option>
      </select>
    </div>
    <div v-if="selectedJobApplicants.length > 0" class="mt-4">
      <h4>Applicants for {{ selectedJob?.title }}</h4>
      <ul class="list-group">
        <li
          v-for="applicant in selectedJobApplicants"
          :key="applicant.id"
          class="list-group-item"
        >
          {{ applicant.email }} - Applied on
          {{ new Date(applicant.appliedAt).toLocaleDateString() }}
        </li>
      </ul>
    </div>
    <div v-else-if="selectedJob">
      <p>No applicants found for the selected job.</p>
    </div>
    <div v-else>
      <p>Please select a job to view its applicants.</p>
    </div>
  </div>
</template>
