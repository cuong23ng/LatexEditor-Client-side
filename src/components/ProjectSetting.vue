<template>
  <div class="modal">
    <div class="modal-content">
      <div class="flex-auto w-30" style="width:160px">
        <div @click="switchOption" class="option" id="new-file">
          <span>New file</span>
        </div>
        <div @click="switchOption" class="option" id="import">
          <span>Import file</span>
        </div>
      </div>
      <div class="flex-auto w-70" style="margin-left: 15px;">
        <form v-if="isNewfile">
          <p>File Name:</p>
          <input type="text" placeholder="[name.tex] or [name.bib]" v-model="fileinfo">
        </form>
        <form v-if="!isNewfile">
          <p>Select files from your computer</p>
          <input type="file" id="file-input"> 
        </form>
        <div class="buttons">
          <button @click="changeModeModal">Cancel</button>
          <button @click.prevent="createNewFile" v-if="isNewfile">Create</button>
          <button @click.prevent="importFile" v-if="!isNewfile">Import</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileinfo: null,
      isNewfile: null,
    }
  },
  props: ['choseNewFile'],
  mounted() {
    this.isNewfile = this.choseNewFile;
    if (this.isNewfile) {
        document.getElementById('new-file').classList.add('is-clicked');
    }
    else {
      document.getElementById('import').classList.add('is-clicked');
    }
  },
  methods: {
    switchOption() {
      this.isNewfile = !this.isNewfile;
      if (this.isNewfile) {
        document.getElementById('import').classList.remove('is-clicked');
        document.getElementById('new-file').classList.add('is-clicked');
      }
      else {
        document.getElementById('new-file').classList.remove('is-clicked');
        document.getElementById('import').classList.add('is-clicked');
      }
    },
    changeModeModal() {
      this.$emit("change-mode");
    },
    createNewFile() {
      const file = this.fileinfo.split("."); // filename, filetype
      this.$emit("create", file[0], file[1]);
    },
    importFile() {
      const fileInput = document.getElementById('file-input');
      const file = fileInput.files[0];

      this.$emit("import", file);
    }
  },
};
</script>

<style lang="scss" scoped>
.modal {
  font-family: "Quicksand", sans-serif;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 50px;
  z-index: 1001;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);

  .modal-content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-radius: 8px;
    width: 30%;
    height: 200px;
    min-width: 520px;
    padding: 40px 30px;
    background-color: #fff;
    position: relative;

    p {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 5px;
    }

    .buttons {
      position: absolute;
      bottom: 8px;
      right: 8px;
    }

    button {
      font-size: 12px;
      width: 100px;
      margin: 8px;
      padding: 12px;
    }

    input {
      height: 30px;
      width: 270px;
      outline: none;
      font-size: 15px;
      padding-left: 5px;
      border-width: 1px;
      border-radius: 2px;
      border-style: solid;
      border-color: rgb(192, 192, 192);
      box-shadow: inset 1px 2px 5px rgba(0, 0, 0, 0.01);
    }

    .option {
      color: white;
      background-color: rgba(48, 48, 48, 0.7);
      margin-bottom: 5px;
      margin-right: 10px;
      width: 130px;
      padding: 10px 15px;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      cursor: pointer;
    }
    .option:hover {
      background-color: rgba(48, 48, 48, 1);
    }

    .is-clicked {
      background-color: rgba(48, 48, 48, 1);
      pointer-events: none;
    }
  }
}
</style>