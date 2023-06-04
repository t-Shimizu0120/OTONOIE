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
                {src:'https://www.otonoie.net/otonoie/img/prep/p8238/83560b3f27ae7909e9859b63855b95af.png'},
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
                    border-radius: 50%;
                    width: 51px;
                    height: 51px;
                    overflow: hidden;
                    background-color:#3f3f3f;
                    position: fixed;
                    right: 20px;
                    bottom: 71px;
                }
                input[name="js-added-share-input"] {
                    display: none;
                }
                .share-img {
                    display: block;
                }
                .share-img-close {
                    display: none;
                }
                input:checked + .js-added-share-label > .share-img {
                    display: none;
                }
                input:checked + .js-added-share-label > .share-img-close {
                    display: block;
                }
            `;
            headElm.appendChild(share_Style);
            
            return share_Div;
        })();
        insertTargetElm.before(share);
    })();
