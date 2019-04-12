//elementui的字体图标的Unicode值
var obj = {
  "info": "e61a",
  "error": "e62c",
  "success": "e62d",
  "warning": "e62e",
  "question": "e634",
  "back": "e606",
  "arrow-left": "e600",
  "arrow-down": "e603",
  "arrow-right": "e604",
  "arrow-up": "e605",
  "caret-left": "e60a",
  "caret-bottom": "e60b",
  "caret-top": "e60c",
  "caret-right": "e60e",
  "d-arrow-left": "e610",
  "d-arrow-right": "e613",
  "minus": "e621",
  "plus": "e62b",
  "remove": "e635",
  "circle-plus": "e601",
  "remove-outline": "e63c",
  "circle-plus-outline": "e602",
  "close": "e60f",
  "check": "e611",
  "circle-close": "e607",
  "circle-check": "e639",
  "circle-close-outline": "e609",
  "circle-check-outline": "e63e",
  "zoom-out": "e645",
  "zoom-in": "e641",
  "d-caret": "e615",
  "sort": "e640",
  "sort-down": "e630",
  "sort-up": "e631",
  "tickets": "e63f",
  "document": "e614",
  "goods": "e618",
  "sold-out": "e63b",
  "news": "e625",
  "message": "e61b",
  "date": "e608",
  "printer": "e62f",
  "time": "e642",
  "bell": "e622",
  "mobile-phone": "e624",
  "service": "e63a",
  "view": "e643",
  "menu": "e620",
  "more": "e646",
  "more-outline": "e626",
  "star-on": "e637",
  "star-off": "e63d",
  "location": "e61d",
  "location-outline": "e61f",
  "phone": "e627",
  "phone-outline": "e628",
  "picture": "e629",
  "picture-outline": "e62a",
  "delete": "e612",
  "search": "e619",
  "edit": "e61c",
  "edit-outline": "e616",
  "rank": "e632",
  "refresh": "e633",
  "share": "e636",
  "setting": "e638",
  "upload": "e60d",
  "upload2": "e644",
  "download": "e617",
  "loading": "e61e",
};

//阻止浏览器刷新
window.onbeforeunload = function (e) {
  e.returnValue = false;
  return false;
};


//iconfont页面（图标管理-我的项目）自动执行脚本
var list = $$('.icon-item > .icon-cover.icon-cover-unfreeze .icon-bianji');

function updateFontUnicode(i) {
  list[i].click()

  setTimeout(function () {
    var key = document.querySelector('#J_edit_dialog_fontclass').value;
    console.log(key, obj[key]);

    document.querySelector('#J_edit_dialog_unicode').value = obj[key];

    document.querySelector('.edit-dialog .mp-e2e-body .btn-wrap .btn[mx-click="update()"]').click()
    setTimeout(function () {
      if (i < list.length - 1) {
        updateFontUnicode(i + 1);
      }
    }, 1000);
  }, 1000);
}
