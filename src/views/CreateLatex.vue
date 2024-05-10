<template>
  <div class="latex-editor-window">
    <div class="file-info">File info</div>
    <div class="create-document">
      <div class="left-column">left left-column</div>
      <div class="editor">
        <AceEditor/>
      </div>
      <div class="preview">
        <PreviewView />
      </div>
    </div>
  </div>
</template>

<script>
import AceEditor from "../components/AceEditor.vue"
import PreviewView from "../components/PreviewView.vue";
export default {
  name: "CreatePost",
  data() {
    return {
      
    };
  },
  components: {
    AceEditor,
    PreviewView,
  },
  methods: {
  
  },
  computed: {
    
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
}

.left-column {
  flex: 15 1 0px;
  overflow: hidden;
  background-color: lightblue;
  margin-top: 40px;
}

.editor {
  flex: 50 1 0px;
  overflow: hidden;
  font-family: 'Inconsolata', 'Arial';
  margin-right: 10px;
  border-right: 3px solid rgba(81, 81, 81, 0.3);
  border-left: 3px solid rgba(81, 81, 81, 0.3);
  margin-top: 40px;
}

.preview {
  flex: 50 1 0px;
  overflow: hidden;
  background-color: lightgrey;
  margin-left: -10px;
}
</style>