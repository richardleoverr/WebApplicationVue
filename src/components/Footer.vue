<template>
    <footer class="footer">
      <div style="display: flex; flex-direction: row; justify-content: center;">
        <div style="padding-right: 50px;">
          <h3>About us</h3>
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Kristen Eero Variksoo</a><br>
          <a href="https://www.youtube.com/watch?v=ZYmj1Jk8tVQ">Richard Leover</a><br>
          <a href="https://www.youtube.com/watch?v=KuQ__BykcB8">Erik Anmann</a>
        </div>
        <div style="padding-right: 50px;">
          <h3>More about us</h3>
          <a href="https://moodle.ut.ee/mod/assign/view.php?id=1327327">this is a link</a><br>
          <a href="https://www.youtube.com/watch?v=kpnW68Q8ltc">this is also a link</a><br>
          <a href="https://en.meming.world/wiki/Perhaps">perhaps a link</a><br>
          <a>this link doesn't work</a><br>
          <a href="https://www.youtube.com/watch?v=xuCn8ux2gbs">that link omg</a><br>
          <a @click="resetLikes">reset likes</a>
        </div>
        <div style="padding-right: 50px;">
          <h3>Some copyright stuff (copyright symbol)</h3>
          <p>If you choose to copy this <br>we will find you and make<br>sure you copy it right</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',

    methods: {
    resetLikes() {
      this.$store.commit('resetLikes')
    },
  },
  };
  </script>
  
<style scoped></style>