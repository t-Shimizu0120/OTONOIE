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
        const apartmentCode = document.querySelector('p.code').textContent.match(/[0-9]+$/)[0];
        //物件URL
        const detailPageUrl = 'https://www.otonoie.net/detail/index.html?number=' + apartmentCode;
        //上部右側データ
        //賃料
        //管理費
        //問い合わせフォーム
        const inquiryForm = document.querySelector('#contact_area');
        //個人情報の取り扱い
        const handlingOfPersonalInformation = inquiryForm.nextElementSibling;
        (() => {
            //=================================================================
            //コンテナ
            //=================================================================
            //----------------------------上部---------------------------------
            const containerTop = create_Element('div',[
                {class:'js-added-container-top component--flex-box'},
                {id:'container-top'}
            ]);
            document.querySelector('div.detail.clearfix').appendChild(containerTop);
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
            document.querySelector('div.detail.clearfix').appendChild(containerMiddle);
            //-----------------------------------------------------------------
            //----------------------------下部---------------------------------
            const containerBottom = create_Element('div',[
                {class:'js-added-container-bottom component--flex-box'},
                {id:'container-bottom'}
            ]);
            document.querySelector('div.detail.clearfix').appendChild(containerBottom);
            //-----------------------------------------------------------------
            //----------------------------シェア-------------------------------
            const containerShare = create_Element('div',[
                {class:'js-added-container-share component--flex-box'},
                {id:'container-share'}
            ]);
            document.querySelector('div.detail.clearfix').appendChild(containerShare);
            //-----------------------------------------------------------------
            //===============================================================
            //お問い合わせ
            //===============================================================
            //----------------------------フォーム----------------------------
            //関数
            //popoverが開いた時の処理
            const popoverProcess_Open = function (e) {
                bodyScrollPrevent(true);
                const targetButtonSelector = 'button.js-added-popover-content-backside-button[popovertarget="' + e.currentTarget.getAttribute('popovertarget') + '"]';
                document.querySelector(targetButtonSelector).classList.add('valid');
                inquiry_wrap.querySelector('#contact_area-invalid').id = 'contact_area';
                inquiry_wrap.querySelector('#year-invalid').id = 'year';
                inquiry_wrap.querySelector('#month-invalid').id = 'month';
                inquiry_wrap.querySelector('textarea').id = '';
                inquiryForm.id += '-invalid';
                inquiryForm.querySelector('#year').id += '-invalid';
                inquiryForm.querySelector('#month').id += '-invalid';
                inquiryForm.querySelector('textarea').id += 'textarea-invalid';
            };
            //popoverが閉じた時の処理
            const popoverProcess_Close = function (e) {
                bodyScrollPrevent(false);
                const targetButtonSelector = 'button.js-added-popover-content-backside-button[popovertarget="' + e.currentTarget.getAttribute('popovertarget') + '"]';
                document.querySelector(targetButtonSelector).classList.remove('valid');
                inquiry_wrap.querySelector('#contact_area').id += '-invalid';
                inquiry_wrap.querySelector('#year').id += '-invalid';
                inquiry_wrap.querySelector('#month').id += '-invalid';
                inquiry_wrap.querySelector('textarea').id += 'textarea-invalid';
                inquiryForm.id = 'contact_area';
                inquiryForm.querySelector('#year-invalid').id = 'year';
                inquiryForm.querySelector('#month-invalid').id = 'month';
                inquiryForm.querySelector('textarea').id = '';
            };
            //問い合わせフォーム用ポップオーバー
            const popover_Content_div = create_Element('div',[
                {class:'js-added-popover-content'},
                {id:'inquiry-popover-content'},
                {popover:'auto'}
            ]);
            document.querySelector('#content').querySelector('div.inner').appendChild(popover_Content_div);
            popoverFocusControl(popover_Content_div);
            //ポップオーバー背面クローズボタン
            const popover_Backside_Close_Button = create_Element('button',[
                {class:'js-added-popover-content-backside-button match-media-target-close-btn'},
                {popovertarget:'inquiry-popover-content'},
                {popovertargetaction:'hide'}
            ]);
            popover_Backside_Close_Button.addEventListener('click',popoverProcess_Close);
            bodyElm.appendChild(popover_Backside_Close_Button);
            //クローズボタン（×ボタン）
            const closeIcon = create_Element('span',[
                {class:'icon-close'}
            ]);
            const popover_Close_Button = create_Element('button',[
                {class:'js-added-popover-close-button match-media-target-close-btn component--button'},
                {popovertarget:'inquiry-popover-content'},
                {popovertargetaction:'hide'},
                {type:'button'}
            ]);
            popover_Close_Button.appendChild(closeIcon);
            popover_Close_Button.addEventListener('click',popoverProcess_Close);
            //下部ボタンWRAP
            const inquiry_Bottom_Buttons_wrap = create_Element('div',[
                {class:'js-added-popover-bottom-buttons-wrap'},
                {id:'inquiry-popover-bottom-buttons-wrap'}
            ]);
            //問い合わせフォームWRAP
            const inquiry_wrap = create_Element('div',[
                {class:'js-added-popover-content-wrap'},
                {id:'inquiry-popover-content-wrap'}
            ]);
            inquiry_wrap.appendChild(inquiryForm.cloneNode(true));
            inquiry_wrap.querySelector('#contact_area').id += '-invalid';
            inquiry_wrap.querySelector('#year').id += '-invalid';
            inquiry_wrap.querySelector('#month').id += '-invalid';
            inquiry_wrap.querySelector('textarea').id += 'textarea-invalid';
            inquiry_Bottom_Buttons_wrap.appendChild(inquiry_wrap.querySelector('ul.owner_form_btns'));
            inquiry_Bottom_Buttons_wrap.appendChild(popover_Close_Button);
            inquiry_wrap.querySelector('form').appendChild(handlingOfPersonalInformation.cloneNode(true));
            inquiry_wrap.querySelector('form').appendChild(inquiry_Bottom_Buttons_wrap);
            popover_Content_div.appendChild(inquiry_wrap);
            //-----------------------------------------------------------------
            //--------------------------お問い合せ上部--------------------------
            //WRAP
            const inquiryBox_1 = create_Element('div',[
                {class:'js-added-inquiry-box component--flex-box'},
                {id:'inquiry-box-1'}
            ]);
            containerTop_Left.appendChild(inquiryBox_1);
            //お問合せボタン１
            const inquiry_1 = create_Element('button',[
                {class:'js-added-inquiry-button component--button'},
                {id:'inquiry-button-1'}
            ]);
            inquiry_1.textContent = 'この物件にお問い合わせ';
            inquiryBox_1.appendChild(inquiry_1);
            //電話番号１
            const inquiry_Tel_1 = (() => {
                const inquiry_Tel_div = create_Element('div',[
                    {class:'js-added-inquiry-tel'},
                    {id:'inquiry-tel-1'}
                ]);
                const inquiry_Tel_hr_1 = create_Element('hr',[]);
                inquiry_Tel_div.appendChild(inquiry_Tel_hr_1);
                const inquiry_Tel_p_Number = create_Element('p',[
                    {class:'tel-number'}
                ]);
                inquiry_Tel_p_Number.textContent = 'TEL ' + settings['company_data']['tel_number_display'];
                inquiry_Tel_div.appendChild(inquiry_Tel_p_Number);
                const inquiry_Tel_p_Time = create_Element('p',[
                    {class:'business-hours'}
                ]);
                inquiry_Tel_p_Time.textContent = settings['company_data']['business_hours'];
                inquiry_Tel_div.appendChild(inquiry_Tel_p_Time);
                const inquiry_Tel_hr_2 = create_Element('hr',[]);
                inquiry_Tel_div.appendChild(inquiry_Tel_hr_2);
    
                return inquiry_Tel_div;
            })();
            inquiryBox_1.appendChild(inquiry_Tel_1);
            //電話をかけるボタン
            const inquiry_Tel_Button = create_Element('a',[
                {class:'component--flex-box component--button'},
                {href:'tel:' + settings['company_data']['tel_number']}
            ]);
            inquiry_Tel_Button.textContent = '電話をかける';
            inquiryBox_1.appendChild(inquiry_Tel_Button);
            //QRコード１
            const qr_1 = (() => {
                const qr_div = create_Element('div',[
                    {class:'js-added-qrcode'},
                    {id:'qrcode-1'}
                ]);
                //QRコードimageタグ
                const qr_img = create_Element('img',[
                    {title:'qrcode'},
                    {alt:'qrcode'}
                ]);
                //QRコードテーブル作成
                const qrcode_table = new AddTable(
                    {
                        table_BaseId:'qrcode-1',
                        table_Contents:[[{th:'携帯表示用QRコード'},{td:['']}]],
                        add_Styles:`
#qrcode-1-table {
    border:0;
    width:100%;
}
#qrcode-1-table > tbody > tr > th {
    border:0;
    font-size:1.2rem;
}
#qrcode-1-table > tbody > tr > td {
    border:0;
    padding:0.6rem;
    text-align:end;
    background-color:#dddddd;
}
@media screen and (${settings['media']['m']}) {
}
@media screen and (${settings['media']['s']}) {
}
                        `
                    }
                );
                qrcode_table.querySelector('td').removeChild(qrcode_table.querySelector('ul'));
                qrcode_table.querySelector('td').appendChild(qr_img);
                qr_div.appendChild(qrcode_table);
        
                return qr_div;
            })();
            containerTop_Left.appendChild(qr_1);
            //-----------------------------------------------------------------
            //--------------------------お問い合せ下部--------------------------
            //WRAP
            const inquiryContainer = create_Element('div',[
                {class:'js-added-inquiry-container component--flex-box'},
                {id:'inquiry-container'}
            ]);
            containerMiddle.appendChild(inquiryContainer);
            //お問い合わせコンテンツBOX
            const inquiryBox_2 = create_Element('div',[
                {class:'js-added-inquiry-box component--flex-box'},
                {id:'inquiry-box-2'}
            ]);
            inquiryContainer.appendChild(inquiryBox_2);
            //お問合せボタン２
            const inquiry_2 = create_Element('button',[
                    {class:'js-added-inquiry-button component--button'},
                    {id:'inquiry-button-2'}
            ]);
            inquiry_2.textContent = 'この物件にお問い合わせ';
            inquiryBox_2.appendChild(inquiry_2);
            //電話番号２
            const inquiry_Tel_2 = (() => {
                const inquiry_Tel_div = create_Element('div',[
                    {class:'js-added-inquiry-tel'},
                    {id:'inquiry-tel-2'}
                ]);
                const inquiry_Tel_p_Number = create_Element('p',[
                    {class:'tel-number'}
                ]);
                inquiry_Tel_p_Number.textContent = 'TEL ' + settings['company_data']['tel_number_display'];
                inquiry_Tel_div.appendChild(inquiry_Tel_p_Number);
                const inquiry_Tel_p_Time = create_Element('p',[
                    {class:'business-hours'}
                ]);
                inquiry_Tel_p_Time.textContent = settings['company_data']['business_hours'];
                inquiry_Tel_div.appendChild(inquiry_Tel_p_Time);
                
                return inquiry_Tel_div;
            })();
            inquiryBox_2.appendChild(inquiry_Tel_2);
            //電話をかけるボタン
            inquiryBox_2.appendChild(inquiry_Tel_Button.cloneNode(true));
            //QRコード２
            const qr_2 = (() => {
                const qr_div = create_Element('div',[
                    {class:'js-added-qrcode component--flex-box'},
                    {id:'qrcode-2'}
                ]);
                //QRコードimageタグ
                const qr_img = create_Element('img',[
                    {title:'qrcode'},
                    {alt:'qrcode'}
                ]);
                qr_div.appendChild(qr_img);
                const qr_p = create_Element('p',[]);
                qr_p.textContent = '携帯表示用QRコード';
                qr_div.appendChild(qr_p);
                
                return qr_div;
            })();
            inquiryContainer.appendChild(qr_2);
            //-----------------------------------------------------------------
            //=================================================================
            //共有
            //=================================================================
            //-----------------------------LINE--------------------------------
            const share_Line = (() => {
                const line_div = create_Element('div',[
                    {class:'js-added-line'},
                    {id:'share-line'}
                ]);
                const line_button = create_Element('a',[
                    {class:'component--flex-box component--button'},
                    {href:'https://social-plugins.line.me/lineit/share?url=' + detailPageUrl}
                ]);
                line_button.textContent = 'LINE共有';
                line_div.appendChild(line_button);
                
                return line_div;
            })();
            containerShare.appendChild(share_Line);
            //-----------------------------------------------------------------
            //----------------------------QRコード------------------------------
            const qr_img = create_Element('img',[
                {title:'qrcode'},
                {alt:'qrcode'}
            ]);
            const qr_popover_p = create_Element('p',[]);
            qr_popover_p.textContent = '物件ページのQRコード';
            const share_qr = new AddPopoverContents(
                {
                    contents_BaseId:'share-qrcode',
                    popover_Contents:'share-qrcode',
                    popover_Option:'auto',
                    popover_Target_Action_Open:'show',
                    popover_Target_Action_Close:'hide',
                    buttonText:'QRコードを表示',
                    add_Styles:`
#share-qrcode-popover {
    flex-basis:calc(50% - 0.3rem);
}
#share-qrcode-popover > button {
    background:#3f3f3f;
    color:#ffffff;
    font-size:1.2rem;
    padding:1rem 0;
}
#share-qrcode-popover-content {
    width:calc(9.6rem + 120px);
    margin:auto;
    padding:3.2rem;
    text-align:center;
}
#share-qrcode-popover-content > img {
    margin-top:1.6rem;
    width:120px;
    height:120px;
}
#share-qrcode-popover-content > p {
    margin-top:1.4rem;
    font-size:1.4rem;
    color:#000;
}
@media screen and (${settings['media']['m']}) {

}
@media screen and (${settings['media']['s']}) {
    #share-qrcode-popover > button {
        padding:0.8rem 0;
    }
}
                    `
                },
                qr_img
            );
            share_qr.querySelector('#share-qrcode-popover-content').appendChild(qr_popover_p);
            containerShare.appendChild(share_qr);
            //---------------------------------------------------------------------





            
            //--------------------------レスポンシブ--------------------------------
            //ブレイクポイント
            const mediaQueryList = window.matchMedia(`(${settings['media']['m']})`);
            //regist listener
            mediaQueryList.addEventListener('change', listener);
            listener(mediaQueryList);
            // listener
            function listener (event) {
                const popoverElms = document.querySelectorAll('.js-added-popover-content');
                const inquiryPopoverContent = document.getElementById('inquiry-popover-content');
                const targetInquiryButtons = document.querySelectorAll('.js-added-inquiry-button');
                if (event.matches) {
                    // SP
                    containerTop.appendChild(inquiryBox_1);
                    share_qr.querySelector('img').src = `https://api.qrserver.com/v1/create-qr-code/?data=${detailPageUrl}&size=120x120&margin=3`;
                    bodyScrollPrevent(false);
                    if (inquiryPopoverContent) {
                        for (targetInquiryButton of targetInquiryButtons) {
                            targetInquiryButton.setAttribute('popovertarget','inquiry-popover-content');
                            targetInquiryButton.setAttribute('popovertargetaction','show');
                            targetInquiryButton.setAttribute('onclick','');
                            targetInquiryButton.addEventListener('click',popoverProcess_Open);
                        };
                    } else {
                    };
                    if (popoverElms) {
                        for (popoverElm of popoverElms) {
                            if (popoverElm.matches(':popover-open')) {
                                popoverElm.hidePopover();
                            } else {
                            };
                        };
                        if (document.querySelectorAll('button.js-added-popover-content-backside-button.valid').length !== 0) {
                            const popover_Backside_Buttons_Valid = document.querySelectorAll('button.js-added-popover-content-backside-button.valid');
                            for (backside_Button of popover_Backside_Buttons_Valid) {
                                backside_Button.classList.remove('valid');
                            };
                        } else {
                        };
                    } else {
                    };
                } else {
                    // PC
                    containerTop_Left.appendChild(inquiryBox_1);
                    qr_1.querySelector('img').src = `https://api.qrserver.com/v1/create-qr-code/?data=${detailPageUrl}&size=65x65&margin=3`;
                    qr_2.querySelector('img').src = `https://api.qrserver.com/v1/create-qr-code/?data=${detailPageUrl}&size=80x80&margin=3`;
                    bodyScrollPrevent(false);
                    if (inquiry_wrap.querySelector('#year')　&& inquiry_wrap.querySelector('#month')) {
                        inquiry_wrap.querySelector('#contact_area').id += '-invalid';
                        inquiry_wrap.querySelector('#year').id += '-invalid';
                        inquiry_wrap.querySelector('#month').id += '-invalid';
                        inquiry_wrap.querySelector('textarea').id += 'textarea-invalid';
                        inquiryForm.id = 'contact_area';
                        inquiryForm.querySelector('#year-invalid').id = 'year';
                        inquiryForm.querySelector('#month-invalid').id = 'month';
                        inquiryForm.querySelector('textarea').id = '';
                    } else {
                    };
                    if (inquiryPopoverContent) {
                        for (targetInquiryButton of targetInquiryButtons) {
                            targetInquiryButton.setAttribute('popovertarget','');
                            targetInquiryButton.setAttribute('popovertargetaction','');
                            targetInquiryButton.setAttribute('onclick','location.href=\'#contact_area\'');
                            targetInquiryButton.removeEventListener('click',popoverProcess_Open);
                        };
                    } else {
                    };
                    if (popoverElms) {
                        for (popoverElm of popoverElms) {
                            if (popoverElm.matches(':popover-open')) {
                                popoverElm.hidePopover();
                            } else {
                            };
                        };
                        if (document.querySelectorAll('button.js-added-popover-content-backside-button.valid').length !== 0) {
                            const popover_Backside_Buttons_Valid = document.querySelectorAll('button.js-added-popover-content-backside-button.valid');
                            for (backside_Button of popover_Backside_Buttons_Valid) {
                                backside_Button.classList.remove('valid');
                            };
                        } else {
                        };
                    } else {
                    };
                };
            };
            //--------------------------------------------------------------------
        })();
    } else if (locationURL.includes('property')) {
    } else {
    };
} else {
};
