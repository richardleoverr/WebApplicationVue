<template>
    <div class="post-view">
      <Header />
      <div v-if="post" class="post-container">
        <Post :post="post" />
        <div class="post-actions">
        <button @click="updatePost">Update</button>
        <button @click="deletePost">Delete</button>
        </div>
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
        updatedBody: "",
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
            console.log("Post data:", this.post);
            this.updatedBody = this.post.postContent.body;
          } else {
            console.error("Failed to fetch post");
          }
        } catch (err) {
          console.error("Error fetching post:", err);
        }
      },
      async updatePost() {
        const updatedBody = prompt("Update Post Body:", this.updatedBody) || this.updatedBody;
        const updatedPost = {
          post_text: updatedBody,
    };
        try {
          const response = await fetch(`http://localhost:3000/api/posts/${this.postId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPost),
          });

          if (response.ok) {
            console.log("Post updated successfully.");
            this.fetchPost(); 
          } else {
            console.error("Failed to update post.");
          }
        } catch (err) {
          console.error("Error updating post:", err);
        }
      },

    // Delete the post
    async deletePost() {
      if (confirm("Are you sure you want to delete this post?")) {
        try {
          const response = await fetch(`http://localhost:3000/api/posts/${this.postId}`, {
            method: "DELETE",
          });

          if (response.ok) {
            const result = await response.json();
            console.log(result.message);
            console.log("Post deleted successfully.");
            this.$router.push("/");
          } else {
            console.error("Failed to delete post.");
          }
        } catch (err) {
          console.error("Error deleting post:", err);
        }
      }
    },
    },
  };
  </script>
  
  <style scoped>
  .post-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  .post-actions {
  margin-top: 20px;
  }

  button {
    margin: 0 10px;
    padding: 10px 20px;
    font-size: 2em;
    cursor: pointer;
    border: none;
    background-color: #2e2e2e;
    color: white;
    border-radius: 5px;
  }

  button:hover {
    background-color: #0056b3;
  }

  .error-message {
    text-align: center;
    color: red;
    margin-top: 20px;
  }
</style>
  