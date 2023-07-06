//=================================================================
//pagetopボタン
//=================================================================
(() => {
    const pageTopElm = document.getElementById('pagetop');
    const pageTop_a = pageTopElm.querySelector('a');
    pageTop_a.removeChild(pageTop_a.querySelector('img'));
    pageTop_a.setAttribute('class','js-added-pagetop');
    const pageTop_div = create_Element('div',[
        {class:'js-added-pagetop-arrow'}
    ]);
    const pageTop_p = create_Element('p',[]);
    pageTop_p.textContent = 'ページTOP';
    pageTop_a.appendChild(pageTop_div);
    pageTop_a.appendChild(pageTop_p);
})();
