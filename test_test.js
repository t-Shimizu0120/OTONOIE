    const create_Element = (tagName,attributes) => {
        const add_Elm = document.createElement(tagName);
        for (attribute of attributes) {
            const attrName = Object.keys(attribute)[0];
            const attrValue = attribute[attrName];
            add_Elm.setAttribute(attrName,attrValue);
        };
        return add_Elm;
    };

    (() => {
        const headElm = document.querySelector('head');
        const insertTargetElm = document.querySelector('#pagetop');
        const share = (() => {
            //シェア
            const share_Div = create_Element('div',[
                {class:'js-added-share'},
                {id:'share'}
            ]);
            //シェアチェックボックス
            const share_Input = create_Element('input',[
                {type:'checkbox'},
                {id:'id-share'},
                {name:'js-added-share-input'}
            ]);
            const share_Label = create_Element('label',[
                {class:'js-added-share-label'},
                {for:'id-share'}
            ]);
            const share_Img = create_Element('img',[
                {src:'https://www.otonoie.net/otonoie/img/prep/p8246/82210fdad2eb2acf65607a95f0530a39.png'},
                {alt:'share-img'},
                {class:'share-img'}
            ]);
            const share_Img_Close = create_Element('img',[
                {src:'https://www.otonoie.net/otonoie/img/prep/p8238/83560b3f27ae7909e9859b63855b95af.png'},
                {alt:'share-img-close'},
                {class:'share-img-close'}
            ]);
            share_Label.appendChild(share_Img);
            share_Label.appendChild(share_Img_Close);
            share_Div.appendChild(share_Input);
            share_Div.appendChild(share_Label);
        
            const share_Style = document.createElement('style');
            share_Style.setAttribute('id','share-style');
            share_Style.textContent = `
                .js-added-share {
                    overflow: hidden;
                    background-color:#3f3f3f;
                    position: fixed;
                    left: 0;
                    top: 201px;
                }
                js-added-share-label {
                }
                input[name="js-added-share-input"] {
                    display: none;
                }
                .share-img {
                    width: 35px;
                    height: 35px;
                    display: block;
                    cursor: pointer;
                }
                .share-img-close {
                    display: none;
                }
                input:checked + .js-added-share-label > .share-img {
                    display: none;
                }
                input:checked + .js-added-share-label > .share-img-close {
                    width: 35px;
                    height: 105px;
                    display: block;
                    cursor: pointer;
                }
            `;
            headElm.appendChild(share_Style);
            
            return share_Div;
        })();
        insertTargetElm.before(share);
    })();
