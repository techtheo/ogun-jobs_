<script setup>
import { ref, onMounted, computed } from "vue";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const jobs = ref([]);
const showJobForm = ref(false);
const editingJob = ref(null);
const jobForm = ref({
  title: "",
  description: "",
  location: "",
  salary: "",
  job_type: "",
  category: "",
  company: "",
  date: "",
});

onMounted(() => {
  loadJobs();
});

const loadJobs = () => {
  const savedJobs = localStorage.getItem("jobs");
  if (savedJobs) {
    jobs.value = JSON.parse(savedJobs);
  }
};

const saveJob = () => {
  if (editingJob.value) {
    const index = jobs.value.findIndex((job) => job.id === editingJob.value.id);
    if (index !== -1) {
      jobs.value[index] = { ...editingJob.value, ...jobForm.value };
      toast.success("Job updated successfully");
    }
  }
  localStorage.setItem("jobs", JSON.stringify(jobs.value));
  resetForm();
};

const editJob = (job) => {
  editingJob.value = job;
  jobForm.value = { ...job };
  showJobForm.value = true;
};

const deleteJob = (jobId) => {
  if (confirm("Are you sure you want to delete this job?")) {
    jobs.value = jobs.value.filter((job) => job.id !== jobId);
    localStorage.setItem("jobs", JSON.stringify(jobs.value));
    toast.success("Job deleted successfully");
  }
};

const cancelEdit = () => {
  resetForm();
};

const resetForm = () => {
  showJobForm.value = false;
  editingJob.value = null;
  jobForm.value = {
    title: "",
    description: "",
    location: "",
    salary: "",
    job_type: "",
    category: "",
    company: "",
    date: "",
  };
};

const postedJobs = computed(() => {
  return jobs.value.filter((job) => job.employerId === loggedInUser.id);
});

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
</script>

<template>
  <div>
    <h3>Your Posted Jobs</h3>
    <div v-if="showJobForm" class="card mb-3 shadow rounded">
      <div class="card-body">
        <h5 class="card-title">Edit Job</h5>
        <form @submit.prevent="saveJob">
          <div class="mb-3">
            <label for="title" class="form-label">Job Title</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="jobForm.title"
              required
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Job Description</label>
            <textarea
              class="form-control"
              id="description"
              v-model="jobForm.description"
              required
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="location" class="form-label">Job Location</label>
            <select class="form-control" v-model="jobForm.location">
              <option value="Lagos">Lagos</option>
              <option value="Ogun">Ogun</option>
              <option value="Osun">Osun</option>
              <option value="Anywhere">Anywhere</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="salary" class="form-label">Job Salary</label>
            <input
              type="text"
              class="form-control"
              id="salary"
              v-model="jobForm.salary"
              required
            />
          </div>
          <div class="mb-3">
            <label for="job_type" class="form-label">Job Type</label>
            <select class="form-control" v-model="jobForm.job_type">
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Remote">Remote</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="category" class="form-label">Job Category</label>
            <select class="form-control" v-model="jobForm.category">
              <option value="IT">IT</option>
              <option value="Design">Design</option>
              <option value="Management">Management</option>
              <option value="Data">Data</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="company" class="form-label">Company Name</label>
            <input
              type="text"
              class="form-control"
              id="company"
              v-model="jobForm.company"
              required
            />
          </div>
          <div class="mb-3">
            <label for="date" class="form-label">Job Date</label>
            <input
              type="date"
              class="form-control"
              id="date"
              v-model="jobForm.date"
              required
            />
          </div>
          <button type="submit" class="btn btn-outline-success">
            Update Job
          </button>
          <button
            type="button"
            class="btn btn-secondary ms-2"
            @click="cancelEdit"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
    <div v-for="job in postedJobs" :key="job.id" class="single-job-items mb-30">
      <div class="job-items">
        <div class="company-img">
          <a href=""><img src="/assets/img/icon/job-list4.png" alt="" /></a>
        </div>
        <div class="job-tittle">
          <h5 class="card-title">{{ job.title }}</h5>
          <div class="job-description overflow-auto">
            {{ job.description }}
          </div>
          <p class="card-text">
            <i class="fas fa-map-marker-alt"> &nbsp;</i>{{ job.location }}
          </p>
          <p class="card-text">{{ job.company }}</p>
          <div class="d-flex justify-content-between">
            <p class="card-text">₦{{ formatNumber(job.salary) }}</p>
            <p class="card-text">{{ job.job_type }}</p>
            <p class="card-text">{{ job.category }}</p>
            <p class="card-text">{{ job.date }}</p>
          </div>
        </div>
      </div>
      <div class="p-2">
        <button class="btn btn-warning me-2" @click="editJob(job)">Edit</button>
        <button class="btn btn-danger" @click="deleteJob(job.id)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.job-description {
  width: 500px;
  height: 100px;
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
