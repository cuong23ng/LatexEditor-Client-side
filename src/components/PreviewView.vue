<template>
  <PDFPreview 
    :src="props.address"
    :key="renderKey"
    pdfWidth="100%" 
    class="pdfview"
  />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import PDFPreview from "pdf-vue3";

const props = defineProps(['address']);
const renderKey = ref(0);

const height = ref((window.innerHeight - 40) + 'px');

function updateHeight() {
    height.value = (window.innerHeight - 40) + 'px';
}

onMounted(() => {
    window.addEventListener('resize', updateHeight);
    updateHeight(); // Set initial height
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateHeight);
});

watch(() => props.address, (newAddress, oldAddress) => {
    console.log(`Address changed from ${oldAddress} to ${newAddress}`);
    renderKey.value += 1;
});

</script>

<style lang="scss">
  .pdfview {
    max-height: v-bind('height');
  }
</style>
