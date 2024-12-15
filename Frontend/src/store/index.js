import { createStore } from 'vuex';

export default createStore({
  state: {
    posts: [],
    loading: false,
    error: null,
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
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
    setError(state, error) {
      state.error = error;
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
    async fetchPosts({ commit }) {
      commit('setLoading', true);
      try {
        const response = await fetch('http://localhost:3000/api/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        commit('setPosts', data);
      } catch (error) {
        commit('setError', error.message);
        console.error('Failed to fetch posts:', error);
      } finally {
        commit('setLoading', false);
      }
    },
  },
  mounted() {
    this.$store.dispatch('fetchPosts');
  },
  
});