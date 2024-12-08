import { createStore } from 'vuex';

export default createStore({
  state: {
    posts: [],
  },
  getters: {
    allPosts(state) {
      return state.posts;
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    increaseLike(state, postId) {
      const post = state.posts.find((post) => post.id === postId);
      if (post) {
        post.likes += 1;
      } else {
        console.error(`Post with ID ${postId} not found`);
      }
    },
    resetLikes(state) {
      state.posts.forEach((post) => {
        post.likes = 0;
      });
    },
  },
  actions: {
    fetchPosts({ commit }) {
      return fetch('/Data/myjson.json')
        .then((response) => response.json())
        .then((data) => {
          commit('setPosts', data);
        })
        .catch((error) => {
          console.error('Failed to fetch posts:', error);
        });
    },
  },
});
