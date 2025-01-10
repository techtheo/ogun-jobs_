<script setup>
import { ref, onMounted } from "vue";

const formData = ref({
  name: "",
  email: "",
  phone: "",
  resume: null,
});

const isSubmitting = ref(false);
const showToast = ref(false);

const handleResumeUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    formData.value.resume = file;
  }
};

const submitApplication = () => {
  isSubmitting.value = true;
  // Save form data to local storage
  localStorage.setItem("jobApplication", JSON.stringify(formData.value));

  // Convert file to base64 for storage
  const reader = new FileReader();
  reader.onload = (e) => {
    const resumeData = {
      name: formData.value.resume.name,
      type: formData.value.resume.type,
      content: e.target.result,
    };
    localStorage.setItem("resumeFile", JSON.stringify(resumeData));
  };
  reader.readAsDataURL(formData.value.resume);

  // Simulate a network request with timeout
  setTimeout(() => {
    isSubmitting.value = false;
    showToast.value = true;

    formData.value = {
      name: "",
      email: "",
      phone: "",
      resume: null,
    };
    document.getElementById("resume").value = "";
    // Automatically hide the toast after 3 seconds
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  }, 2000);
};

onMounted(() => {
  // Autofill form data if available in local storage
  const savedApplication = localStorage.getItem("jobApplication");
  if (savedApplication) {
    const parsedData = JSON.parse(savedApplication);
    formData.value = { ...formData.value, ...parsedData };
  }
});
</script>

<template>
  <div class="container job-application-form my-5">
    <h2 class="mb-4">Job Application</h2>
    <form @submit.prevent="submitApplication">
      <div class="row">
        <div class="mb-3 col">
          <label for="name" class="form-label">Full Name:</label>
          <input
            v-model="formData.name"
            type="text"
            id="name"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3 col">
          <label for="email" class="form-label">Email:</label>
          <input
            v-model="formData.email"
            type="email"
            id="email"
            class="form-control"
            required
          />
        </div>
      </div>
      <div class="row">
        <div class="mb-3 col">
          <label for="phone" class="form-label">Phone:</label>
          <input
            v-model="formData.phone"
            type="tel"
            id="phone"
            class="form-control"
            required
          />
        </div>
        <div class="mb-4 col">
          <label for="resume" class="form-label">Resume:</label>
          <input
            @change="handleResumeUpload"
            type="file"
            id="resume"
            accept=".pdf,.doc,.docx"
            class="form-control"
            required
          />
        </div>
      </div>
      <div class="">
        <button
          type="submit"
          class="btn btn-outline-success w-25"
          :disabled="isSubmitting"
        >
          <span
            v-if="isSubmitting"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <span v-if="!isSubmitting">Submit Application</span>
          <span v-if="isSubmitting">Submitting...</span>
        </button>
      </div>
    </form>
    <!-- Toast Notification -->
    <div
      v-if="showToast"
      class="toast-container position-fixed bottom-0 end-0 p-3"
    >
      <div
        class="toast align-items-center text-bg-success border-0 show"
        role="alert"
      >
        <div class="d-flex">
          <div class="toast-body">
            Your application has been submitted successfully!
          </div>
          <button
            type="button"
            class="btn-close me-2 m-auto"
            @click="showToast = false"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>
