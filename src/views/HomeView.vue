<template>
  <div class="home">
    <Header />
    <div class="content">
      <Post v-for="(post, index) in posts" :key="index" :post="post" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import Post from '@/components/Post.vue'; 

export default {
  name: 'HomeView',
  components: {
    Header,
    Post,
    Footer
  },
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    
    fetch('/Data/myjson.json')  
      .then((response) => response.json())
      .then((data) => {
        this.posts = data; 
      });
  }
}
</script>

<style scoped>
</style>
