//configurações banco de dados
const database = {
    DB: undefined,
    init: function () {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open('alura-dev', 1);

            request.onsuccess = (event) => {
                this.DB = request.result;
                resolve();
            };

            request.onerror = (event) => {
                reject();
            };

            request.onupgradeneeded = (event) => {
                this.DB = event.target.result;

                if (this.DB.objectStoreNames.contains("codes")) return;

                this.DB.createObjectStore("codes", { autoIncrement: true });
            };
        });



    },
    add: function (data) {
        return new Promise((resolve, reject) => {

            let transaction = this.DB.transaction(["codes"], "readwrite");
            transaction.onerror = () => reject([data, "error"]);

            const objectStore = transaction.objectStore("codes");
            const request = objectStore.add(data);

            request.onsuccess = () => resolve([data, "ok"]);
        });
    },
    load: function () {
        return new Promise((resolve, reject) => {
            const dataset = [];

            const transaction = this.DB.transaction(["codes"]);

            const objectStore = transaction.objectStore("codes");

            objectStore.openCursor().onsuccess = function (event) {
                const cursor = event.target.result;

                if (cursor) {
                    dataset.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(dataset);
                }
            };
        });
    }
};

database.init()
    .then(() => {

        const trigger = document.getElementById("save");

        //inputs
        const editor = document.getElementById("editor-text");
        const langSelector = document.getElementById("lang-selector");
        const name = document.getElementById("ipt-name");
        const description = document.getElementById("ipt-description");
        const color = document.getElementById("color-picker");


        trigger.onclick = function (event) {
            event.preventDefault();

            const data = {
                text: editor.value,
                lang: langSelector.value,
                name: name.value,
                description: description.value,
                color: color.value
            };

            database.add(data);
        };
    });