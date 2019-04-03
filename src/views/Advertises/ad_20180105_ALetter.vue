<template>
  <div class="advertise">
    <img v-lazy="require('../../assets/img/advertise/20180105/aletter_flag.png')" />
  </div>
</template>

<script>
  import {BaiduTongji} from "../../utils/BaiduTongji";

  export default {
    name: "ad_20180105_-a-letter",
    mounted() {
      BaiduTongji();
    }
  }
</script>

<style scoped lang="less">
  .advertise {
    width: 100%;
    min-height: 100vh;
    background: url("../../assets/img/advertise/20180105/aletter_bg.jpg") top center no-repeat;
    background-size: cover;

    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 100%;
      margin-top: 3.15rem;;
      margin-bottom: 1rem;
    }
    img[lazy=loading] {
      width: 0.8rem;
      margin: auto;
    }
  }

</style>
