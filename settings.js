//=================================================================
//基本データ
//=================================================================
const settings = {};
settings['company_data'] = {};
//サイト名
settings['company_data']['site_name'] = 'otonoie';
settings['company_data']['site_namejp'] = 'オトノイエ';
//URL
settings['company_data']['site_url'] = 'https://www.otonoie.net';
//会社名
settings['company_data']['company_name'] = '株式会社トータルメディエイト';
//所在地
settings['company_data']['company_address'] = '東京都北区上十条2-25-4 榎本ビル1F';
//電話番号
settings['company_data']['tel_number'] = '0359485411';
settings['company_data']['telNumber_display'] = '03-5948-5411';
//営業時間
settings['company_data']['business_hours'] = '受付時間 10:00～17:00（水曜定休）';
//=================================================================
//コンテンツコントロール
//=================================================================
//マスク適用
settings['mask'] = 'true';
//MEDIA設定
settings['media'] = {};
//ブレイクポイント設定
const breakpoint_s = '375px';
const breakpoint_m = '750px';
const breakpoint_l = '';
const breakpoint_ll = '';
//sp
settings['media']['s'] = `max-width:${breakpoint_s}`;
//tablet
settings['media']['m'] = `max-width:${breakpoint_m}`;
//pc-s
settings['media']['l'] = `max-width:${breakpoint_l}`;
//pc-l
settings['media']['ll'] = `max-width:${breakpoint_ll}`;
//コントロール用配列
settings['site_control'] = {};
//初期費用表示（初期費用を表示させるかどうか）
settings['site_control']['initialcost'] = 'true';
////地図表示（地図を表示させるかどうか）
settings['site_control']['map'] = 'false';
////地図完全住所表示（地図を完全住所で表示させるかどうか）
settings['site_control']['map_full_address'] = 'false';
//=================================================================
//スクロールジャンクの回避
//=================================================================
document.addEventListener('mousewheel', function() {}, {passive: true});
//=================================================================
//style設定
//=================================================================
(() => {
    const root = document.querySelector(':root');
    root.style.setProperty('--media-bp-s',breakpoint_s);
    root.style.setProperty('--media-bp-m',breakpoint_m);
    root.style.setProperty('--media-bp-l',breakpoint_l);
    root.style.setProperty('--media-bp-ll',breakpoint_ll);
})();
//=================================================================
//関数
//=================================================================
//要素作成
const create_Element = (tagName,attributes) => {
    const add_Elm = document.createElement(tagName);
    for (attribute of attributes) {
        const attrName = Object.keys(attribute)[0];
        const attrValue = attribute[attrName];
        add_Elm.setAttribute(attrName,attrValue);
    };
    return add_Elm;
};
//スクロール制御（POPOVER）
const bodyScrollPrevent = (flag) => {
    let scrollPosition;
    const body = document.getElementsByTagName('body')[0];
    const pageTop_Button = document.getElementById('pagetop');
    //スクロールバーの幅
    const scrollBarWidth = window.innerWidth - document.body.clientWidth;
    if (flag) {
        body.style.paddingRight = scrollBarWidth + 'px';
        scrollPosition = -window.pageYOffset;
        body.style.position = 'fixed';
        body.style.width = '100%';
        body.style.top = scrollPosition + 'px';
        pageTop_Button.style.marginRight = scrollBarWidth + 'px';
    } else {
        if (body.hasAttribute('style') == true && body.getAttribute('style') !== '') {
            body.style.paddingRight = '';
            scrollPosition = body.style.top.replace('px','').replace('-','');
            body.style.position = '';
            body.style.width = '';
            body.style.top = '';
            pageTop_Button.style.marginRight = '';
            window.scrollTo(0, scrollPosition);
        } else {
        };
    };
};
//フォーカス制御（POPOVER）
const popoverFocusControl = (popoverElm) => {
    //popover内のフォーカス可能な要素の一覧
    const focusableElementsSelector = 'a[href], area[href], input:not([disabled], [type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex="0"], [contenteditable]';
    popoverElm.addEventListener("keydown", function (e) {
        // タブキーが押された時
        if (e.key === 'Tab') {
            e.preventDefault();
            // popover要素内のフォーカス可能な要素の一覧を取得
            const focusableElements = Array.from(
                popoverElm.querySelectorAll(focusableElementsSelector)
            );
            // 現在のフォーカス位置を取得
            const focusedItemIndex = focusableElements.indexOf(document.activeElement);
            // shiftキーと同時に押されてた場合
            if (e.shiftKey) {
                if (focusedItemIndex === 0) {
                    // 現在のフォーカスが最初の要素の場合、最後の要素にフォーカスを移動
                    focusableElements[focusableElements.length - 1].focus();
                } else {
                    // 現在のフォーカスが最初の要素以外の場合、前の要素にフォーカスを移動
                    focusableElements[focusedItemIndex - 1].focus();
                };
            } else {
                if (focusedItemIndex === focusableElements.length - 1) {
                    // 現在のフォーカスが最後の要素の場合、最初の要素にフォーカスを移動
                    focusableElements[0].focus();
                } else {
                    // 現在のフォーカスが最後の要素以外の場合、次の要素にフォーカスを移動
                    focusableElements[focusedItemIndex + 1].focus();
                };
            };
        } else {
        };
    });
};
