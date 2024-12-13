<template>
  <div class="signup">
    <Header />
    <div class="signup-form">
      <h2>Signup</h2>
      <form @submit.prevent="validateForm">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>

      <div v-if="passwordError" class="error">
        <p>The password is not valid:</p>
        <ul>
          <li v-for="(error, index) in validationErrors" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "SignUp",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      email: "",
      password: "",
      passwordError: false,
      validationErrors: [],
    };
  },
  methods: {
    validateForm() {
      this.passwordError = false;
      this.validationErrors = [];

      const password = this.password;

      if (password.length < 8 || password.length > 15) {
        this.validationErrors.push("Password should be 8-15 characters long.");
      }
      if (!/^[A-Z]/.test(password)) {
        this.validationErrors.push("Password should start with an uppercase letter.");
      }
      if (!/[A-Z]/.test(password)) {
        this.validationErrors.push("Password should include at least one uppercase letter.");
      }
      if ((password.match(/[a-z]/g) || []).length < 2) {
        this.validationErrors.push("Password should include at least two lowercase letters.");
      }
      if (!/[0-9]/.test(password)) {
        this.validationErrors.push("Password should include at least one numeric value.");
      }
      if (!/_/.test(password)) {
        this.validationErrors.push('Password should include the character "_".');
      }

      if (this.validationErrors.length > 0) {
        this.passwordError = true;
      } else {
        alert("Signup completed successfully!");
      }
    },
  },
};
</script>