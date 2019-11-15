<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keep"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view v-if="!$route.meta.keep"></router-view>
    </transition>
  </div>
</template>

<script>

  import {wxShare} from "./utils/wxConfig";
  export default {
    name: 'app',
    created() {
      console.log('NODE_ENV: ', process.env.NODE_ENV);
    },
    mounted() {
      wxShare();
    }
  }
</script>
<style scoped>
  #app {

  }
</style>
