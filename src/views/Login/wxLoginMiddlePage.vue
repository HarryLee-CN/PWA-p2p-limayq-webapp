<template>

</template>

<script>
  import {Indicator} from 'mint-ui';

  export default {
    name: "wx-login-middle-page",
    created() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
    },
    mounted() {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6950cdbfd9a60ec8&redirect_uri=https://app.limayq.com&response_type=code&scope=snsapi_userinfo#wechat_redirect'
    }
  }
</script>

<style scoped>

</style>
