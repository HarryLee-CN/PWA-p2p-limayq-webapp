import sha1 from 'js-sha1'
import Vue from 'vue'
import store from '../store'
import router from '../router'

import {Toast, Indicator} from 'mint-ui'

let vue = new Vue({store, router});

function wxConfig(readyFunction) {
  let nonceStrRaw = Math.ceil(Math.random() * Math.pow(10, 16));
  let nonceStr = nonceStrRaw.toString();
  let timestampRaw = new Date().getTime();
  let timestamp = timestampRaw.toString();

  const config = {
    debug: false,
    appID: 'wx6950cdbfd9a60ec8',
    jsapi_ticket: '',
    nonceStr,
    timestamp,
    url: window.location.href,
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone'
    ]
  };

  vue.$http({
    method: 'get',
    url: vue.$getApi + '/weixin/getTicket',
  }).then(res => {
    if (res.body.resultCode === 1000) {
      let resultData = JSON.parse(res.body.resultData);
      let raw = `jsapi_ticket=${resultData.ticket}&noncestr=${config.nonceStr}&timestamp=${config.timestamp}&url=${config.url}`;
      let signature = sha1(raw);

      wx.config({
        debug: config.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: config.appID, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.nonceStr, // 必填，生成签名的随机串
        signature,// 必填，签名，见附录1
        jsApiList: config.jsApiList
      });
      wx.ready(readyFunction);
      wx.error(function (e) {
        console.log(e)
      });
    } else {
      console.log(res.body.resultMessage);
    }
  }).catch((e) => {
    console.log(e);
  });
}

export function wxShare(params = {
  title: '超快审批，超低利息，超速到账！还不快来贷？！',
  link: 'https://app.limayq.com/wxLoginMiddlePage', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  imgUrl: 'http://bucket-fuyin-limayq-beijing.oss-cn-beijing.aliyuncs.com/favicon.png', // 分享图标
  desc: '富卡 - 让金融触手可及，为普惠金融贡献力量', // 分享描述
  type: 'link', // 分享类型,music、video或link，不填默认为link
  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
}) {
  wxConfig(function () {
    /**分享到朋友圈**/
    wx.onMenuShareTimeline({
      title: params.title, // 分享标题
      link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: params.imgUrl, // 分享图标
      success: function () {

      },
    });
    /**分享给朋友**/
    wx.onMenuShareAppMessage({
      title: params.title, // 分享标题
      desc: params.desc, // 分享描述
      link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: params.imgUrl, // 分享图标
      type: params.type, // 分享类型,music、video或link，不填默认为link
      dataUrl: params.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {

      },
      cancel: function () {

      }
    });
    /**分享到QQ**/
    wx.onMenuShareQQ({
      title: params.title, // 分享标题
      desc: params.desc, // 分享描述
      link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: params.imgUrl, // 分享图标
      success: function () {

      },
      cancel: function () {

      }
    });
    /**分享到腾讯微博**/
    wx.onMenuShareWeibo({
      title: params.title, // 分享标题
      desc: params.desc, // 分享描述
      link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: params.imgUrl, // 分享图标
      success: function () {

      },
      cancel: function () {

      }
    });
    /**分享到QQ空间**/
    wx.onMenuShareQZone({
      title: params.title, // 分享标题
      desc: params.desc, // 分享描述
      link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: params.imgUrl, // 分享图标
      success: function () {

      },
      cancel: function () {

      }
    });
  });
}

export function wxUserInfo(code) {
  vue.$http({
    method: 'get',
    url: vue.$getApi + '/weixin/getWeChatUserInfo',
    params: {
      code: code || 'EMPTY_CODE'
    }
  }).then(res => {
    if (res.body.resultCode === 1000) {
      let resultData = JSON.parse(res.body.resultData);
      /**修改state.userInfo**/
      vue.$store.commit('updateUserInfo', {
        nickname: resultData.nickname,
        headimgurl: resultData.headimgurl
      });
      /** 登录超时 **/
    } else if (res.body.resultCode === 4001 || res.body.resultCode === 2001) {
      Indicator.open({
        text: '微信授权中...',
        spinnerType: 'fading-circle'
      });
      setTimeout(() => {
        Indicator.close();
        vue.$router.push({
          name: 'wxLoginMiddlePage'
        })
      }, 1500);
    } else {
      console.log(res.body.resultMessage);
    }
  }).catch((e) => {
    console.log(e)
  })
}
