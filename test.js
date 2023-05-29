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
                //オブジェクトを作成
                const obj = this.setAttrs(object);
                //タイトル作成
                const tab_Contents_Title = document.createElement('h5');
                tab_Contents_Title.textContent = obj['contents_Title'];
                //コンテナ作成
                const add_tabContents = document.createElement('div');
                //add_tabContents.setAttribute('class','js-added-tab-contents');
                for (this.div_Attr of obj.div_Attrs) {
                    const div_AttrName = Object.keys(this.div_Attr)[0];
                    const div_AttrValue = this.div_Attr[div_AttrName];
                    add_tabContents.setAttribute(div_AttrName,div_AttrValue);
                };
                
                
                
                
                const tab_Ul = document.createElement('ul');
                for (this.ul_Attr of obj.ul_Attrs) {
                    const ul_AttrName = Object.keys(this.ul_Attr)[0];
                    const ul_AttrValue = this.ul_Attr[ul_AttrName];
                    tab_Ul.setAttribute(ul_AttrName,ul_AttrValue);
                };
            };
        };
    };


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
