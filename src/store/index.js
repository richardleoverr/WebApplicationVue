import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
    increaseLike(state, postId) {
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.likes += 1;
      }
    },
    resetLikes(state) {
      state.posts.forEach((post) => {
        post.likes = 0;

      });
    },
  },
  actions: {
  },
  modules: {
  }
})
