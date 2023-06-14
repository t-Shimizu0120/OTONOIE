//URL取得
const locationURL = location.href;
//URLで分岐
if (locationURL.includes('detail')) {
    
    //■要素作成関数
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
    
    //■テーブル
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
                    font-size:1.2rem !important; 
                } 
                .js-added-table {
                    border:1px #3f3f3f solid !important;
                } 
                .js-added-table-th {
                    background-color:#dddddd !important; 
                    color:#3f3f3f !important;
                    text-align:center !important; 
                    vertical-align:middle !important;
                } 
                .js-added-table-td {
                    vertical-align: top !important;
                }
                .js-added-table-th, .js-added-table-td {
                    color:#000 !important;
                    border:1px #3f3f3f solid !important;
                    padding:1.2rem 1.2rem !important;
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
    
    
    
    //■タブコンテンツ
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
                    padding: 10px 0; 
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
    
    
    
    //■ポップオーバーコンテンツ
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
                
                //要素作成
                const popover_Content = document.createElement('div');
                for (this.content_Attr of obj.content_Attrs) {
                    const content_AttrName = Object.keys(this.content_Attr)[0];
                    const content_AttrValue = this.content_Attr[content_AttrName];
                    popover_Content.setAttribute(content_AttrName,content_AttrValue);
                };
                
                //クローズボタン
                const popover_Button_Close = document.createElement('button');
                popover_Button_Close.textContent = '×';
                for (this.button_Close_Attr of obj.button_Close_Attrs) {
                    const button_Close_AttrName = Object.keys(this.button_Close_Attr)[0];
                    const button_Close_AttrValue = this.button_Close_Attr[button_Close_AttrName];
                    popover_Button_Close.setAttribute(button_Close_AttrName,button_Close_AttrValue);
                };
                
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
                    position:relative;
                }
                .js-added-popover-content:popover-open {
                    animation:appear .8s ease;
                }
                @keyframes appear {
                    0%{
                        opacity:0;
                    }
                    100%{
                        opacity:1;
                    }
                }
                .js-added-popover-content::backdrop {
                    background-color:#000;
                    opacity:.5;
                    backdrop-filter:blur(3px);
                }
                .js-added-popover-close-button {
                    position:absolute;
                    right:1.6rem;
                    top:1.6rem;
                    width:10%;
                    text-align:center;
                    font-weight:bold;
                    font-size:1.4rem;
                    border:0;
                    cursor:pointer;
                }
                .js-added-popover-close-button:hover {
                    opacity:.6;
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
            const button_Close_Target = {};
            button_Close_Target.popovertarget = target_Id;
            popover_Obj.button_Close_Attrs.push(button_Close_Target);
            const popover_Option = {};
            popover_Option.popover = object.popover_Option;
            popover_Obj.content_Attrs.push(popover_Option);
            const popover_Target_Action = {};
            popover_Target_Action.popovertargetaction = object.popover_Target_Action;
            popover_Obj.button_Close_Attrs.push(popover_Target_Action);
            
            popover_Obj.buttonText　= object.buttonText
            popover_Obj.add_To_Selector = object.add_To_Selector;

            return popover_Obj;
        };
    };
    //const ********** = new AddPopoverContents(
        //{
            //contents_Title:'',
            //contents_BaseId:'',
            //popover_Contents:'',
            //popover_Option:'',
            //popover_Target_Action:'',
            //buttonText:'',
            //add_Styles:`
            //`, 
            //add_To_Selector:''
       //},
       //*******,
       //*******
    //);
    const Inquiry_1 = new AddPopoverContents(
        {
            contents_Title:'',
            contents_BaseId:'inquiry',
            popover_Contents:'inquiry',
            popover_Option:'manual',
            popover_Target_Action:'hide', 
            buttonText:'この物件にお問い合わせ',
            add_Styles:`
                #inquiry-popover {
                    margin-bottom:0.5rem;
                }
                #inquiry-popover > button {
                    background:#ffb911;
                    color:#ffffff;
                    text-align:center;
                    font-size:1.6rem;
                    padding:1.4rem;
                }
            `, 
            add_To_Selector:'div.detail_btm'
        }, 
        null
    );
    
    
    //=================================================================
    //お問い合わせ/共有
    //=================================================================
    (() => {
        //コードからリンクを生成
        const apartmentCode = document.querySelector('p.code').textContent.match(/[0-9]+$/)[0];
        const detailPageUrl = 'https://www.otonoie.net/detail/index.html?number=' + apartmentCode;
        //上部コンテナ
        const component_1 = create_Element('div',[
                {class:'js-added-component'},
                {id:'component-1'}
        ]);
        //下部コンテナ
        const component_2 = create_Element('div',[
                {class:'js-added-component'},
                {id:'component-2'}
        ]);
        //お問合せボタン１
        const Inquiry_1 = new AddPopoverContents(
            {
                contents_Title:'',
                contents_BaseId:'inquiry1',
                popover_Contents:'inquiry1',
                popover_Option:'manual',
                popover_Target_Action:'hide',
                buttonText:'この物件にお問い合わせ',
                add_Styles:`
                `, 
                add_To_Selector:''
            },
            null
        );
        //お問合せボタン２
        const Inquiry_2 = new AddPopoverContents(
            {
                contents_Title:'',
                contents_BaseId:'inquiry2',
                popover_Contents:'inquiry2',
                popover_Option:'manual',
                popover_Target_Action:'hide',
                buttonText:'この物件にお問い合わせ',
                add_Styles:`
                `, 
                add_To_Selector:''
            },
            null
        );
    })();
    
    
    
    
    
    
    
    
    
    
    //上部
    const inquiry_1 = (() => {
        const inquiry_div = create_Element('div',[
            {class:'js-added-inquiry'},
            {id:'inquiry-1'}
        ]);
        const inquiry_button = create_Element('a',[
            {href:''}
        ]);
        inquiry_button.textContent = 'この物件にお問い合わせ';
        inquiry_div.appendChild(inquiry_button);
        
        return inquiry_div;
    })();
    //下部
    const inquiry_2 = (() => {
        const inquiry_div = create_Element('div',[
            {class:'js-added-inquiry'},
            {id:'inquiry-2'}
        ]);
        const inquiry_button = create_Element('a',[
            {href:''}
        ]);
        inquiry_button.textContent = 'この物件にお問い合わせ';
        inquiry_div.appendChild(inquiry_button);
        
        return inquiry_div;
    })();
    //-----------------------------------------------------------------
    //--------------------------------電話-----------------------------
    //上部
    const inquiry_Tel_1 = (() => {
        const inquiry_Tel_div = create_Element('div',[
            {class:'js-added-inquiry-tel'},
            {id:'inquiry-tel-1'}
        ]);
        const inquiry_Tel_hr_1 = create_Element('hr',[]);
        inquiry_Tel_div.appendChild(inquiry_Tel_hr_1);
        const inquiry_Tel_p_Number = create_Element('p',[
            {class:'tel-number'}
        ]);
        inquiry_Tel_p_Number.textContent = 'TEL:03-5948-5411';
        inquiry_Tel_div.appendChild(inquiry_Tel_p_Number);
        const inquiry_Tel_p_Time = create_Element('p',[
            {class:'tel-time'}
        ]);
        inquiry_Tel_p_Time.textContent = '受付時間：10：00～17：00（水曜定休）';
        inquiry_Tel_div.appendChild(inquiry_Tel_p_Time);
        const inquiry_Tel_hr_2 = create_Element('hr',[]);
        inquiry_Tel_div.appendChild(inquiry_Tel_hr_2);
        
        return inquiry_Tel_div;
    })();
    //下部
    const inquiry_Tel_2 = (() => {
        const inquiry_Tel_div = create_Element('div',[
            {class:'js-added-inquiry-tel'},
            {id:'inquiry-tel-2'}
        ]);
        const inquiry_Tel_p_Number = create_Element('p',[
            {class:'tel-number'}
        ]);
        inquiry_Tel_p_Number.textContent = 'TEL:03-5948-5411';
        inquiry_Tel_div.appendChild(inquiry_Tel_p_Number);
        const inquiry_Tel_p_Time = create_Element('p',[
            {class:'tel-time'}
        ]);
        inquiry_Tel_p_Time.textContent = '受付時間：10：00～17：00（水曜定休）';
        inquiry_Tel_div.appendChild(inquiry_Tel_p_Time);
        
        return inquiry_Tel_div;
    })();
    const inquiry_Tel_Button = (() => {
        const inquiry_Tel_button = create_Element('a',[
            {href:'tel:0359485411'}
        ]);
        inquiry_Tel_button.textContent = '電話をかける';
        
        return inquiry_Tel_button;
    })();
    //-----------------------------------------------------------------
    const inquiry_2_container = (() => {
        const inquiry_2_container_div = create_Element('div',[
            {class:'js-added-inquiry-container'},
            {id:'inquiry-container'}
        ]);
        inquiry_2_container_div.appendChild(inquiry_2);
        inquiry_2_container_div.appendChild(inquiry_Tel_2);
        inquiry_2_container_div.appendChild(inquiry_Tel_Button);
        
        return inquiry_2_container_div;
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
    //share
    //============================================================================
    //----------------------------------シェア-------------------------------------
    (() => {
        //コードからリンクを生成
        const apartmentCode = document.querySelector('p.code').textContent.match(/[0-9]+$/)[0];
        const detailPageUrl = 'https://www.otonoie.net/detail/index.html?number=' + apartmentCode;
        //シェア
        //上部
        const share_1 = create_Element('div',[
                {class:'js-added-share'},
                {id:'share-1'}
        ]);
        //下部
        const share_2 = create_Element('div',[
                {class:'js-added-share'},
                {id:'share-2'}
        ]);
        //QRコード
        //上部
        const share_Qr_1 = (() => {
            const qr_div = create_Element('div',[
                {class:'js-added-qrcode'},
                {id:'share-qrcode-1'}
            ]);
            //QRコード生成
            const qr_img = create_Element('img',[
                {title:'qrcode'},
                {alt:'qrcode'}
            ]);
            qr_img.src = `https://api.qrserver.com/v1/create-qr-code/?data=${detailPageUrl}&size=65x65&margin=3`;
            //QRコードテーブル作成
            const qrcode_table = new AddTable(
                {
                    contents_Title:'',
                    table_BaseId:'qrcode',
                    table_Contents:[[{th:'携帯表示用QRコード'},{td:['']}]],
                    add_Styles:`
                        #qrcode-table {
                            border:0 !important;
                            width:100% !important;
                        }
                        #qrcode-table > tbody > tr > th {
                            border:0 !important;
                            font-size:1.2rem !important;
                        }
                        #qrcode-table > tbody > tr > td {
                            border:0 !important;
                            padding:0.4rem !important;
                            text-align:end !important;
                            background-color:#dddddd !important;
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
        share_1.appendChild(share_Qr_1);
        //下部
        const share_Qr_2 = (() => {
            const qr_div = create_Element('div',[
                {class:'js-added-qrcode'},
                {id:'share-qrcode-2'}
            ]);
            //QRコード生成
            const qr_img = create_Element('img',[
                {title:'qrcode'},
                {alt:'qrcode'}
            ]);
            qr_img.src = `https://api.qrserver.com/v1/create-qr-code/?data=${detailPageUrl}&size=120x120&margin=3`;
            //ポップオーバー
            const qr_button = create_Element('button',[
                {popovertarget:'qrcode-popover'}
            ]);
            qr_button.textContent = 'QRコードを表示';
            const qr_popover = create_Element('div',[
                {id:'qrcode-popover'},
                {popover:''}
            ]);
            const qr_popover_content = create_Element('div',[
                {class:'qrcode-popover-content'}
            ]);
            const qr_popover_p = create_Element('p',[]);
            qr_popover_p.textContent = '物件ページのQRコード';
            qr_popover_content.appendChild(qr_popover_p);
            qr_popover_content.appendChild(qr_img);
            qr_popover.appendChild(qr_popover_content);
            qr_div.appendChild(qr_button);
            qr_div.appendChild(qr_popover);
            
            return qr_div;
        })();
        const share_Qr_2_pc = (() => {
            const qr_div = create_Element('div',[
                {class:'js-added-qrcode'},
                {id:'share-qrcode-2-pc'}
            ]);
            //QRコード生成
            const qr_img = create_Element('img',[
                {title:'qrcode'},
                {alt:'qrcode'}
            ]);
            qr_img.src = `https://api.qrserver.com/v1/create-qr-code/?data=${detailPageUrl}&size=80x80&margin=3`;
            const qr_p = create_Element('p',[
            ]);
            qr_p.textContent = '携帯表示用QRコード';
            qr_div.appendChild(qr_img);
            qr_div.appendChild(qr_p);
            
            return qr_div;
        })();
        //LINE
        const share_Line = (() => {
            const line_div = create_Element('div',[
                {class:'js-added-line'},
                {id:'share-line'}
            ]);
            const line_button = create_Element('a',[
                {href:'https://social-plugins.line.me/lineit/share?url=' + detailPageUrl}
            ]);
            line_button.textContent = 'LINE共有';
            //LINEアイコン
            //const line_img = create_Element('img',[
                //{src:''},
                //{class:'line-img'}
            //]);
            //line_button.appendChild(line_img);
            line_div.appendChild(line_button);
        
            return line_div;
        })();
        share_2.appendChild(share_Line);
        share_2.appendChild(share_Qr_2);
        //メール
        //const share_Mail = (() => {
            //const mail_Subject = '%E3%80%90%E3%81%8A%E9%83%A8%E5%B1%8B%E6%83%85%E5%A0%B1%E3%80%91';
            //const mail_Body = '%E3%80%90' + '%E7%89%A9%E4%BB%B6%E3%82%B3%E3%83%BC%E3%83%89%EF%BC%9A' + apartmentCode + '%20' + 'bukkennmei' + '%E3%80%91' + '%0d%0a' + detailPageUrl;
            //const mail_div = create_Element('div',[
                //{class:'js-added-mail'},
                //{id:'share-mail'}
            //]);
            //const mail_button = create_Element('a',[
                //{href:'mailto:?subject=' + mail_Subject + '&amp;body=' + mail_Body}
            //]);
            //mail_button.textContent = 'メールで送る';
            //メールアイコン
            //const mail_img = create_Element('img',[
                //{src:''},
                //{class:'mail-img'}
            //]);
            //mail_button.appendChild(mail_img);
            //mail_div.appendChild(mail_button);
        
            //return mail_div;
        //})();
        //share.appendChild(share_Mail);
        //お問い合わせ
        share_1.appendChild(inquiry_1);
        share_1.appendChild(inquiry_Tel_1);
        share_2.appendChild(inquiry_2_container);
        share_2.appendChild(share_Qr_2_pc);
        //style設定
        const headElm = document.querySelector('head');
        const shareStyle = document.createElement('style');
        shareStyle.setAttribute('id','share-style');
        shareStyle.textContent = `
            #share-1 {
                display:block !important;
                width:33% !important;
                margin-bottom:0.8rem;
            }
            #share-2 {
                display:flex !important;
                display:-webkit-box;
                display:-webkit-flex;
                display :-ms-flexbox;
                flex-flow:row wrap;
                justify-content:space-between;
                width:100% !important;
                background-color:#dddddd;
                padding:0.8rem 1.6rem;
                margin: 0 auto;
            }
            .js-added-inquiry-container {
                display:flex !important;
                display:-webkit-box;
                display:-webkit-flex;
                display :-ms-flexbox;
                flex-flow:row wrap;
                justify-content:space-between;
                flex-grow:1;
            }
            .js-added-inquiry {
                margin-bottom:0.5rem;
            }
            .js-added-inquiry > a {
                display:block;
                background:#ffb911;
                color:#ffffff;
                text-decoration:none;
                text-align:center;
                font-weight:bold;
                font-size:1.6rem;
                padding:1.4rem;
            }
            .js-added-inquiry > a:hover {
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
            #inquiry-2 {
                width:100%;
            }
            #inquiry-tel-1　{
            }
            #inquiry-tel-1 > .tel-number {
                font-size:1.6rem;
            }
            #inquiry-tel-1 > .tel-time {
                font-size:0.8rem;
            }
            #inquiry-tel-2 {
                display:flex !important;
                display:-webkit-box;
                display:-webkit-flex;
                display :-ms-flexbox;
                flex-flow:column nowrap;
                justify-content:space-between;
                align-items:center;
                flex-grow:1;
            }
            #inquiry-tel-2 > .tel-number {
                font-size:1.8rem;
            }
            #inquiry-tel-2 > .tel-time {
                font-size:1rem;
            }
            .js-added-inquiry-container > a {
                display:none;
            }
            .js-added-inquiry-container > a:hover {
                opacity:.6;
            }
            .js-added-qrcode {
                margin-bottom:0.5rem;
            }
            #share-qrcode-2 {
                display:none;
            }
            #share-qrcode-2-pc {
                margin-bottom:0 !important;
                margin-left:3.2rem;
                display:flex !important;
                display:-webkit-box;
                display:-webkit-flex;
                display :-ms-flexbox;
                flex-flow:column nowrap;
                justify-content:space-between;
                align-items:center;
            }
            #share-qrcode-2-pc > img {
                width:80px;
                height:80px;
            }
            #share-qrcode-2-pc > p {
                font-size:0.8rem;
                color:#000;
                margin-top:0.5rem;
            }
            .js-added-line {
                display:none;
            }
            @media screen and (max-width:750px) {
                #share-1 {
                    display:none !important;
                }
                .js-added-inquiry > a {
                    font-size:1.8rem;
                    padding:1.2rem;
                }
                #inquiry-tel-2 > .tel-number {
                    font-size:1.6rem;
                }
                #inquiry-tel-2 > .tel-time {
                    font-size:0.8rem;
                }
                .js-added-inquiry-container > a {
                    display:block;
                    background:#26aaff;
                    color:#ffffff;
                    text-decoration:none;
                    text-align:center;
                    font-weight:bold;
                    font-size:1.4rem;
                    padding:0.8rem;
                }
                #share-qrcode-2 {
                    display:block;
                    margin-bottom:0.5rem;
                    flex-basis:calc(50% - 0.4rem);
                }
                #share-qrcode-2 > button {
                    width:100%;
                    background:#3f3f3f;
                    color:#ffffff;
                    font-size:1.4rem;
                    text-align:center;
                    font-weight:bold;
                    padding:0.8rem;
                    border:0;
                    cursor:pointer;
                }
                #share-qrcode-2 > button:hover {
                    opacity:.6;
                }
                #share-qrcode-2-pc {
                    display:none !important;
                }
                .js-added-line {
                    display:block;
                    margin-bottom:0.5rem;
                    flex-basis:calc(50% - 0.4rem);
                }
                .js-added-line > a {
                    display:block;
                    background:#06c755;
                    color:#ffffff;
                    font-size:1.4rem;
                    text-decoration:none;
                    text-align:center;
                    font-weight:bold;
                    padding:0.8rem;
                }
                .js-added-line > a:hover {
                    opacity:.6;
                }
            }
        `; 
        headElm.appendChild(shareStyle);
        
        document.querySelector('div.detail_l').appendChild(share_1);
        document.querySelector('div.detail_btm').appendChild(share_2);
    })();
    //----------------------------------------------------------------------------
    
    
    
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
                {height:'auto'},
                {style:'border:0; position:absolute; top:-180px; left:0; width:100%; height:calc(100% + 180px + 180px);'},
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
