<script setup>
import { ref } from "vue";
import axiosInstance from "../../api";
import { useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const toast = useToast();
const email = ref("");
const password = ref("");
const errors = ref({});
const isSubmitting = ref(false);
const router = useRouter();

const validateForm = () => {
  if (!email.value || !password.value) {
    toast.error('Please fill in all fields');
    return false;
  }
  return true;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;

  try {
    const response = await axiosInstance.post("/login", {
      email: email.value,
      password: password.value,
    });

    setTimeout(() => {
      const { session, user } = response.data;
      toast.success("Login successful! Redirecting...");

        // Save user data to localStorage
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      // Redirect based on role
      if (user.role === "employer") {
        router.push("/employer-dashboard");
      } else if (user.role === "applicant") {
        router.push("/applicant-dashboard");
      }

      isSubmitting.value = false;
    }, 2000);
  } catch (error) {
    isSubmitting.value = false;
    toast.error(error.response?.data?.message || "An error occurred");
  }
};
</script>

<template>
  <div class="container form_data">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-10">
        <div class="row g-0 shadow-lg">
          <!-- Image Column -->
          <div class="col-md-6 d-none d-md-block">
            <img
              src="@/assets/olumo-rock.jpg"
              alt="Logo"
              class="img-fluid logo"
            />
          </div>
          <!-- Form Column -->
          <div class="col-md-6">
            <div class="card h-100 border-0">
              <div class="card-header text-center bg-success">
                <h3 class="text-white">Login</h3>
              </div>
              <div class="card-body p-4">
                <form @submit.prevent="handleSubmit">
                  <div class="form-group mb-3">
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
                  <div class="form-group mb-3">
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
                  <div
                    class="d-flex justify-content-between align-items-center mb-4"
                  >
                    <router-link to="/forgot-password" class="text-primary"
                      >Forgot Password?</router-link
                    >
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
                    {{ isSubmitting ? "Logging in..." : "Login" }}
                  </button>
                </form>
              </div>
              <div class="card-footer text-center bg-light">
                Don't have an account?
                <router-link to="/register" class="text-primary">
                  Register</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add spinner styles */
.spinner-border {
  width: 1.2rem;
  height: 1.2rem;
  border-width: 0.2em;
}

.container {
  max-width: 900px;
}

.shadow-lg {
  border-radius: 20px;
  overflow: hidden;
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card {
  border-radius: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-header {
  border-bottom: none;
  padding: 1.5rem;
}

.card-body {
  padding: 2rem;
}

input.form-control {
  border: 1px solid #ced4da;
  padding: 0.75rem;
  font-size: 1rem;
}

button {
  font-size: 1.1rem;
}

.card-footer {
  background-color: #f8f9fa;
  padding: 1rem;
}

.card-footer a {
  font-weight: 500;
}

.d-flex .text-muted {
  font-size: 0.9rem;
}


</style>