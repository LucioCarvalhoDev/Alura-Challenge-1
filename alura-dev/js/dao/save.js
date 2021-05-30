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

    if (trigger) {


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

        document.location.reload();
      };
    } else {

      function codeCardHTMLGenerator(data) {
        return (`
        <article class="m_codes_card">
        <div style="background: ${data.color}" class="m_codes_card_main">
          <div class="m_codes_card_main_header">
            <ul class="m_codes_card_main_header_dots">
              <li class="m_codes_card_main_header_dots_dot"></li>
              <li class="m_codes_card_main_header_dots_dot m_codes_card_main_header_dots_dot--yellow"></li>
              <li class="m_codes_card_main_header_dots_dot m_codes_card_main_header_dots_dot--green"></li>
            </ul>
          </div>
          <textarea disabled wrap="hard" class="m_codes_card_main_text" name="" cols="30"
            rows="10">${data.text}</textarea>
          <footer class="m_codes_card_main_footer">
            <p class="m_codes_card_main_footer_counter">caracteres: <span id="char-counter">${data.text.length}</span></p>
            <span id="extension" class="m_codes_card_main_footer_lang">${data.lang}</span>
          </footer>
        </div>
        <header class="m_codes_card_header">
          <h3 class="m_codes_card_header_title">${data.name}</h3>
          <p class="m_codes_card_header_description">${data.description}</p>
        </header>
        <footer class="m_codes_card_footer">
          <div class="m_codes_card_footer_feedback">
            <div class="m_codes_card_footer_feedback_comment">
              <i class="fas fa-comment"></i>
              <span class="m_codes_card_footer_feedback_comment_count">9</span>
            </div>
            <div class="m_codes_card_footer_feedback_love">
              <i class="fas fa-heart"></i>
              <span class="m_codes_card_footer_feedback_love_count">1</span>
            </div>
          </div>
          <div class="m_codes_card_footer_perfil">
            <img src="../assets/images/bit.png" alt="" class="m_codes_card_footer_perfil_pic">
            <span class="m_codes_card_footer_perfil_name">a</span>
          </div>
        </footer>
      </article>
        `);
      }
      const codesSection = document.querySelector(".m_codes");

      database.load()
        .then(res => {
          res.forEach(code => {

            codesSection.innerHTML += codeCardHTMLGenerator(code);
          });
        });
    }

  });
