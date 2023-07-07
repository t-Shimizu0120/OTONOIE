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
settings['mask'] = true;
//コントロール用配列
settings['site_control'] = {};
//初期費用表示（初期費用を表示させるかどうか）
settings['site_control']['initialcost'] = 'true';
////地図表示（地図を表示させるかどうか）
settings['site_control']['map'] = 'false';
////地図完全住所表示（地図を完全住所で表示させるかどうか）
settings['site_control']['map_full_address'] = 'false';
//=================================================================
//media
//=================================================================
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
//スクロールジャンク対策
//=================================================================
document.addEventListener('mousewheel', function () {}, {passive: true});
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
    constructor (object) {
        //コンテンツの有無を判定
        if(object.table_Contents.length === 0) {
            //無い場合はnullを返す
            return null;
        } else {
            //ある場合は処理継続
            //style設定
            this.setStyle(object);
            //attributeオブジェクトを作成
            const obj = this.setAttrs(object);
            //テーブルタグ作成
            const add_Elm_table = create_Element('table',obj.table_Attrs);
            //tbodyタグ作成
            const add_Elm_tbody = create_Element('tbody',obj.tbody_Attrs);
            //tr、th、tdタグの作成・値の代入
            for (this.tableRow of obj.table_Contents){
                //tr作成
                const add_Elm_tr = create_Element('tr',[]);
                for (this.rowItem of this.tableRow) {
                    //キー名を取得
                    const items_KeyName = Object.keys(this.rowItem)[0];
                    //キーの値に応じて要素作成、キーの値でバリューを取得・設定
                    if (items_KeyName === 'th') {
                        const add_Elm_th = create_Element(items_KeyName,obj.th_Attrs);
                        const add_Elm_th_Value = this.rowItem[items_KeyName];
                        add_Elm_th.textContent = add_Elm_th_Value;
                        add_Elm_tr.appendChild(add_Elm_th);
                    //tdの場合、リストを作成
                    } else if (items_KeyName === 'td') {
                        if (this.rowItem[items_KeyName].length === 0) {
                        } else {
                            const add_Elm_td = create_Element(items_KeyName,obj.td_Attrs);
                            const ul = create_Element('ul',[]);
                            for(let i = 0; i < this.rowItem[items_KeyName].length; i++) {
                                const li = create_Element('li',[]);
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
        //styleタグの有無を判定
        if (document.querySelector('#table-style') !== null) {
            //あれば追加
            if (object['add_Styles']) {
                if (object['add_Styles'] !== '') {
                    document.querySelector('#table-style').textContent += object['add_Styles'];
                } else {
                };
            } else {
            };
        } else {
            //無ければ作成
            if (object['add_Styles']) {
                if (object['add_Styles'] !== '') {
                    //styleタグ作成
                    const headElm = document.querySelector('head');
                    const addStyleElm = create_Element('style',[
                        {id:'table-style'}
                    ]);
                    addStyleElm.textContent += object['add_Styles'];
                    headElm.appendChild(addStyleElm);
                } else {
                };
            } else {
            };
        };
    };
    setAttrs(object) {
        //attributeオブジェクトの作成
        const table_Obj = {
            table_Contents:[],
            
            table_Attrs:[{class:'js-added-table'}],
            tbody_Attrs:[],
            th_Attrs:[{class:'js-added-table-th'}],
            td_Attrs:[{class:'js-added-table-td'}],
        };
        const table_Contents = object.table_Contents;
        for (this.table_Content of table_Contents) {
            table_Obj.table_Contents.push(this.table_Content);
        };
        //ベースIdからidを生成
        const table_Id = {};
        table_Id.id = object.table_BaseId + '-table';
        table_Obj.table_Attrs.push(table_Id);
        
        return table_Obj;
    };
};
//--------------------draft--------------------
//const ********** = new AddTable(
    //{
        //table_BaseId:'',
        //table_Contents:[
            //[{th:''},{td:['']}], ※行
            //[{th:''},{td:['']}] ※行
        //],
        //add_Styles:`
        //`
    //}
//);
//--------------------------------------------------
//タブコンテンツ
class AddTabContents {
    constructor (object,...args) {
        if(object.tab_Contents.length === 0) {
            //コンテンツがない場合、nullを返す
            return null;
        } else {
            //style設定
            this.setStyle(object);
            //attributeオブジェクトを作成
            const obj = this.setAttrs(object);
            //コンテナ作成
            const tabContents_Container = document.createElement('div');
            //add_tabContents.setAttribute('class','js-added-tab-contents');
            for (this.div_Attr of obj.div_Attrs) {
                const div_AttrName = Object.keys(this.div_Attr)[0];
                const div_AttrValue = this.div_Attr[div_AttrName];
                tabContents_Container.setAttribute(div_AttrName,div_AttrValue);
            };
            //コンテンツ作成
            let checkedJudge = false;
            for (let i = 0; i < obj.tab_Contents.length; i++) {
                //id生成
                const input_label_Id = 'id-' + obj.tab_Contents[i]['tabContentName'];
        
                //input作成
                const tab_Input = document.createElement('input');
                for (this.input_Attr of obj.input_Attrs) {
                    const input_AttrName = Object.keys(this.input_Attr)[0];
                    const input_AttrValue = this.input_Attr[input_AttrName];
                    tab_Input.setAttribute(input_AttrName,input_AttrValue);
                };
                tab_Input.setAttribute('id',input_label_Id);
        
                //label作成
                const tab_Label = document.createElement('label');
                for (this.label_Attr of obj.label_Attrs) {
                    const label_AttrName = Object.keys(this.label_Attr)[0];
                    const label_AttrValue = this.label_Attr[label_AttrName];
                    tab_Label.setAttribute(label_AttrName,label_AttrValue);
                };
                tab_Label.setAttribute('for',input_label_Id);
                tab_Label.textContent = obj.tab_Contents[i]['tabContentTitle'];
        
                //content作成
                const tab_Content = document.createElement('div');
                for (this.content_Attr of obj.content_Attrs) {
                    const content_AttrName = Object.keys(this.content_Attr)[0];
                    const content_AttrValue = this.content_Attr[content_AttrName];
                    tab_Content.setAttribute(content_AttrName,content_AttrValue);
                };
        
                //表示用attributeの設定・コンテンツ要素へ入れる
                if (args[i] === null) {
                    //コンテンツが空（null）の場合、disabledを設定
                    tab_Input.setAttribute('disabled','');
                } else if (checkedJudge === false) {
                    //コンテンツが空（null）以外の最初のコンテンツにCheckedを設定
                    tab_Input.setAttribute('checked','');
                    //Checkedを設定した場合、checkedJudgeをtrueへ変更
                    checkedJudge = true;
                    tab_Content.appendChild(args[i]);
                } else {
                    tab_Content.appendChild(args[i]);
                };
                tabContents_Container.appendChild(tab_Input);
                tabContents_Container.appendChild(tab_Label);
                tabContents_Container.appendChild(tab_Content);
            };
        
            if (obj.add_To_Selector === '') {
                return tabContents_Container;
            } else {
                const targetElm = document.querySelector(obj.add_To_Selector);
                if (obj['contents_Title'] === '') {
                    targetElm.appendChild(tabContents_Container);
                } else {
                    //タイトル作成
                    const tab_Contents_Title = document.createElement('h5');
                    tab_Contents_Title.textContent = obj['contents_Title'];
                    
                    targetElm.appendChild(tab_Contents_Title);
                    targetElm.appendChild(tabContents_Container);
                };
            };
        };
    };
    //style生成
    setStyle(object) {
        //コンテンツ数からタブの幅（％）を設定
        const tabCount = (() => {
            if (object['tab_Contents'].length <= 3) {
                return 3;
            } else {
                return object['tab_Contents'].length;
            };
        })();
        const tabWidthBase = Math.trunc((100 / Number(tabCount)) * 1000) / 1000;
        const containerId = object['contents_BaseId'] + '-tab-contents';
        //styleタグの有無を判定
        if (document.querySelector('#tab-style') !== null) {
            //あれば追加
            document.querySelector('#tab-style').textContent += `
#${containerId} > label {
    flex: 0 0 ${tabWidthBase}%;
}
            `;
            if (object['add_Styles']) {
                if (object['add_Styles'] !== '') {
                    document.querySelector('#tab-style').textContent += object['add_Styles'];
                } else {
                };
            } else {
            };
        } else {
            //無ければ作成
            //styleタグの追加
            const headElm = document.querySelector('head');
            const addStyleElm = create_Element('style',[
                {id:'tab-style'}
            ]);
            addStyleElm.textContent += `
#${containerId} > label {
    flex: 0 0 ${tabWidthBase}%;
}
            `;
            if (object['add_Styles']) {
                if (object['add_Styles'] !== '') {
                    addStyleElm.textContent += object['add_Styles'];
                } else {
                };
            } else {
            };
            headElm.appendChild(addStyleElm);
        };
        //style
        const style = `
            .js-added-tab-contents {
                width:100%;
                flex-wrap: wrap;
                display: flex;
                margin-bottom: 20px;
            }
            input[name="js-added-tab-input"] {
                display: none;
            }
            .js-added-tab-label {
                background-color:#dddddd; 
                color:#3f3f3f; 
                text-align:center;
                padding: 1rem 0; 
                font-weight:bold;
                cursor:pointer;
                display: block;
                float: left;
                order: -1;
            }
            input:checked + .js-added-tab-label {
                background-color: #3f3f3f;
                color: #eee;
                pointer-events:none;
            }
            input:disabled + .js-added-tab-label {
                opacity:.6;
                pointer-events:none;
            }
            .js-added-tab-label:hover {
                opacity:.6;
            }
            input:checked + .js-added-tab-label:hover {
                opacity:1;
            }
            input:disabled + .js-added-tab-label:hover {
                opacity:1;
            }
            .js-added-tab-content {
                display: none;
                width: 100%;
            }
            input:checked + .js-added-tab-label + .js-added-tab-content {
                display: block;
            }
        `;
    };
    //attributeオブジェクトの生成
    setAttrs(object) {
        //attributeオブジェクトの作成
        const tab_Obj = {
            tab_Contents:[],
            
            div_Attrs:[{class:'js-added-tab-contents'}],
            input_Attrs:[{type:'radio'},{name:'js-added-tab-input'}],
            label_Attrs:[{class:'js-added-tab-label'}],
            content_Attrs:[{class:'js-added-tab-content'}],
        };
        const tab_Contents = object.tab_Contents;
        for (this.tab_Content of tab_Contents) {
            tab_Obj.tab_Contents.push(this.tab_Content);
        };
        const div_Id = {};
        div_Id.id = object.contents_BaseId + '-tab-contents';
        tab_Obj.div_Attrs.push(div_Id);
    
        return tab_Obj;
    };
};
//--------------------draft--------------------
//const ********** = new AddTabContents(
    //{
        //contents_BaseId:'',
        //tab_Contents:[
            //{tabContentTitle:'',tabContentName:''},
            //{tabContentTitle:'',tabContentName:''}
        //],
        //add_Styles:`
        //`
    //},
    //*******,
    //*******
//);
//--------------------------------------------------
const bbb = new AddTabContents(
    {
        contents_BaseId:'aaaaaaa',
        tab_Contents:[
            {tabContentTitle:'aaa',tabContentName:'aaa'},
            {tabContentTitle:'sss',tabContentName:'sss'}
        ],
        add_Styles:`
        `
    },
    null,
    null
);
document.querySelector('.detail_btm').appendChild(bbb);
