// 随机生成一个金额
const randomAmount = (Math.random() * 10 + 3).toFixed(2);
const amountEl = document.getElementById('amount');
let current = 0;
const target = parseFloat(randomAmount);
const duration = 1500; // 动画时间1.5秒
const steps = 100;
const increment = target / steps;
let count = 0;
const interval = setInterval(() => {
    current += increment;
    count++;
    if (count >= steps) {
        amountEl.innerHTML = `${target.toFixed(2)} <span class="dw">元</span>`;
        clearInterval(interval);
    } else {
        amountEl.innerHTML = `${current.toFixed(2)} <span class="dw">元</span>`;
    }
}, duration / steps);


// ------------------------------------------

// 支付宝用户ID
var alipayUserId = '2088922557117308';

// 赏金二维码解码后的token
var qrToken = 'AhGZ19610515y4vfkzko7jotd85w2O';

// ------------------------------------------

// 以下无需配置
// 以下无需配置
// 以下无需配置

// 跳转地址
var jumpURL = 'https://ulink.alipay.com/?scheme=alipays%3A%2F%2Fplatformapi%2Fstartapp%3FsaId%3D10000007%26clientVersion%3D3.7.0.0718%26qrcode%3Dhttps%253A%252F%252Frender.alipay.com%252Fp%252Fc%252Falipay-red-qrcode%252Fshared.html%253Fchannel%253Dsearch_pwd%2526shareId%253D'+alipayUserId+'%2526token%253D'+qrToken+'%2526campStr%253DkPPFvOxaCL3f85TiKss2wsBZgIjulHjG%2526sign%253DqsiVOoa7TuphryWxyBdONXsMTnE3jiIBvWeUs3yV1sw%253D%2526chInfo%253DDingtalk%2526c_stype%253Dsearch_pwd';

// 如果不是微信内也不是电脑系统
if(!isWeChat() && !isPC()) {
    
    // 直接跳
    location.href = jumpURL;
}

// 获取设备（操作系统或者指定APP）
function getMobileOS() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    // 判断是否为抖音（Douyin）
    if (/aweme|douyin/i.test(ua)) {
        return 'Douyin';
    }
    // 判断是否为 Android
    if (/android/i.test(ua)) {
        return 'Android';
    }
    // 判断是否为 iOS
    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
        return 'iOS';
    }
    // 判断是否为 PC
    if (/Windows NT|Macintosh/.test(ua)) {
        return 'PC';
    }
    return 'unknown';
}

// 不同的设备不同的跳转情况
function jumpTo() {
    if (getMobileOS() == 'Douyin') {

        // 在抖音打开
        location.href = jumpURL;
    } else if (isPC() && getMobileOS() !== 'Android') {

        // 在电脑打开（调试模式）
        weui.alert('仅限手机端打开');
    } else if (getMobileOS() == 'PC') {

        // 在电脑打开
        weui.alert('仅限手机端打开');
    } else if (getMobileOS() == 'Android') {

        // 在Android设备打开
        jumpTo_Android();
    } else if (getMobileOS() == 'iOS') {

        // 在iOS设备打开
        jumpTo_iOS();
    } else {
        
        // 直跳
        location.href = jumpURL;
    }
}

// 调试模式的电脑系统检测
function isPC() {
    const platform = navigator.platform.toLowerCase();
    
    // 检查平台，如果是移动设备平台，返回手机
    if (/iphone|ipad|android/i.test(platform)) {
        return false;
    }
    
    // 否则认为是PC
    return true;
}

// 判断是否是微信浏览器
function isWeChat() {
    return /MicroMessenger/i.test(navigator.userAgent);
}

// Android设备跳转
function jumpTo_Android() {
    if (isWeChat()) {

        // 如果是安卓微信内
        weui.alert('请在右上角[···]选择在浏览器打开！');
    } else {

        // 如果不是微信浏览器
        // 跳转到下方指定页面
        location.href = jumpURL;
    }
}

// iOS设备跳转
function jumpTo_iOS() {
    weui.confirm('将会 <自动跳转到支付宝> 领取无门槛红包，2个入口选1个，如失败再选另1个，都失败，点右上角[···]在浏览器打开可正常跳转！', {
        title: '跳转须知',
        buttons: [{
            label: '👉 领取入口1',
            type: 'default',
            onClick: function() {
                
                // 跳转
                location.href = jumpURL;
            }
        }, {
            label: '👉 领取入口2',
            type: 'default',
            onClick: function() {
                
                // 跳转
                location.href = "https://ace.tb.cn/t?smburl=tbopen://m.taobao.com/tbopen/index.html?h5Url="+jumpURL;
            }
        }]
    });
}