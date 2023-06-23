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
settings['site_control'] = {};
//初期費用表示（初期費用を表示させるかどうか）
settings['site_control']['initialcost'] = 'true';
////地図表示（地図を表示させるかどうか）
settings['site_control']['map'] = 'false';
////地図完全住所表示（地図を完全住所で表示させるかどうか）
settings['site_control']['map_full_address'] = 'false';
//=================================================================
//ベースstyle（全ページ共通）
//=================================================================
(() => {
    const addStyleElm = document.createElement('style');
    addStyleElm.setAttribute('id','base-style');
    const style = `
        @media screen and (max-width:750px) {
            header {
                position:initial;
            }
            #content_wrap {
                padding:0;
            }
        }
    `;
    addStyleElm.textContent = style;
    const headElm = document.querySelector('head');
    headElm.appendChild(addStyleElm);
})();
//カナ自動入力
//if (document.querySelector('#contact_area') != null) {
    //const autokana_Elm = document.createElement('script');
    //autokana_Elm.setAttribute('defer','');
    //autokana_Elm.src = 'https://cdn.jsdelivr.net/npm/vanilla-autokana@1.3.0/dist/autokana.min.js';
    //const headElm = document.querySelector('head');
    //headElm.appendChild(autokana_Elm);
    
    //const targetInput = document.querySelector('#contact_area').querySelectorAll('input.input01');
    //targetInput[0].setAttribute('id','inquiry-name');
    //targetInput[1].setAttribute('id','inquiry-kana');
    
    //document.addEventListener("DOMContentLoaded", function() {
        //AutoKana.bind('#inquiry-name', '#inquiry-kana', { katakana: true });
    //});
//} else {
//};
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
            //コンテンツタイトルの作成
            if (obj['contents_Title'] === '') {
            } else {
                const table_Contents_Title = document.createElement('h5');
                table_Contents_Title.textContent = obj['contents_Title'];
            };
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
                
            //追加先の設定があれば追加する
            if (obj.add_To_Selector === '') {
                return add_Elm_table;
            } else {
                const targetElm = document.querySelector(obj.add_To_Selector);
                if (obj['contents_Title'] === '') {
                    targetElm.appendChild(add_Elm_table);
                } else {
                    targetElm.appendChild(table_Contents_Title);
                    targetElm.appendChild(add_Elm_table);
                };
            };
        };
    };
    setStyle(object) {
        //styleタグの追加
        const headElm = document.querySelector('head');
        const addStyleElm = document.createElement('style');
        addStyleElm.setAttribute('id','table-style');
        const addStyles = object['add_Styles'];
        const style = `
            .js-added-font-size {
                font-size:1.2rem; 
            } 
            .js-added-table {
                border:1px #3f3f3f solid;
            } 
            .js-added-table-th {
                background-color:#dddddd; 
                color:#3f3f3f;
                text-align:center; 
                vertical-align:middle;
            } 
            .js-added-table-td {
                vertical-align: top;
            }
            .js-added-table-th, .js-added-table-td {
                color:#000;
                border:1px #3f3f3f solid;
                padding:1.2rem 1.2rem;
            }
            ${addStyles}
        `;
        addStyleElm.textContent = style;
        headElm.appendChild(addStyleElm);
    };
    setAttrs(object) {
        //attributeオブジェクトの作成
        const table_Obj = {
            contents_Title:'',
            table_Contents:[],

            table_Attrs:[{class:'js-added-table'}],
            tbody_Attrs:[],
            th_Attrs:[{class:'js-added-table-th'}],
            td_Attrs:[{class:'js-added-table-td js-added-font-size'}],
            add_To_Selector:''
        };
        table_Obj.contents_Title = object.contents_Title;
        const table_Contents = object.table_Contents;
        for (this.table_Content of table_Contents) {
            table_Obj.table_Contents.push(this.table_Content);
        };
        //ベースIdからidを生成
        const table_Id = {};
        table_Id.id = object.table_BaseId + '-table';
        table_Obj.table_Attrs.push(table_Id);
        table_Obj.add_To_Selector = object.add_To_Selector;

        return table_Obj;
    };

};
//--------------------draft--------------------
//const ********** = new AddTable(
    //{
        //contents_Title:'',
        //table_BaseId:'',
        //table_Contents:[
              //[{th:''},{td:['']}], ※行
              //[{th:''},{td:['']}] ※行
        //],
        //add_Styles:`
        //`, 
        //add_To_Selector:''
    //},
    //*******,
    //*******
//);
//--------------------------------------------------
//タブコンテンツ
class AddTabContents {
    constructor (object,...args) {
        if(object.tab_Contents.length === 0) {
            //コンテンツがない場合、nullを返す
            return null;
        } else {
            //別のタブがあるかどうかを判定
            if (document.querySelector('#tab-style') != null) {
                //あればスタイルを追加
                const style = document.querySelector('#tab-style');
                style.textContent += object['add_Styles'];
            } else {
                //無ければ作成
                this.setStyle(object);
            };
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
        //headタグへ挿入
        const headElm = document.querySelector('head');
        const addStyleElm = document.createElement('style');
        addStyleElm.setAttribute('id','tab-style');
        //コンテンツ独自のstyleを挿入
        const addStyles = (() => {
            if (object['add_Styles']) {
                if (object['add_Styles'] !== '') {
                    return object['add_Styles'];
                } else {
                    return '';
                };
            } else {
                return '';
            };
        })();
        //コンテンツ数からタブの幅（％）を設定
        const tabCount = (() => {
            if (object['tab_Contents'].length <= 3) {
                return 3;
            } else {
                return object['tab_Contents'].length;
            };
        })();
        const tabWidthBase = Math.trunc((100 / Number(tabCount)) * 1000) / 1000;
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
                flex: 0 0 ${tabWidthBase}%; 
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
            ${addStyles}
        `;
        addStyleElm.textContent = style;
        headElm.appendChild(addStyleElm);
    };
    //attributeオブジェクトの生成
    setAttrs(object) {
        //ベースオブジェクト
        const tab_Obj = {
            contents_Title:'',
            tab_Contents:[],
            
            div_Attrs:[{class:'js-added-tab-contents'}],
            input_Attrs:[{type:'radio'},{name:'js-added-tab-input'}],
            label_Attrs:[{class:'js-added-tab-label'}],
            content_Attrs:[{class:'js-added-tab-content'}],

            add_To_Selector:''
        };
        //コンテンツ独自のattributeを追加
        tab_Obj.contents_Title = object.contents_Title;
        const tab_Contents = object.tab_Contents;
        for (this.tab_Content of tab_Contents) {
            tab_Obj.tab_Contents.push(this.tab_Content);
        };
        const div_Id = {};
        div_Id.id = object.contents_BaseId + '-tab-contents';
        tab_Obj.div_Attrs.push(div_Id);
        tab_Obj.add_To_Selector = object.add_To_Selector;

        return tab_Obj;
    };
};
//--------------------draft--------------------
//const ********** = new AddTabContents(
    //{
        //contents_Title:'',
        //contents_BaseId:'',
        //tab_Contents:[
            //{tabContentTitle:'',tabContentName:''},
            //{tabContentTitle:'',tabContentName:''}
        //],
        //add_Styles:`
        //`, 
        //add_To_Selector:''
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
            //別のポップオーバーがあるかどうかを判定
            if (document.querySelector('#popover-style') != null) {
                //あればスタイルを追加
                const style = document.querySelector('#popover-style');
                style.textContent += object['add_Styles'];
            } else {
                //無ければ作成
                this.setStyle(object);
            };
            //attributeオブジェクトを作成
            const obj = this.setAttrs(object);
            
            //コンテナ作成
            const popoverContents_Container = document.createElement('div');
            for (this.container_Attr of obj.container_Attrs) {
                const container_AttrName = Object.keys(this.container_Attr)[0];
                const container_AttrValue = this.container_Attr[container_AttrName];
                popoverContents_Container.setAttribute(container_AttrName,container_AttrValue);
            };
            
            //ボタン作成
            const popover_Button = document.createElement('button');
            popover_Button.textContent = obj['buttonText'];
            for (this.button_Attr of obj.button_Attrs) {
                const button_AttrName = Object.keys(this.button_Attr)[0];
                const button_AttrValue = this.button_Attr[button_AttrName];
                popover_Button.setAttribute(button_AttrName,button_AttrValue);
            };
            popover_Button.addEventListener('click', (e) => this.clickHandlerValid(e));
            
            //要素作成
            const popover_Content = document.createElement('div');
            for (this.content_Attr of obj.content_Attrs) {
                const content_AttrName = Object.keys(this.content_Attr)[0];
                const content_AttrValue = this.content_Attr[content_AttrName];
                popover_Content.setAttribute(content_AttrName,content_AttrValue);
            };
            
            //クローズボタン
            //ポップオーバー背面クローズボタン
            const popover_Backside_Button_Close = document.createElement('button');
            //クローズボタン（×ボタン）
            const closeIcon = document.createElement('span');
            closeIcon.setAttribute('class','icon-close');
            const popover_Button_Close = document.createElement('button');
            for (this.button_Close_Attr of obj.button_Close_Attrs) {
                const button_Close_AttrName = Object.keys(this.button_Close_Attr)[0];
                const button_Close_AttrValue = this.button_Close_Attr[button_Close_AttrName];
                popover_Button_Close.setAttribute(button_Close_AttrName,button_Close_AttrValue);
                popover_Backside_Button_Close.setAttribute(button_Close_AttrName,button_Close_AttrValue);
            };
            popover_Backside_Button_Close.setAttribute('class','js-added-popover-content-backside-button');
            popover_Backside_Button_Close.addEventListener('click', (e) => this.clickHandlerInvalid(e));
            popover_Button_Close.addEventListener('click', (e) => this.clickHandlerInvalid(e));
            document.querySelector('body').appendChild(popover_Backside_Button_Close);
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
            if (obj.add_To_Selector === '') {
                return popoverContents_Container;
            } else {
                const targetElm = document.querySelector(obj.add_To_Selector);
                if (obj['contents_Title'] === '') {
                    targetElm.appendChild(popoverContents_Container);
                } else {
                    //タイトル作成
                    const popoverContents_Title = document.createElement('h5');
                    popoverContents_Title.textContent = obj['contents_Title'];
                    
                    targetElm.appendChild(popoverContents_Title);
                    targetElm.appendChild(popoverContents_Container);
                };
            };
            
        };
    };
    //表示の際の処理
    clickHandlerValid (e) {
        const targetSelector = 'button.js-added-popover-content-backside-button[popovertarget="' + e.currentTarget.getAttribute('popovertarget') + '"]';
        document.querySelector(targetSelector).classList.add('valid');
    };
    //非表示の際の処理
    clickHandlerInvalid (e) {
        const targetSelector = 'button.js-added-popover-content-backside-button[popovertarget="' + e.currentTarget.getAttribute('popovertarget') + '"]';
        document.querySelector(targetSelector).classList.remove('valid');
    };
    //style生成
    setStyle(object) {
        //headタグへ挿入
        const headElm = document.querySelector('head');
        const addStyleElm = document.createElement('style');
        addStyleElm.setAttribute('id','popover-style');
        //コンテンツ独自のstyleを挿入
        const addStyles = (() => {
            if (object['add_Styles']) {
                if (object['add_Styles'] !== '') {
                    return object['add_Styles'];
                } else {
                    return '';
                };
            } else {
                return '';
            };
        })();
        //style
        const style = `
            .js-added-popover {
            }
            .js-added-popover-button {
                width:100%;
                text-align:center;
                font-weight:bold;
                border:0;
                cursor:pointer;
            }
            .js-added-popover-button:hover {
                opacity:.6;
            }
            .js-added-popover-button:disabled {
                opacity:.6;
                pointer-events:none;
            }
            .js-added-popover-content {
            }
            .js-added-popover-content:popover-open {
            }
            .js-added-popover-content::backdrop {
                background-color:#000;
                opacity:.6;
            }
            .js-added-popover-close-button {
                position:absolute;
                right:.6rem;
                top:.6rem;
                text-align:center;
                border:0;
                cursor:pointer;
                background-color:transparent;
                padding:0;
            }
            .js-added-popover-close-button:hover {
                opacity:.6;
            }
            .icon-close {
                display:block;
                width:2.6rem;
                height:2.6rem;
                position:relative;
            }
            .icon-close::before, .icon-close::after {
                content:"";
                display:block;
                width:80%;
                height:2px;
                background:#000;
                transform:rotate(45deg);
                transform-origin:0% 50%;
                position:absolute;
                top:calc(21% - 1px);
                left:21%;
            }
            .icon-close::after {
                transform:rotate(-45deg);
                transform-origin:100% 50%;
                left:auto;
                right:21%;
            }
            .js-added-popover-content-backside-button {
                z-index:-1;
            }
            .js-added-popover-content-backside-button.valid {
                width:100vw;
                height:100vh;
                position:fixed;
                top:0;
                left:0;
                background-color:transparent;
                border:0;
                z-index:1000;
            }
            ${addStyles}
        `;
        addStyleElm.textContent = style;
        headElm.appendChild(addStyleElm);
    };
    //attributeオブジェクトの生成
    setAttrs(object) {
        //ベースオブジェクト
        const popover_Obj = {
            contents_Title:'',
            buttonText:'',
            container_Attrs:[{class:'js-added-popover'}],
            button_Attrs:[{class:'js-added-popover-button'}],
            content_Attrs:[{class:'js-added-popover-content'}],
            button_Close_Attrs:[{class:'js-added-popover-close-button'}],

            add_To_Selector:''
        };
        //コンテンツ独自のattributeを追加
        popover_Obj.contents_Title = object.contents_Title;
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
        
        popover_Obj.buttonText　= object.buttonText
        popover_Obj.add_To_Selector = object.add_To_Selector;

        return popover_Obj;
    };
};
//--------------------draft--------------------
//const ********** = new AddPopoverContents(
    //{
        //contents_Title:'',
        //contents_BaseId:'',
        //popover_Contents:'',
        //popover_Option:'',
        //popover_Target_Action_Open:'',
        //popover_Target_Action_Close:'',
        //buttonText:'',
        //add_Styles:`
        //`, 
        //add_To_Selector:''
   //},
   //*******,
   //*******
//);
//--------------------------------------------------
//URL取得
const locationURL = location.href;
//URLで分岐
if (locationURL.includes('detail')) {
    //=================================================================
    //掲載データ
    //=================================================================
    //物件コード
    const apartmentCode = document.querySelector('p.code').textContent.match(/[0-9]+$/)[0];
    //物件URL
    const detailPageUrl = 'https://www.otonoie.net/detail/index.html?number=' + apartmentCode;
    //上部右側データ
    const summary = document.querySelector('div.detail_r').querySelector('dl.clearfix').querySelectorAll('dd');
    //賃料
    const rentPrice = summary[2].textContent.replace(',','').replace('円','');
    const rentPrice_Jp = summary[2].textContent.replace(',','').replace('円','')　/ 10000;
    //管理費
    const managementPrice = summary[3].textContent.replace(',','').replace('円','');
    const managementPrice_Jp = summary[3].textContent.replace(',','').replace('円','') / 10000;
    //問い合わせフォーム
    const inquiryForm = document.querySelector('#contact_area');
    //個人情報の取り扱い
    const handlingOfPersonalInformation = inquiryForm.nextElementSibling;
    (() => {
        //=================================================================
        //コンテナ
        //=================================================================
        //----------------------------上部---------------------------------
        const componentWrap_top = create_Element('div',[
                {class:'js-added-component-wrap-top'},
                {id:'component-wrap-top'}
        ]);
        document.querySelector('div.detail_l').appendChild(componentWrap_top);
        const component_1 = create_Element('div',[
                {class:'js-added-component-top-l'},
                {id:'component-top-l'}
        ]);
        componentWrap_top.appendChild(component_1);
        const component_roomPlan_Slider = create_Element('div',[
                {class:'js-added-component-top-r'},
                {id:'component-top-r'}
        ]);
        componentWrap_top.appendChild(component_roomPlan_Slider);
        const component_Point = create_Element('div',[
                {class:'js-added-component-top-b'},
                {id:'component-top-b'}
        ]);
        componentWrap_top.appendChild(component_Point);
        //-----------------------------------------------------------------
        //----------------------------中部---------------------------------
        const component_2 = create_Element('div',[
                {class:'js-added-component'},
                {id:'component-middle'}
        ]);
        document.querySelector('div.detail_btm').appendChild(component_2);
        //-----------------------------------------------------------------
        //----------------------------シェア-------------------------------
        const share_container = create_Element('div',[
            {class:'js-added-share'},
            {id:'share'}
        ]);
        document.querySelector('div.detail_btm').appendChild(share_container);
        //-----------------------------------------------------------------
        //--------------------ベースstyle（detailページ）----------------------
        const addDetailStyleElm = document.createElement('style');
        addDetailStyleElm.setAttribute('id','base-detail-style');
        const detailStyle = `
            #component-wrap-top {
                width:100%;
                display:flex;
                display:-webkit-box;
                display:-webkit-flex;
                display :-ms-flexbox;
                flex-flow:row wrap;
                justify-content:space-between;
            }
            #component-top-l {
                display:flex;
                display:-webkit-box;
                display:-webkit-flex;
                display :-ms-flexbox;
                flex-flow:column nowrap;
                justify-content:space-between;
                flex-grow:0;
                flex-basis:33%;
                order:0;
            }
            #component-top-r {
                background:#3f3f3f;
                margin-left:.6rem;
                padding-bottom:.7rem;
                order:1;
                flex-grow:1;
                flex-basis:auto;
            }
            #component-top-b {
                flex-basis:100%;
                order:2;
            }
            #component-middle {
                width:100%;
                display:flex;
                display:-webkit-box;
                display:-webkit-flex;
                display :-ms-flexbox;
                flex-flow:row nowrap;
                justify-content:space-between;
                background-color:#dddddd;
                padding:0.8rem 1.6rem;
                margin: 0 auto;
            }
            #share {
                display:none;
            }
            @media screen and (max-width:750px) {
                #component-wrap-top {
                    flex-flow:column nowrap;
                }
                #component-top-l {
                    width:100%;
                    order:0;
                }
                #component-top-r {
                    margin-left:0;
                    padding-bottom:0;
                    width:100%;
                    flex-grow:0;
                    order:1;
                }
                #component-top-b {
                    width:100%;
                    order:2;
                }
                #component-middle {
                    padding:0.4rem 0.8rem;
                }
                #share {
                    background:#dddddd;
                    display:flex;
                    display:-webkit-box;
                    display:-webkit-flex;
                    display :-ms-flexbox;
                    flex-flow:row nowrap;
                    justify-content:space-between;
                    align-items:center;
                    padding:0.4rem 0.8rem;
                    margin: 0 auto;
                }
            }
        `;
        addDetailStyleElm.textContent = detailStyle;
        const detailHeadElm = document.querySelector('head');
        detailHeadElm.appendChild(addDetailStyleElm);
        //-----------------------------------------------------------------
        //=================================================================
        //家賃・礼敷等
        //=================================================================
        const summaryPrice = (() => {
            const summaryPrice_div = create_Element('div',[
                {class:'js-added-summary-price'},
                {id:'summary-price'}
            ]);
            const summaryPrice_dl_1 = create_Element('dl',[
                {class:'js-added-summary-price-wrap'}
            ]);
            const summaryPrice_dl_2 = create_Element('dl',[
                {class:'js-added-summary-price-wrap'}
            ]);
            const rentPrice_dt = create_Element('dt',[]);
            rentPrice_dt.textContent = '賃料';
            const rentPrice_dd = create_Element('dd',[]);
            rentPrice_dd.textContent = rentPrice_Jp + '万円';
            const managementPrice_dt = create_Element('dt',[]);
            managementPrice_dt.textContent = '管理費・共益費等';
            const managementPrice_dd = create_Element('dd',[]);
            managementPrice_dd.textContent = managementPrice_Jp + '万円';
            summaryPrice_dl_1.appendChild(rentPrice_dt);
            summaryPrice_dl_1.appendChild(rentPrice_dd);
            summaryPrice_dl_1.appendChild(managementPrice_dt);
            summaryPrice_dl_1.appendChild(managementPrice_dd);
            summaryPrice_div.appendChild(summaryPrice_dl_1);
            summaryPrice_div.appendChild(summaryPrice_dl_2);
            
            return summaryPrice_div;
        })();
        component_1.appendChild(summaryPrice);
        //===============================================================
        //お問い合わせ
        //===============================================================
        //----------------------------フォーム----------------------------
        //問い合わせフォーム用ポップオーバー
        const popover_Content_div = create_Element('div',[
                {class:'js-added-popover-content'},
                {id:'inquiry-popover-contents'},
                {popover:'auto'}
        ]);
        document.querySelector('#content').querySelector('div.inner').appendChild(popover_Content_div);
        //クローズボタン
        const closeIcon = document.createElement('span');
        closeIcon.setAttribute('class','icon-close');
        const popover_Close_Button = document.createElement('button');
        popover_Close_Button.appendChild(closeIcon);
        popover_Close_Button.setAttribute('class','js-added-popover-close-button');
        popover_Close_Button.setAttribute('popovertarget','inquiry-popover-contents');
        popover_Close_Button.setAttribute('popovertargetaction','hide');
        popover_Content_div.appendChild(popover_Close_Button);
        //問い合わせフォームWRAP
        const inquiry_wrap = create_Element('div',[
                {class:'js-added-popover-content-wrap'},
                {id:'inquiry-popover-content-wrap'}
        ]);
        inquiry_wrap.appendChild(inquiryForm);
        inquiry_wrap.appendChild(handlingOfPersonalInformation);
        popover_Content_div.appendChild(inquiry_wrap);
        //-----------------------------------------------------------------
        //--------------------------コンポーネント１------------------------
        //お問い合わせWRAP１
        const inquiryBox_1 = create_Element('div',[
     　     {class:'js-added-inquiry-box'},
            {id:'inquiry1-box'}
        ]);
        component_1.appendChild(inquiryBox_1);
        //お問合せボタン１
        const inquiry_1 = (() => {
            const inquiry_button = create_Element('button',[
                {class:'js-added-inquiry-button'},
                {id:'inquiry-button1'},
                {popovertarget:'inquiry-popover-contents'},
                {popovertargetaction:'show'}
            ]);
            return inquiry_button;
        })();
        inquiry_1.textContent = 'この物件にお問い合わせ';
        inquiryBox_1.appendChild(inquiry_1);
        //電話番号１
        const inquiry_Tel_1 = (() => {
            const inquiry_Tel_div = create_Element('div',[
                {class:'js-added-inquiry-tel'},
                {id:'inquiry1-tel'}
            ]);
            const inquiry_Tel_hr_1 = create_Element('hr',[]);
            inquiry_Tel_div.appendChild(inquiry_Tel_hr_1);
            const inquiry_Tel_p_Number = create_Element('p',[
                {class:'tel-number'}
            ]);
            inquiry_Tel_p_Number.textContent = 'TEL ' + settings['company_data']['telNumber_display'];
            inquiry_Tel_div.appendChild(inquiry_Tel_p_Number);
            const inquiry_Tel_p_Time = create_Element('p',[
                {class:'tel-time'}
            ]);
            inquiry_Tel_p_Time.textContent = settings['company_data']['business_hours'];
            inquiry_Tel_div.appendChild(inquiry_Tel_p_Time);
            const inquiry_Tel_hr_2 = create_Element('hr',[]);
            inquiry_Tel_div.appendChild(inquiry_Tel_hr_2);
            
            return inquiry_Tel_div;
        })();
        inquiryBox_1.appendChild(inquiry_Tel_1);
        //電話をかけるボタン
        const inquiry_Tel_Button = (() => {
            const inquiry_Tel_button = create_Element('a',[
                {href:'tel:' + settings['company_data']['tel_number']}
            ]);
            inquiry_Tel_button.textContent = '電話をかける';
        
            return inquiry_Tel_button;
        })();
        inquiryBox_1.appendChild(inquiry_Tel_Button);
        //QRコード１
        const qr_1 = (() => {
            const qr_div = create_Element('div',[
                {class:'js-added-qrcode'},
                {id:'qrcode1'}
            ]);
            //QRコード生成
            const qr_img = create_Element('img',[
                {title:'qrcode1'},
                {alt:'qrcode1'}
            ]);
            qr_img.src = `https://api.qrserver.com/v1/create-qr-code/?data=${detailPageUrl}&size=65x65&margin=3`;
            //QRコードテーブル作成
            const qrcode_table = new AddTable(
                {
                    contents_Title:'',
                    table_BaseId:'qrcode1',
                    table_Contents:[[{th:'携帯表示用QRコード'},{td:['']}]],
                    add_Styles:`
                        #qrcode1-table {
                            border:0;
                            width:100%;
                        }
                        #qrcode1-table > tbody > tr > th {
                            border:0;
                            font-size:1.2rem;
                        }
                        #qrcode1-table > tbody > tr > td {
                            border:0;
                            padding:0.6rem;
                            text-align:end;
                            background-color:#dddddd;
                        }
                    `, 
                    add_To_Selector:''
                }
            );
            qrcode_table.querySelector('td').removeChild(qrcode_table.querySelector('ul'));
            qrcode_table.querySelector('td').appendChild(qr_img);
            qr_div.appendChild(qrcode_table);
            
            return qr_div;
        })();
        component_1.appendChild(qr_1);
        //-----------------------------------------------------------------
        //--------------------------コンポーネント２-------------------------
        //お問い合わせWRAP２
        const inquiryBox_2 = create_Element('div',[
                {class:'js-added-inquiry-box'},
                {id:'inquiry2-box'}
        ]);
        component_2.appendChild(inquiryBox_2);
        //お問合せボタン２
        const inquiry_2 = (() => {
            const inquiry_button = create_Element('button',[
                {class:'js-added-inquiry-button'},
                {id:'inquiry-button2'},
                {popovertarget:'inquiry-popover-contents'},
                {popovertargetaction:'show'}
            ]);
            return inquiry_button;
        })();
        inquiry_2.textContent = 'この物件にお問い合わせ';
        inquiryBox_2.appendChild(inquiry_2);
        //電話番号
        const inquiry_Tel_2 = (() => {
            const inquiry_Tel_div = create_Element('div',[
                {class:'js-added-inquiry-tel'},
                {id:'inquiry2-tel'}
            ]);
            const inquiry_Tel_p_Number = create_Element('p',[
                {class:'tel-number'}
            ]);
            inquiry_Tel_p_Number.textContent = 'TEL ' + settings['company_data']['telNumber_display'];
            inquiry_Tel_div.appendChild(inquiry_Tel_p_Number);
            const inquiry_Tel_p_Time = create_Element('p',[
                {class:'tel-time'}
            ]);
            inquiry_Tel_p_Time.textContent = settings['company_data']['business_hours'];
            inquiry_Tel_div.appendChild(inquiry_Tel_p_Time);
        
            return inquiry_Tel_div;
        })();
        inquiryBox_2.appendChild(inquiry_Tel_2);
        //電話をかけるボタン
        inquiryBox_2.appendChild(inquiry_Tel_Button.cloneNode(true));
        //QRコード
        const qr_2 = (() => {
            const qr_div = create_Element('div',[
                {class:'js-added-qrcode'},
                {id:'qrcode2'}
            ]);
            //QRコード生成
            const qr_img = create_Element('img',[
                {title:'qrcode2'},
                {alt:'qrcode2'}
            ]);
            qr_img.src = `https://api.qrserver.com/v1/create-qr-code/?data=${detailPageUrl}&size=80x80&margin=3`;
            const qr_p = create_Element('p',[]);
            qr_p.textContent = '携帯表示用QRコード';
            qr_div.appendChild(qr_img);
            qr_div.appendChild(qr_p);
            
            return qr_div;
        })();
        component_2.appendChild(qr_2);
        //-----------------------------------------------------------------
        //=================================================================
        //共有
        //=================================================================
        //-----------------------------LINE--------------------------------
        const share_Line = (() => {
            const line_div = create_Element('div',[
                {class:'js-added-line'},
                {id:'share-line'}
            ]);
            const line_button = create_Element('a',[
                {href:'https://social-plugins.line.me/lineit/share?url=' + detailPageUrl}
            ]);
            line_button.textContent = 'LINE共有';
            line_div.appendChild(line_button);
        
            return line_div;
        })();
        share_container.appendChild(share_Line);
        //-----------------------------------------------------------------
        //----------------------------QRコード------------------------------
        const qr_img = create_Element('img',[
            {title:'qrcode'},
            {alt:'qrcode'}
        ]);
        qr_img.src = `https://api.qrserver.com/v1/create-qr-code/?data=${detailPageUrl}&size=150x150&margin=3`;
        const qr_popover_p = create_Element('p',[]);
        qr_popover_p.textContent = '物件ページのQRコード';
        const share_qr = new AddPopoverContents(
            {
                contents_Title:'',
                contents_BaseId:'share-qrcode',
                popover_Contents:'share-qrcode',
                popover_Option:'auto',
                popover_Target_Action_Open:'show',
                popover_Target_Action_Close:'hide',
                buttonText:'QRコードを表示',
                add_Styles:`
                    #share-qrcode-popover {
                        flex-basis:calc(50% - 0.4rem);
                    }
                    #share-qrcode-popover > button {
                        background:#3f3f3f;
                        color:#ffffff;
                        font-size:1.2rem;
                        padding:0.6rem 0;
                    }
                    #share-qrcode-popover-contents {
                        width:calc(9.6rem + 150px);
                        margin:auto;
                        padding:3.2rem;
                        text-align:center;
                        border:0;
                    }
                    #share-qrcode-popover-contents > img {
                        margin-top:1.6rem;
                        width:150px;
                        height:150px;
                    }
                    #share-qrcode-popover-contents > p {
                        margin-top:1.6rem;
                        font-size:1.4rem;
                        color:#000;
                    }
                `, 
                add_To_Selector:''
            },
            qr_img
        );
        share_qr.querySelector('#share-qrcode-popover-contents').appendChild(qr_popover_p);
        share_container.appendChild(share_qr);
        //---------------------------------------------------------------------
        //----------------------------STYLE------------------------------------
        const headElm = document.querySelector('head');
        const componentStyle = document.createElement('style');
        componentStyle.setAttribute('id','component-style');
        componentStyle.textContent = `
            input[type="reset"], input[type="submit"]{
                border-radius:2px !important;
            }
            .js-added-inquiry-button, #inquiry1-box > a, #inquiry2-box > a, #share-line > a, #share-qrcode-popover > button {
                border-radius:2px;
            }
            .js-added-inquiry-button {
                background:#ffb911;
                color:#ffffff;
                font-size:1.6rem;
                padding:1.4rem 0;
                width:100%;
                text-align:center;
                font-weight:bold;
                border:0;
                cursor:pointer;
            }
            .js-added-inquiry-button:hover {
                opacity:.6;
            }
            .js-added-inquiry-tel {
                text-align: center;
                background: none;
            }
            .js-added-inquiry-tel > .tel-number {
                font-weight:bold;
                color:#000;
            }
            .js-added-inquiry-tel > .tel-time {
                color:#000;
            }
            #summary-price {
                order:0;
            }
            #qrcode1 {
                display:block;
                width:100%;
                margin-bottom:0.5rem;
                order:1;
            }
            #inquiry1-box {
                width:100%;
                display:flex;
                display:-webkit-box;
                display:-webkit-flex;
                display :-ms-flexbox;
                flex-flow:column nowrap;
                justify-content:space-between;
                order:2;
            }
            #inquiry-button1 {
                order:0;
            }
            #inquiry1-tel {
                width:100%;
                order:1;
            }
            #inquiry1-tel > .tel-number {
                font-size:1.6rem;
            }
            #inquiry1-tel > .tel-time {
                font-size:0.8rem;
            }
            #inquiry1-box > a {
                display:none;
            }
            #inquiry2-box {
                display:flex;
                display:-webkit-box;
                display:-webkit-flex;
                display :-ms-flexbox;
                flex-flow:row wrap;
                justify-content:space-between;
                flex-grow:1;
                order:0;
            }
            #qrcode2 {
                margin-bottom:0;
                margin-left:3.2rem;
                display:flex;
                display:-webkit-box;
                display:-webkit-flex;
                display :-ms-flexbox;
                flex-flow:column nowrap;
                justify-content:space-between;
                align-items:center;
                order:1;
            }
            #qrcode2 > img {
                width:80px;
                height:80px;
            }
            #qrcode2 > p {
                font-size:0.8rem;
                color:#000;
                margin-top:0.5rem;
            }
            #inquiry-button2 {
                order:0;
            }
            #inquiry2-box > button {
                margin-bottom:0.5rem;
            }
            #inquiry2-tel {
                flex-grow:1;
                order:1;
            }
            #inquiry2-tel > .tel-number {
                font-size:1.8rem;
            }
            #inquiry2-tel > .tel-time {
                font-size:1rem;
            }
            #inquiry2-box > a {
                display:none;
            }
            #inquiry-popover-content-wrap {
                padding:0;
            }
            #share-line {
                flex-basis:calc(50% - 0.4rem);
            }
            #share-line > a {
                display:block;
                background:#06c755;
                color:#ffffff;
                font-size:1.2rem;
                text-decoration:none;
                text-align:center;
                font-weight:bold;
                padding:0.6rem 0;
            }
            #share-line > a:hover {
                opacity:.6;
            }
            @media screen and (max-width:750px) {
                .js-added-inquiry-button {
                    font-size:1.4rem;
                    padding:1rem 0;
                }
                #qrcode1 {
                    display:none;
                }
                #inquiry1-box {
                    display:flex;
                    display:-webkit-box;
                    display:-webkit-flex;
                    display :-ms-flexbox;
                    flex-flow:row nowrap;
                    justify-content:space-between;
                    background:#dddddd;
                    padding:0.4rem 0.8rem;
                    order:3;
                }
                #inquiry-button1 {
                    flex-basis:calc(67% - 0.8rem);
                }
                #inquiry1-tel {
                    display:none;
                }
                #inquiry1-box > a {
                    display:flex;
                    display:-webkit-box;
                    display:-webkit-flex;
                    display :-ms-flexbox;
                    flex-flow:row nowrap;
                    flex-basis:33%;
                    background:#26aaff;
                    color:#ffffff;
                    text-decoration:none;
                    justify-content:center;
                    align-items:center;
                    font-weight:bold;
                    font-size:1.4rem;
                    padding:1rem 0;
                    order:1;
                }
                #inquiry1-box > a:hover {
                    opacity:.6;
                }
                #qrcode2 {
                    display:none;
                }
                #inquiry2-tel > .tel-number {
                    font-size:1.6rem;
                }
                #inquiry2-tel > .tel-time {
                    font-size:0.8rem;
                }
                #inquiry2-box > a {
                    display:flex;
                    display:-webkit-box;
                    display:-webkit-flex;
                    display :-ms-flexbox;
                    flex-flow:row nowrap;
                    flex-basis:33%;
                    background:#26aaff;
                    color:#ffffff;
                    text-decoration:none;
                    justify-content:center;
                    align-items:center;
                    font-weight:bold;
                    font-size:1.4rem;
                    padding:1rem 0;
                    order:2;
                }
                #inquiry2-box > a:hover {
                    opacity:.6;
                }
                #inquiry-popover-content-wrap {
                    padding:1.2rem;
                }
            }
            @media screen and (max-width:350px) {
                .js-added-inquiry-button {
                    font-size:1.2rem;
                }
                #inquiry1-box > a {
                    font-size:1.2rem;
                }
                #inquiry2-tel {
                    display:none;
                }
                #inquiry2-box > a {
                    font-size:1.2rem;
                    flex-basis:100%;
                }
                
            }
        `; 
        headElm.appendChild(componentStyle);
        //---------------------------------------------------------------------
        //--------------------------レスポンシブ------------------------------
        //ブレイクポイント
        const mediaQueryList = window.matchMedia('(max-width:750px)');
        //regist listener
        mediaQueryList.addEventListener('change', listener);
        listener(mediaQueryList);
        // listener
        function listener (event) {
            if (event.matches) {
                // SP
                componentWrap_top.appendChild(inquiryBox_1);
                if (popover_Content_div.querySelector('#contact_area')) {
                } else {
                    popover_Content_div.appendChild(inquiry_wrap);
                };
                if (inquiry_1.hasAttribute('onclick') == true && inquiry_2.hasAttribute('onclick') == true) {
                    inquiry_1.removeAttribute('onclick');
                    inquiry_2.removeAttribute('onclick');
                    inquiry_1.setAttribute('popovertarget','inquiry-popover-contents');
                    inquiry_1.setAttribute('popovertargetaction','show');
                    inquiry_2.setAttribute('popovertarget','inquiry-popover-contents');
                    inquiry_2.setAttribute('popovertargetaction','show');
                } else {
                };
            } else {
                // PC
                component_1.appendChild(inquiryBox_1);
                if (document.querySelectorAll('.js-added-popover-content').length !== 0) {
                    const popoverElms = document.querySelectorAll('.js-added-popover-content');
                    for (popoverElm of popoverElms) {
                        if (popoverElm.matches(':popover-open')) {
                            popoverElm.hidePopover();
                        } else {
                        };
                    };
                    if (document.querySelectorAll('button.js-added-popover-content-backside-button.valid').length !== 0) {
                        const popover_Backside_Buttons_Valid = document.querySelectorAll('button.js-added-popover-content-backside-button.valid');
                        for (Backside_Button of popover_Backside_Buttons_Valid) {
                            Backside_Button.classList.remove('valid');
                        };
                    } else {
                    };
                } else {
                };
                if (popover_Content_div.querySelector('#contact_area')) {
                    popover_Content_div.before(inquiry_wrap);
                } else {
                };
                if (inquiry_1.hasAttribute('popovertarget') == true && inquiry_2.hasAttribute('popovertarget') == true) {
                    inquiry_1.removeAttribute('popovertarget');
                    inquiry_1.removeAttribute('popovertargetaction');
                    inquiry_2.removeAttribute('popovertarget');
                    inquiry_2.removeAttribute('popovertargetaction');
                    inquiry_1.setAttribute('onclick','location.href=\'#contact_area\'');
                    inquiry_2.setAttribute('onclick','location.href=\'#contact_area\'');
                } else {
                };
            };
        };
        //--------------------------------------------------------------------
    })();
    
    
    
    //============================================================================
    //layout
    //============================================================================
    //レイアウト変更
    //class:detail_lの要素
    const detail_L = document.querySelector('div.detail_l');
    detail_L.setAttribute('style','width:100% !important;');
    if (detail_L.querySelectorAll('div.item-img-frame')[1]) {
        detail_L.removeChild(detail_L.querySelectorAll('div.item-img-frame')[1]);
    } else {
    };
    
    
    
    //============================================================================
    //contens
    //============================================================================
    
    //==============================タブコンテンツ=================================
    //挿入要素
    const insertTargetElm = document.querySelector('div.detail_btm');
    //----------------------------------アクセス-----------------------------------
    const content_access = (() => {
        return null;
    })();
    //-----------------------------------------------------------------------------
    
    //----------------------------------初期費用-----------------------------------
    //const initialCost = ;
    //----------------------------------------------------------------------------
    
    //----------------------------タブインスタンス-----------------------------------
    //インスタンス生成・挿入
    const content_Access = new AddTabContents(
        {
            contents_Title:'',
            contents_BaseId:'extra-data',
            tab_Contents:[
                {tabContentTitle:'路線情報',tabContentName:'route-information'},
                {tabContentTitle:'初期費用',tabContentName:'initial-cost'},
                {tabContentTitle:'シェア',tabContentName:'share'}
            ],
            add_Styles:`
                #extra-data-tab-contents{
                    margin-top: 20px;
                }
            `, 
            add_To_Selector:'div.detail_btm'
        },
        null,
        null,
        null
    );
    //---------------------------------------------------------------
    //===============================================================
    
    
    
    //=============================追加項目===========================
    if (document.querySelector('span#extra-json') != null) {
        //#extra-jsonがある場合、json取得
        const extraJson = document.querySelector('span#extra-json').textContent;
        const extraJson_Obj = JSON.parse(extraJson);
        
        //周辺環境
        if (extraJson_Obj['surroundingInformation']) {
            //jsonに周辺環境キーがある場合、周辺環境テーブル用のコンテンツの作成
            const surroundingInformationContents = (() =>{
                //周辺環境リスト
                const surroundingList = extraJson_Obj['surroundingInformation'];
                const outputList = [];
                if (surroundingList.length === 0) {
                    //キー名'surroundingInformation'値（リスト）が０個の場合
                    return outputList;
                } else {
                    //キー名'surroundingInformation'値（リスト）が１個以上の場合
                    //リストの値を整形
                    const surroundingInformationRegex = /[（].+[）]/g;
                    for(surroundingItem of surroundingList) {
                        const targetText = surroundingItem.match(surroundingInformationRegex)[0];
                        const category = targetText.replace('（','').replace('）','');
                        const information = surroundingItem.replace(targetText,'');
                        const surroundingObj = `■ ${category}：${information}`;
                        outputList.push(surroundingObj);
                    };
                    //周辺環境コンテンツ生成
                    return [[{th:'周辺施設'},{td:outputList}]];
                };
            })();
            //周辺環境インスタンス生成
            const content_SurroundingInformation = new AddTable(
                {
                    contents_Title:'',
                    table_BaseId:'surrounding-information',
                    table_Contents:surroundingInformationContents,
                    add_Styles:`
                    .js-added-table {
                        margin-top:10px;
                        margin-bottom:10px;
                    }
                    `, 
                    add_To_Selector:'div.detail_btm'
                }
            );
        } else {    
        };  
    } else {
    };
    //===============================================================
    
    
    
    //=============================周辺概要===========================
    if (settings['site_control']['map'] === 'true') {
        //----------------------------タイトル-----------------------------
        (() => {
            const surroundingEnvironmentTitle = document.createElement('h5');
            surroundingEnvironmentTitle.textContent = '周辺概要';
            insertTargetElm.appendChild(surroundingEnvironmentTitle);
        })();
        //----------------------------------------------------------------
        //----------------------------地図--------------------------------
        (() => {
            //地図用のstyleタグの生成・挿入
            const headElm = document.querySelector('head');
            const mapStyle = document.createElement('style');
            mapStyle.setAttribute('id','map-style');
            mapStyle.textContent = `
                .js-added-map {
                    position:relative; 
                    padding-bottom: 56.25%; 
                    height:0; 
                    overflow:hidden;
                    margin-bottom: 20px;
                }
                @media screen and (max-width:750px) {
                    .js-added-map {
                        padding-bottom: 66.667%; 
                    }
                }
            `;  
            headElm.appendChild(mapStyle);
            
            const insertTargetElm = document.querySelector('div.detail_btm');
            //マップコンテンツ作成
            const content_Map = (() => {
                const map_Parent_Elm = create_Element('div',[
                    {class:'js-added-map'},
                    {id:'map-content'}
                ]);
                
                const map_Address = document.querySelector('div.detail_r').querySelector('dl.clearfix').querySelector('dd').textContent;
                //src作成
                const map_Src = (() => {
                    let m_src;
                    //画面幅でズーム調整
                    if (window.screen.width <= 480) {
                        m_src = 'https://www.google.com/maps/?output=embed&q=' + map_Address + '&t=m&z=15';
                    } else if (window.screen.width > 480 && window.screen.width < 960) {
                        m_src = 'https://www.google.com/maps/?output=embed&q=' + map_Address + '&t=m&z=16';
                    } else {
                        m_src = 'https://www.google.com/maps/?output=embed&q=' + map_Address + '&t=m&z=17';
                    };
                    return m_src;
                })(); 
            
                const map_Elm = create_Element('iframe',[
                    {width:'100%'},
                    {height:'calc(100% + 180px + 180px);'},
                    {style:'border:0; position:absolute; top:-180px; left:0;'},
                    {loading:'lazy'},
                    {allowfullscreen:''},
                    {referrerpolicy:'no-referrer-when-downgrade'}
                ]);
                map_Elm.src = map_Src;
    
                map_Parent_Elm.appendChild(map_Elm);

                return map_Parent_Elm;
            })();
            insertTargetElm.appendChild(content_Map);
        })();
    //---------------------------------------------------------------
    } else if (settings['site_control']['map'] === 'false') {
    } else {
    };
    //===============================================================
    
    
    
    //=================================================================
    //レスポンシブ
    //=================================================================
    //ブレイクポイント
    const mediaQueryList = window.matchMedia('(max-width:750px)');
    //regist listener
    mediaQueryList.addEventListener('change', listener);
    listener(mediaQueryList);
    // listener
    function listener (event) {
        if (event.matches) {
            // SP
        } else {
            // PC
        };
    };
    //=================================================================
    
    
    
} else if (locationURL.includes('property')) {
} else {
};


//管理画面記入例
//<style>#extra-json {display:none;}</style>
//<span id="extra-json">{"surroundingInformation":["ユニクロ東急プラザ蒲田店（ショッピングセンター）まで202m","成城石井グランデュオ蒲田店（スーパー）まで181m","マルエツかまた店（スーパー）まで186m","ファミリーマート蒲田駅前店（コンビニ）まで55m","セブンイレブン大田区役所前店（コンビニ）まで70m","マツモトキヨシmatsukiyoLAB蒲田駅東口店（ドラッグストア）まで87m"]}</span>
//<script defer type="text/javascript" src="https://t-shimizu0120.github.io/mask.js"></script>
