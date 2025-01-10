<template>
    <div class="container my-5 form_data">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card shadow-lg">
            <div class="card-header text-center bg-success text-light">
              <h3 class="text-white">Forgot Password</h3>
            </div>
            <div class="card-body p-4">
              <form @submit.prevent="handleSubmit">
                <div class="form-group mb-3">
                  <label for="email">Enter your email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="email"
                    placeholder="Enter email"
                  />
                  <div v-if="errors.email" class="text-danger mt-2">{{ errors.email }}</div>
                </div>
                <button
                  type="submit"
                  class="btn bg-success w-100"
                  :disabled="isSubmitting"
                >
                  {{ isSubmitting ? 'Processing...' : 'Reset Password' }}
                </button>
              </form>
            </div>
            <div class="card-footer text-center bg-light">
              <router-link to="/login" class="text-primary">Back to Login</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'ForgotPassword',
    setup() {
      const email = ref('');
      const errors = ref({});
      const isSubmitting = ref(false);
  
      const validateForm = () => {
        errors.value = {};
        let isValid = true;
  
        if (!email.value) {
          errors.value.email = 'Email is required';
          isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email.value)) {
          errors.value.email = 'Email is invalid';
          isValid = false;
        }
  
        return isValid;
      };
  
      const handleSubmit = () => {
        if (!validateForm()) return;
  
        isSubmitting.value = true;
  
        // Simulate password reset process with a delay
        setTimeout(() => {
          alert('Password reset link has been sent to your email!');
          isSubmitting.value = false;
          // Normally, redirect here, e.g., router.push('/login');
        }, 1000);
      };
  
      return {
        email,
        errors,
        isSubmitting,
        handleSubmit
      };
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
  }
  
  .card {
    border-radius: 20px;
    overflow: hidden;
  }
  
  .card-header {
    border-bottom: none;
    padding: 1.5rem;
  }
  
  .card-body {
    padding: 2rem;
  }
  
  input.form-control {
    border: 1px solid #343a40;
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
  
  .text-light {
    color: #f8f9fa;
  }
  
  .text-dark {
    color: #343a40;
  }
  
  .btn-dark {
    background-color: #343a40;
    border-color: #343a40;
  }
  </style>
  