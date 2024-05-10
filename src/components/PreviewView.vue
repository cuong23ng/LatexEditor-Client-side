<script setup>
import PDF from "pdf-vue3";
</script>

<template>
  <PDF src="../data/helloworld.pdf" pdfWidth="100%" />
  <!-- <PDF :src="BASE64" /> -->
  <!-- <PDF :src="Uint8Array" /> -->
</template>