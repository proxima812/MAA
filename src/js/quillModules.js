import Quill from "quill";
import AutoLinks from "quill-auto-links";

Quill.register("modules/autoLinks", AutoLinks);

export const quillModules = {
 toolbar: [
  ["bold", "italic", "underline", "link"], // toggled buttons

  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"],
 ], // remove formatting button
 autoLinks: true, // включите автоматическое преобразование ссылок
};
