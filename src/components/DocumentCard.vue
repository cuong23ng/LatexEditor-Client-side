<template>
  <div class="document-card">
    <router-link to="#" class="title">{{ post.title }}</router-link>
    <div class="owner-name">{{ post.owner }}</div>
    <div class="time-modified">{{ post.lastModified }}</div>
  </div>
</template>

<script>
export default {
  name: "documentCard",
  props: ["post"],
  components: { },
}
</script>

<style scoped>
.document-card {
  display: flex;
  flex-direction: row;
  font-size: 15px;
  margin-bottom: 4px;
  margin-top: 4px;
  padding: 1px 5px 1px 20px;
  background-color: rgba(224, 224, 224, 0.5);
  height: 45px;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.5s ease all;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.document-card:hover {
  transform: rotateY(-1deg) scale(1.002);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background-color: rgba(233, 233, 233, 0.5);
}

.document-card .title {
  flex: 5;
  text-decoration: none;
  font-weight: 700;
  color: rgb(197, 100, 100)
}
.document-card .owner-name {
  flex: 4;
}
.document-card .time-modified {
  flex: 3;
}
</style>