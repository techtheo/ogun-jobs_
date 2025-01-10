
<script setup>
import { ref, onMounted } from 'vue';

const applicationData = ref(null);
const resumeFile = ref(null);

onMounted(() => {
  const savedApplication = localStorage.getItem('jobApplication');
  if (savedApplication) {
    applicationData.value = JSON.parse(savedApplication);
  }

  const savedResume = localStorage.getItem('resumeFile');
  if (savedResume) {
    resumeFile.value = JSON.parse(savedResume);
  }
});
</script>


<template>
  <div class="dashboard">
    <h2>Your Job Application</h2>
    <div v-if="applicationData">
      <p><strong>Name:</strong> {{ applicationData.name }}</p>
      <p><strong>Email:</strong> {{ applicationData.email }}</p>
      <p><strong>Phone:</strong> {{ applicationData.phone }}</p>
      <p v-if="resumeFile">
        <strong>Resume:</strong> 
        <a :href="resumeFile.content" :download="resumeFile.name">{{ resumeFile.name }}</a>
      </p>
    </div>
    <div v-else>
      <p>No application submitted yet.</p>
    </div>
  </div>
</template>
