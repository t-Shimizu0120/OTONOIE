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
            //--------------------------コンポーネント１------------------------
            //お問い合わせWRAP１
            const inquiryBox_1 = create_Element('div',[
                {class:'js-added-inquiry-box'},
                {id:'inquiry1-box'}
            ]);
            containerTop_Left.appendChild(inquiryBox_1);
            //お問合せボタン１
            const inquiry_1 = create_Element('button',[
                {class:'js-added-inquiry-button component--button'},



                
                //{id:'inquiry-button1'}




                
                {id:'inquiry1-button'}
            ]);
            inquiry_1.textContent = 'この物件にお問い合わせ';
            inquiryBox_1.appendChild(inquiry_1);
            //電話番号１
            const inquiry_Tel_1 = (() => {
                const inquiry_Tel_div = create_Element('div',[
                    {class:'js-added-inquiry-tel'},
                    {id:'inquiry1-tel'}
                ]);
                const inquiry_Tel_hr_1 = create_Element('hr',[]);
                inquiry_Tel_div.appendChild(inquiry_Tel_hr_1);
                const inquiry_Tel_p_Number = create_Element('p',[
                    {class:'tel-number'}
                ]);
                inquiry_Tel_p_Number.textContent = 'TEL ' + settings['company_data']['tel_number_display'];
                inquiry_Tel_div.appendChild(inquiry_Tel_p_Number);
                const inquiry_Tel_p_Time = create_Element('p',[
                    {class:'tel-time'}
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
                    {id:'qrcode1'}
                ]);



                
                //QRコード生成
                const qr_img = create_Element('img',[
                    {title:'qrcode1'},
                    {alt:'qrcode1'}
                ]);
                qr_img.src = `https://api.qrserver.com/v1/create-qr-code/?data=${detailPageUrl}&size=65x65&margin=3`;
                
                
                

                //QRコードテーブル作成
                const qrcode_table = new AddTable(
                    {
                        table_BaseId:'qrcode1',
                        table_Contents:[[{th:'携帯表示用QRコード'},{td:['']}]],
                        add_Styles:`
                            #qrcode1-table {
                                border:0;
                                width:100%;
                            }
                            #qrcode1-table > tbody > tr > th {
                                border:0;
                                font-size:1.2rem;
                            }
                            #qrcode1-table > tbody > tr > td {
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
        })();
    } else if (locationURL.includes('property')) {
    } else {
    };
} else {
};
