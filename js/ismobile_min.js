!function(e){var i=/iPhone/i,o=/iPod/i,d=/iPad/i,n=/\bAndroid(?:.+)Mobile\b/i,t=/Android/i,r=/\bAndroid(?:.+)SD4930UR\b/i,a=/\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b/i,p=/Windows Phone/i,b=/\bWindows(?:.+)ARM\b/i,l=/BlackBerry/i,f=/BB10/i,s=/Opera Mini/i,u=/\b(CriOS|Chrome)(?:.+)Mobile/i,c=/Mobile(?:.+)Firefox\b/i;function h(e,i){return e.test(i)}function v(e){var v=e||("undefined"!=typeof navigator?navigator.userAgent:""),w=v.split("[FBAN");void 0!==w[1]&&(v=w[0]),void 0!==(w=v.split("Twitter"))[1]&&(v=w[0]);var m={apple:{phone:h(i,v)&&!h(p,v),ipod:h(o,v),tablet:!h(i,v)&&h(d,v)&&!h(p,v),device:(h(i,v)||h(o,v)||h(d,v))&&!h(p,v)},amazon:{phone:h(r,v),tablet:!h(r,v)&&h(a,v),device:h(r,v)||h(a,v)},android:{phone:!h(p,v)&&h(r,v)||!h(p,v)&&h(n,v),tablet:!h(p,v)&&!h(r,v)&&!h(n,v)&&(h(a,v)||h(t,v)),device:!h(p,v)&&(h(r,v)||h(a,v)||h(n,v)||h(t,v))||h(/\bokhttp\b/i,v)},windows:{phone:h(p,v),tablet:h(b,v),device:h(p,v)||h(b,v)},other:{blackberry:h(l,v),blackberry10:h(f,v),opera:h(s,v),firefox:h(c,v),chrome:h(u,v),device:h(l,v)||h(f,v)||h(s,v)||h(c,v)||h(u,v)}};return m.any=m.apple.device||m.android.device||m.windows.device||m.other.device,m.phone=m.apple.phone||m.android.phone||m.windows.phone,m.tablet=m.apple.tablet||m.android.tablet||m.windows.tablet,m}"undefined"!=typeof module&&module.exports&&"undefined"==typeof window?module.exports=v:"undefined"!=typeof module&&module.exports&&"undefined"!=typeof window?(module.exports=v(),module.exports.isMobile=v):"function"==typeof define&&define.amd?define([],e.isMobile=v()):e.isMobile=v()}(this);