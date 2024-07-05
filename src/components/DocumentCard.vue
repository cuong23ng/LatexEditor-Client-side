<template>
  <div class="document-card">
    <router-link v-if="!rename" :to="{ name: 'create-latex', query: {projectid: project.ProjectId, projectname: project.ProjectName} }" class="title">{{ project.ProjectName }}</router-link>
    <input class="title" v-else :value="project.ProjectName">
    <div class="owner-name">{{ project.UserId }}</div>
    <div class="time-modified">{{ new Date(project.LastModified).toLocaleString("en-us", { dateStyle: "long" }) }}</div>
    <img @click.prevent="renameProject" class="icon-setting" src="../assets/Icons/rename-black.png">
    <img @click.prevent="removeProject" class="icon-setting" src="../assets/Icons/delete-black.png">
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const rename = ref(false);
const props = defineProps(['project']);
const store = useStore();

async function removeProject() {
  store.state.projects = await store.state.projects.filter((project) => {
    return project.ProjectId !== props.project.ProjectId;
  });
  var url = `http://localhost:5237/api/delete-project/${store.state.profileId}/${props.project.ProjectId}`;
  await fetch(url, {
    method: 'DELETE',
  }).then((res) => {
    if (res.ok) {
      
    }
  }).catch((err) => {
    console.log(err);
  })
}

async function renameProject() {
  rename.value = !rename.value;
}
</script>

<style scoped>
.document-card {
  display: flex;
  flex-direction: row;
  font-size: 15px;
  margin-bottom: 4px;
  margin-top: 4px;
  padding: 1px 5px 1px 20px;
  background-color: rgba(224, 224, 224, 0.5);
  height: 45px;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.5s ease all;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.document-card:hover {
  transform: rotateY(-0.2deg) scale(1.0002);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: rgba(233, 233, 233, 0.5);
}

.document-card .title {
  flex: 5;
  text-decoration: none;
  font-weight: 700;
  color: rgb(197, 100, 100)
}
.document-card .owner-name {
  flex: 4;
}
.document-card .time-modified {
  flex: 3;
}

.icon-setting {
  width: 22px;
  opacity: 0.4;
  margin-right: 9px;
  cursor: pointer;
  transition: 0.3s;
}
.icon-setting:hover {
  opacity: 0.9;
}
</style>