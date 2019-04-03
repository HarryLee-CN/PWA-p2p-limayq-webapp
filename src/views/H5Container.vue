<template>
  <div>
    <back class="back" :title="title"></back>
    <component class="component" :is="currentView"></component>
  </div>
</template>

<script>
  import back from '../components/back'
  import helpCenter from './H5Pages/helpCenter'
  import aboutUs from './H5Pages/aboutUs'
  import borrowRaiders from './H5Pages/borrowRaiders'
  import ad_20180105_ALetter from './Advertises/ad_20180105_ALetter'
  import ad_20180206_HolidayAnnouncement from './Advertises/ad_20180206_HolidayAnnouncement'

  export default {
    name: "H5Container",
    data() {
      return {
        currentView: '',
        title: ''
      }
    },
    methods: {
      render() {
        console.log(this.$route.params);
        /**根据params.name渲染组件**/
        this.currentView = this.$route.params.name;
        /**根据params.name渲染title**/
        this.title =
          this.$route.params.name === 'helpCenter' ? '帮助中心'
            : this.$route.params.name === 'aboutUs' ? '关于我们'
            : this.$route.params.name === 'borrowRaiders' ? '借款攻略'
            : this.$route.params.name === 'ad_20180105_ALetter' ? '致用户的一封信'
            : this.$route.params.name === 'ad_20180206_HolidayAnnouncement' ? '春节放假公告'
            : '富卡';
      }
    },
    components: {
      back,
      helpCenter,
      aboutUs,
      borrowRaiders,
      ad_20180105_ALetter,
      ad_20180206_HolidayAnnouncement
    },

    created() {
      this.render();
    },
    mounted() {
    }
  }
</script>

<style scoped>

  .component {
    margin-top: 0.88rem;
  }
</style>
