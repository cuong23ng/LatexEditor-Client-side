import { createStore } from 'vuex'

export default createStore({
  state: {
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
      state.projects = [];
      console.log("sign out");
    },
    setUserProjects(state, projects) {
      state.projects = projects;
    },
    addProject(state, project) {
      state.projects.push(project);
    }
  },
  actions: {
    async getCurrentUser({ commit }, user) {
      commit('setProfileInfo', user);
      localStorage.setItem('profileId', this.state.profileId);
      this.dispatch('getProject');
    },
    async getProject({ commit }) {
      await fetch(`http://localhost:5237/api/project/${this.state.profileId}`)
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
