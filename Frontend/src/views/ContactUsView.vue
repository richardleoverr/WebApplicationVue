<template>
    <div class="contact-us">
      <Header />
      <div class="contact-box">
      <h1>Contact Us</h1>
      <p>Feel free to reach out to us at:</p>
      <ul>
        <li><strong>Email:</strong> police@police.ee</li>
        <li><strong>Phone:</strong> 112</li>
        <li><strong>Address:</strong> 123 Police Street</li>
      </ul>
    </div>
      <Footer />
    </div>
</template>
  
  <script>
  import Footer from '@/components/Footer.vue';
  import Header from '@/components/Header.vue';
  export default {
  name: 'ContactUsView',
  components: {
    Footer,
    Header,
  }
  }
  </script>
  
  <style scoped>

  </style>
  