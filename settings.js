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
            
            table_Attrs:[{class:'js-added-table component--table'}],
            tbody_Attrs:[],
            th_Attrs:[{class:'js-added-table-th'}],
            td_Attrs:[{class:'js-added-table-td'}]
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
            //ある場合は処理継続
            //style設定
            this.setStyle(object);
            //attributeオブジェクトを作成
            const obj = this.setAttrs(object);
            //コンテナ作成
            const tabContents_Container = create_Element('div',obj.div_Attrs);
            //コンテンツ作成
            let checkedJudge = false;
            for (let i = 0; i < obj.tab_Contents.length; i++) {
                //id生成
                const input_label_Id = 'id-' + obj.tab_Contents[i]['tabContentName'];
                //input作成
                const tab_Input = create_Element('input',obj.input_Attrs);
                tab_Input.setAttribute('id',input_label_Id);
                //label作成
                const tab_Label = create_Element('label',obj.label_Attrs);
                tab_Label.setAttribute('for',input_label_Id);
                tab_Label.textContent = obj.tab_Contents[i]['tabContentTitle'];
                //content作成
                const tab_Content = create_Element('div',obj.content_Attrs);
                
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
            
            return tabContents_Container;
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
    };
    //attributeオブジェクトの生成
    setAttrs(object) {
        //attributeオブジェクトの作成
        const tab_Obj = {
            tab_Contents:[],
            
            div_Attrs:[{class:'js-added-tab-contents'}],
            input_Attrs:[{type:'radio'},{name:'js-added-tab-input'}],
            label_Attrs:[{class:'js-added-tab-label'}],
            content_Attrs:[{class:'js-added-tab-content'}]
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
//ポップオーバーコンテンツ
class AddPopoverContents {
    constructor (object,args) {
        if(object.popover_Contents === '') {
            //コンテンツがない場合、nullを返す
            return null;
        } else {
            //ある場合は処理継続
            //style設定
            this.setStyle(object);
            //attributeオブジェクトを作成
            const obj = this.setAttrs(object);
            //コンテナ作成
            const popoverContents_Container = create_Element('div',obj.container_Attrs);
            //ボタン作成
            const popover_Button = create_Element('button',obj.button_Attrs);
            popover_Button.textContent = obj['buttonText'];
            popover_Button.addEventListener('click', (e) => this.clickHandlerValid(e));
            //要素作成
            const popover_Content = create_Element('div',obj.content_Attrs);
            popoverFocusControl(popover_Content);
            //クローズボタン
            //ポップオーバー背面クローズボタン
            const popover_Backside_Button_Close = create_Element('button',obj.button_Close_Attrs);
            popover_Backside_Button_Close.setAttribute('class','js-added-popover-content-backside-button');
            popover_Backside_Button_Close.addEventListener('click', (e) => this.clickHandlerInvalid(e));
            document.querySelector('body').appendChild(popover_Backside_Button_Close);
            //クローズボタン（×ボタン）
            const closeIcon = create_Element('span',[
                {class:'icon-close'}
            ]);
            const popover_Button_Close = create_Element('button',obj.button_Close_Attrs);
            popover_Button_Close.classList.add('component--button');
            popover_Button_Close.addEventListener('click', (e) => this.clickHandlerInvalid(e));
            popover_Button_Close.appendChild(closeIcon);
            //表示用attributeの設定・コンテンツ要素へ入れる
            if (args === null) {
                //コンテンツが空（null）の場合、disabledを設定
                popover_Button.setAttribute('disabled','');
                popoverContents_Container.appendChild(popover_Button);
            } else {
                popover_Content.appendChild(popover_Button_Close);
                popover_Content.appendChild(args);
                popoverContents_Container.appendChild(popover_Button);
                popoverContents_Container.appendChild(popover_Content);
            };
            
            return popoverContents_Container;
        };
    };
    //表示の際の処理
    clickHandlerValid (e) {
        bodyScrollPrevent(true);
        const targetSelector = 'button.js-added-popover-content-backside-button[popovertarget="' + e.currentTarget.getAttribute('popovertarget') + '"]';
        document.querySelector(targetSelector).classList.add('valid');
    };
    //非表示の際の処理
    clickHandlerInvalid (e) {
        bodyScrollPrevent(false);
        const targetSelector = 'button.js-added-popover-content-backside-button[popovertarget="' + e.currentTarget.getAttribute('popovertarget') + '"]';
        document.querySelector(targetSelector).classList.remove('valid');
    };
    //style生成
    setStyle(object) {
        //styleタグの有無を判定
        if (document.querySelector('#popover-style') !== null) {
            //あれば追加
            if (object['add_Styles']) {
                if (object['add_Styles'] !== '') {
                    document.querySelector('#popover-style').textContent += object['add_Styles'];
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
                        {id:'popover-style'}
                    ]);
                    addStyleElm.textContent += object['add_Styles'];
                    headElm.appendChild(addStyleElm);
                } else {
                };
            } else {
            };
        };
    };
    //attributeオブジェクトの生成
    setAttrs(object) {
        //attributeオブジェクトの作成
        const popover_Obj = {
            buttonText:'',
            container_Attrs:[{class:'js-added-popover'}],
            button_Attrs:[{class:'js-added-popover-button component--button'}],
            content_Attrs:[{class:'js-added-popover-content'}],
            button_Close_Attrs:[{class:'js-added-popover-close-button'}]
        };
        //コンテンツ独自のattributeを追加
        const container_Id = {};
        container_Id.id = object.contents_BaseId + '-popover';
        popover_Obj.container_Attrs.push(container_Id);
        const contents_Id = {};
        contents_Id.id = object.popover_Contents + '-popover-contents';
        popover_Obj.content_Attrs.push(contents_Id);
        const target_Id = object.popover_Contents + '-popover-contents';
        const button_Target = {};
        button_Target.popovertarget = target_Id;
        popover_Obj.button_Attrs.push(button_Target);
        const popover_Target_Action_Open = {};
        popover_Target_Action_Open.popovertargetaction = object.popover_Target_Action_Open;
        popover_Obj.button_Attrs.push(popover_Target_Action_Open);
        const button_Close_Target = {};
        button_Close_Target.popovertarget = target_Id;
        popover_Obj.button_Close_Attrs.push(button_Close_Target);
        const popover_Option = {};
        popover_Option.popover = object.popover_Option;
        popover_Obj.content_Attrs.push(popover_Option);
        const popover_Target_Action_Close = {};
        popover_Target_Action_Close.popovertargetaction = object.popover_Target_Action_Close;
        popover_Obj.button_Close_Attrs.push(popover_Target_Action_Close);
        
        popover_Obj.buttonText　= object.buttonText;
        
        return popover_Obj;
    };
};
//--------------------draft--------------------
//const ********** = new AddPopoverContents(
    //{
        //contents_BaseId:'',
        //popover_Contents:'',
        //popover_Option:'',
        //popover_Target_Action_Open:'',
        //popover_Target_Action_Close:'',
        //buttonText:'',
        //add_Styles:`
        //`
    //},
    //*******
//);
//--------------------------------------------------


const testTable = new AddTable(
    {
        table_BaseId:'test',
        table_Contents:[
            [{th:'テスト'},{td:['テスト']}],
            [{th:'テスト'},{td:['テスト']}]
        ],
        add_Styles:``
    }
);
document.querySelector('.detail_btm').appendChild(testTable);

const testTabContents = new AddTabContents(
    {
        contents_BaseId:'test',
        tab_Contents:[
            {tabContentTitle:'test1',tabContentName:'test1'},
            {tabContentTitle:'test2',tabContentName:'test2'}
        ],
        add_Styles:``
    },
    null,
    null
);
document.querySelector('.detail_btm').appendChild(testTabContents);

const test_p = create_Element('p',[]);
test_p.textContent = 'test';
const testPopoverContents = new AddPopoverContents(
    {
        contents_BaseId:'test',
        popover_Contents:'test',
        popover_Option:'auto',
        popover_Target_Action_Open:'show',
        popover_Target_Action_Close:'hide',
        buttonText:'test',
        add_Styles:``
    },
    test_p
);
document.querySelector('.detail_btm').appendChild(testPopoverContents);
