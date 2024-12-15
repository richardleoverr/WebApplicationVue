<template>
    <div class="addpost">
      <Header />
      <div class="addpostcontainer">
        <h1>Add a New Post</h1>
          <div class="form-group">
            <label for="postText">Post Content:</label>
            <textarea
              id="postText"
              v-model="postText"
            ></textarea>
          </div>
          <div class="form-group">
            <label for="postImage">Upload Image:</label>
            <input
              id="postImage"
              type="file"
              @change="handleFileUpload"
              accept="image/*"
            />
          </div>
          <button type="submit" @click="submitPost">Submit Post</button>
      </div>
      <Footer />
    </div>
  </template>
  
  
  <script>
  import Footer from '@/components/Footer.vue';
  import Header from '@/components/Header.vue';
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'HomeView',
    components: {
      Header,
      Footer,
    },
    data() {
    return {
      postText: '', 
      postImage: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.postImage = event.target.files[0];
      console.log('Selected image:', this.postImage);
    },
    async submitPost() {
      try {
        if (!this.postText.trim()) {
          alert('Post content cannot be empty.');
          return;
        }

        const formData = new FormData();
        formData.append('text', this.postText);
        if (this.postImage) {
          formData.append('image', this.postImage);
        }
        formData.append('username', 'user');
        formData.append('date', new Date().toISOString())


        const response = await fetch('http://localhost:3000/api/posts', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          alert('Post added successfully!');
          this.postText = '';
          this.postImage = null;
          this.$router.push('/');
        } else {
          console.error('Failed to add post');
        }
      } catch (err) {
        console.error('Error submitting post:', err);
      }
    },
  },
};

  </script>
  
  <style scoped>
  </style>
  