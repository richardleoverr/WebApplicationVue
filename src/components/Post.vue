<template>
  <div class="post">
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
      <img :src="post.postContent.thumbsUp" class="postThumbsup" width="20" height="20" alt="Thumbs up" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: Object
  }
}
</script>

<style scoped>
</style>