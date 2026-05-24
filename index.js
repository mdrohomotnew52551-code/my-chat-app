/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */
window.screenOrientation = "portrait";

//-----libs-begin-----
loadLib("libs/laya.core.js")
loadLib("libs/laya.html.js")
loadLib("libs/laya.ui.js")
loadLib("libs/laya.d3.js")
if (window['wx']) {
    loadLib("libs/domparserinone.js")
}


//压缩库，datareport使用
// loadLib('libs/zlib/zlib.min.js')

loadLib("libs/fairygui.js")
loadLib("libs/lsbridge.js")
loadLib("libs/rawinflate.min.js")


//-----libs-end-------
loadLib("libs/bignumber.js")
loadLib("libs/underscore.js")
loadLib("libs/patrollaya.js")
//联网
//loadLisssssssb("libs/MGOBE.js");


if (window.conchConfig) {
    loadLib("Sdk/JSNative.js")
}

loadLib("Sdk/ExConfig.js")


//注意fb要特殊加载
if (!window['FBInstant']) {
    loadLib("js/bundle.js");

}


try {

    // "ZH_CN" // "EN"; //VN  //TH
    window['TempLang'] = "EN"

    if (window['FBInstant']) {

        // 初始化FB小游戏
        FBInstant.initializeAsync()
            .then(function () {
                const user_id = FBInstant.player.getID();

                gtag('config', 'G-SHK854C3PD', {
                    cookie_flags: 'max-age=7200;secure;samesite=none',
                    cookie_domain: 'auto',
                    "user_id": user_id
                })

                // gtag('event', 'page_view');

                // console.log('gtag:',gtag)

                // 记录初始化成功事件 
                gtag("event", "fb_inited");
                // 记录启动来源
                FBInstant.getEntryPointAsync().then(function (entry) {
                    console.info("Entry Point: ", entry);
                    gtag("event", "fb_entrypoint", { entrypoint: entry });
                });

                // 记录会话类型
                const contextType = FBInstant.context.getType();
                gtag("event", "fb_context", { type: contextType });



                FBInstant.setLoadingProgress(100);
                // 启动FB小游戏
                FBInstant.startGameAsync()
                    .then(function () {
                        console.info("Success Load Scene");

                        var locale = FBInstant.getLocale();
                        if (locale == "vi_VN") {
                            window['language'] = "VN"
                        } else if (locale == "th_TH") {
                            window['language'] = "TH"
                        } else {
                            window['language'] = "EN"
                        }

                        console.log('fb 初始化完成' + window['language'] + ' ' + locale)


                        loadLib("js/bundle.js");
                        // 记录fb游戏启动事件 
                        gtag("event", "fb_started");

                    })
                    .catch(function (e) {
                        console.error("Start Game Async failed: ", e);
                    });
            })
            .catch(function (e) {
                console.error("Fail to start, Error: ", e);
            });


    }

} catch (e) {
    console.error("Fail to init fb, Error: ", e);
}

