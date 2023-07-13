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
    } else if (locationURL.includes('property')) {
    } else {
    };
} else {
};
