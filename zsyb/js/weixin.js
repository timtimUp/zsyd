$(function () {
    $.ajax({
        url: "/webservice/weixin.ashx",
        type: "post",
        data: { "action": "get.config", "url": window.location.href },
        beforeSend: function () {

        },
        complete: function () {
        },
        success: function (data) {
            var json = eval('(' + data + ')');
            if (json.success) {
                initConfig(json.appId, json.timestamp, json.nonceStr, json.signature);
            }
            else {
                alert(json.msg);
            }
        },
        error: function () {
        }
    });

});

/*
 * @功能：微信分享初始化配置
 * @参数：id【公众号的唯一标识】，time【生成签名的时间戳】，nonce【生成签名的随机串】，sign【签名】
 * @作者：CGX		
 * @时间：2016.05.28 16:30	
 */
function initConfig(Id, time, nonce, sign){
	wx.config({
		debug: false,
		appId: Id,// 必填，公众号的唯一标识
		timestamp: time,// 必填，生成签名的时间戳
		nonceStr: nonce,// 必填，生成签名的随机串
		signature: sign,// 必填，签名
		jsApiList: [
			// 所有要调用的 API 都要加到这个列表中
			'checkJsApi',
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ',
			'onMenuShareWeibo',
			'onMenuShareQZone',
			'hideMenuItems',
			'showMenuItems',
			'hideAllNonBaseMenuItem',
			'showAllNonBaseMenuItem',
			'translateVoice',
			'startRecord',
			'stopRecord',
			'onVoiceRecordEnd',
			'playVoice',
			'onVoicePlayEnd',
			'pauseVoice',
			'stopVoice',
			'uploadVoice',
			'downloadVoice',
			'chooseImage',
			'previewImage',
			'uploadImage',
			'downloadImage',
			'getNetworkType',
			'openLocation',
			'getLocation',
			'hideOptionMenu',
			'showOptionMenu',
			'closeWindow',
			'scanQRCode',
			'chooseWXPay',
			'openProductSpecificView',
			'addCard',
			'chooseCard',
			'openCard',
            'chooseImage',
            'uploadImage',
            'downloadImage',
            'previewImage'
		]
	});
}

/*
 * @功能：微信分享
 * @参数：imgUrl【展示的图片】，linkUrl【跳转的页面地址】，desc【描述信息】，title【标题】，type【分享类型】（1：分享到朋友圈 2：分享给朋友 3：享到QQ 4：分享到QQ空间 5：分享到微博）
 * @作者：CGX		
 * @时间：2016.05.28 16:30	
 */
wx.ready(function () {
    var userid = getCookie("userid");
    var link = "http://web.gdqmkj.com/oauth.aspx";
    if (userid != undefined && userid != "" && userid != null) {
        link = "http://web.gdqmkj.com/shareuserqr.aspx?ID=" + userid;
    }
    var shareConfig = {
        "imgUrl": "http://web.gdqmkj.com/templates/QMYB_web/img/logo.png",// 分享后展示的一张图片
        "link": link,                  // 点击分享后跳转的页面地址
        "desc": "全民易保是一个移动智能化保险平台",               // 分享后的描述信息
        "title": "全民易保"                   // 分享后的标题
    };

    //分享到朋友圈
    wx.onMenuShareTimeline(shareConfig);
    //分享给朋友
    wx.onMenuShareAppMessage(shareConfig);
    //享到QQ
    wx.onMenuShareQQ(shareConfig);
    //分享到QQ空间
    wx.onMenuShareQZone(shareConfig);
    //分享到微博
    wx.onMenuShareWeibo(shareConfig);

    // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
    //http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html#.E9.9A.90.E8.97.8F.E5.8F.B3.E4.B8.8A.E8.A7.92.E8.8F.9C.E5.8D.95.E6.8E.A5.E5.8F.A3
    wx.hideMenuItems({
        menuList: [
            'menuItem:openWithSafari',
            'menuItem:openWithQQBrowser',
            'menuItem:share:email',
            'menuItem:share:brand',
            'menuItem:copyUrl',
            'menuItem:share:QZone',
            'menuItem:share:qq',
            'menuItem:share:weiboApp',
            'menuItem:share:facebook'
        ] 
    });
});

wx.error(function (res) {
    //alert(JSON.stringify(res));
})

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"); //正则匹配
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    }
    else {
        return null;
    }
}