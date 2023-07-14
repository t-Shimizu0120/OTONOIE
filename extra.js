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
                {id:'inquiry-popover-contents'},
                {popover:'auto'}
            ]);
            document.querySelector('#content').querySelector('div.inner').appendChild(popover_Content_div);
            popoverFocusControl(popover_Content_div);
            //ポップオーバー背面クローズボタン
            const popover_Backside_Button_Close = create_Element('button',[
                {class:'js-added-popover-content-backside-button match-media-target-close-btn'},
                {popovertarget:'inquiry-popover-contents'},
                {popovertargetaction:'hide'}
            ]);
            popover_Backside_Button_Close.addEventListener('click',popoverProcess_Close);
            bodyElm.appendChild(popover_Backside_Button_Close);
            //クローズボタン（×ボタン）
            const closeIcon = create_Element('span',[
                {class:'icon-close'}
            ]);
            const popover_Close_Button = create_Element('button',[
                {class:'js-added-popover-close-button match-media-target-close-btn component--button'},
                {popovertarget:'inquiry-popover-contents'},
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
        })();
    } else if (locationURL.includes('property')) {
    } else {
    };
} else {
};
