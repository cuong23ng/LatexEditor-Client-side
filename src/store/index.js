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
  },
  getters: {
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
      console.log(state.editPost);
    },
  },
  actions: {
    async getCurrentUser({commit}) {
      
    },
  },
  modules: {
  }
})
