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
  };
  
  const tab_Label = document.createElement('label');
  tab_Label.setAttribute('class','label');
  tab_Label.setAttribute('for',setId);
  
  add_tabContents.appendChild(tab_Input);
  add_tabContents.appendChild(tab_Label);
};
console.log(add_tabContents);
const targetElm = document.querySelector();
targetElm.appendChild(add_tabContents);
