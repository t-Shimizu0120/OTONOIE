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
                const checkedJudge = false;
                for (let i = 0; i < obj.tab_Contents.length; i++) {
                    //id生成
                    const input_label_Id = 'id-' + obj.tab_Contents[i][tabContentName];
                    
                    //input作成
                    const tab_Input = document.createElement('input');
                    for (this.input_Attr of obj.input_Attrs) {
                        const input_AttrName = Object.keys(this.input_Attr)[0];
                        const input_AttrValue = this.input_Attr[input_AttrName];
                        tab_Input.setAttribute(input_AttrName,input_AttrValue);
                    };
                    tab_Input.setAttribute('id',input_label_Id);
                    //表示用attributeの設定
                    if (args[i] === null) {
                        //コンテンツが空（null）の場合、disabledを設定
                        tab_Input.setAttribute('disabled','');
                    } else if (checkedJudge === false) {
                        //コンテンツが空（null）以外の最初のコンテンツにCheckedを設定
                        tab_Input.setAttribute('checked','');
                        //Checkedを設定した場合、checkedJudgeをtrueへ変更
                        checkedJudge = true;
                    } else {
                    };
                    
                    //label作成
                    const tab_Label = document.createElement('label');
                    for (this.label_Attr of obj.label_Attrs) {
                        const label_AttrName = Object.keys(this.label_Attr)[0];
                        const label_AttrValue = this.label_Attr[label_AttrName];
                        tab_Label.setAttribute(label_AttrName,label_AttrValue);
                    };
                    tab_Label.setAttribute('for',input_label_Id);
                    tab_Label.textContent = obj.tab_Contents[i][tabContentTitle];
                    
                    //content作成
                    const tab_Content = document.createElement('div');
                    for (this.content_Attr of obj.content_Attrs) {
                        const content_AttrName = Object.keys(this.content_Attr)[0];
                        const content_AttrValue = this.content_Attr[content_AttrName];
                        tab_Content.setAttribute(content_AttrName,content_AttrValue);
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
                {tabContentTitle:'周辺マップ',tabContentName:'js-added-map'},
                {tabContentTitle:'周辺施設情報',tabContentName:'js-added-111'}
            ],
            add_Styles:``, 
            add_To_Selector:'div.detail_btm'
       },
       null,
       null
    );
