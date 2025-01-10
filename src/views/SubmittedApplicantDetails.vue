<script setup>
import { ref, onMounted } from "vue";

const applicationData = ref(null);
const resumeFile = ref(null);

onMounted(() => {
  const savedApplication = localStorage.getItem("jobApplication");
  if (savedApplication) {
    applicationData.value = JSON.parse(savedApplication);
  }

  const savedResume = localStorage.getItem("resumeFile");
  if (savedResume) {
    resumeFile.value = JSON.parse(savedResume);
  }
});
</script>

<template>
 <div class="container my-5 p-5 shadow rounded form_data">
    <h2 class="mb-4">Applicant Details</h2>
    <div v-if="applicationData">
        <p class="mb-2"><strong>Name:</strong> {{ applicationData.name }}</p>
        <p class="mb-2"><strong>Email:</strong> {{ applicationData.email }}</p>
        <p class="mb-2"><strong>Phone:</strong> {{ applicationData.phone }}</p>
        <p v-if="resumeFile" class="mb-2">
            <strong>Resume:</strong>
            <a :href="resumeFile.content" :download="resumeFile.name">{{ resumeFile.name }}</a>
        </p>
    </div>
    <div v-else>
        <p class="text-muted">No Applicant details submitted yet.</p>
        <router-link to="/submitted-applicant-details">Create it here</router-link>
    </div>
</div>

</template>
