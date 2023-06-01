    //■要素作成関数
    const create_Element = (tagName,attributes) => {
        const add_Elm = document.createElement(tagName);
        for (attribute of attributes) {
            const attrName = Object.keys(attribute)[0]
            const attrValue = attribute[attrName]
            add_Elm.setAttribute(attrName,attrValue);
        };
        return add_Elm;
    };



    //ウィンドウ幅から地図用のアスペクト比を生成
    const aspectRatio = (() => {
        if (window.screen.width <= 480) {
            return 75;
        } else if (window.screen.width > 480 && window.screen.width < 960){
            return 75;
        } else {
            return 66.667;
        };
    })();


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





    //◻タブコンテンツ作成クラス
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
                }
                input[name="js-added-tab-input"] {
                    display: none;
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
                .js-added-tab-label {
                    background-color:#dddddd; 
                    color:#3f3f3f; 
                    text-align:center;
                    flex: 0 0 ${tabWidthBase}%; 
                    padding: 10px 0; 
                    font-weight:bold;
                    cursor:pointer;
                }
                input:checked + .js-added-tab-label:hover {
                    opacity:1;
                }
                input:disabled + .js-added-tab-label:hover {
                    opacity:1;
                }
                .js-added-tab-label:hover {
                    opacity:.6;
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

    const surroundingEnvironment = new AddTabContents(
        {
            contents_Title:'周辺概要',
            contents_BaseId:'surrounding-environment',
            tab_Contents:[
                {tabContentTitle:'周辺マップ',tabContentName:'map'},
                {tabContentTitle:'周辺施設情報',tabContentName:'surrounding-information'}
            ],
            add_Styles:`
                .js-added-map {
                    position:relative; 
                    padding-bottom:${aspectRatio}%; 
                    height:0; 
                    overflow:hidden;
                }
            `, 
            add_To_Selector:'div.detail_btm'
       },
       content_Map,
       null
    );
