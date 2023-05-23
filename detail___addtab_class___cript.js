const create_Element = (tagName,attributes) => {
    const add_Elm = document.createElement(tagName);
    for (attribute of attributes) {
        const attrName = Object.keys(attribute)[0]
        const attrValue = attribute[attrName]
        add_Elm.setAttribute(attrName,attrValue);
    };
    return add_Elm;
};





const tab_Content_Map = (() => {
    const map_Parent_Elm = create_Element('div',[
        {class:'tab-contents-item'},
        {id:'contents-item-map'}
    ]);

    const map_Address = document.querySelector('div.detail_r').querySelector('dl.clearfix').querySelector('dd').textContent;

    const map_Src = (() => {
        let m_src;
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





(() => {
    class AddTabContents {

        constructor (object,...args) {
            if (document.querySelector('.js-added-tab-list') != null) {
            } else {
                this.setStyle();
            };

            const obj = this.setAttrs(object);

            const tab_Contents_Title = document.createElement('h5');
            tab_Contents_Title.textContent = obj['contents_Title'];

            const tab_Ul = document.createElement('ul');
            for (this.ul_Attr of obj.ul_Attrs) {
                const ul_AttrName = Object.keys(this.ul_Attr)[0];
                const ul_AttrValue = this.ul_Attr[ul_AttrName];
                tab_Ul.setAttribute(ul_AttrName,ul_AttrValue);
            };
            for (let i = 0; i < obj.tab_Contents.length; i++) {
                const tab_Li = document.createElement('li');
                for (this.li_Attr of obj.li_Attrs) {
                    const li_AttrName = Object.keys(this.li_Attr)[0];
                    const li_AttrValue = this.li_Attr[li_AttrName];
                    tab_Li.setAttribute(li_AttrName,li_AttrValue);
                };
                tab_Li.textContent = obj.tab_Contents[i]['tabContentTitle'];
                if (i === 0) {
                    for (this.class_First of obj.li_Class_First) {
                        tab_Li.classList.add(this.class_First);
                    };
                } else {
                    for (this.class_Except of obj.li_Class_Except) {
                        tab_Li.classList.add(this.class_Except);
                    };
                };
                if(args[i] === null) {
                    tab_Li.classList.add('js-disabled');
                    for (this.class_Except of obj.li_Class_Except) {
                        tab_Li.classList.remove(this.class_Except);
                    };
                } else {
                    tab_Li.addEventListener('click', (e) => this.clickHandler(e));
                };
                tab_Ul.appendChild(tab_Li);
            };
            const tab_Contents = document.createElement('div');
            for (this.contents_Attr of obj.contents_Attrs) {
                const contents_AttrName = Object.keys(this.contents_Attr)[0];
                const contents_AttrValue = this.contents_Attr[contents_AttrName];
                tab_Contents.setAttribute(contents_AttrName,contents_AttrValue);
            };
            for (let i = 0; i < obj.tab_Contents.length; i++) {
                const tab_Contents_Item = document.createElement('div');
                for (this.contents_Item_Attr of obj.contents_Item_Attrs) {
                    const contents_Item_AttrName = Object.keys(this.contents_Item_Attr)[0];
                    const contents_Item_AttrValue = this.contents_Item_Attr[contents_Item_AttrName];
                    tab_Contents_Item.setAttribute(contents_Item_AttrName,contents_Item_AttrValue);
                };
                if (i === 0) {
                    for (this.class_First of obj.contents_Item_Class_First) {
                        tab_Contents_Item.classList.add(this.class_First);
                    };    
                } else {
                    for (this.class_Except of obj.contents_Item_Class_Except) {
                        tab_Contents_Item.classList.add(this.class_Except);
                    };
                };
                if(args[i] === null) {
                } else {
                    tab_Contents_Item.appendChild(args[i]);
                };
                tab_Contents.appendChild(tab_Contents_Item);
            };
            const targetElm = document.querySelector(obj.add_To_Selector);
            targetElm.appendChild(tab_Contents_Title);
            targetElm.appendChild(tab_Ul);
            targetElm.appendChild(tab_Contents);
        };
        setStyle() {
            const headElm = document.querySelector('head');
            const addStyleElm = document.createElement('style');
            const style = '.js-added-tab-list {list-style-type:none; display:flex; flex-flow:row wrap; justify-content:space-btween;} .js-added-tab-list-item {text-align:center; flex: 0 0 33.33333%; background-color:#dddddd; color:#3f3f3f; padding: 10px 0; font-weight:bold;} .js-added-tab-list-item-valid {cursor:pointer;} .js-added-tab-list-item.active {background-color:#3f3f3f; color:#eee;} .js-added-h:hover {opacity:.6;} .js-disabled {opacity:.6; pointer-events:none;} .js-added-tab-contents-item {display:none;} .js-added-tab-contents-item.show {display:block;} #contents-item-map {position:relative; padding-bottom:56.25%; height:0; overflow:hidden;}';
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
                li_Class_Except:['js-added-tab-list-item-valid','js-added-h'],

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
            const ul_Id = object.ul_Id;
            tab_Obj.ul_Attrs.push(ul_Id);
            const contents_Id = object.contents_Id;
            tab_Obj.contents_Attrs.push(contents_Id);
            tab_Obj.add_To_Selector = object.add_To_Selector;

            return tab_Obj;
        };
        clickHandler(e) {
            e.preventDefault();
            const targetTab = e.target;
            const parentId = targetTab.parentNode.getAttribute('id');
            const target_Contents_Id = parentId.replace(/tabs$/g,'tab-contents');
            const target_Contents_Parent = document.getElementById(target_Contents_Id);
            if (targetTab.className.includes('active')) {
            } else {
                targetTab.parentNode.querySelectorAll('.js-added-tab-list-item.active')[0].classList.remove('active');
                targetTab.classList.add('active');
                targetTab.classList.remove('js-added-tab-list-item-valid');
                targetTab.classList.remove('js-added-h');

                target_Contents_Parent.querySelectorAll('.js-added-tab-contents-item.show')[0].classList.remove('show');
                const aryTabs = Array.prototype.slice.call(targetTab.parentNode.children);
                const index = aryTabs.indexOf(targetTab);
                target_Contents_Parent.children[index].classList.add('show');
            };
            for(let i = 0; i < targetTab.parentNode.children.length; i++) {
                if (target_Contents_Parent.children[i].hasChildNodes() == true && targetTab.parentNode.children[i].className.includes('active') == false) {
                    targetTab.parentNode.children[i].classList.add('js-added-tab-list-item-valid');
                    targetTab.parentNode.children[i].classList.add('js-added-h');
                } else {
                };
            };
        };
    };


    const surroundingEnvironment = new AddTabContents(
        {
            contents_Title:'周辺概要',
            tab_Contents:[
                {tabContentTitle:'周辺マップ'},
                {tabContentTitle:'周辺施設情報'}
            ],
            ul_Id:{id:'surrounding-environment-tabs'},
            contents_Id:{id:'surrounding-environment-tab-contents'},
            add_To_Selector:'div.detail_btm'
        },
        tab_Content_Map,
        tab_Content_SurroundingInformation
    );

})();