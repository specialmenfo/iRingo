class e{constructor(e,s){this.name=e,this.http=new t(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,s),this.log("",`🏁 ${this.name}, ENV v1.1.0, 开始!`)}platform(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"!=typeof module&&module.exports?"Node.js":"undefined"!=typeof $task?"Quantumult X":"undefined"!=typeof $loon?"Loon":"undefined"!=typeof $rocket?"Shadowrocket":void 0}isNode(){return"Node.js"===this.platform()}isQuanX(){return"Quantumult X"===this.platform()}isSurge(){return"Surge"===this.platform()}isLoon(){return"Loon"===this.platform()}isShadowrocket(){return"Shadowrocket"===this.platform()}isStash(){return"Stash"===this.platform()}toObj(e,t=null){try{return JSON.parse(e)}catch{return t}}toStr(e,t=null){try{return JSON.stringify(e)}catch{return t}}getjson(e,t){let s=t;if(this.getdata(e))try{s=JSON.parse(this.getdata(e))}catch{}return s}setjson(e,t){try{return this.setdata(JSON.stringify(e),t)}catch{return!1}}getScript(e){return new Promise((t=>{this.get({url:e},((e,s,a)=>t(a)))}))}runScript(e,t){return new Promise((s=>{let a=this.getdata("@chavy_boxjs_userCfgs.httpapi");a=a?a.replace(/\n/g,"").trim():a;let o=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");o=o?1*o:20,o=t&&t.timeout?t.timeout:o;const[r,i]=a.split("@"),n={url:`http://${i}/v1/scripting/evaluate`,body:{script_text:e,mock_type:"cron",timeout:o},headers:{"X-Key":r,Accept:"*/*"},timeout:o};this.post(n,((e,t,a)=>s(a)))})).catch((e=>this.logErr(e)))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const e=this.path.resolve(this.dataFile),t=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(e),a=!s&&this.fs.existsSync(t);if(!s&&!a)return{};{const a=s?e:t;try{return JSON.parse(this.fs.readFileSync(a))}catch(e){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const e=this.path.resolve(this.dataFile),t=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(e),a=!s&&this.fs.existsSync(t),o=JSON.stringify(this.data);s?this.fs.writeFileSync(e,o):a?this.fs.writeFileSync(t,o):this.fs.writeFileSync(e,o)}}lodash_get(e,t,s=void 0){const a=t.replace(/\[(\d+)\]/g,".$1").split(".");let o=e;for(const e of a)if(o=Object(o)[e],void 0===o)return s;return o}lodash_set(e,t,s){return Object(e)!==e||(Array.isArray(t)||(t=t.toString().match(/[^.[\]]+/g)||[]),t.slice(0,-1).reduce(((e,s,a)=>Object(e[s])===e[s]?e[s]:e[s]=Math.abs(t[a+1])>>0==+t[a+1]?[]:{}),e)[t[t.length-1]]=s),e}getdata(e){let t=this.getval(e);if(/^@/.test(e)){const[,s,a]=/^@(.*?)\.(.*?)$/.exec(e),o=s?this.getval(s):"";if(o)try{const e=JSON.parse(o);t=e?this.lodash_get(e,a,""):t}catch(e){t=""}}return t}setdata(e,t){let s=!1;if(/^@/.test(t)){const[,a,o]=/^@(.*?)\.(.*?)$/.exec(t),r=this.getval(a),i=a?"null"===r?null:r||"{}":"{}";try{const t=JSON.parse(i);this.lodash_set(t,o,e),s=this.setval(JSON.stringify(t),a)}catch(t){const r={};this.lodash_set(r,o,e),s=this.setval(JSON.stringify(r),a)}}else s=this.setval(e,t);return s}getval(e){switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.read(e);case"Quantumult X":return $prefs.valueForKey(e);case"Node.js":return this.data=this.loaddata(),this.data[e];default:return this.data&&this.data[e]||null}}setval(e,t){switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":return $persistentStore.write(e,t);case"Quantumult X":return $prefs.setValueForKey(e,t);case"Node.js":return this.data=this.loaddata(),this.data[t]=e,this.writedata(),!0;default:return this.data&&this.data[t]||null}}initGotEnv(e){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,e&&(e.headers=e.headers?e.headers:{},void 0===e.headers.Cookie&&void 0===e.cookieJar&&(e.cookieJar=this.ckjar))}get(e,t=(()=>{})){switch(delete e?.headers?.["Content-Length"],delete e?.headers?.["content-length"],this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&this.lodash_set(e,"headers.X-Surge-Skip-Scripting",!1),$httpClient.get(e,((e,s,a)=>{!e&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),t(e,s,a)}));break;case"Quantumult X":this.isNeedRewrite&&this.lodash_set(e,"opts.hints",!1),$task.fetch(e).then((e=>{const{statusCode:s,statusCode:a,headers:o,body:r,bodyBytes:i}=e;t(null,{status:s,statusCode:a,headers:o,body:r,bodyBytes:i},r,i)}),(e=>t(e&&e.error||"UndefinedError")));break;case"Node.js":let s=require("iconv-lite");this.initGotEnv(e),this.got(e).on("redirect",((e,t)=>{try{if(e.headers["set-cookie"]){const s=e.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),t.cookieJar=this.ckjar}}catch(e){this.logErr(e)}})).then((e=>{const{statusCode:a,statusCode:o,headers:r,rawBody:i}=e,n=s.decode(i,this.encoding);t(null,{status:a,statusCode:o,headers:r,rawBody:i,body:n},n)}),(e=>{const{message:a,response:o}=e;t(a,o,o&&s.decode(o.rawBody,this.encoding))}))}}post(e,t=(()=>{})){const s=e.method?e.method.toLocaleLowerCase():"post";switch(e.body&&e.headers&&!e.headers["Content-Type"]&&!e.headers["content-type"]&&(e.headers["content-type"]="application/x-www-form-urlencoded"),delete e?.headers?.["Content-Length"],delete e?.headers?.["content-length"],this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:this.isSurge()&&this.isNeedRewrite&&this.lodash_set(e,"headers.X-Surge-Skip-Scripting",!1),$httpClient[s](e,((e,s,a)=>{!e&&s&&(s.body=a,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),t(e,s,a)}));break;case"Quantumult X":e.method=s,this.isNeedRewrite&&this.lodash_set(e,"opts.hints",!1),$task.fetch(e).then((e=>{const{statusCode:s,statusCode:a,headers:o,body:r,bodyBytes:i}=e;t(null,{status:s,statusCode:a,headers:o,body:r,bodyBytes:i},r,i)}),(e=>t(e&&e.error||"UndefinedError")));break;case"Node.js":let a=require("iconv-lite");this.initGotEnv(e);const{url:o,...r}=e;this.got[s](o,r).then((e=>{const{statusCode:s,statusCode:o,headers:r,rawBody:i}=e,n=a.decode(i,this.encoding);t(null,{status:s,statusCode:o,headers:r,rawBody:i,body:n},n)}),(e=>{const{message:s,response:o}=e;t(s,o,o&&a.decode(o.rawBody,this.encoding))}))}}time(e,t=null){const s=t?new Date(t):new Date;let a={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let t in a)new RegExp("("+t+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?a[t]:("00"+a[t]).substr((""+a[t]).length)));return e}msg(e=name,t="",s="",a){const o=e=>{switch(typeof e){case void 0:return e;case"string":switch(this.platform()){case"Surge":case"Stash":default:return{url:e};case"Loon":case"Shadowrocket":return e;case"Quantumult X":return{"open-url":e};case"Node.js":return}case"object":switch(this.platform()){case"Surge":case"Stash":case"Shadowrocket":default:return{url:e.url||e.openUrl||e["open-url"]};case"Loon":return{openUrl:e.openUrl||e.url||e["open-url"],mediaUrl:e.mediaUrl||e["media-url"]};case"Quantumult X":return{"open-url":e["open-url"]||e.url||e.openUrl,"media-url":e["media-url"]||e.mediaUrl,"update-pasteboard":e["update-pasteboard"]||e.updatePasteboard};case"Node.js":return}default:return}};if(!this.isMute)switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(e,t,s,o(a));break;case"Quantumult X":$notify(e,t,s,o(a));case"Node.js":}if(!this.isMuteLog){let a=["","==============📣系统通知📣=============="];a.push(e),t&&a.push(t),s&&a.push(s),console.log(a.join("\n")),this.logs=this.logs.concat(a)}}log(...e){e.length>0&&(this.logs=[...this.logs,...e]),console.log(e.join(this.logSeparator))}logErr(e){switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️ ${this.name}, 错误!`,e);break;case"Node.js":this.log("",`❗️${this.name}, 错误!`,e.stack)}}wait(e){return new Promise((t=>setTimeout(t,e)))}done(e={}){const t=((new Date).getTime()-this.startTime)/1e3;switch(this.log("",`🚩 ${this.name}, 结束! 🕛 ${t} 秒`),this.log(),this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":case"Quantumult X":default:$done(e);break;case"Node.js":process.exit(1)}}getENV(e,t,s){let a=this.getjson(e,s),o={};if("undefined"!=typeof $argument&&Boolean($argument)){let e=Object.fromEntries($argument.split("&").map((e=>e.split("=").map((e=>e.replace(/\"/g,""))))));for(let t in e)this.setPath(o,t,e[t])}const r={Settings:s?.Default?.Settings||{},Configs:s?.Default?.Configs||{},Caches:{}};Array.isArray(t)||(t=[t]);for(let e of t)r.Settings={...r.Settings,...s?.[e]?.Settings,...o,...a?.[e]?.Settings},r.Configs={...r.Configs,...s?.[e]?.Configs},a?.[e]?.Caches&&"string"==typeof a?.[e]?.Caches&&(a[e].Caches=JSON.parse(a?.[e]?.Caches)),r.Caches={...r.Caches,...a?.[e]?.Caches};return this.traverseObject(r.Settings,((e,t)=>("true"===t||"false"===t?t=JSON.parse(t):"string"==typeof t&&(t=t.includes(",")?t.split(",").map((e=>this.string2number(e))):this.string2number(t)),t))),r}setPath(e,t,s){t.split(".").reduce(((e,a,o)=>e[a]=t.split(".").length===++o?s:e[a]||{}),e)}traverseObject(e,t){for(var s in e){var a=e[s];e[s]="object"==typeof a&&null!==a?this.traverseObject(a,t):t(s,a)}return e}string2number(e){return e&&!isNaN(e)&&(e=parseInt(e,10)),e}}class t{constructor(e){this.env=e}send(e,t="GET"){e="string"==typeof e?{url:e}:e;let s=this.get;return"POST"===t&&(s=this.post),new Promise(((t,a)=>{s.call(this,e,((e,s,o)=>{e?a(e):t(s)}))}))}get(e){return this.send.call(this.env,e)}post(e){return this.send.call(this.env,e,"POST")}}var s={Switch:!0},a={Storefront:[["AE","143481"],["AF","143610"],["AG","143540"],["AI","143538"],["AL","143575"],["AM","143524"],["AO","143564"],["AR","143505"],["AT","143445"],["AU","143460"],["AZ","143568"],["BA","143612"],["BB","143541"],["BD","143490"],["BE","143446"],["BF","143578"],["BG","143526"],["BH","143559"],["BJ","143576"],["BM","143542"],["BN","143560"],["BO","143556"],["BR","143503"],["BS","143539"],["BT","143577"],["BW","143525"],["BY","143565"],["BZ","143555"],["CA","143455"],["CD","143613"],["CG","143582"],["CH","143459"],["CI","143527"],["CL","143483"],["CM","143574"],["CN","143465"],["CO","143501"],["CR","143495"],["CV","143580"],["CY","143557"],["CZ","143489"],["DE","143443"],["DK","143458"],["DM","143545"],["DO","143508"],["DZ","143563"],["EC","143509"],["EE","143518"],["EG","143516"],["ES","143454"],["FI","143447"],["FJ","143583"],["FM","143591"],["FR","143442"],["GA","143614"],["GB","143444"],["GD","143546"],["GF","143615"],["GH","143573"],["GM","143584"],["GR","143448"],["GT","143504"],["GW","143585"],["GY","143553"],["HK","143463"],["HN","143510"],["HR","143494"],["HU","143482"],["ID","143476"],["IE","143449"],["IL","143491"],["IN","143467"],["IQ","143617"],["IS","143558"],["IT","143450"],["JM","143511"],["JO","143528"],["JP","143462"],["KE","143529"],["KG","143586"],["KH","143579"],["KN","143548"],["KP","143466"],["KR","143466"],["KW","143493"],["KY","143544"],["KZ","143517"],["TC","143552"],["TD","143581"],["TJ","143603"],["TH","143475"],["TM","143604"],["TN","143536"],["TO","143608"],["TR","143480"],["TT","143551"],["TW","143470"],["TZ","143572"],["LA","143587"],["LB","143497"],["LC","143549"],["LI","143522"],["LK","143486"],["LR","143588"],["LT","143520"],["LU","143451"],["LV","143519"],["LY","143567"],["MA","143620"],["MD","143523"],["ME","143619"],["MG","143531"],["MK","143530"],["ML","143532"],["MM","143570"],["MN","143592"],["MO","143515"],["MR","143590"],["MS","143547"],["MT","143521"],["MU","143533"],["MV","143488"],["MW","143589"],["MX","143468"],["MY","143473"],["MZ","143593"],["NA","143594"],["NE","143534"],["NG","143561"],["NI","143512"],["NL","143452"],["NO","143457"],["NP","143484"],["NR","143606"],["NZ","143461"],["OM","143562"],["PA","143485"],["PE","143507"],["PG","143597"],["PH","143474"],["PK","143477"],["PL","143478"],["PT","143453"],["PW","143595"],["PY","143513"],["QA","143498"],["RO","143487"],["RS","143500"],["RU","143469"],["RW","143621"],["SA","143479"],["SB","143601"],["SC","143599"],["SE","143456"],["SG","143464"],["SI","143499"],["SK","143496"],["SL","143600"],["SN","143535"],["SR","143554"],["ST","143598"],["SV","143506"],["SZ","143602"],["UA","143492"],["UG","143537"],["US","143441"],["UY","143514"],["UZ","143566"],["VC","143550"],["VE","143502"],["VG","143543"],["VN","143471"],["VU","143609"],["XK","143624"],["YE","143571"],["ZA","143472"],["ZM","143622"],["ZW","143605"]]},o={Settings:s,Configs:a},r={Switch:!0,PEP:{GCC:"US"},Services:{PlaceData:"CN",Directions:"AUTO",Traffic:"AUTO",RAP:"XX",Tiles:"AUTO"},Geo_manifest:{Dynamic:{Config:{Country_code:{default:"AUTO",iOS:"CN",iPadOS:"CN",watchOS:"US",macOS:"CN"}}}},Config:{Announcements:{"Environment:":{default:"AUTO",iOS:"CN",iPadOS:"CN",watchOS:"XX",macOS:"CN"}},Defaults:{LagunaBeach:!0,DrivingMultiWaypointRoutesEnabled:!0,GEOAddressCorrection:!0,LookupMaxParametersCount:!0,LocalitiesAndLandmarks:!0,POIBusyness:!0,PedestrianAR:!0,"6694982d2b14e95815e44e970235e230":!0,OpticalHeading:!0,UseCLPedestrianMapMatchedLocations:!0,TransitPayEnabled:!0,SupportsOffline:!0,SupportsCarIntegration:!0,WiFiQualityNetworkDisabled:!1,WiFiQualityTileDisabled:!1}}},i={Settings:r},n={Switch:!0,CountryCode:"US",newsPlusUser:!0},c={Settings:n},u={Switch:!0,CountryCode:"US",canUse:!0},l={Settings:u},h={Switch:!0,CountryCode:"SG",Domains:["web","itunes","app_store","movies","restaurants","maps"],Functions:["flightutilities","lookup","mail","messages","news","safari","siri","spotlight","visualintelligence"],Safari_Smart_History:!0},p={VisualIntelligence:{enabled_domains:["pets","media","books","art","nature","landmarks"],supported_domains:["ART","BOOK","MEDIA","LANDMARK","ANIMALS","BIRDS","FOOD","SIGN_SYMBOL","AUTO_SYMBOL","DOGS","NATURE","NATURAL_LANDMARK","INSECTS","REPTILES","ALBUM","STOREFRONT","LAUNDRY_CARE_SYMBOL","CATS","OBJECT_2D","SCULPTURE","SKYLINE","MAMMALS"]}},d={Settings:h,Configs:p},g={Switch:"true",CountryCode:"US",MultiAccount:"false",Universal:"true"},v={Settings:g},S={Switch:!0,"Third-Party":!1,HLSUrl:"play-edge.itunes.apple.com",ServerUrl:"play.itunes.apple.com",Tabs:["WatchNow","Originals","MLS","Sports","Kids","Store","Movies","TV","ChannelsAndApps","Library","Search"],CountryCode:{Configs:"AUTO",Settings:"AUTO",View:["SG","TW"],WatchNow:"AUTO",Channels:"AUTO",Originals:"AUTO",Sports:"US",Kids:"US",Store:"AUTO",Movies:"AUTO",TV:"AUTO",Persons:"SG",Search:"AUTO",Others:"AUTO"}},f={Locale:[["AU","en-AU"],["CA","en-CA"],["GB","en-GB"],["KR","ko-KR"],["HK","yue-Hant"],["JP","ja-JP"],["MO","zh-Hant"],["TW","zh-Hant"],["US","en-US"],["SG","zh-Hans"]],Tabs:[{title:"主页",type:"WatchNow",universalLinks:["https://tv.apple.com/watch-now","https://tv.apple.com/home"],destinationType:"Target",target:{id:"tahoma_watchnow",type:"Root",url:"https://tv.apple.com/watch-now"},isSelected:!0},{title:"Apple TV+",type:"Originals",universalLinks:["https://tv.apple.com/channel/tvs.sbd.4000","https://tv.apple.com/atv"],destinationType:"Target",target:{id:"tvs.sbd.4000",type:"Brand",url:"https://tv.apple.com/us/channel/tvs.sbd.4000"}},{title:"MLS Season Pass",type:"MLS",universalLinks:["https://tv.apple.com/mls"],destinationType:"Target",target:{id:"tvs.sbd.7000",type:"Brand",url:"https://tv.apple.com/us/channel/tvs.sbd.7000"}},{title:"体育节目",type:"Sports",universalLinks:["https://tv.apple.com/sports"],destinationType:"Target",target:{id:"tahoma_sports",type:"Root",url:"https://tv.apple.com/sports"}},{title:"儿童",type:"Kids",universalLinks:["https://tv.apple.com/kids"],destinationType:"Target",target:{id:"tahoma_kids",type:"Root",url:"https://tv.apple.com/kids"}},{title:"电影",type:"Movies",universalLinks:["https://tv.apple.com/movies"],destinationType:"Target",target:{id:"tahoma_movies",type:"Root",url:"https://tv.apple.com/movies"}},{title:"电视节目",type:"TV",universalLinks:["https://tv.apple.com/tv-shows"],destinationType:"Target",target:{id:"tahoma_tvshows",type:"Root",url:"https://tv.apple.com/tv-shows"}},{title:"商店",type:"Store",universalLinks:["https://tv.apple.com/store"],destinationType:"SubTabs",subTabs:[{title:"电影",type:"Movies",universalLinks:["https://tv.apple.com/movies"],destinationType:"Target",target:{id:"tahoma_movies",type:"Root",url:"https://tv.apple.com/movies"}},{title:"电视节目",type:"TV",universalLinks:["https://tv.apple.com/tv-shows"],destinationType:"Target",target:{id:"tahoma_tvshows",type:"Root",url:"https://tv.apple.com/tv-shows"}}]},{title:"频道和 App",destinationType:"SubTabs",subTabsPlacementType:"ExpandedList",type:"ChannelsAndApps",subTabs:[]},{title:"资料库",type:"Library",destinationType:"Client"},{title:"搜索",type:"Search",universalLinks:["https://tv.apple.com/search"],destinationType:"Target",target:{id:"tahoma_search",type:"Root",url:"https://tv.apple.com/search"}}],i18n:{WatchNow:[["en","Home"],["zh","主页"],["zh-Hans","主頁"],["zh-Hant","主頁"]],Movies:[["en","Movies"],["zh","电影"],["zh-Hans","电影"],["zh-Hant","電影"]],TV:[["en","TV"],["zh","电视节目"],["zh-Hans","电视节目"],["zh-Hant","電視節目"]],Store:[["en","Store"],["zh","商店"],["zh-Hans","商店"],["zh-Hant","商店"]],Sports:[["en","Sports"],["zh","体育节目"],["zh-Hans","体育节目"],["zh-Hant","體育節目"]],Kids:[["en","Kids"],["zh","儿童"],["zh-Hans","儿童"],["zh-Hant","兒童"]],Library:[["en","Library"],["zh","资料库"],["zh-Hans","资料库"],["zh-Hant","資料庫"]],Search:[["en","Search"],["zh","搜索"],["zh-Hans","搜索"],["zh-Hant","蒐索"]]}},y={Settings:S,Configs:f},m=Database={Default:Object.freeze({__proto__:null,Configs:a,Settings:s,default:o}),Location:Object.freeze({__proto__:null,Settings:r,default:i}),News:Object.freeze({__proto__:null,Settings:n,default:c}),PrivateRelay:Object.freeze({__proto__:null,Settings:u,default:l}),Siri:Object.freeze({__proto__:null,Configs:p,Settings:h,default:d}),TestFlight:Object.freeze({__proto__:null,Settings:g,default:v}),TV:Object.freeze({__proto__:null,Configs:f,Settings:S,default:y})};const b=new e(" iRingo: Set Environment Variables");const C=new e(" iRingo: 📺 TV v3.2.2(2) request"),T=new class{constructor(e=[]){this.name="URI v1.2.6",this.opts=e,this.json={scheme:"",host:"",path:"",query:{}}}parse(e){let t=e.match(/(?:(?<scheme>.+):\/\/(?<host>[^/]+))?\/?(?<path>[^?]+)?\??(?<query>[^?]+)?/)?.groups??null;if(t?.path?t.paths=t.path.split("/"):t.path="",t?.paths){const e=t.paths[t.paths.length-1];if(e?.includes(".")){const s=e.split(".");t.format=s[s.length-1]}}return t?.query&&(t.query=Object.fromEntries(t.query.split("&").map((e=>e.split("="))))),t}stringify(e=this.json){let t="";return e?.scheme&&e?.host&&(t+=e.scheme+"://"+e.host),e?.path&&(t+=e?.host?"/"+e.path:e.path),e?.query&&(t+="?"+Object.entries(e.query).map((e=>e.join("="))).join("&")),t}};let w;const O=T.parse($request.url);C.log(`⚠ ${C.name}`,`URL: ${JSON.stringify(O)}`,"");const k=$request.method,A=O.host,N=O.path;O.paths,C.log(`⚠ ${C.name}`,`METHOD: ${k}`,"");const $=($request.headers?.["Content-Type"]??$request.headers?.["content-type"])?.split(";")?.[0];C.log(`⚠ ${C.name}`,`FORMAT: ${$}`,""),(async()=>{const{Settings:e,Caches:t,Configs:s}=function(e,t,s){b.log(`☑️ ${b.name}`,"");let{Settings:a,Caches:o,Configs:r}=b.getENV(e,t,s);if(a?.Tabs&&!Array.isArray(a?.Tabs)&&b.lodash_set(a,"Tabs",a?.Tabs?[a.Tabs.toString()]:[]),a?.Domains&&!Array.isArray(a?.Domains)&&b.lodash_set(a,"Domains",a?.Domains?[a.Domains.toString()]:[]),a?.Functions&&!Array.isArray(a?.Functions)&&b.lodash_set(a,"Functions",a?.Functions?[a.Functions.toString()]:[]),b.log(`✅ ${b.name}`,"Settings: "+typeof a,`Settings内容: ${JSON.stringify(a)}`,""),r.Storefront=new Map(r.Storefront),r.Locale&&(r.Locale=new Map(r.Locale)),r.i18n)for(let e in r.i18n)r.i18n[e]=new Map(r.i18n[e]);return{Settings:a,Caches:o,Configs:r}}("iRingo","TV",m);switch(C.log(`⚠ ${C.name}`,`Settings.Switch: ${e?.Switch}`,""),e.Switch){case!0:default:let t={},a="Other";switch(k){case"POST":case"PUT":case"PATCH":case"DELETE":switch($){case void 0:break;case"application/x-www-form-urlencoded":case"text/plain":case"text/html":default:if("uts-api.itunes.apple.com"===A)switch(N){case"uts/v3/favorite-people":case"uts/v3/favorite-teams":case"uts/v2/favorites":case"uts/v2/favorites/add":case"uts/v2/favorites/remove":a="Sports",$request.body&&($request.body=$request.body.replace(/sf=[\d]{6}/,`sf=${s.Storefront.get(e.CountryCode[a])}`))}break;case"application/x-mpegURL":case"application/x-mpegurl":case"application/vnd.apple.mpegurl":case"audio/mpegurl":case"text/xml":case"text/plist":case"application/xml":case"application/plist":case"application/x-plist":case"text/vtt":case"application/vtt":break;case"text/json":case"application/json":switch(t=JSON.parse($request.body??"{}"),A){case"uts-api.itunes.apple.com":if("uts/v3/user/settings"===N)a="Settings";break;case"umc-tempo-api.apple.com":switch(N){case"v3/channels/scoreboard":case"v3/channels/scoreboard/":a="Sports"}}$request.body=JSON.stringify(t);case"application/protobuf":case"application/x-protobuf":case"application/vnd.google.protobuf":case"application/grpc":case"application/grpc+proto":case"applecation/octet-stream":}case"GET":case"HEAD":case"OPTIONS":case void 0:default:switch(A){case"uts-api.itunes.apple.com":parseInt(O.query?.v,10);const t=O.query?.pfm;switch(($request.headers?.["X-Apple-I-Locale"]??$request.headers?.["x-apple-i-locale"])?.split("_"),N){case"uts/v3/configurations":a="Configs","AUTO"!==e.CountryCode[a]&&(O.query.region&&(O.query.region=e.CountryCode[a]??O.query.region),O.query.country&&(O.query.country=e.CountryCode[a]??O.query.country),O.query.sfh&&(O.query.sfh=O.query.sfh.replace(/\d{6}/,s.Storefront.get(e.CountryCode[a]))));break;case"uts/v3/user/settings":a="Settings";break;case"uts/v3/canvases/Roots/watchNow":case"uts/v3/canvases/roots/tahoma_watchnow":case"uts/v3/shelves/uts.col.UpNext":a="WatchNow",e["Third-Party"]&&(O.query.pfm="desktop"===t?"appletv":t);break;case"uts/v3/canvases/Channels/tvs.sbd.4000":case"uts/v3/shelves/uts.col.ChannelUpNext.tvs.sbd.4000":case"uts/v2/brands/appleTvPlus":case"uts/v3/canvases/Channels/tvs.sbd.7000":case"uts/v3/shelves/uts.col.ChannelUpNext.tvs.sbd.7000":case"uts/v3/shelves/edt.col.63bf2052-50b9-44c8-a67e-30e196e19c60":a="Originals";break;case"uts/v3/channels":case"uts/v2/brands":a="Channels";break;case"uts/v3/canvases/Roots/sports":case"uts/v3/shelves/uts.col.PersonalizedLiveSports":case"uts/v3/clock-scores":case"uts/v3/leagues":case"uts/v2/sports/clockscore":case"uts/v2/sports/competitors":case"uts/v2/sports/league":case"uts/v2/sports/leagues":case"uts/v2/sports/statsIdLookup":case"uts/v2/sports/teamsNearMe":case"uts/v3/canvases/Rooms/edt.item.633e0768-2135-43ac-a878-28965b853ec5":case"uts/v3/canvases/Rooms/edt.item.635968ac-89d7-4619-8f5d-8c7890aef813":case"uts/v3/canvases/Rooms/edt.item.62327df1-6874-470e-98b2-a5bbeac509a2":a="Sports",O.query.pfm="desktop"===t?"ipad":t;break;case"uts/v3/canvases/Roots/kids":a="Kids";break;case"uts/v3/canvases/Roots/store":case"uts/v3/canvases/Roots/tahoma_store":a="Store";break;case"uts/v3/canvases/Roots/movies":a="Movies",e["Third-Party"]&&(O.query.pfm="desktop"===t?"ipad":t);break;case"uts/v3/canvases/Roots/tv":a="TV",e["Third-Party"]&&(O.query.pfm="desktop"===t?"ipad":t);break;case"uts/v3/favorite-people":case"uts/v3/favorite-teams":case"uts/v2/favorites":case"uts/v2/favorites/add":case"uts/v2/favorites/remove":a="Sports";break;case"uts/v3/canvases/Roots/tahoma_searchlanding":case"uts/v3/search":case"uts/v3/search/landing":case"uts/v2/search/incremental":case"uts/v2/search/landing":a="Search";break;case"uts/v3/watchlist":case"uts/v2/watchlist/contains":case"uts/v2/watchlist/search":e["Third-Party"]&&(O.query.pfm="desktop"===t?"ipad":t);break;default:"tvs.sbd.4000"===O.query?.ctx_brand?a="Originals":N.includes("uts/v3/canvases/Channels/")||N.includes("uts/v2/brands/")?a="Channels":N.includes("uts/v3/movies/")?a="Movies":N.includes("uts/v3/shows/")?a="TV":N.includes("uts/v3/sporting-events/")||N.includes("uts/v3/canvases/Sports/")?(a="Sports",O.query.pfm="desktop"===t?"ipad":t):a=N.includes("uts/v3/canvases/Persons/")?"Persons":(N.includes("uts/v3/canvases/Rooms/"),"Others")}break;case"umc-tempo-api.apple.com":switch(N){case"v3/register":case"v3/channels/scoreboard":case"v3/channels/scoreboard/":a="Sports";break;default:N.includes("v3/register/")&&(a="Sports")}}C.log(`⚠ ${C.name}, Type = ${a}, CC = ${e.CountryCode[a]}`);case"CONNECT":case"TRACE":}$request.headers?.["X-Apple-Store-Front"]&&($request.headers["X-Apple-Store-Front"]=s.Storefront.get(e.CountryCode[a])?$request.headers["X-Apple-Store-Front"].replace(/\d{6}/,s.Storefront.get(e.CountryCode[a])):$request.headers["X-Apple-Store-Front"]),$request.headers?.["x-apple-store-front"]&&($request.headers["x-apple-store-front"]=s.Storefront.get(e.CountryCode[a])?$request.headers["x-apple-store-front"].replace(/\d{6}/,s.Storefront.get(e.CountryCode[a])):$request.headers["x-apple-store-front"]),O.query?.sf&&(O.query.sf=s.Storefront.get(e.CountryCode[a])??O.query.sf),O.query?.locale&&(O.query.locale=s.Locale.get(e.CountryCode[a])??O.query.locale),$request.headers?.Host&&($request.headers.Host=O.host),$request.url=T.stringify(O);case!1:}})().catch((e=>C.logErr(e))).finally((()=>{switch(w){default:{const e=(w?.headers?.["content-type"])?.split(";")?.[0];if(C.log(`🎉 ${C.name}, finally`,"echo $response",`FORMAT: ${e}`,""),C.isQuanX())switch(w.status="HTTP/1.1 200 OK",delete w?.headers?.["Content-Length"],delete w?.headers?.["content-length"],delete w?.headers?.["Transfer-Encoding"],e){case void 0:C.done({status:w.status,headers:w.headers});break;default:C.done({status:w.status,headers:w.headers,body:w.body});break;case"application/protobuf":case"application/x-protobuf":case"application/vnd.google.protobuf":case"application/grpc":case"application/grpc+proto":case"applecation/octet-stream":C.done({status:w.status,headers:w.headers,bodyBytes:w.bodyBytes})}else C.done({response:w});break}case void 0:if(C.log(`🎉 ${C.name}, finally`,"$request",`FORMAT: ${$}`,""),C.isQuanX())switch($){case void 0:C.done({url:$request.url,headers:$request.headers});break;default:C.done({url:$request.url,headers:$request.headers,body:$request.body});break;case"application/protobuf":case"application/x-protobuf":case"application/vnd.google.protobuf":case"application/grpc":case"application/grpc+proto":case"applecation/octet-stream":C.done({url:$request.url,headers:$request.headers,bodyBytes:$request.bodyBytes.buffer.slice($request.bodyBytes.byteOffset,$request.bodyBytes.byteLength+$request.bodyBytes.byteOffset)})}else C.done($request)}}));
