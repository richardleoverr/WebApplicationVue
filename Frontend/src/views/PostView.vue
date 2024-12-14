<template>
    <div class="post-view">
      <Header />
      <div v-if="post" class="post-container">
        <Post :post="post" />
      </div>
      <div v-else class="error-message">
        <p>Post not found. Please check the ID and try again.</p>
      </div>
      <Footer />
    </div>
  </template>
  
  <script>
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";
  import Post from "@/components/Post.vue"; 
  
  export default {
    name: "PostView",
    components: { Header, Footer, Post },
    data() {
      return {
        post: null, 
      };
    },
    computed: {
      postId() {
        return this.$route.params.id; 
      },
    },
    mounted() {
      this.fetchPost(); 
    },
    methods: {
      async fetchPost() {
        try {
          const response = await fetch(`http://localhost:3000/api/posts/${this.postId}`);
          if (response.ok) {
            this.post = await response.json();
          } else {
            console.error("Failed to fetch post");
          }
        } catch (err) {
          console.error("Error fetching post:", err);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .post-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  </style>
  