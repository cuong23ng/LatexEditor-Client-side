<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" />
    <div class="blog-card-wrap">
      <div v-if="user" class="container">
        <h3>View More Recent Documents</h3>
        <DocumentCards :project="project" v-for="(project, index) in projects.slice(0, 4)" :key="index"/>
        <router-link class="document-card" style="text-decoration: none; align-self: center; margin-left: 21px; font-size: 22px" :to="{name: 'documents'}">...</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BlogPost from "../components/BlogPost"
import DocumentCards from "../components/DocumentCard.vue"
export default {
  name: 'home',
  components: { 
    BlogPost, 
    DocumentCards, 
  },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome",
        blogPost: "Write like a rocket scientist with HUSTex — the collaborative, online LaTeX editor that anyone can use.",
        welcomeScreen: true,
        photo: "bk2",
      },
      sampleBlogPost: [
        {
          title: "This is a Filler Title!",
          blogHTML: "This is a filler blog post title!",
          blogCoverPhoto: "beautiful-stories",
        },
        {
          title: "This is a Filler Title 2!",
          blogHTML: "This is a filler blog post title!",
          blogCoverPhoto: "designed-for-everyone",
        },
      ],
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    projects() {
      return this.$store.state.projects;
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  font-family: "Quicksand", sans-serif;
}

.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media(min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media(min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media(min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}

.document-cards {
  display: flex;
  flex-direction: column;
}
</style>