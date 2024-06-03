import { createStore } from 'vuex'

export default createStore({
  state: {
    sampleBlogCards: [
      { 
        blogTitle: "Blog Card #1", 
        blogCoverPhoto: "stock-1", 
        blogDate: "May 1, 2024" 
      },
      { 
        blogTitle: "Blog Card #2", 
        blogCoverPhoto: "stock-2", 
        blogDate: "May 1, 2024" 
      },
      { 
        blogTitle: "Blog Card #3", 
        blogCoverPhoto: "stock-3", 
        blogDate: "May 1, 2024" 
      },
      { 
        blogTitle: "Blog Card #4", 
        blogCoverPhoto: "stock-4", 
        blogDate: "May 1, 2024" 
      },
    ],
    sampleDocumentCards: [
      {
        title: "helloworld",
        owner: "cuong nguyen",
        lastModified: "3 hours ago",
      },
      {
        title: "helloearth",
        owner: "bong nguyen",
        lastModified: "2 hours ago",
      },
      {
        title: "hellopeople",
        owner: "hoang nguyen",
        lastModified: "5 hours ago",
      },
      {
        title: "hellosummer",
        owner: "hoang tran",
        lastModified: "6 hours ago",
      },
    ],
    editPost: null,
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileId: null,
    profileInitials: null,
    projects: [],
  },
  getters: {
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
      console.log(state.editPost);
    },
    setProfileInfo(state, payload) {
      state.profileId = payload.UserId;
      state.profileFirstName = payload.FirstName;
      state.profileLastName = payload.LastName;
      state.profileEmail = payload.Email;
      state.profileInitials = state.profileFirstName[0] + state.profileLastName[0];
      state.user = true;
      console.log(state.profileInitials);
    },
    signOutCurrentUser(state) {
      state.profileId = "";
      state.profileFirstName = "";
      state.profileLastName = "";
      state.profileEmail = "";
      state.profileInitials = "";
      state.user = false;
      console.log("sign out");
    },
    setUserProjects(state, projects) {
      state.projects = projects;
    }
  },
  actions: {
    async getCurrentUser({ commit }, user) {
      commit('setProfileInfo', user);
      this.dispatch('getProject');
    },
    async getProject({ commit }) {
      await fetch('http://localhost:5237/api/project/2')
      .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        commit('setUserProjects', data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    }
  },
  modules: {
  }
})
