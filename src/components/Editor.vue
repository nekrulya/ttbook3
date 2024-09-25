<template>
  <div class="editor">
    <div>
      <div class="main-container">
        <div
          class="editor-container editor-container_document-editor editor-container_include-minimap"
          ref="editorContainerElement"
        >
          <div
            class="editor-container__menu-bar"
            ref="editorMenuBarElement"
          ></div>
          <div
            class="editor-container__toolbar"
            ref="editorToolbarElement"
          ></div>
          <div class="editor-container__minimap-wrapper">
            <div class="editor-container__editor-wrapper">
              <div class="editor-container__editor">
                <div ref="editorElement">
                  <ckeditor
                    v-if="isLayoutReady"
                    v-model="this.editorData"
                    :editor="editor"
                    :config="config"
                    @input="func"
                    @ready="onReady"
                  />
                </div>
              </div>
            </div>
            <div
              class="editor-container__sidebar editor-container__sidebar_minimap"
            >
              <div ref="editorMinimapElement"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import {
  DecoupledEditor,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  CloudServices,
  Code,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalLine,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Minimap,
  PageBreak,
  Paragraph,
  PasteFromOffice,
  RemoveFormat,
  SelectAll,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
} from "ckeditor5";

import translations from "ckeditor5/translations/ru.js";

import "ckeditor5/ckeditor5.css";
import axios from "axios";

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return new Promise((resolve, reject) => {
      // Начнем с добавления лога для проверки, что загрузка начинается
      console.log("Начало загрузки файла...");

      // Получаем файл
      this.loader.file
        .then((file) => {
          const data = new FormData();
          data.append("upload", file); // Добавляем файл в FormData

          // Логируем тип и размер файла
          console.log("Файл:", file.name, "Тип:", file.type, "Размер:", file.size);

          // Получаем токен аутентификации (если он нужен для API)
          const token = localStorage.getItem("accessToken");

          // Используем axios для отправки файла
          axios({
            method: "post",
            url: "http://192.168.102.201:8000/file/upload", // URL для загрузки файла
            data: data, // Данные в формате FormData
            headers: {
              Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
            },
            // Отлавливаем прогресс загрузки (опционально)
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              console.log(`Загружено: ${percentCompleted}%`);
            },
          })
            .then((response) => {
              // Логируем успешный ответ сервера
              console.log("Загрузка завершена. Ответ сервера:", response.data);

              // Передаем URL в CKEditor для вставки изображения
              resolve({
                default: response.data.url, // URL изображения, который вернул сервер
              });
            })
            .catch((error) => {
              // Логируем ошибку, если что-то пошло не так
              console.error("Ошибка загрузки:", error);
              reject(error);
            });
        })
        .catch((error) => {
          console.error("Ошибка получения файла:", error);
          reject(error);
        });
    });
  }

  abort() {
    // Логика отмены загрузки
    console.log("Загрузка отменена.");
  }
}


export default {
  props: {},
  data() {
    return {
      editorData: "",
      isLayoutReady: false,
      config: null, // CKEditor needs the DOM tree before calculating the configuration.
      editor: DecoupledEditor,
    };
  },

  components: {
    // ckeditor: CKEditor.component,
  },

  computed: {
    ...mapState({
      file: (state) => state.file,
      HTMLWithSelectors: (state) => state.HTMLWithSelectors,
      api: (state) => state.api,
    }),
    ...mapGetters({ getFileCode: "getFileCode" }),
  },

  methods: {
    ...mapMutations({
      setHTMLWithSelectors: "setHTMLWithSelectors",
      setFileCode: "setFileCode",
    }),

    func() {
      this.setHTMLWithSelectors(this.editorData);
      this.setFileCode(this.HTMLWithSelectors);
    },

    onReady(editor) {
      Array.from(this.$refs.editorToolbarElement.children).forEach((child) =>
        child.remove()
      );
      Array.from(this.$refs.editorMenuBarElement.children).forEach((child) =>
        child.remove()
      );

      this.$refs.editorToolbarElement.appendChild(
        editor.ui.view.toolbar.element
      );
      this.$refs.editorMenuBarElement.appendChild(
        editor.ui.view.menuBarView.element
      );
    },
  },

  mounted() {
    this.editorData = this.getFileCode;

    this.config = {
      toolbar: {
        items: [
          "undo",
          "redo",
          "|",
          "heading",
          "|",
          "fontSize",
          "fontFamily",
          "fontColor",
          "fontBackgroundColor",
          "|",
          "bold",
          "italic",
          "underline",
          "|",
          "link",
          "insertTable",
          "highlight",
          "blockQuote",
          "|",
          "alignment",
          "|",
          "bulletedList",
          "numberedList",
          "todoList",
          "outdent",
          "indent",
        ],
        shouldNotGroupWhenFull: false,
      },
      extraPlugins: [ MyCustomUploadAdapterPlugin ],
      plugins: [
        AccessibilityHelp,
        Alignment,
        Autoformat,
        AutoImage,
        AutoLink,
        Autosave,
        BalloonToolbar,
        BlockQuote,
        Bold,
        CloudServices,
        Code,
        Essentials,
        FindAndReplace,
        FontBackgroundColor,
        FontColor,
        FontFamily,
        FontSize,
        Heading,
        Highlight,
        HorizontalLine,
        ImageBlock,
        ImageCaption,
        ImageInline,
        ImageInsertViaUrl,
        ImageResize,
        ImageStyle,
        ImageTextAlternative,
        ImageToolbar,
        ImageUpload,
        Indent,
        IndentBlock,
        Italic,
        Link,
        LinkImage,
        List,
        ListProperties,
        MediaEmbed,
        Minimap,
        PageBreak,
        Paragraph,
        PasteFromOffice,
        RemoveFormat,
        SelectAll,
        SpecialCharacters,
        SpecialCharactersArrows,
        SpecialCharactersCurrency,
        SpecialCharactersEssentials,
        SpecialCharactersLatin,
        SpecialCharactersMathematical,
        SpecialCharactersText,
        Strikethrough,
        Subscript,
        Superscript,
        Table,
        TableCaption,
        TableCellProperties,
        TableColumnResize,
        TableProperties,
        TableToolbar,
        TextTransformation,
        TodoList,
        Underline,
        Undo,
      ],
      balloonToolbar: [
        "bold",
        "italic",
        "|",
        "link",
        "|",
        "bulletedList",
        "numberedList",
      ],
      fontFamily: {
        supportAllValues: true,
      },
      fontSize: {
        options: [10, 12, 14, "default", 18, 20, 22],
        supportAllValues: true,
      },
      heading: {
        options: [
          {
            model: "paragraph",
            title: "Paragraph",
            class: "ck-heading_paragraph",
          },
          {
            model: "heading2",
            view: "h2",
            title: "Heading 1",
            class: "ck-heading_heading2",
          },
          {
            model: "heading3",
            view: "h3",
            title: "Heading 2",
            class: "ck-heading_heading3",
          },
          {
            model: "heading4",
            view: "h4",
            title: "Heading 3",
            class: "ck-heading_heading4",
          },
        ],
      },
      image: {
        toolbar: [
          "toggleImageCaption",
          "imageTextAlternative",
          "|",
          "imageStyle:inline",
          "imageStyle:wrapText",
          "imageStyle:breakText",
          "|",
          "resizeImage",
        ],
      },
      initialData:
        '<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n    You\'ve successfully created a CKEditor 5 project. This powerful text editor will enhance your application, enabling rich text editing\n    capabilities that are customizable and easy to use.\n</p>\n<h3>What\'s next?</h3>\n<ol>\n    <li>\n        <strong>Integrate into your app</strong>: time to bring the editing into your application. Take the code you created and add to your\n        application.\n    </li>\n    <li>\n        <strong>Explore features:</strong> Experiment with different plugins and toolbar options to discover what works best for your needs.\n    </li>\n    <li>\n        <strong>Customize your editor:</strong> Tailor the editor\'s configuration to match your application\'s style and requirements. Or even\n        write your plugin!\n    </li>\n</ol>\n<p>\n    Keep experimenting, and don\'t hesitate to push the boundaries of what you can achieve with CKEditor 5. Your feedback is invaluable to us\n    as we strive to improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<ul>\n    <li>📝 <a href="https://orders.ckeditor.com/trial/premium-features">Trial sign up</a>,</li>\n    <li>📕 <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">Documentation</a>,</li>\n    <li>⭐️ <a href="https://github.com/ckeditor/ckeditor5">GitHub</a> (star us if you can!),</li>\n    <li>🏠 <a href="https://ckeditor.com">CKEditor Homepage</a>,</li>\n    <li>🧑‍💻 <a href="https://ckeditor.com/ckeditor-5/demo/">CKEditor 5 Demos</a>,</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n    See this text, but the editor is not starting up? Check the browser\'s console for clues and guidance. It may be related to an incorrect\n    license key if you use premium features or another feature-related requirement. If you cannot make it work, file a GitHub issue, and we\n    will help as soon as possible!\n</p>\n',
      language: "ru",
      link: {
        addTargetToExternalLinks: true,
        defaultProtocol: "https://",
        decorators: {
          toggleDownloadable: {
            mode: "manual",
            label: "Downloadable",
            attributes: {
              download: "file",
            },
          },
        },
      },
      list: {
        properties: {
          styles: true,
          startIndex: true,
          reversed: true,
        },
      },
      menuBar: {
        isVisible: true,
      },
      minimap: {
        container: this.$refs.editorMinimapElement,
        extraClasses:
          "editor-container_include-minimap ck-minimap__iframe-content",
      },
      placeholder: "Type or paste your content here!",
      table: {
        contentToolbar: [
          "tableColumn",
          "tableRow",
          "mergeTableCells",
          "tableProperties",
          "tableCellProperties",
        ],
      },
      translations: [translations],
    };

    this.isLayoutReady = true;
  },
};



</script>

<style>
/* .editor {
  width: 800px;
} */

.editor h2 {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  line-height: 42px;
  display: flex;
  align-items: center;

  color: #000000;
}

.editor h3 {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: start;

  color: #000000;
}

.editor h4 {
  font-family: "Roboto Mono";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  display: flex;
  align-items: start;

  color: #000000;
}

/* Стили для упорядоченных списков (ol) */
.editor ol {
  list-style-type: decimal; /* Стиль нумерации по умолчанию */
  margin: 0 0 1em 2em; /* Отступы */
  padding-left: 1em; /* Внутренний отступ */
}

/* Стили для неупорядоченных списков (ul) */
.editor ul {
  list-style-type: disc; /* Стиль маркеров по умолчанию */
  margin: 0 0 1em 2em; /* Отступы */
  padding-left: 1em; /* Внутренний отступ */
}

/* Вложенные упорядоченные списки (ol) */
.editor ol ol {
  list-style-type: lower-alpha; /* Стиль нумерации для вложенных списков */
  margin-left: 1.5em; /* Дополнительный отступ для вложенных списков */
}

/* Вложенные неупорядоченные списки (ul) */
.editor ul ul {
  list-style-type: circle; /* Стиль маркеров для вложенных списков */
  margin-left: 1.5em; /* Дополнительный отступ для вложенных списков */
}

/* Общие стили для элементов списка (li) */
.editor li {
  margin-bottom: 0.5em; /* Отступ снизу */
  line-height: 1.5; /* Межстрочный интервал */
  font-family: "Roboto Mono", monospace; /* Шрифт */
  color: #000000; /* Цвет текста */
}

/* Стили для упорядоченных списков (ol) */
</style>
