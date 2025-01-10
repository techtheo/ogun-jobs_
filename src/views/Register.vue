<script setup>
import { ref, computed } from "vue";
import axiosInstance from "../../api"; // Adjust the path as needed
import { useRouter } from "vue-router"; // Import Vue Router for navigation
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const toast = useToast();
const isEmployer = ref(true);
const companyName = ref("");
const companyAddress = ref("");
const fullName = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errors = ref({});
const isSubmitting = ref(false);
const router = useRouter(); // Initialize the router

const validateForm = () => {
  errors.value = {};
  let isValid = true;

  if (isEmployer.value) {
    if (!companyName.value) {
      errors.value.companyName = "Company name is required";
      isValid = false;
    }
    if (!companyAddress.value) {
      errors.value.companyAddress = "Company address is required";
      isValid = false;
    }
  }

  if (!fullName.value) {
    errors.value.fullName = "Full name is required";
    isValid = false;
  }

  if (!email.value) {
    errors.value.email = "Email is required";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email.value)) {
    errors.value.email = "Email is invalid";
    isValid = false;
  }

  if (!password.value) {
    errors.value.password = "Password is required";
    isValid = false;
  }

  if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = "Passwords do not match";
    isValid = false;
  }

  return isValid;
};

// Computed property to check if the form is completely filled
const isFormComplete = computed(() => {
  if (isEmployer.value) {
    return (
      companyName.value &&
      companyAddress.value &&
      fullName.value &&
      email.value &&
      password.value &&
      confirmPassword.value
    );
  }
  return (
    fullName.value && email.value && password.value && confirmPassword.value
  );
});

// Computed property to check if passwords match
const passwordsMatch = computed(() => {
  return (
    password.value &&
    confirmPassword.value &&
    password.value === confirmPassword.value
  );
});

const handleSubmit = async () => {
  // Validate form fields
  if (!validateForm()) return;

  // Check if the form is complete
  if (!isFormComplete.value) {
    toast.error("Please complete all required fields.");
    return;
  }

  // Check if passwords match
  if (!passwordsMatch.value) {
    toast.error("Passwords do not match.");
    return;
  }

  isSubmitting.value = true;

  try {
    // Simulate a 2-second API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Perform the registration API call
    const response = await axiosInstance.post("/signup", {
      fullName: fullName.value,
      email: email.value,
      password: password.value,
      companyName: isEmployer.value ? companyName.value : undefined,
      companyAddress: isEmployer.value ? companyAddress.value : undefined,
    });

    // Display success toast notification
    toast.success("Registration successful!");
    isSubmitting.value = false;

    // Redirect to the login page
    router.push("/login");
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    // Display error toast notification
    toast.error("Registration failed. Please try again.");
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="container my-5 form_data">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow">
          <div class="card-header text-center bg-success">
            <h3 class="text-white">Register</h3>
          </div>
          <div class="card-body p-4">
            <div class="d-flex justify-content-center mb-4">
              <button
                class="btn btn-outline-success me-2 toggle-button"
                :class="{ active: isEmployer }"
                @click="isEmployer = true"
              >
                As Employer
              </button>
              <button
                class="btn btn-outline-success toggle-button"
                :class="{ active: !isEmployer }"
                @click="isEmployer = false"
              >
                As Applicant
              </button>
            </div>
            <form @submit.prevent="handleSubmit">
              <div v-if="isEmployer">
                <div class="row">
                  <div class="col-md-6 form-group mb-3">
                    <label for="companyName">Company Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="companyName"
                      v-model="companyName"
                      placeholder="Enter company name"
                    />
                    <div v-if="errors.companyName" class="text-danger mt-2">
                      {{ errors.companyName }}
                    </div>
                  </div>
                  <div class="col-md-6 form-group mb-3">
                    <label for="companyAddress">Company Address</label>
                    <input
                      type="text"
                      class="form-control"
                      id="companyAddress"
                      v-model="companyAddress"
                      placeholder="Enter company address"
                    />
                    <div v-if="errors.companyAddress" class="text-danger mt-2">
                      {{ errors.companyAddress }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 form-group mb-3">
                  <label for="fullName">Full Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="fullName"
                    v-model="fullName"
                    placeholder="Enter full name"
                  />
                  <div v-if="errors.fullName" class="text-danger mt-2">
                    {{ errors.fullName }}
                  </div>
                </div>
                <div class="col-md-6 form-group mb-3">
                  <label for="email">Email Address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="email"
                    placeholder="Enter email"
                  />
                  <div v-if="errors.email" class="text-danger mt-2">
                    {{ errors.email }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 form-group mb-3">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    v-model="password"
                    placeholder="Enter password"
                  />
                  <div v-if="errors.password" class="text-danger mt-2">
                    {{ errors.password }}
                  </div>
                </div>
                <div class="col-md-6 form-group mb-4">
                  <label for="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    placeholder="Confirm password"
                  />
                  <div v-if="errors.confirmPassword" class="text-danger mt-2">
                    {{ errors.confirmPassword }}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                class="btn bg-success w-100"
                :disabled="isSubmitting"
              >
                <span
                  v-if="isSubmitting"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                {{ isSubmitting ? "Registering..." : "Register" }}
              </button>
            </form>
          </div>
          <div class="card-footer text-center bg-light">
            Already have an account?
            <router-link to="/login" class="text-primary">Login</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
