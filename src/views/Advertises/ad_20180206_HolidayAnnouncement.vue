<template>
  <div class="advertise">
    <div class="title"
         :style="{backgroundImage: `url(${require('../../assets/img/advertise/20180206/放假公告_02.png')})`,height: '1.12rem'}"></div>
    <div class="content">
      <div>
        <p class="big_title">尊敬的用户：</p>
        <p class="text">
          您好！金鸡辞旧岁，骏狗迎新春！
        </p>
        <p class="text">
          春节将至，富卡全体员工提前祝您新春快乐！根据国务院2018年春节放假安排，结合公司实际情况，现将富卡2018年春节假期工作安排公告如下：
        </p>
        <p class="title">
          一、放假时间
        </p>
        <p class="text">
          2018年2月14日（周三）至2018年2月22日（周四）放假，共9天；2月23日（周五）正常上班。
        </p>
        <p class="title">
          二、借款、还款
        </p>
        <p class="text">
          放假期间，借款、还款业务不受影响。用户可登录APP进行借/还款操作，系统会自动进行处理。春节期间可能会因为银行延迟，放款较慢，如果急需用钱还请提前申请借款。另外春节放假期间，因为银行处理时间较长，需要还款的用户建议您提前2—3天还款。
        </p>
        <p class="title">
          三、客服工作
        </p>
        <p class="text">
          放假期间，客服电话400-080-8012将暂停服务，您可以使用APP“在线客服”功能进行留言。以上工作安排如给您带来不便，请您谅解！
        </p>
        <p class="text">
          感谢您对富卡的信任与支持！祝您新年快乐！
        </p>
      </div>
    </div>
    <div class="footer"
         :style="{backgroundImage: `url(${require('../../assets/img/advertise/20180206/放假公告_04.png')})`,height: '1.3rem'}">
    </div>
  </div>
</template>

<script>
  import {BaiduTongji} from "../../utils/BaiduTongji";

  export default {
    name: "ad_20180206_-holiday-announcement",
    mounted() {
      BaiduTongji();
    }
  }
</script>

<style scoped lang="less">
  .advertise {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title, .footer {
      width: 100%;
      background-size: cover;
      background-position: center;
    }
    .content {
      width: 100%;
      min-height: calc(100vh - 13.42rem);
      background: url("../../assets/img/advertise/20180206/放假公告_03.png") top center no-repeat;
      background-size: cover;
      padding-top: 0.3rem;
      padding-bottom: 0.09rem;
      color: #171719;
      line-height: 0.44rem;
      div {
        width: 80.67%;
        margin: 0 auto;
        .big_title {
          font-size: 0.32rem;
        }
        .title {
          font-size: 0.3rem;
          margin-top: 0.2rem;
        }
        .text {
          font-size: 0.3rem;
          text-indent: 2em;
        }
      }
    }
  }
</style>
