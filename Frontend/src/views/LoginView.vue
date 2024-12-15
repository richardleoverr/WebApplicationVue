<template>
  <div class="signup">
    <Header />
    <div class="signup-form">
      <h2>Login</h2>
      <label for="email">Email</label>
      <input type="email" name="email"  required v-model="email">
      <label for="password">Password</label>
      <input type="password" name="password" required v-model="password" style="margin-bottom: 20px;">
      <button style="margin-right: 10px;" @click="signUp">SignUp</button>
      <button @click="login">Login</button>
      

      <div v-if="passwordError" class="error">
        <p>Error in email or password</p>
        <ul>
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
    };
  },
  methods: {
    signUp() {
      this.$router.push('/signup'); 
      console.log('Navigated to Sign up page');
    },

    login() {
      var data = {
        email: this.email,
        password: this.password
      };
      
      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', 
        body: JSON.stringify({
          email: this.email,
          password: this.password
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.isAuthed) {
          console.log("Heading to Home page")
          this.$router.push("/");
        } else {
          console.error("Login failed");
        }
      })
      .catch((e) => {
        console.error("An error occurred:", e);
      });
    },
  },
};
</script>