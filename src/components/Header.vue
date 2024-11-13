<template>
    <header class="header">
      <ul id="nav">
        <li><a href="index.html">Home</a></li>
        <li class="lis">|</li>
        <li><a href="addPost.html">Add Post</a></li>
      </ul>
      <div class="dropdown">
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
  