<template>
  <div class="post" @click="navigateToPost">
    <header class="postHeader">
      <a class="logoPost" href="index.html">
        <img :src="post.profilePicture" width="40" height="40" alt="Profile picture" />
      </a>
      <p class="postDate">{{ post.date }}</p>
    </header>
    <div class="postContent">
      <div v-if="post.postContent.image">
        <img :src="post.postContent.image" class="postPicture" width="40" height="40" alt="Post image" />
      </div>
      <p class="postText">{{ post.postContent.text }}</p>
    </div>
    <div style="display: flex; justify-content: flex-start; flex-direction: row;">
      <img :src="post.postContent.thumbsUp" @click.stop="increaseLike" class="postThumbsup" width="20" height="20" alt="Thumbs up" />
      <p style="font-style: normal; margin-left: 20px;">{{ post.likes }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    increaseLike() {
      this.$store.commit("increaseLike", this.post.id);
    },
    navigateToPost() {
      // Ensure post.id is passed correctly
      this.$router.push({ name: "PostView", params: { id: this.post.id } });
    },
  },
};
</script>

<style scoped>
/* Add your styles here if necessary */
</style>
