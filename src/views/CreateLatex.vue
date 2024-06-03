<template>
  <div class="latex-editor-window">
    <div class="file-info">
      File info
    </div>
    <div class="create-document" :style="{ height: height }">
      <div class="left-column">
        <div class="file"></div>
        <div @click.prevent="showFile(file)" class="file" v-for="(file, index) in files" :key="index">
          <img v-if="file.DataType === 'tex'" class="icon-file" src="../assets/Icons/file.png" >
          <img v-else-if="file.DataType === 'pdf'" class="icon-file" src="../assets/Icons/image-icon.png">
          <img v-else-if="file.DataType === 'bib'" class="icon-file" src="../assets/Icons/bib.png">
          {{ file.FileName }}.{{ file.DataType }}
        </div>
        <div class="setting">
          <div @click.prevent="createNewFile()" title="New File">
            <img class="icon-setting" src="../assets/Icons/file.png" alt="New file">
          </div>
          <div title="New Folder">
            <img class="icon-setting" src="../assets/Icons/folder.png" alt="New folder">
          </div>
          <div title="Import file">
            <img class="icon-setting" src="../assets/Icons/import-file.png" alt="Import">
          </div>
        </div>
      </div>
      <div class="editor">
        <AceEditor v-if="isTexFile" :content="content" :projectid="projectid" :filename="currentFile" />
        <PreviewView class="show-image" v-if="isPdfFile" :address="content"/>
      </div>
      <div class="preview">
        <Loading v-if="loading" />
        <!-- <button class="save-button">Save</button> -->
        <button class="compile-button" @click.prevent="compile">Compile</button>
        <PreviewView :address="address" />
      </div>
    </div>
  </div>
</template>

<script>
import AceEditor from "../components/AceEditor.vue";
import PreviewView from "../components/PreviewView.vue";
import Loading from "../components/LoadingView.vue";

export default {
  name: "CreateLatex",
  data() {
    return {
      height: (window.innerHeight - 40) + 'px',
      address: "",
      content: "",
      files: [],
      isTexFile: false,
      isPdfFile: false,
      currentFile: null,
      projectid: this.$route.query['projectid'],
      loading: null,
    }
  },
  components: {
    AceEditor,
    PreviewView,
    Loading,
  },
  async created() {
    var url = 'http://localhost:5237/api/project/' + this.$store.state.profileId + '/' + this.$route.query['projectid'];
    
    await fetch(url)
      .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.files = data;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.height = (window.innerHeight - 40) + 'px';
    });
    this.height = (window.innerHeight - 40) + 'px';
  },
  unmounted() {
    window.removeEventListener('resize', () => {
      this.height = (window.innerHeight - 40) + 'px';
    });
  },
  methods: {
    async compile() {
      this.loading = true;
      this.address = '';
      var url = 'http://localhost:5237/api/compile/' + this.$store.state.profileId + '/' + this.$route.query['projectid'] + '/' + this.currentFile;
      await fetch(url, {
          method: 'GET',
          headers: {
            
          },
        }).then((res) => {
          this.loading = false;
          if (!res.ok) {
            throw new Error('Network response was not ok');
          } 
          this.address = 'http://localhost:5237/Files/' + this.$store.state.profileId + '/' + this.$route.query['projectid'] + '/' + this.currentFile + '.pdf';
          console.log(this.address);
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    async showFile(file) {
      try {
        var url = 'http://localhost:5237/Files/' + this.$store.state.profileId + '/' + this.$route.query['projectid'] + '/' + file.FileName + '.' + file.DataType;
        const response = await fetch(url, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        } 
        else if (file.DataType === 'tex') {
          this.content = await response.text();
          this.isTexFile = true;
          this.isPdfFile = false;
          this.currentFile = file.FileName;
        }
        else if (file.DataType === 'pdf') {
          this.content = url;
          this.isPdfFile = true;
          this.isTexFile = false;
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    },
    async createNewFile() {

    }
  },
};
</script>

<style lang="scss" scoped>
.latex-editor-window {
  font-family: 'Arial';
}

.file-info {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background-color: bisque;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  z-index: 1000;
}

.create-document {
  display: flex;
  flex-direction: row;
  height: 100%;
  margin-top: 40px;
}

.left-column {
  flex: 15 1 0px;
  overflow: hidden;
  height: 100%;
  background-color: rgb(53, 53, 53);
  position: relative;
}

.file {
  display: flex;
  font-size: 13px;
  height: 32px;
  background-color: rgba(72, 90, 104, 0.6);
  color: rgb(255, 255, 255);
  margin-bottom: 2px;
  align-items: center;
  cursor: pointer;
  padding-left: 7px;
  border-radius: 2px;
  transition: 0.8ms;
}

.icon-file {
  width: 7%;
  margin-right: 6px;
  opacity: 0.4;
}

.file:hover {
  background-color: rgba(15, 99, 167, 1);
}

.setting {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  width: 100%;
  font-size: 13px;
  height: 32px;
  background-color: rgba(21, 26, 29, 0.8);
  color: rgb(255, 255, 255);
  padding-left: 5px;
  border-radius: 2px;
  transition: 0.8ms;
}

.icon-setting {
  width: 22px;
  opacity: 0.8;
  margin-right: 9px;
  cursor: pointer;
}

.icon-setting:hover {
  opacity: 0.9;
}

.editor {
  flex: 50 1 0px;
  overflow: hidden;
  font-family: 'Inconsolata', 'Arial';
  margin-right: 10px;
  border-right: 3px solid rgba(81, 81, 81, 0.3);
  border-left: 3px solid rgba(81, 81, 81, 0.3);
}

.show-image {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 40px
}

.preview {
  flex: 50 1 0px;
  overflow: hidden;
  background-color: lightgrey;
  margin-left: -10px;
  position: relative;
}

.save-button,
.compile-button {
  position: absolute;
  margin-left: 9px;
  margin-top: 12px;
  z-index: 100;
}
</style>