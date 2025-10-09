// ==UserScript==
// @name        AmbTV CardLink
// @namespace        http://tampermonkey.net/
// @version        0.1
// @description        AbemaTV の動画ページのリンクカードを生成する
// @author        AbemaTV User
// @match        https://abema.tv/video/*
// @match        https://abema.tv/channels/*
// @match        https://abema.tv/feature/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=abema.tv
// @grant        none
// @updateURL        https://github.com/personwritep/AmbTV_CardLink/raw/main/AmbTV_CardLink.user.js
// @downloadURL        https://github.com/personwritep/AmbTV_CardLink/raw/main/AmbTV_CardLink.user.js
// ==/UserScript==


let target0=document.querySelector('head title'); // 監視 target
let monitor0=new MutationObserver(movie_page);
monitor0.observe(target0, {childList: true}); // 監視開始

movie_page();

function movie_page(){
    let tr_panel=document.querySelector('#tr_panel');
    if(tr_panel){
        tr_panel.style.display='none'; }


    if(location.search=='?avc'){
        history.replaceState(null, '', window.location.pathname);
        setTimeout(()=>{
            start();
        }, 800); }


    let nav=document.querySelector('.com-application-Header__logo');
    if(nav){
        nav.oncontextmenu=(event)=>{
            if(!event.ctrlKey && !event.shiftKey){
                event.preventDefault();
                let path=location.pathname;
                if(path.includes('/video/') || path.includes('/channels/') || path.includes('/feature/')){
                    let goto='https://abema.tv' + path +'?avc';
                    location.href=goto; }}}}

} // movie_page()



function start(){
    let help_url='https://ameblo.jp/personwritep/entry-12810297619.html';

    let help_svg=
        '<svg width="40" height="20" style="vertical-align: -6px;" '+
        'viewBox="0 0 200 200">'+
        '<path style="fill: #78909C" d="M92 14C54 19 23 44 15 82C4 135 49 '+
        '192 105 186C143 181 175 156 183 118C195 64 149 7 92 14z"></path>'+
        '<path style="fill: #fff" d="M63 69C70 67 76 64 82 61C92 58 116 58 110 '+
        '76C103 96 81 101 81 125L112 125C112 111 123 105 132 96C141 85 1'+
        '46 69 140 55C131 34 102 33 83 37C78 38 69 39 65 43C60 47 63 63 63 '+
        '69M83 143L83 169L111 169L111 143L83 143z"></path></svg>';

    let panel=
        '<li>'+
        '<div id="tr_panel">'+
        '<a href="'+ help_url + '" rel="noopener noreferrer" target="_blank">'+ help_svg +'</a>'+
        '<button id="tr_test" class="color_sw">Test</button>'+
        '<button id="tr_copy" class="color_sw">Copy</button>'+
        '<button id="tr_close" class="color_sw">✖</button>'+
        '</div>'+
        '<style>#tr_panel { position: fixed; top: 0; left: 200px; z-index: 20; '+
        'font: normal 16px/24px Meiryo; padding: 14px 20px 12px 0; '+
        'background: #fff; border: 1px solid #aaa; align-items: center; } '+
        '#tr_panel .color_sw { margin-left: 15px; padding: 2px 8px 0; height: 32px; '+
        'border: 1px solid #aaa; background: linear-gradient(transparent, #ffe082); } '+
        '#tr_panel .color_sw:hover { background: linear-gradient(#ffe082, transparent); } '+
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
    copy();
    close();


    function test(){
        let mov_url=document.querySelector("meta[property='og:url']").content;
        let tr_test=document.querySelector('#tr_test');
        if(tr_test){
            tr_test.onclick=()=>{
                window.open(mov_url, '_blank'); }}}



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
            'height: 120px; border: 1px solid #e2e2e2; border-radius: 4px; '+
            'background-color: #fff; text-decoration: none" target="_blank">'+
            '<span class="ogpCard_content" style="display: flex; flex-direction: column; '+
            'overflow: hidden; width: 100%; padding:16px">'+
            '<span class="ogpCard_title" style="-webkit-box-orient: vertical; '+
            'display: -webkit-box; -webkit-line-clamp: 2; max-height: 48px; font-size: 16px; '+
            'color:#333; text-align: left; font-weight: bold; overflow: hidden; line-height: 1.4;">'+
            video_title +'</span>'+
            '<span class="ogpCard_description" style="overflow: hidden; text-overflow: ellipsis; '+
            'font-size: 13px; color: #757575; text-align: left; white-space: nowrap; '+
            'line-height: 1.6; margin-top: 4px;">'+ video_overview +'</span>'+
            '<span class="ogpCard_url" style="display: flex; align-items: center; margin-top: auto">'+
            '<span class="ogpCard_iconWrap" style="width: 20px; height: 20px; flex-shrink: 0">'+
            '<img src="https://t1.gstatic.com/faviconV2?client=SOCIAL'+
            '&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://abema.tv&size=16" '+
            'style="vertical-align: 0; margin-right: 4px; min-width: 16px;"></span>'+
            '<span class="ogpCard_urlText" style="overflow: hidden; text-overflow: ellipsis; '+
            'white-space: nowrap; font-size: 13px; text-align: left; font-weight: bold; '+
            'color: rgb(34, 34, 34);">abema.tv</span></span></span>'+
            '<span class="ogpCard_imageWrap" style="position: relative; width: 120px; '+
            'height: 120px; flex-shrink: 0">'+
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

