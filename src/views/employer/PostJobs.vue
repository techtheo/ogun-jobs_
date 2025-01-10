<script setup>
import { ref } from "vue";
import { useToast } from "vue-toast-notification";

const toast = useToast();
const showJobForm = ref(false);
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
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

const saveJob = () => {
  const job = {
    id: Date.now(),
    employerId: loggedInUser.id,
    ...jobForm.value,
  };

  let jobs = JSON.parse(localStorage.getItem("jobs") || "[]");
  jobs.push(job);
  localStorage.setItem("jobs", JSON.stringify(jobs));

  toast.success("New job posted successfully");
  resetForm();
};

const resetForm = () => {
  showJobForm.value = false;
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
</script>

<template>
  <div>
    <button
      class="btn btn-outline-success mb-3"
      @click="showJobForm = !showJobForm"
    >
      {{ showJobForm ? "Close Form" : "Post New Job" }}
    </button>
    <div v-if="showJobForm" class="card mb-3 shadow rounded">
      <div class="card-body">
        <h5 class="card-title">Post New Job</h5>
        <form @submit.prevent="saveJob">
          <!-- Job Title -->
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
          <!-- Job Description -->
          <div class="mb-3">
            <label for="description" class="form-label">Job Description</label>
            <textarea
              class="form-control"
              id="description"
              v-model="jobForm.description"
              required
            ></textarea>
          </div>
          <!-- Job Location -->
          <div class="mb-3">
            <label for="title" class="form-label">Job Location</label>
            <select class="form-control" v-model="jobForm.location">
              <option value="Lagos">Lagos</option>
              <option value="Ogun">Ogun</option>
              <option value="Osun">Osun</option>
              <option value="Osun">Anywhere</option>
            </select>
          </div>
          <!-- Job Salary -->
          <div class="mb-3">
            <label for="title" class="form-label">Job Salary</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="jobForm.salary"
              required
            />
          </div>
          <!-- Job Type -->
          <div>
            <label for="title" class="form-label">Job Type</label>
            <select class="form-control mb-3" v-model="jobForm.job_type">
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Remote">Remote</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
          <!-- Job Category -->
          <div class="mb-3">
            <label for="category" class="form-label">Job Category</label>
            <select class="form-control" v-model="jobForm.category">
              <option value="IT">IT</option>
              <option value="Design">Design</option>
              <option value="Management">Management</option>
              <option value="Data">Data</option>
            </select>
          </div>
          <!-- Company Name -->
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
          <!-- Job Date -->
          <div class="mb-3">
            <label for="title" class="form-label">Job Date</label>
            <input
              type="date"
              class="form-control"
              id="title"
              v-model="jobForm.date"
              required
            />
          </div>
          <button type="submit" class="btn btn-outline-success">
            Post Job
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
