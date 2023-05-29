const add_tabContents = document.createElement('div');
add_tabContents.setAttribute('class','js-added-tab-contents');
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
.'js-added-tab-contents {
  width: 500px;
  margin: auto;
  flex-wrap: wrap;
  display: flex;
}
input[name="name"] {
  display: none;
}
.label {
  width: calc(100%/3);
  height: 30px;
  line-height: 50px;
  font-size: 15px;
  text-align: center;
  display: block;
  float: left;
  order: -1;
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
