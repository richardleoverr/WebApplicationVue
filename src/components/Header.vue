<template>
  <header class="header">
    <ul id="nav">
      <li><router-link to="/">Home</router-link></li>
      <li></li>
    </ul>
    <div class="dropdown">
      <a id="signup"><router-link to="/signup">Sign up</router-link></a>
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
  name: 'Header'
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
  