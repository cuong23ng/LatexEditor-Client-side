<template>
  <div class="modal">
    <div class="modal-content">
      <p></p>
      <input type="text" placeholder="Project Name" v-model="projectName">
      <button @click="changeModeModal">Close</button>
      <button @click="createProject">Create</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['']);

const emits = defineEmits(['change-mode', 'create-project']);

const projectName = ref('');

function changeModeModal() {
  emits('change-mode');
}

function createProject() {
  emits('create-project', projectName);
}
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 50px;
  z-index: 101;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);

  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 8px;
    width: 300px;
    padding: 40px 30px;
    background-color: #fff;
    position: relative;

    p {
      text-align: center;
    }

    button {
      align-self: center;
    }
  }
}
</style>