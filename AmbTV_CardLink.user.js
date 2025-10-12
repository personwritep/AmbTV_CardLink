// ==UserScript==
// @name        AmbTV CardLink
// @namespace        http://tampermonkey.net/
// @version        0.3
// @description        AbemaTV の動画ページのリンクカードを生成する
// @author        AbemaTV User
// @match        https://abema.tv/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=abema.tv
// @grant        none
// @updateURL        https://github.com/personwritep/AmbTV_CardLink/raw/main/AmbTV_CardLink.user.js
// @downloadURL        https://github.com/personwritep/AmbTV_CardLink/raw/main/AmbTV_CardLink.user.js
// ==/UserScript==


let dark=sessionStorage.getItem('ATV_Card_d'); // カードデザインのダークモード
if(!dark){
    dark=0; }
sessionStorage.setItem('ATV_Card_d', dark);

let ratio=sessionStorage.getItem('ATV_Card_r'); // カードのサムネイル縦横比
if(!ratio){
    ratio=0; }
sessionStorage.setItem('ATV_Card_r', ratio);


let delete_active=0;
setTimeout(()=>{
    delete_active=1; // リロード後2secで有効になる
}, 2000);



let target0=document.querySelector('head title'); // 監視 target
let monitor0=new MutationObserver(movie_page);
monitor0.observe(target0, {childList: true}); // 監視開始

movie_page();

function movie_page(){
    let tr_panel=document.querySelector('#tr_panel');
    if(tr_panel){
        if(delete_active==1){
            tr_panel.style.display='none'; }} // コンテンツ変更でパネルを消す


    let nav=document.querySelector('.com-application-Header__logo');
    if(nav){
        nav.oncontextmenu=(event)=>{
            if(!event.ctrlKey && !event.shiftKey){
                event.preventDefault();
                let path=location.pathname;
                if(path.includes('/video/') || path.includes('/channels/') || path.includes('/feature/')){
                    let goto='https://abema.tv' + path +'?avc';
                    location.href=goto; }}}}


    if(location.search=='?avc'){
        history.replaceState(null, '', window.location.pathname);
        setTimeout(()=>{
            start();
        }, 200); }

} // movie_page()



function start(){
    let help_url='https://ameblo.jp/personwritep/entry-12937715892.html';

    let help_svg=
        '<svg width="40" height="20" style="vertical-align: -5px;" '+
        'viewBox="0 0 200 200">'+
        '<path style="fill: #78909C" d="M92 14C54 19 23 44 15 82C4 135 49 '+
        '192 105 186C143 181 175 156 183 118C195 64 149 7 92 14z"></path>'+
        '<path style="fill: #fff" d="M63 69C70 67 76 64 82 61C92 58 116 58 110 '+
        '76C103 96 81 101 81 125L112 125C112 111 123 105 132 96C141 85 1'+
        '46 69 140 55C131 34 102 33 83 37C78 38 69 39 65 43C60 47 63 63 63 '+
        '69M83 143L83 169L111 169L111 143L83 143z"></path></svg>';

    let sq0_svg=
        '<svg class="sq0" viewBox="0 0 800 800" width="20" height="20">'+
        '<rect width="600" height="600" x="100" y="100" fill="none" '+
        'stroke-width="20" stroke="#000" /></svg>';

    let sq1_svg=
        '<svg class="sq1" viewBox="0 0 800 800" width="20" height="20">'+
        '<rect width="600" height="600" x="100" y="100" fill="#000" '+
        'stroke-width="20" stroke="#000" /></svg>';

    let tm0_svg=
        '<svg class="tm0" viewBox="0 0 200 80" width="50" height="20">'+
        '<rect width="180" height="60" x="10" y="10" fill="none" stroke-width="2" stroke="#000" />'+
        '<rect width="60" height="60" x="130" y="10" fill="#61afaf" stroke-width="2" stroke="#000" />'+
        '</svg>';

    let tm1_svg=
        '<svg class="tm1" viewBox="0 0 200 80" width="50" height="20">'+
        '<rect width="180" height="60" x="10" y="10" fill="none" stroke-width="2" stroke="#000" />'+
        '<rect width="80" height="60" x="110" y="10" fill="#61afaf" stroke-width="2" stroke="#000" />'+
        '</svg>';

    let panel=
        '<li>'+
        '<div id="tr_panel">'+
        '<a href="'+ help_url + '" rel="noopener noreferrer" target="_blank">'+ help_svg +'</a>'+
        '<button id="tr_test" class="color_sw">Test</button>'+
        '<button id="tr_dark" class="color_sw">'+ sq0_svg + sq1_svg +'</button>'+
        '<button id="tr_thum" class="color_sw">'+ tm0_svg + tm1_svg +'</button>'+
        '<button id="tr_copy" class="color_sw">Copy</button>'+
        '<button id="tr_close" class="color_sw">✖</button>'+
        '</div>'+
        '<style>#tr_panel { position: fixed; top: 0; left: 200px; z-index: 200; '+
        'font: normal 16px/24px Meiryo; padding: 14px 20px 12px 0; '+
        'background: #fff; border: 1px solid #aaa; align-items: center; } '+
        '#tr_panel .color_sw { margin-left: 15px; padding: 2px 8px 0; height: 32px; '+
        'border: 1px solid #aaa; background: linear-gradient(transparent, #ffe082); } '+
        '#tr_panel .color_sw:hover { background: linear-gradient(#ffe082, transparent); } '+
        '#tr_panel a { margin-right: -10px; } '+
        '#tr_dark, #tr_thum { padding: 5px 0 0 !important; vertical-align: -4px; } '+
        'svg.sq1 { display: none; } '+
        'svg.tm1 { display: none; } '+
        '</style>'+
        '</li>';

    if(!document.querySelector('#tr_panel')){
        document.body.insertAdjacentHTML('beforeend', panel); }


    let tr_panel=document.querySelector('#tr_panel');
    if(tr_panel){
        main(); }

} // start()



function main(){
    test();
    set_color();
    set_thum();
    copy();
    close();


    function test(){
        let mov_url=document.querySelector("meta[property='og:url']").content;
        let tr_test=document.querySelector('#tr_test');
        if(tr_test){
            tr_test.onclick=()=>{
                window.open(mov_url, '_blank'); }}}



    function set_color(){
        let tr_dark=document.querySelector('#tr_dark');
        let sq0=document.querySelector('svg.sq0');
        let sq1=document.querySelector('svg.sq1');
        if(tr_dark && sq0 && sq1){
            if(dark==0){
                sq0.style.display='inline-block';
                sq1.style.display='none'; }
            else{
                sq0.style.display='none';
                sq1.style.display='inline-block'; }

            tr_dark.onclick=()=>{
                if(dark==0){
                    dark=1;
                    sq0.style.display='none';
                    sq1.style.display='inline-block'; }
                else{
                    dark=0;
                    sq0.style.display='inline-block';
                    sq1.style.display='none'; }

                sessionStorage.setItem('ATV_Card_d', dark); }}}



    function set_thum(){
        let tr_thum=document.querySelector('#tr_thum');
        let tm0=document.querySelector('svg.tm0');
        let tm1=document.querySelector('svg.tm1');
        if(tr_thum && tm0 && tm1){
            if(ratio==0){
                tm0.style.display='inline-block';
                tm1.style.display='none'; }
            else{
                tm0.style.display='none';
                tm1.style.display='inline-block'; }

            tr_thum.onclick=()=>{
                if(ratio==0){
                    ratio=1;
                    tm0.style.display='none';
                    tm1.style.display='inline-block'; }
                else{
                    ratio=0;
                    tm0.style.display='inline-block';
                    tm1.style.display='none'; }

                sessionStorage.setItem('ATV_Card_r', ratio); }}}



    function copy(){
        let copy_text;
        let tr_copy=document.querySelector('#tr_copy');
        if(tr_copy){
            tr_copy.onclick=()=>{
                if (navigator.clipboard){ // copyToClipboardを実行
                    copy_text=creat_card();
                    navigator.clipboard.writeText(copy_text);

                    tr_copy.textContent='copied';
                    setTimeout(()=>{
                        tr_copy.textContent='Copy'; }, 1000); }}}}



    function creat_card(){
        let mov_url=document.querySelector("meta[property='og:url']").content;
        let video_title='動画タイトル';
        let video_overview='動画説明';
        let video_img_src;

        video_title=document.querySelector("meta[property='og:title']").content;
        video_title=video_title.replace('| 無料動画・見逃し配信を見るなら | ABEMA', '/ AbemaTV');
        video_overview=document.querySelector("meta[property='og:description']").content;
        video_img_src=document.querySelector("meta[property='og:image']").content;

        let card_html=
            '<div class="ogpCard_root">'+
            '<article class="ogpCard_wrap" '+
            'contenteditable="false" style="display: inline-block; max-width: 100%">'+
            '<a class="ogpCard_link" data-ogp-card-log="" href="'+ mov_url +
            '" rel="noopener noreferrer" style="display: flex; justify-content: space-between; '+
            'overflow: hidden; box-sizing: border-box; width: 620px; max-width: 100%; '+
            'height: 120px; border: 1px solid ';

        if(dark==0){
            card_html +='#bbb; border-radius: 4px; background-color: #fff; '+
                'text-decoration: none" target="_blank">'; }
        else{
            card_html +='#0080ba; border-radius: 4px; background-color: #000; '+
                'text-decoration: none; color: #fff;" target="_blank">'; }

        card_html +=
            '<span class="ogpCard_content" style="display: flex; flex-direction: column; '+
            'overflow: hidden; width: 100%; padding:12px 16px 8px">'+
            '<span class="ogpCard_title" style="-webkit-box-orient: vertical; '+
            'display: -webkit-box; -webkit-line-clamp: 2; max-height: 44px; '+
            'font: bold 16px/1.25 Meiryo; text-align: left; overflow: hidden; flex-shrink: 0; ';

        if(dark==0){
            card_html +='color: #333;">'; }
        else{
            card_html +='color: #fff;">'; }

        card_html +=video_title +'</span>'+
            '<span class="ogpCard_description" style="overflow: hidden; '+
            'font: normal 13px/1.4 Meiryo; text-align: left; margin: 1px 0 0; ';

        if(dark==0){
            card_html +='color: #777;">'; }
        else{
            card_html +='color: #eee;">'; }

        card_html +=video_overview +'</span>'+
            '<span class="ogpCard_url" style="display: flex; align-items: center; '+
            'margin: auto -15px 0 15px; padding-top: 3px;">'+
            '<span class="ogpCard_iconWrap" style="width: 20px; height: 20px; flex-shrink: 0">'+
            '<img src="https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON'+
            '&fallback_opts=TYPE,SIZE,URL&url=https://abema.tv&size=16" '+
            'style="vertical-align: 0; margin-right: 4px; min-width: 16px;"></span>'+
            '<span class="ogpCard_urlText" style="overflow: hidden; font-size: 13px; '+
            'text-align: left; font-weight: bold; color: #222;">';

        if(dark==0){
            card_html +='abema.tv'; }
        else{
            card_html +='<span style="color:#ff0000;">abema.tv</span>'; }

        card_html +='</span></span></span>'+
            '<span class="ogpCard_imageWrap" style="position: relative; ';

        if(ratio==0){
            card_html +='width: 120px; '; }
        else{
            card_html +='width: 215px; '; }

        card_html +='height: 120px; flex-shrink: 0; right: -2px;">'+
            '<img alt="card image" class="ogpCard_image" '+
            'data-ogp-card-image="" height="120" loading="lazy" src="'+ video_img_src +
            '" style="position: absolute; top: 50%; left: 50%; object-fit: cover; height: 100%; '+
            'width: 100%; transform: translate(-50%,-50%)" width="120"></span></a>'+
            '</article></div>';

        return card_html;

    } // creat_card()



    function close(){
        let tr_panel=document.querySelector('#tr_panel');
        let tr_close=document.querySelector('#tr_close');
        if(tr_panel && tr_close){
            tr_close.onclick=()=>{
                tr_panel.style.display='none'; }}}

} // main()

