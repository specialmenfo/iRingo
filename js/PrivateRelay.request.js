class t{constructor(t,s){this.name=t,this.http=new e(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,s),this.log("",`🏁 ${this.name}, ENV v1.1.0, 开始!`)}platform(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.platform()}isQuanX(){return"Quantumult X"===this.platform()}isSurge(){return"Surge"===this.platform()}isLoon(){return"Loon"===this.platform()}isShadowrocket(){return"Shadowrocket"===this.platform()}isStash(){return"Stash"===this.platform()}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;if(this.getdata(t))try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise((e=>{this.get({url:t},((t,s,a)=>e(a)))}))}runScript(t,e){return new Promise((s=>{let a=this.getdata("@chavy_boxjs_userCfgs.httpapi");a=a?a.replace(/\n/g,"").trim():a;let i=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");i=i?1*i:20,i=e&&e.timeout?e.timeout:i;const[o,r]=a.split("@"),n={url:`http://${r}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:i},headers:{"X-Key":o,Accept:"*/*"},timeout:i};this.post(n,((t,e,a)=>s(a)))})).catch((t=>this.logErr(t)))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e);if(!s&&!a)return{};{const a=s?t:e;try{return JSON.parse(this.fs.readFileSync(a))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),a=!s&&this.fs.existsSync(e),i=JSON.stringify(this.data);s?this.fs.writeFileSync(t,i):a?this.fs.writeFileSync(e,i):this.fs.writeFileSync(t,i)}}lodash_get(t,e,s=void 0){const a=e.replace(/\[(\d+)\]/g,".$1").split(".");let i=t;for(const t of a)if(i=Object(i)[t],void 0===i)return s;return i}lodash_set(t,e,s){return Object(t)!==t||(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce(((t,s,a)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[a+1])>>0==+e[a+1]?[]:{}),t)[e[e.length-1]]=s),t}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,a]=/^@(.*?)\.(.*?)$/.exec(t),i=s?this.getval(s):"";if(i)try{const t=JSON.parse(i);e=t?this.lodash_get(t,a,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,a,i]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(a),r=a?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(r);this.lodash_set(e,i,t),s=this.setval(JSON.stringify(e),a)}catch(e){const o={};this.lodash_set(o,i,t),s=this.setval(JSON.stringify(o),a)}}else s=this.setval(t,e);return s}getval(t){switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(t);case"Quantumult X":return $prefs.valueForKey(t);case"Node.js":return this.data=this.loaddata(),this.data[t];default:return this.data&&this.data[t]||null}}setval(t,e){switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(t,e);case"Quantumult X":return $prefs.setValueForKey(t,e);case"Node.js":return this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0;default:return this.data&&this.data[e]||null}}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){switch(delete t?.headers?.["Content-Length"],delete t?.headers?.["content-length"],this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&this.lodash_set(t,"headers.X-Surge-Skip-Scripting",!1),$httpClient.get(t,((t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)}));break;case"Quantumult X":this.isNeedRewrite&&this.lodash_set(t,"opts.hints",!1),$task.fetch(t).then((t=>{const{statusCode:s,statusCode:a,headers:i,body:o,bodyBytes:r}=t;e(null,{status:s,statusCode:a,headers:i,body:o,bodyBytes:r},o,r)}),(t=>e(t&&t.error||"UndefinedError")));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",((t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}})).then((t=>{const{statusCode:a,statusCode:i,headers:o,rawBody:r}=t,n=s.decode(r,this.encoding);e(null,{status:a,statusCode:i,headers:o,rawBody:r,body:n},n)}),(t=>{const{message:a,response:i}=t;e(a,i,i&&s.decode(i.rawBody,this.encoding))}))}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";switch(t.body&&t.headers&&!t.headers["Content-Type"]&&!t.headers["content-type"]&&(t.headers["content-type"]="application/x-www-form-urlencoded"),delete t?.headers?.["Content-Length"],delete t?.headers?.["content-length"],this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&this.lodash_set(t,"headers.X-Surge-Skip-Scripting",!1),$httpClient[s](t,((t,s,a)=>{!t&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,a)}));break;case"Quantumult X":t.method=s,this.isNeedRewrite&&this.lodash_set(t,"opts.hints",!1),$task.fetch(t).then((t=>{const{statusCode:s,statusCode:a,headers:i,body:o,bodyBytes:r}=t;e(null,{status:s,statusCode:a,headers:i,body:o,bodyBytes:r},o,r)}),(t=>e(t&&t.error||"UndefinedError")));break;case"Node.js":let a=require("iconv-lite");this.initGotEnv(t);const{url:i,...o}=t;this.got[s](i,o).then((t=>{const{statusCode:s,statusCode:i,headers:o,rawBody:r}=t,n=a.decode(r,this.encoding);e(null,{status:s,statusCode:i,headers:o,rawBody:r,body:n},n)}),(t=>{const{message:s,response:i}=t;e(s,i,i&&a.decode(i.rawBody,this.encoding))}))}}time(t,e=null){const s=e?new Date(e):new Date;let a={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in a)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?a[e]:("00"+a[e]).substr((""+a[e]).length)));return t}msg(t=name,e="",s="",a){const i=t=>{switch(typeof t){case void 0:return t;case"string":switch(this.platform()){case"Surge":case"Stash":default:return{url:t};case"Loon":case"Shadowrocket":return t;case"Quantumult X":return{"open-url":t};case"Node.js":return}case"object":switch(this.platform()){case"Surge":case"Stash":case"Shadowrocket":default:return{url:t.url||t.openUrl||t["open-url"]};case"Loon":return{openUrl:t.openUrl||t.url||t["open-url"],mediaUrl:t.mediaUrl||t["media-url"]};case"Quantumult X":return{"open-url":t["open-url"]||t.url||t.openUrl,"media-url":t["media-url"]||t.mediaUrl,"update-pasteboard":t["update-pasteboard"]||t.updatePasteboard};case"Node.js":return}default:return}};if(!this.isMute)switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(t,e,s,i(a));break;case"Quantumult X":$notify(t,e,s,i(a));case"Node.js":}if(!this.isMuteLog){let a=["","==============📣系统通知📣=============="];a.push(t),e&&a.push(e),s&&a.push(s),console.log(a.join("\n")),this.logs=this.logs.concat(a)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t){switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️ ${this.name}, 错误!`,t);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,t.stack)}}wait(t){return new Promise((e=>setTimeout(e,t)))}done(t={}){const e=((new Date).getTime()-this.startTime)/1e3;switch(this.log("",`🚩 ${this.name}, 结束! 🕛 ${e} 秒`),this.log(),this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(t);break;case"Node.js":process.exit(1)}}getENV(t,e,s){let a=this.getjson(t,s),i={};if("undefined"!=typeof $argument&&Boolean($argument)){let t=Object.fromEntries($argument.split("&").map((t=>t.split("=").map((t=>t.replace(/\"/g,""))))));for(let e in t)this.setPath(i,e,t[e])}const o={Settings:s?.Default?.Settings||{},Configs:s?.Default?.Configs||{},Caches:{}};Array.isArray(e)||(e=[e]);for(let t of e)o.Settings={...o.Settings,...s?.[t]?.Settings,...i,...a?.[t]?.Settings},o.Configs={...o.Configs,...s?.[t]?.Configs},a?.[t]?.Caches&&"string"==typeof a?.[t]?.Caches&&(a[t].Caches=JSON.parse(a?.[t]?.Caches)),o.Caches={...o.Caches,...a?.[t]?.Caches};return this.traverseObject(o.Settings,((t,e)=>("true"===e||"false"===e?e=JSON.parse(e):"string"==typeof e&&(e=e.includes(",")?e.split(",").map((t=>this.string2number(t))):this.string2number(e)),e))),o}setPath(t,e,s){e.split(".").reduce(((t,a,i)=>t[a]=e.split(".").length===++i?s:t[a]||{}),t)}traverseObject(t,e){for(var s in t){var a=t[s];t[s]="object"==typeof a&&null!==a?this.traverseObject(a,e):e(s,a)}return t}string2number(t){return t&&!isNaN(t)&&(t=parseInt(t,10)),t}}class e{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise(((e,a)=>{s.call(this,t,((t,s,i)=>{t?a(t):e(s)}))}))}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}var s={Switch:!0},a={Storefront:[["AE","143481"],["AF","143610"],["AG","143540"],["AI","143538"],["AL","143575"],["AM","143524"],["AO","143564"],["AR","143505"],["AT","143445"],["AU","143460"],["AZ","143568"],["BA","143612"],["BB","143541"],["BD","143490"],["BE","143446"],["BF","143578"],["BG","143526"],["BH","143559"],["BJ","143576"],["BM","143542"],["BN","143560"],["BO","143556"],["BR","143503"],["BS","143539"],["BT","143577"],["BW","143525"],["BY","143565"],["BZ","143555"],["CA","143455"],["CD","143613"],["CG","143582"],["CH","143459"],["CI","143527"],["CL","143483"],["CM","143574"],["CN","143465"],["CO","143501"],["CR","143495"],["CV","143580"],["CY","143557"],["CZ","143489"],["DE","143443"],["DK","143458"],["DM","143545"],["DO","143508"],["DZ","143563"],["EC","143509"],["EE","143518"],["EG","143516"],["ES","143454"],["FI","143447"],["FJ","143583"],["FM","143591"],["FR","143442"],["GA","143614"],["GB","143444"],["GD","143546"],["GF","143615"],["GH","143573"],["GM","143584"],["GR","143448"],["GT","143504"],["GW","143585"],["GY","143553"],["HK","143463"],["HN","143510"],["HR","143494"],["HU","143482"],["ID","143476"],["IE","143449"],["IL","143491"],["IN","143467"],["IQ","143617"],["IS","143558"],["IT","143450"],["JM","143511"],["JO","143528"],["JP","143462"],["KE","143529"],["KG","143586"],["KH","143579"],["KN","143548"],["KP","143466"],["KR","143466"],["KW","143493"],["KY","143544"],["KZ","143517"],["TC","143552"],["TD","143581"],["TJ","143603"],["TH","143475"],["TM","143604"],["TN","143536"],["TO","143608"],["TR","143480"],["TT","143551"],["TW","143470"],["TZ","143572"],["LA","143587"],["LB","143497"],["LC","143549"],["LI","143522"],["LK","143486"],["LR","143588"],["LT","143520"],["LU","143451"],["LV","143519"],["LY","143567"],["MA","143620"],["MD","143523"],["ME","143619"],["MG","143531"],["MK","143530"],["ML","143532"],["MM","143570"],["MN","143592"],["MO","143515"],["MR","143590"],["MS","143547"],["MT","143521"],["MU","143533"],["MV","143488"],["MW","143589"],["MX","143468"],["MY","143473"],["MZ","143593"],["NA","143594"],["NE","143534"],["NG","143561"],["NI","143512"],["NL","143452"],["NO","143457"],["NP","143484"],["NR","143606"],["NZ","143461"],["OM","143562"],["PA","143485"],["PE","143507"],["PG","143597"],["PH","143474"],["PK","143477"],["PL","143478"],["PT","143453"],["PW","143595"],["PY","143513"],["QA","143498"],["RO","143487"],["RS","143500"],["RU","143469"],["RW","143621"],["SA","143479"],["SB","143601"],["SC","143599"],["SE","143456"],["SG","143464"],["SI","143499"],["SK","143496"],["SL","143600"],["SN","143535"],["SR","143554"],["ST","143598"],["SV","143506"],["SZ","143602"],["UA","143492"],["UG","143537"],["US","143441"],["UY","143514"],["UZ","143566"],["VC","143550"],["VE","143502"],["VG","143543"],["VN","143471"],["VU","143609"],["XK","143624"],["YE","143571"],["ZA","143472"],["ZM","143622"],["ZW","143605"]]},i={Settings:s,Configs:a},o={Switch:!0,PEP:{GCC:"US"},Services:{PlaceData:"CN",Directions:"AUTO",Traffic:"AUTO",RAP:"XX",Tiles:"AUTO"},Geo_manifest:{Dynamic:{Config:{Country_code:{default:"AUTO",iOS:"CN",iPadOS:"CN",watchOS:"US",macOS:"CN"}}}},Config:{Announcements:{"Environment:":{default:"AUTO",iOS:"CN",iPadOS:"CN",watchOS:"XX",macOS:"CN"}},Defaults:{LagunaBeach:!0,DrivingMultiWaypointRoutesEnabled:!0,GEOAddressCorrection:!0,LookupMaxParametersCount:!0,LocalitiesAndLandmarks:!0,POIBusyness:!0,PedestrianAR:!0,"6694982d2b14e95815e44e970235e230":!0,OpticalHeading:!0,UseCLPedestrianMapMatchedLocations:!0,TransitPayEnabled:!0,SupportsOffline:!0,SupportsCarIntegration:!0,WiFiQualityNetworkDisabled:!1,WiFiQualityTileDisabled:!1}}},r={Settings:o},n={Switch:!0,CountryCode:"US",newsPlusUser:!0},c={Settings:n},h={Switch:!0,CountryCode:"US",canUse:!0},l={Settings:h},u={Switch:!0,CountryCode:"SG",Domains:["web","itunes","app_store","movies","restaurants","maps"],Functions:["flightutilities","lookup","mail","messages","news","safari","siri","spotlight","visualintelligence"],Safari_Smart_History:!0},d={VisualIntelligence:{enabled_domains:["pets","media","books","art","nature","landmarks"],supported_domains:["ART","BOOK","MEDIA","LANDMARK","ANIMALS","BIRDS","FOOD","SIGN_SYMBOL","AUTO_SYMBOL","DOGS","NATURE","NATURAL_LANDMARK","INSECTS","REPTILES","ALBUM","STOREFRONT","LAUNDRY_CARE_SYMBOL","CATS","OBJECT_2D","SCULPTURE","SKYLINE","MAMMALS"]}},p={Settings:u,Configs:d},g={Switch:"true",CountryCode:"US",MultiAccount:"false",Universal:"true"},S={Settings:g},f={Switch:!0,"Third-Party":!1,HLSUrl:"play-edge.itunes.apple.com",ServerUrl:"play.itunes.apple.com",Tabs:["WatchNow","Originals","MLS","Sports","Kids","Store","Movies","TV","ChannelsAndApps","Library","Search"],CountryCode:{Configs:"AUTO",Settings:"AUTO",View:["SG","TW"],WatchNow:"AUTO",Channels:"AUTO",Originals:"AUTO",Sports:"US",Kids:"US",Store:"AUTO",Movies:"AUTO",TV:"AUTO",Persons:"SG",Search:"AUTO",Others:"AUTO"}},m={Locale:[["AU","en-AU"],["CA","en-CA"],["GB","en-GB"],["KR","ko-KR"],["HK","yue-Hant"],["JP","ja-JP"],["MO","zh-Hant"],["TW","zh-Hant"],["US","en-US"],["SG","zh-Hans"]],Tabs:[{title:"主页",type:"WatchNow",universalLinks:["https://tv.apple.com/watch-now","https://tv.apple.com/home"],destinationType:"Target",target:{id:"tahoma_watchnow",type:"Root",url:"https://tv.apple.com/watch-now"},isSelected:!0},{title:"Apple TV+",type:"Originals",universalLinks:["https://tv.apple.com/channel/tvs.sbd.4000","https://tv.apple.com/atv"],destinationType:"Target",target:{id:"tvs.sbd.4000",type:"Brand",url:"https://tv.apple.com/us/channel/tvs.sbd.4000"}},{title:"MLS Season Pass",type:"MLS",universalLinks:["https://tv.apple.com/mls"],destinationType:"Target",target:{id:"tvs.sbd.7000",type:"Brand",url:"https://tv.apple.com/us/channel/tvs.sbd.7000"}},{title:"体育节目",type:"Sports",universalLinks:["https://tv.apple.com/sports"],destinationType:"Target",target:{id:"tahoma_sports",type:"Root",url:"https://tv.apple.com/sports"}},{title:"儿童",type:"Kids",universalLinks:["https://tv.apple.com/kids"],destinationType:"Target",target:{id:"tahoma_kids",type:"Root",url:"https://tv.apple.com/kids"}},{title:"电影",type:"Movies",universalLinks:["https://tv.apple.com/movies"],destinationType:"Target",target:{id:"tahoma_movies",type:"Root",url:"https://tv.apple.com/movies"}},{title:"电视节目",type:"TV",universalLinks:["https://tv.apple.com/tv-shows"],destinationType:"Target",target:{id:"tahoma_tvshows",type:"Root",url:"https://tv.apple.com/tv-shows"}},{title:"商店",type:"Store",universalLinks:["https://tv.apple.com/store"],destinationType:"SubTabs",subTabs:[{title:"电影",type:"Movies",universalLinks:["https://tv.apple.com/movies"],destinationType:"Target",target:{id:"tahoma_movies",type:"Root",url:"https://tv.apple.com/movies"}},{title:"电视节目",type:"TV",universalLinks:["https://tv.apple.com/tv-shows"],destinationType:"Target",target:{id:"tahoma_tvshows",type:"Root",url:"https://tv.apple.com/tv-shows"}}]},{title:"频道和 App",destinationType:"SubTabs",subTabsPlacementType:"ExpandedList",type:"ChannelsAndApps",subTabs:[]},{title:"资料库",type:"Library",destinationType:"Client"},{title:"搜索",type:"Search",universalLinks:["https://tv.apple.com/search"],destinationType:"Target",target:{id:"tahoma_search",type:"Root",url:"https://tv.apple.com/search"}}],i18n:{WatchNow:[["en","Home"],["zh","主页"],["zh-Hans","主頁"],["zh-Hant","主頁"]],Movies:[["en","Movies"],["zh","电影"],["zh-Hans","电影"],["zh-Hant","電影"]],TV:[["en","TV"],["zh","电视节目"],["zh-Hans","电视节目"],["zh-Hant","電視節目"]],Store:[["en","Store"],["zh","商店"],["zh-Hans","商店"],["zh-Hant","商店"]],Sports:[["en","Sports"],["zh","体育节目"],["zh-Hans","体育节目"],["zh-Hant","體育節目"]],Kids:[["en","Kids"],["zh","儿童"],["zh-Hans","儿童"],["zh-Hant","兒童"]],Library:[["en","Library"],["zh","资料库"],["zh-Hans","资料库"],["zh-Hant","資料庫"]],Search:[["en","Search"],["zh","搜索"],["zh-Hans","搜索"],["zh-Hant","蒐索"]]}},y={Settings:f,Configs:m},T=Database={Default:Object.freeze({__proto__:null,Configs:a,Settings:s,default:i}),Location:Object.freeze({__proto__:null,Settings:o,default:r}),News:Object.freeze({__proto__:null,Settings:n,default:c}),PrivateRelay:Object.freeze({__proto__:null,Settings:h,default:l}),Siri:Object.freeze({__proto__:null,Configs:d,Settings:u,default:p}),TestFlight:Object.freeze({__proto__:null,Settings:g,default:S}),TV:Object.freeze({__proto__:null,Configs:m,Settings:f,default:y})};const v=new t(" iRingo: Set Environment Variables");const C=new t(" iRingo: ☁️ iCloud Private Relay v3.0.3(2) request");let b;function w(t,e){return C.log(`☑️ ${C.name}, Set ETag`,`If-None-Match: ${t}`,`ETag: ${e}`,""),t!==e&&(e=t,delete $request?.headers?.["If-None-Match"],delete $request?.headers?.["if-none-match"]),C.log(`✅ ${C.name}, Set ETag`,""),e}(async()=>{const{Settings:t,Caches:e,Configs:s}=await function(t,e,s){v.log(`☑️ ${v.name}`,"");let{Settings:a,Caches:i,Configs:o}=v.getENV(t,e,s);if(a?.Tabs&&!Array.isArray(a?.Tabs)&&v.lodash_set(a,"Tabs",a?.Tabs?[a.Tabs.toString()]:[]),a?.Domains&&!Array.isArray(a?.Domains)&&v.lodash_set(a,"Domains",a?.Domains?[a.Domains.toString()]:[]),a?.Functions&&!Array.isArray(a?.Functions)&&v.lodash_set(a,"Functions",a?.Functions?[a.Functions.toString()]:[]),v.log(`✅ ${v.name}`,"Settings: "+typeof a,`Settings内容: ${JSON.stringify(a)}`,""),o.Storefront=new Map(o.Storefront),o.Locale&&(o.Locale=new Map(o.Locale)),o.i18n)for(let t in o.i18n)o.i18n[t]=new Map(o.i18n[t]);return{Settings:a,Caches:i,Configs:o}}("iRingo","PrivateRelay",T);switch(C.log(`⚠ ${C.name}`,`Settings.Switch: ${t?.Switch}`,""),t.Switch){case!0:default:let s=URL.parse($request?.url);C.log(`⚠ ${C.name}`,`URL: ${JSON.stringify(s)}`,"");const a=$request?.method,i=s?.host,o=s?.path;C.log(`⚠ ${C.name}`,`METHOD: ${a}`,"");const r=($request?.headers?.["Content-Type"]??$request?.headers?.["content-type"])?.split(";")?.[0];switch(C.log(`⚠ ${C.name}`,`FORMAT: ${r}`,""),a){case"POST":case"PUT":case"PATCH":case"DELETE":case"GET":case"HEAD":case"OPTIONS":case void 0:default:if("mask-api.icloud.com"===i)switch("AUTO"!==t.CountryCode&&($request?.headers?.["Client-Region"]&&($request.headers["Client-Region"]=`${t.CountryCode}-GMT+8`),$request?.headers?.["client-region"]&&($request.headers["client-region"]=`${t.CountryCode}-GMT+8`)),o){case"v1/fetchAuthTokens":C.lodash_set(e,"fetchAuthTokens.ETag",w($request?.headers?.["If-None-Match"]??$request?.headers?.["if-none-match"],e?.fetchAuthTokens?.ETag)),C.setjson(e,"@iRingo.PrivateRelay.Caches");break;case"v3_1/fetchConfigFile":case"v3_2/fetchConfigFile":C.lodash_set(e,"fetchConfigFile.ETag",w($request?.headers?.["If-None-Match"]??$request?.headers?.["if-none-match"],e?.fetchConfigFile?.ETag)),C.setjson(e,"@iRingo.PrivateRelay.Caches")}$request?.headers?.Host&&($request.headers.Host=s.host),$request.url=URL.stringify(s);case"CONNECT":case"TRACE":}case!1:}})().catch((t=>C.logErr(t))).finally((()=>{switch(b){default:{const t=(b?.headers?.["content-type"])?.split(";")?.[0];if(C.log(`🎉 ${C.name}, finally`,"echo $response",`FORMAT: ${t}`,""),C.isQuanX())switch(b.status="HTTP/1.1 200 OK",delete b?.headers?.["Content-Length"],delete b?.headers?.["content-length"],delete b?.headers?.["Transfer-Encoding"],t){case void 0:C.done({status:b.status,headers:b.headers});break;case"application/x-www-form-urlencoded":case"text/plain":case"text/html":case"m3u8":case"application/x-mpegurl":case"application/vnd.apple.mpegurl":case"xml":case"srv3":case"text/xml":case"application/xml":case"plist":case"text/plist":case"application/plist":case"application/x-plist":case"vtt":case"webvtt":case"text/vtt":case"application/vtt":case"json":case"json3":case"text/json":case"application/json":default:C.done({status:b.status,headers:b.headers,body:b.body});break;case"application/x-protobuf":case"application/grpc":case"application/grpc+proto":case"applecation/octet-stream":C.done({status:b.status,headers:b.headers,bodyBytes:b.bodyBytes})}else C.done({response:b});break}case void 0:{const t=($request?.headers?.["Content-Type"]??$request?.headers?.["content-type"])?.split(";")?.[0];if(C.log(`🎉 ${C.name}, finally`,"$request",`FORMAT: ${t}`,""),C.isQuanX())switch(t){case void 0:C.done({url:$request.url,headers:$request.headers});break;case"application/x-www-form-urlencoded":case"text/plain":case"text/html":case"m3u8":case"application/x-mpegurl":case"application/vnd.apple.mpegurl":case"xml":case"srv3":case"text/xml":case"application/xml":case"plist":case"text/plist":case"application/plist":case"application/x-plist":case"vtt":case"webvtt":case"text/vtt":case"application/vtt":case"json":case"json3":case"text/json":case"application/json":default:C.done({url:$request.url,headers:$request.headers,body:$request.body});break;case"application/x-protobuf":case"application/grpc":case"application/grpc+proto":case"applecation/octet-stream":C.done({url:$request.url,headers:$request.headers,bodyBytes:$request.bodyBytes.buffer.slice($request.bodyBytes.byteOffset,$request.bodyBytes.byteLength+$request.bodyBytes.byteOffset)})}else C.done($request);break}}}));
