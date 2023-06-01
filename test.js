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
        setAttrs(object) {
            const tab_Obj = {
                contents_Title:'',
                tab_Contents:[],

                div_Attrs:[{class:'js-added-tab-contents'}],
                input_Attrs:[{type:'radio'},{name:'js-added-tab-input'}],
                label_Attrs:[{class:'js-added-tab-label'}],
                content_Attrs:[{class:'js-added-tab-content'}],

                add_To_Selector:''
            };
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




        setStyle(object) {
            const headElm = document.querySelector('head');
            const addStyleElm = document.createElement('style');
            addStyleElm.setAttribute('id','tab-style');
            const addStyles = object['add_Styles'];
            const tabCount = (() => {
                if (object['tab_Contents'].length <= 3) {
                    return 3;
                } else {
                    return object['tab_Contents'].length;
                };
            })();
            const tabWidthBase = Math.trunc((100 / Number(tabCount)) * 1000) / 1000;
            const style = `
                .js-added-tab-contents-container {
                    width:100%;
                }
                .js-added-tab-list {
                    list-style-type:none; 
                    display:flex; 
                    flex-flow:row wrap; 
                    justify-content:space-btween;
                } 
                .js-added-tab-list-item {
                    text-align:center;
                    flex: 0 0 ${tabWidthBase}%; 
                    background-color:#dddddd; 
                    color:#3f3f3f; 
                    padding: 10px 0; 
                    font-weight:bold;
                } 
                .js-added-tab-list-item-valid {
                    cursor:pointer;
                } 
                .js-added-tab-list-item-valid:hover {
                    opacity:.6;
                } 
                .js-added-tab-list-item.active {
                    background-color:#3f3f3f; 
                    color:#eee;
                } 
                .js-added-disabled {
                    opacity:.6; 
                    pointer-events:none;
                } 
                .js-added-tab-contents-item {
                    display:none;
                } 
                .js-added-tab-contents-item.show {
                    display:block;
                } 
                ${addStyles}
            `;
            addStyleElm.textContent = style;
            headElm.appendChild(addStyleElm);
        };
        setAttrs(object) {
            const tab_Obj = {
                contents_Title:'',
                tab_Contents:[],

                ul_Attrs:[{class:'js-added-tab-list'}],
                li_Attrs:[{class:'js-added-tab-list-item'}],
                li_Class_First:['active'],
                li_Class_Except:['js-added-tab-list-item-valid'],

                contents_Attrs:[{class:'js-added-tab-contents'}],
                contents_Item_Attrs:[{class:'js-added-tab-contents-item'}],
                contents_Item_Class_First:['show'],
                contents_Item_Class_Except:[],

                add_To_Selector:''
            };
            tab_Obj.contents_Title = object.contents_Title;
            const tab_Contents = object.tab_Contents;
            for (this.tab_Content of tab_Contents) {
                tab_Obj.tab_Contents.push(this.tab_Content);
            };
            const ul_Id = {};
            ul_Id.id = object.contents_BaseId + '-tab-list';
            tab_Obj.ul_Attrs.push(ul_Id);
            const contents_Id = {};
            contents_Id.id = object.contents_BaseId + '-tab-contents';
            tab_Obj.contents_Attrs.push(contents_Id);
            tab_Obj.add_To_Selector = object.add_To_Selector;

            return tab_Obj;
        };



    //const surroundingEnvironment = new AddTabContents(
        //{
            //contents_Title:'周辺概要',
            //contents_BaseId:'surrounding-environment',
            //tab_Contents:[
                //{tabContentTitle:'周辺マップ',tabContentName:''},
                //{tabContentTitle:'周辺施設情報'tabContentName:''}
            //],
            //add_Styles:`
                //#contents-item-map {
                    //position:relative; 
                    //padding-bottom:${aspectRatio}%; 
                    //height:0; 
                    //overflow:hidden;
                //}
            //`, 
            //add_To_Selector:'div.detail_btm'
       //},
       //tab_Content_Map,
       //tab_Content_SurroundingInformation
    //);







for (let i = 0; i < 3; i++) {
  const tab_Input = document.createElement('input');
  const setId = 'tab' + (i + 1);
  tab_Input.setAttribute('id',setId);
  tab_Input.setAttribute('type','radio');
  tab_Input.setAttribute('name','name');
  if (i === 0) {
    tab_Input.setAttribute('checked','');
  } else if (i === 2) {
    tab_Input.setAttribute('disabled','');
  } else {
  };
  
  const tab_Label = document.createElement('label');
  tab_Label.setAttribute('class','label');
  tab_Label.setAttribute('for',setId);
  tab_Label.textContent = '周辺環境' + i;
  
  const tab_Content = document.createElement('div');
  tab_Content.setAttribute('class','js-added-tab-contents-item');
  tab_Content.textContent = 'ああああ' + i;
  
  add_tabContents.appendChild(tab_Input);
  add_tabContents.appendChild(tab_Label);
  add_tabContents.appendChild(tab_Content);
};
console.log(add_tabContents);
const targetElm = document.querySelector('div.detail_btm');
const tab_Style = document.createElement('style');
tab_Style.textContent = `
.js-added-tab-contents {
  width: 500px;
  margin: auto;
  flex-wrap: wrap;
  display: flex;
} 
.label {
  width: calc(100%/5);
  height: 50px;
  background-color: darkgrey;
  line-height: 50px;
  font-size: 15px;
  text-align: center;
  display: block;
  float: left;
  order: -1;
}
 
input[name="name"] {
  display: none;
}
 
input:checked + .label {
  background-color: cadetblue;
  color: aliceblue;
}
 
.js-added-tab-contents-item {
  display: none;
  width: 100%;
}
 
input:checked + .label + .js-added-tab-contents-item {
  display: block;
}
`;
targetElm.appendChild(tab_Style);
targetElm.appendChild(add_tabContents);
