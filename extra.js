if (settings['mask']) {
    //URL取得
    const locationURL = location.href;
    //URLで分岐
    if (locationURL.includes('detail')) {
        const headElm = document.querySelector('head');
        const bodyElm = document.querySelector('body');
        //=================================================================
        //掲載データ
        //=================================================================
        //物件コード
        //物件URL
        //上部右側データ
        //賃料
        //管理費
        //問い合わせフォーム
        //個人情報の取り扱い
        (() => {
            //=================================================================
            //コンテナ
            //=================================================================
            //----------------------------上部---------------------------------
            const containerTop = create_Element('div',[
                {class:'js-added-container-top component--flex-box'},
                {id:'container-top'}
            ]);
            document.querySelector('div.detail_l').appendChild(containerTop);
            const containerTop_Left = create_Element('div',[
                {class:'js-added-container-top-left component--flex-box'},
                {id:'container-top-left'}
            ]);
            containerTop.appendChild(containerTop_Left);
            const containerTop_Right = create_Element('div',[
                {class:'js-added-container-top-right component--flex-box'},
                {id:'container-top-right'}
            ]);
            containerTop.appendChild(containerTop_Right);
            const containerTop_Bottom = create_Element('div',[
                {class:'js-added-container-top-bottom component--flex-box'},
                {id:'container-top-bottom'}
            ]);
            containerTop.appendChild(containerTop_Bottom);
            //-----------------------------------------------------------------
            //----------------------------中部---------------------------------
            const containerMiddle = create_Element('div',[
                {class:'js-added-container-middle component--flex-box'},
                {id:'container-middle'}
            ]);
            document.querySelector('div.detail_r').appendChild(containerMiddle);
            //-----------------------------------------------------------------
            //----------------------------下部---------------------------------
            const containerBottom = create_Element('div',[
                {class:'js-added-container-bottom component--flex-box'},
                {id:'container-bottom'}
            ]);
            document.querySelector('div.detail_btm').appendChild(containerBottom);
            //-----------------------------------------------------------------
            //----------------------------シェア-------------------------------
            const containerShare = create_Element('div',[
                {class:'js-added-container-share component--flex-box'},
                {id:'container-share'}
            ]);
            document.querySelector('div.detail_btm').appendChild(containerShare);
            //-----------------------------------------------------------------
        })();
    } else if (locationURL.includes('property')) {
    } else {
    };
} else {
};
