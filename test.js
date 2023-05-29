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
  tab_Label.textContent = 'ラベル' + i;
  
  add_tabContents.appendChild(tab_Input);
  add_tabContents.appendChild(tab_Label);
};
console.log(add_tabContents);
const targetElm = document.querySelector('div.detail_btm');
targetElm.appendChild(add_tabContents);
