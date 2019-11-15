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
      let startY = 0;
      const scrollBox = document.querySelector('#app');

      document.body.addEventListener('touchstart', (e) => {
        startY = e.touches[0].pageY;
      }, { passive: false });

      document.body.addEventListener('touchmove', (e) => {
        const moveY = e.touches[0].pageY;
        const top = scrollBox.scrollTop;
        const ch = scrollBox.clientHeight;
        const sh = scrollBox.scrollHeight;
        if (!isChildOf(e.target, scrollBox)) {
          e.preventDefault();
        } else if ((top === 0 && moveY > startY) || (top + ch === sh && moveY < startY)) {
          e.preventDefault();
        }
      }, { passive: false });

      function isChildOf(child, parent, justChild = false) {
        // justChild为true则只判断是否为子元素，若为false则判断是否为本身或者子元素 默认为false
        let parentNode;
        if (justChild) {
          parentNode = child.parentNode;
        } else {
          parentNode = child;
        }

        if (child && parent) {
          while (parentNode) {
            if (parent === parentNode) {
              return true;
            }
            parentNode = parentNode.parentNode;
          }
        }
        return false;
      }
    }
  }
</script>
<style scoped>
  #app {

  }
</style>
