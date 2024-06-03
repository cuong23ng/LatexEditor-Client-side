<template>
  <button>New Project</button>
  <div class="document-cards container">
    <div class="cap">
      <div style="flex: 5; margin-left: 17px;">Title</div>
      <div style="flex: 4">Owner</div>
      <div style="flex: 3; margin-right: 2px;">Last Modified</div>
    </div>
    <DocumentCards :project="project" v-for="(project, index) in projects" :key="index" />
  </div>
</template>

<script setup>
import DocumentCards from '@/components/DocumentCard.vue';
import { computed } from 'vue'
import { useStore } from 'vuex';

const store = useStore();
const projects = computed(() => {
  return store.state.projects;
});
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
  width: 2000px;
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
  font-size: 14px;
  cursor: pointer;
  border-radius: 20px;
  padding: 12px 24px;
  color: #fff;
  background-color: #303030;
  text-decoration: none;
  margin-right: 220px;

  &:hover {
    background-color: rgba(48, 48, 48, 0.7);
  }
}
</style>