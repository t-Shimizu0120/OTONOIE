if (settings['mask']) {
    //=================================================================
    //pagetopボタン
    //=================================================================
    (() => {
        const pageTopElm = document.getElementById('pagetop');
        pageTopElm.setAttribute('class','pagetop');
        const pageTop_a = pageTopElm.querySelector('a');
        pageTop_a.removeChild(pageTop_a.querySelector('img'));
        pageTop_a.setAttribute('class','js-added-pagetop component--button component--flex-box');
        const pageTop_div = create_Element('div',[
            {class:'icom--arrow'}
        ]);
        const pageTop_p = create_Element('p',[]);
        pageTop_p.textContent = 'ページTOP';
        pageTop_a.appendChild(pageTop_div);
        pageTop_a.appendChild(pageTop_p);
    })();
} else {
};
