<script>
import Header from "@/components/header.vue";

export default {
  name: "defaultLayout",
  components: { Header },
}
</script>

<template>
    <Header></Header>
    <router-view />
</template>
