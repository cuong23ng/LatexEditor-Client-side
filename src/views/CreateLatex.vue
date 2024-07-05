<template>
  <div class="latex-editor-window">
    <ProjectSetting v-if="modalActive" v-on:change-mode="changeModeModal" v-on:create="createNewFile" v-on:import="importFile" :choseNewFile="isNewfile"/>
    <div class="file-info">
      <div style="flex: 5; align-items: center;">
        <router-link :to="{name: 'documents'}">
          <img class="icon-setting home-icon" src="../assets/Icons/back.png">
        </router-link>
      </div>
      <div style="flex: 5; display: flex; flex-direction: row; align-items: center;">
        <div>{{ this.$route.query['projectname'] }}</div>
        <img class="icon-setting edit-icon" src="../assets/Icons/edit.png">
      </div>
    </div>
    <div class="create-document" :style="{ height: height }">
      <div class="left-column">
        <div class="setting">
          <div style="display: flex; flex-direction: row">
            <div @click.prevent="changeModeModal(true)" title="New File">
              <img class="icon-setting" src="../assets/Icons/file.png" alt="New file">
            </div>
            <div title="New Folder">
              <img class="icon-setting" src="../assets/Icons/folder.png" alt="New folder">
            </div>
            <div @click.prevent="changeModeModal(false)" title="Import file">
              <img class="icon-setting" src="../assets/Icons/import-file.png" alt="Import">
            </div>
          </div>
          <div style="display: flex; flex-direction: row">
            <div @click.prevent="deleteFile" title="Rename">
              <img class="icon-setting" src="../assets/Icons/rename.png" alt="Rename">
            </div>
            <div @click.prevent="deleteFile" title="Delete">
              <img class="icon-setting" src="../assets/Icons/delete.png" alt="Delete">
            </div>
          </div>
        </div>
        <div class="file"></div>
        <div @click.prevent="showFile(file)" class="file" :id="file.FileName" v-for="(file, index) in files" :key="index">
          <img v-if="file.DataType === 'pdf'" class="icon-file" src="../assets/Icons/image-icon.png">
          <img v-else-if="file.DataType === 'bib'" class="icon-file" src="../assets/Icons/bib.png">
          <img v-else class="icon-file" src="../assets/Icons/file.png" >
          {{ file.FileName }}.{{ file.DataType }}
        </div>
      </div>
      <div class="editor">
        <AceEditor v-if="isTexFile" :content="content" :projectid="projectid" :filename="currentFile.FileName"/>
        <PreviewView class="show-image" v-if="isPdfFile" :address="content"/>
      </div>
      <div class="preview">
        <Loading v-if="loading" />
        <!-- <button class="save-button">Save</button> -->
        <div class="option">
          <button class="compile-button" @click.prevent="compile">Compile</button>
          <div>
            <img class="download-button" src="../assets/Icons/download-black.png">
          </div>
        </div>
        <PreviewView :address="address" />
      </div>
    </div>
  </div>
</template>

<script>
import AceEditor from "../components/AceEditor.vue";
import PreviewView from "../components/PreviewView.vue";
import Loading from "../components/LoadingView.vue";
import ProjectSetting from "../components/ProjectSetting.vue";

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
      previousFile: null,
      currentFile: null,
      projectid: this.$route.query['projectid'],
      loading: null,
      modalActive: false,
      isNewfile: null,
    }
  },
  components: {
    AceEditor,
    PreviewView,
    Loading,
    ProjectSetting,
  },
  async created() {
    var url = 'http://localhost:5237/api/files/' + this.$store.state.profileId + '/' + this.$route.query['projectid'];
    
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
      var url = 'http://localhost:5237/api/compile/' + this.$store.state.profileId + '/' + this.$route.query['projectid'] + '/' + this.currentFile.FileName;
      await fetch(url, {
          method: 'GET',
          headers: {
            
          },
        }).then((res) => {
          this.loading = false;
          if (!res.ok) {
            alert("Compile fail!");
          } 
          else {
            this.address = 'http://localhost:5237/Files/' + this.$store.state.profileId + '/' + this.$route.query['projectid'] + '/' + this.currentFile.FileName + '.pdf';
            console.log(this.address);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    async showFile(file) {
      try {
        this.previousFile = this.currentFile;
        if (this.previousFile) {
          document.getElementById(this.previousFile.FileName).classList.remove('highlight-file');
        }
        this.currentFile = file;
        document.getElementById(this.currentFile.FileName).classList.add('highlight-file');

        var url = 'http://localhost:5237/Files/' + this.$store.state.profileId + '/' + this.$route.query['projectid'] + '/' + this.currentFile.FileName + '.' + this.currentFile.DataType;

        const response = await fetch(url, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          if (this.currentFile.DataType === 'pdf') {
            this.content = url;
            this.isPdfFile = true;
            this.isTexFile = false;
          }
          else {
            this.content = await response.text();
            console.log(this.content);
            this.isTexFile = true;
            this.isPdfFile = false;
          }
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    },
    async createNewFile(filename, filetype) {
      this.changeModeModal();
      try {
        var url = `http://localhost:5237/api/create-new-file/${this.$store.state.profileId}/${this.$route.query['projectid']}?filename=${filename}&filetype=${filetype}`;

        console.log(url);
        const response = await fetch(url, {
          method: "POST",
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        else {
          const newfile = {
            FileName: filename,
            ProjectId: this.projectid,
            DataType: filetype
          };
          this.files.push(newfile);
        } 
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }  
    },
    async deleteFile() {
      try {
        var url = `http://localhost:5237/api/delete-file/${this.$store.state.profileId}/${this.$route.query['projectid']}?filename=${this.currentFile.FileName}&filetype=${this.currentFile.DataType}`;

        const response = await fetch(url, {
          method: "DELETE",
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        else {
          document.getElementById(this.currentFile.FileName).classList.remove('highlight-file');
          this.files = this.files.filter((file) => {
            return file !== this.currentFile;
          });
          this.previousFile = null;
          this.currentFile = null;
          this.content = '';
          this.isPdfFile = false;
          this.isTexFile = false;
        }
      }
      catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    },
    async importFile(file) {
      this.changeModeModal();
      var url = `http://localhost:5237/api/import/${this.$store.state.profileId}/${this.$route.query['projectid']}`;

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(url, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }
      else {
        const filename = file.name.split('.');
        const newfile = {
          FileName: filename[0],
          ProjectId: this.projectid,
          DataType: filename[1]
        };
        this.files.push(newfile);
      } 
    },
    changeModeModal(isNewfile) {
      this.modalActive = !this.modalActive;
      this.isNewfile = isNewfile;
    }
  },
};
</script>

<style lang="scss" scoped>
.latex-editor-window {
  font-family: 'Arial';
  position: relative;
}

.file-info {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  color: white;
  background-color: rgba(53, 53, 53, 1);
  border-bottom-width: 1px;
  border-bottom-color: rgba(53, 53, 53, 0.6);
  border-bottom-style: solid;
  z-index: 1000;
}

.file-info .home-icon {
  margin-left: 10px;
  width: 28px;
  opacity: 0.6;
  cursor: pointer;
  transition: 0.1s;
}
.file-info .home-icon:hover {
  opacity: 0.8;
}

.file-info .edit-icon {
  margin-left: 3px;
  width: 16px;
  opacity: 0.2;
  cursor: pointer;
  transition: 0.1s;
}
.file-info .edit-icon:hover {
  opacity: 0.8;
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
  background-color: rgb(51, 51, 51);
  position: relative;
}

.file {
  font-family: Arial, Helvetica, sans-serif;
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
}
.file:hover {
  transition: 0.1s;
  background-color: rgba(15, 99, 167, 0.5);
}

.highlight-file {
  transition: 0.3s;
  background-color: rgba(15, 99, 167, 0.7);
}

.icon-file {
  width: 7%;
  margin-right: 6px;
  opacity: 0.4;
}

.setting {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

.option {
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 100;
}

.option .compile-button {
  font-size: 11px;
  margin-left: 9px;
  margin-top: 12px;
}

.option .download-button {
  margin-left: 6px;
  margin-top: 18px;
  width: 32px;
  opacity: 0.6;
}
</style>