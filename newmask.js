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
        clickHandler(e) {
            e.preventDefault();
            const targetTab = e.target;
            const parentId = targetTab.parentNode.getAttribute('id');
            const target_Contents_Id = parentId.replace(/tab-list$/g,'tab-contents');
            const target_Contents_Parent = document.getElementById(target_Contents_Id);
            if (targetTab.className.includes('active')) {
            } else {
                targetTab.parentNode.querySelectorAll('.js-added-tab-list-item.active')[0].classList.remove('active');
                targetTab.classList.add('active');
                targetTab.classList.remove('js-added-tab-list-item-valid');

                target_Contents_Parent.querySelectorAll('.js-added-tab-contents-item.show')[0].classList.remove('show');
                const aryTabs = Array.prototype.slice.call(targetTab.parentNode.children);
                const index = aryTabs.indexOf(targetTab);
                target_Contents_Parent.children[index].classList.add('show');
            };
            for(let i = 0; i < targetTab.parentNode.children.length; i++) {
                if (target_Contents_Parent.children[i].hasChildNodes() == true && targetTab.parentNode.children[i].className.includes('active') == false) {
                    targetTab.parentNode.children[i].classList.add('js-added-tab-list-item-valid');
                } else {
                };
            };
        };
    };
    //インスタンス生成例
    //const surroundingEnvironment = new AddTabContents(
        //{
            //contents_Title:'周辺概要',
            //contents_BaseId:'surrounding-environment',
            //tab_Contents:[
                //{tabContentTitle:'周辺マップ'},
                //{tabContentTitle:'周辺施設情報'}
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
