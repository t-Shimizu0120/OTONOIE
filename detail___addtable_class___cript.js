class AddTable {
    constructor (object,...args) {

        if(object.table_Contents.length === 0) {
            return null;
        } else {
            if (document.querySelector('.js-added-table') != null) {
            } else {
                this.setStyle();
            };

            const obj = this.setAttrs(object);

            if (obj['contents_Title'] === '') {
            } else {
                const table_Contents_Title = document.createElement('h5');
                table_Contents_Title.textContent = obj['contents_Title'];
            };

            const add_Elm_table = document.createElement('table');
            for (this.table_Attr of obj.table_Attrs) {
                const table_AttrName = Object.keys(this.table_Attr)[0];
                const table_AttrValue = this.table_Attr[table_AttrName];
                add_Elm_table.setAttribute(table_AttrName,table_AttrValue);
            };

            const add_Elm_tbody = document.createElement('tbody');

            for (this.tableRow of obj.table_Contents){
                const add_Elm_tr = document.createElement('tr');
                for (this.rowItem of this.tableRow) {
                    const items_KeyName = Object.keys(this.rowItem)[0];
                    if (items_KeyName === 'th') {
                        const add_Elm_th = document.createElement(items_KeyName);
                        const add_Elm_th_Value = this.rowItem[items_KeyName];
                        add_Elm_th.textContent = add_Elm_th_Value;
                        add_Elm_tr.appendChild(add_Elm_th);
                    } else if (items_KeyName === 'td') {
                        if (this.rowItem[items_KeyName].length === 0) {
                        } else if (this.rowItem[items_KeyName].length === 1) {
                            const add_Elm_td = document.createElement(items_KeyName);
                            add_Elm_td.textContent = this.rowItem[items_KeyName][i];
                            add_Elm_tr.appendChild(add_Elm_td);
                        } else {
                            const add_Elm_td = document.createElement(items_KeyName);
                            const ul = document.createElement('ul');
                            for(let i = 0; i < this.rowItem[items_KeyName].length; i++) {
                                const li = document.createElement('li');
                                li.textContent = this.rowItem[items_KeyName][i];
                                ul.appendChild(li);
                            };
                            add_Elm_td.appendChild(ul);
                            add_Elm_tr.appendChild(add_Elm_td);
                        };
                    };
                };
                add_Elm_tbody.appendChild(add_Elm_tr);
            };
            const add_Elm_tr = document.createElement('tr');
            const add_Elm_th = document.createElement('th');
            const add_Elm_td = document.createElement('td');


            add_Elm_table.appendChild(add_Elm_tbody);

            if (obj.add_To_Selector === '') {
                return add_Elm_table;
            } else {
                const targetElm = document.querySelector(obj.add_To_Selector);
                if (obj['contents_Title'] === '') {
                    targetElm.appendChild(add_Elm_table);
                } else {
                    targetElm.appendChild(table_Contents_Title);
                    targetElm.appendChild(add_Elm_table);
                };
            };
        };
    };
    setStyle() {
        const headElm = document.querySelector('head');
        const addStyleElm = document.createElement('style');
        const style = '.js-added-font-size {font-size:1.2rem; color:#000;} table {width:100%;} th {background-color:#dddddd; color:#3f3f3f; font-weight:bold; text-align:center; vertical-align:middle;} th, td {border: 1px #3f3f3f solid; flex:1 3; padding:1.2rem 1.2rem;}';
        addStyleElm.textContent = style;
        headElm.appendChild(addStyleElm);
    };
    setAttrs(object) {
        const table_Obj = {
            contents_Title:'',
            table_Contents:[],

            table_Attrs:[{class:'js-added-table'}],
            tbody_Attrs:[],
            th_Attrs:[],
            td_Attrs:[],

            add_To_Selector:''
        };
        table_Obj.contents_Title = object.contents_Title;
        const table_Contents = object.table_Contents;
        for (this.table_Content of table_Contents) {
            table_Obj.table_Contents.push(this.table_Content);
        };
        const table_Id = object.table_Id;
        table_Obj.table_Attrs.push(table_Id);
        table_Obj.add_To_Selector = object.add_To_Selector;

        return table_Obj;
    };

};


const tab_Content_SurroundingInformation = new AddTable(
    {
        contents_Title:'',
        table_Contents:[
            [
                {th:'周辺施設'},
                {td:['■ ショッピングセンター：ユニクロ東急プラザ蒲田店まで202m','■ スーパー：成城石井グランデュオ蒲田店まで181m','■ スーパー：マルエツかまた店まで186m','■ コンビニ：ファミリーマート蒲田駅前店まで55m','■ コンビニ：セブンイレブン大田区役所前店まで70m','■ ドラッグストア：マツモトキヨシmatsukiyoLAB蒲田駅東口店まで87m']}
            ]
        ],
        table_Id:{id:'surrounding-information-table'},
        add_To_Selector:''
    }
);

