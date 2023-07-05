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
//cssへ追加
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
