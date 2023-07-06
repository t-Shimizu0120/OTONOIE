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
//スクロールジャンク対策
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
//=================================================================
//class
//=================================================================   
//テーブル
class AddTable {
    constructor (object,...args) {
        //コンテンツの有無を判定
        if(object.table_Contents.length === 0) {
            //無い場合はnullを返す
            return null;
        } else {
            //ある場合は処理継続
            //styleタグの有無を判定
            if (document.querySelector('#table-style') != null) {
                //あれば追加
                const style = document.querySelector('#table-style');
                style.textContent += object['add_Styles'];
            } else {
                //無ければ作成・追加
                this.setStyle(object);
            };
            //attribute用のオブジェクトの作成
            const obj = this.setAttrs(object);
            //テーブルタグのattribute設定
            const add_Elm_table = document.createElement('table');
            for (this.table_Attr of obj.table_Attrs) {
                const table_AttrName = Object.keys(this.table_Attr)[0];
                const table_AttrValue = this.table_Attr[table_AttrName];
                add_Elm_table.setAttribute(table_AttrName,table_AttrValue);
            };
            //tbodyタグ作成
            const add_Elm_tbody = document.createElement('tbody');
            for (this.tbody_Attr of obj.tbody_Attrs) {
                const tbody_AttrName = Object.keys(this.tbody_Attr)[0];
                const tbody_AttrValue = this.tbody_Attr[tbody_AttrName];
                add_Elm_tbody.setAttribute(tbody_AttrName,tbody_AttrValue);
            };
            //tr、th、tdタグの作成・値の代入
            for (this.tableRow of obj.table_Contents){
                //tr作成
                const add_Elm_tr = document.createElement('tr');
                for (this.rowItem of this.tableRow) {
                    //キー名を取得
                    const items_KeyName = Object.keys(this.rowItem)[0];
                    //キーの値に応じて要素作成、キーの値でバリューを取得・設定
                    if (items_KeyName === 'th') {
                        const add_Elm_th = document.createElement(items_KeyName);
                        for (this.th_Attr of obj.th_Attrs) {
                            const th_AttrName = Object.keys(this.th_Attr)[0];
                            const th_AttrValue = this.th_Attr[th_AttrName];
                            add_Elm_th.setAttribute(th_AttrName,th_AttrValue);
                        };
                        const add_Elm_th_Value = this.rowItem[items_KeyName];
                        add_Elm_th.textContent = add_Elm_th_Value;
                        add_Elm_tr.appendChild(add_Elm_th);
                    //tdの場合、リストを作成
                    } else if (items_KeyName === 'td') {
                        if (this.rowItem[items_KeyName].length === 0) {
                        } else {
                            const add_Elm_td = document.createElement(items_KeyName);
                            for (this.td_Attr of obj.td_Attrs) {
                                const td_AttrName = Object.keys(this.td_Attr)[0];
                                const td_AttrValue = this.td_Attr[td_AttrName];
                                add_Elm_td.setAttribute(td_AttrName,td_AttrValue);
                            };
                            const ul = document.createElement('ul');
                            for(let i = 0; i < this.rowItem[items_KeyName].length; i++) {
                                const li = document.createElement('li');
                                li.textContent = this.rowItem[items_KeyName][i];
                                ul.appendChild(li);
                            };
                            add_Elm_td.appendChild(ul);
                            add_Elm_tr.appendChild(add_Elm_td);
                        };
                    };
                };
                //tbodyへtrを追加
                add_Elm_tbody.appendChild(add_Elm_tr);
            };
            //tbodyをtableへ追加
            add_Elm_table.appendChild(add_Elm_tbody);
            return add_Elm_table;
        };
    };
    setStyle(object) {
        //styleタグの追加
        const headElm = document.querySelector('head');
        const addStyleElm = create_Element('style',[
            {id:'table-style'}
        ]);
        const addStyles = object['add_Styles'];
        const style = `${addStyles}`;
        addStyleElm.textContent = style;
        headElm.appendChild(addStyleElm);
    };
    setAttrs(object) {
        //attributeオブジェクトの作成
        const table_Obj = {
            //contents_Title:'',
            table_Contents:[],
            
            table_Attrs:[{class:'js-added-table'}],
            tbody_Attrs:[],
            th_Attrs:[{class:'js-added-table-th'}],
            td_Attrs:[{class:'js-added-table-td'}],
            //add_To_Selector:''
        };
        //table_Obj.contents_Title = object.contents_Title;
        const table_Contents = object.table_Contents;
        for (this.table_Content of table_Contents) {
            table_Obj.table_Contents.push(this.table_Content);
        };
        //ベースIdからidを生成
        const table_Id = {};
        table_Id.id = object.table_BaseId + '-table';
        table_Obj.table_Attrs.push(table_Id);
        //table_Obj.add_To_Selector = object.add_To_Selector;
        
        return table_Obj;
    };
};
//--------------------draft--------------------
//const ********** = new AddTable(
    //{
        ////contents_Title:'',
        //table_BaseId:'',
        //table_Contents:[
            //[{th:''},{td:['']}], ※行
            //[{th:''},{td:['']}] ※行
        //],
        //add_Styles:`
        //`, 
        ////add_To_Selector:''
    //},
    //*******,
    //*******
//);
//--------------------------------------------------
const aaa = new AddTable(
    {
        table_BaseId:'',
        table_Contents:[
            [{th:'概要'},{td:['あああああ']}]
        ],
        add_Styles:`
        `
    },
    null
);
