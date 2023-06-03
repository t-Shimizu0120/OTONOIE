    const create_Element = (tagName,attributes) => {
        const add_Elm = document.createElement(tagName);
        for (attribute of attributes) {
            const attrName = Object.keys(attribute)[0]
            const attrValue = attribute[attrName]
            add_Elm.setAttribute(attrName,attrValue);
        };
        return add_Elm;
    };
    
    const share = (() => {
        const share_button = create_Element('div',[
            {class:'js-added-share'}
        ]);
    })();
