<template>
  <header class="header">
    <ul id="nav">
      <li><router-link to="/">Home</router-link></li>
      <li></li>
    </ul>
    <div class="dropdown">
      <button v-if="this.authed" id="signup" @click="logout">Log out</button>
      <a class="logo" href="#"><img src="me.png" width="50" height="50" alt="My picture"></a>
      <div class="dropdown-content">
        <p>John Doe</p>
        <p>john.doe@ut.ee</p>
        <p>Logout</p>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  name: 'Header',
  components:{
  },
  data() {
    return {
      authed: false,
    };
  },
  

  methods: {
    async checkAuthStatus() {
      try {
        const response = await fetch("http://localhost:3000/auth/authenticate", {
                credentials: 'include',
            });
        const data = await response.json();
        this.authed = data.authenticated; // Update auth status based on the response
        console.log(data.authenticated);
      } catch (error) {
        console.error("Error checking authentication status:", error);
        this.authed = false;
      }
    },
    async logout() {
      try {
        const response = await fetch("http://localhost:3000/auth/logout", {
          method: "POST", credentials: 'include'
        });
        if (response.ok) {
          this.authed = false; // Update the UI after logout
          this.$router.push("/login");
        } else {
          console.error("Failed to log out");
          this.authed = false;
        }
      } catch (error) {
        console.error("Error during logout:", error);
        this.authed = false;
      }
    },
  },
  mounted() {
    this.checkAuthStatus(); // Check authentication status when the component mounts
  },
};
</script>

<style>

</style>
<!-- <template>
    <header class="header">
      <ul id="nav">
        <li><router-link to="/">Home</router-link></li>
        <a id = "signin"><router-link to="/about">Sign in</router-link>
          <a class="logo" href="#"><img src="me.png" width="50" height="50" alt="My picture"></a></a>
        </ul>
        
    </header>
  </template>
  
  <script>
  
  export default {
    name: 'Header'
  };
</script>

<style>

</style> -->
  