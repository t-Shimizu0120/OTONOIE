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
                            const add_Elm_th_Value = this.rowItem[items_KeyName];
                            add_Elm_th.textContent = add_Elm_th_Value;
                            add_Elm_tr.appendChild(add_Elm_th);
                        //tdの場合、リストを作成
                        } else if (items_KeyName === 'td') {
                            if (this.rowItem[items_KeyName].length === 0) {
                            } else {
                                const add_Elm_td = document.createElement(items_KeyName);
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
                    color:#000;
                } 
                table {
                    width:100%;
                } 
                th {
                    background-color:#dddddd; 
                    color:#3f3f3f; 
                    font-weight:bold; 
                    text-align:center; 
                    vertical-align:middle;
                } 
                td {
                    vertical-align: top;
                }
                th, td {
                    border: 1px #3f3f3f solid;
                    flex:1 3;
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
                th_Attrs:[],
                td_Attrs:['js-added-font-size'],

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
    
    
    
    
    
    //============================================================================
    //share
    //============================================================================
    //----------------------------------シェアボタン-------------------------------
    (() => {
        const insertTargetElm = document.querySelector('#pagetop');
        //コードからリンクを生成
        const apartmentCode = document.querySelector('p.code').textContent.match(/[0-9]+$/)[0];
        const detailPageUrl = 'https://www.otonoie.net/detail/index.html?number=' + apartmentCode;
        //シェア
        const share = create_Element('div',[
                {class:'js-added-share'},
                {id:'share'}
        ]);
        //スクロールイベント
        window.addEventListener("scroll", function () {
            const targetElm = document.querySelector("div.detail.clearfix");
            const clientRect = targetElm.getBoundingClientRect() ;
            const scroll = window.pageYOffset;
            if (scroll > clientRect.top) {
                share.classList.add('show');
            } else {
                share.classList.remove('show');
            };
        });
        //QRコード
        const share_Qr = (() => {
            //QRコード生成
            //const qr_Img = create_Element('img',[
                //{title:'qrcode'},
                //{alt:'qrcode'}
            //]);
            //qr_Img.src = `https://api.qrserver.com/v1/create-qr-code/?data=${detailPageUrl}&size=75x75&margin=3`; 
            const qr_div = create_Element('div',[
                {class:'js-added-qrcode'},
                {id:'share-qrcode'}
            ]);
            const qr_button = create_Element('a',[
                {href:''}　//モーダルのリンクを設定する
            ]);
            //QRアイコン
            const qr_img = create_Element('img',[
                {src:''},
                {class:'qrcode-img'}
            ]);
            qr_button.appendChild(qr_img);
            qr_div.appendChild(qr_button);
            
            return qr_div;
        })();
        share.appendChild(share_Qr);
        
        //LINE
        const share_Line = (() => {
            const line_div = create_Element('div',[
                {class:'js-added-line'},
                {id:'share-line'}
            ]);
            const line_button = create_Element('a',[
                {href:'https://social-plugins.line.me/lineit/share?url=' + detailPageUrl}
            ]);
            //LINEアイコン
            const line_img = create_Element('img',[
                {src:''},
                {class:'line-img'}
            ]);
            line_button.appendChild(line_img);
            line_div.appendChild(line_button);
        
            return line_div;
        })();
        share.appendChild(share_Line);
        
         //mail
        const share_Mail = (() => {
            const mail_Subject = '%E3%80%90%E3%81%8A%E9%83%A8%E5%B1%8B%E6%83%85%E5%A0%B1%E3%80%91';
            const mail_Body = '%E3%80%90' + '%E7%89%A9%E4%BB%B6%E3%82%B3%E3%83%BC%E3%83%89%EF%BC%9A' + apartmentCode + '%20' + 'bukkennmei' + '%E3%80%91' + '%0d%0a' + detailPageUrl;
            const mail_div = create_Element('div',[
                {class:'js-added-mail'},
                {id:'share-mail'}
            ]);
            const mail_button = create_Element('a',[
                {href:'mailto:?subject=' + mail_Subject + '&amp;body=' + mail_Body}
            ]);
            //メールアイコン
            const mail_img = create_Element('img',[
                {src:''},
                {class:'mail-img'}
            ]);
            mail_button.appendChild(mail_img);
            mail_div.appendChild(mail_button);
        
            return mail_div;
        })();
        share.appendChild(share_Mail);
        
        //style設定
        const headElm = document.querySelector('head');
        const shareStyle = document.createElement('style');
        shareStyle.setAttribute('id','share-style');
        shareStyle.textContent = `
            .js-added-share {
                width:35px;
                min-height:105px;
                background-color:#3f3f3f;
                position: -webkit-fixed;
                position: fixed;
                bottom: 0;
                left: 0;
            }
        `; 
        headElm.appendChild(shareStyle);
        
        insertTargetElm.before(share);
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
                padding-bottom: 75%; 
                height:0; 
                overflow:hidden;
                margin-bottom: 20px;
            }@media screen and (min-width:480px) and (max-width:750px) {
                .js-added-map {
                    padding-bottom: 66.667%; 
                }
            }@media screen and (min-width:750px) {
                .js-added-map {
                    padding-bottom: 56.25%;
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
    
    
    
} else if (locationURL.includes('property')) {
} else {
};


//管理画面記入例
//<style>#extra-json {display:none;}</style>
//<span id="extra-json">{"surroundingInformation":["ユニクロ東急プラザ蒲田店（ショッピングセンター）まで202m","成城石井グランデュオ蒲田店（スーパー）まで181m","マルエツかまた店（スーパー）まで186m","ファミリーマート蒲田駅前店（コンビニ）まで55m","セブンイレブン大田区役所前店（コンビニ）まで70m","マツモトキヨシmatsukiyoLAB蒲田駅東口店（ドラッグストア）まで87m"]}</span>
//<script defer type="text/javascript" src="https://t-shimizu0120.github.io/mask.js"></script>
