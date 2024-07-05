<template>
  <CreateProject v-if="modalActive" v-on:change-mode="changeModeModal" v-on:create-project="createProject"/>
  <button @click="changeModeModal">New Project</button>
  <div class="document-cards container">
    <div class="cap">
      <div style="flex: 5; margin-left: 17px;">Title</div>
      <div style="flex: 4">Owner</div>
      <div style="flex: 4; margin-right: 2px;">Last Modified</div>
    </div>
    <DocumentCards :project="project" v-for="(project, index) in projects" :key="index" />
  </div>
</template>

<script setup>
import DocumentCards from '@/components/DocumentCard.vue';
import CreateProject from '@/components/CreateProject.vue';
import { ref, computed } from 'vue'
import { useStore } from 'vuex';

const modalActive = ref(false);
const store = useStore();
const projects = computed(() => {
  return store.state.projects;
});

async function changeModeModal() {
  modalActive.value = !modalActive.value;
}

async function createProject(projectName) {
  if (projectName.value !== '') {
    const newProject = {
      ProjectName: projectName.value,
      UserId: store.state.profileId,
    };

    var url = `http://localhost:5237/api/create-new-project/${store.state.profileId}/${store.state.profileLastName}`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    store.dispatch('getProject');
    changeModeModal();
  } else {
    alert('Project name cannot be empty');
  }
}
</script>

<script>
export default {
  name: "documents",
}
</script>


<style lang="scss" scoped>
.document-cards {
  display: flex;
  flex-direction: column;
  font-family: "Quicksand", sans-serif;
  width: 80%;
  margin-top: 25px;
  margin-bottom: 500px;
}

.cap {
  display: flex;
  flex-direction: row;
  font-size: 20px;
  font-weight: 700;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: rgba(165, 165, 165, 0.2);
  padding-bottom: 8px;
}

button {
  transition: 0.5s ease-in-out all;
  align-self:last baseline;
  font-size: 11px;
  cursor: pointer;
  border-radius: 20px;
  padding: 12px 24px;
  color: #fff;
  background-color: #303030;
  text-decoration: none;
  margin-right: 11%;

  &:hover {
    background-color: rgba(48, 48, 48, 0.7);
  }
}
</style>