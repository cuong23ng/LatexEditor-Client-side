<script setup>
    import { ref, onMounted, onBeforeUnmount, watch, toRef } from 'vue';
    import { VAceEditor } from 'vue3-ace-editor';
    import 'ace-builds/src-noconflict/mode-latex'; // Load the language definition file used below
    import 'ace-builds/src-noconflict/mode-bibtex';
    import 'ace-builds/src-noconflict/theme-textmate'; // Load the theme definition file used below
    import { useStore } from 'vuex';

    const height = ref((window.innerHeight - 40) + 'px');
    let timeoutId;

    const props = defineProps({
        content: {
            type: String,
        },
        projectid: {
            type: String,
        },
        filename: {
            type: String,
        },
    });

    const store = useStore();
    var oldFilename = '';

    const contentCurrent = ref('');
    const contentCurrento = toRef(props, 'content');
    watch(contentCurrento, (value) => {
        contentCurrent.value = contentCurrento.value;
    });

    

    function updateHeight() {
        height.value = (window.innerHeight - 40) + 'px';
    }

    onMounted(() => {
        contentCurrent.value = contentCurrento.value;
        window.addEventListener('resize', updateHeight);
        updateHeight(); // Set initial height
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateHeight);
    });

    async function saveContent(content) {
        var url = "http://localhost:5237/api/save/" + store.state.profileId + "/" + props.projectid + "/" + props.filename;
        console.log(url); 
        await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(content._rawValue)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    function debounce(func, delay) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func, delay);
    }
    
    watch(contentCurrent, (newValue, oldValue) => {
        if (oldFilename === props.filename) {
            debounce(() => {
                saveContent(contentCurrent);
            }, 1000);
        }
        else {
            oldFilename = props.filename
        }
    });
</script>

<template>
    <v-ace-editor
        id="editor-1"
        v-model:value="contentCurrent"
        lang="latex"
        theme="textmate"
        :wrap="true"
        class="ace-editor"
        :style="{ height: height }"
        :readonly="false"
    />
</template>

<style scoped>
  .ace-editor {
      font-size: 15px; 
  }
</style>