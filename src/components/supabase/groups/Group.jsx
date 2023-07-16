import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { quillModules } from "../../../js/quillModules.js";
import { supabase } from "../../supabaseClient.js";

import "../../../css/content.css";

function Group(props) {
 const group = props.group;
 const [editing, setEditing] = useState(false);
 const [name, setName] = useState(group.name);
 const [description, setDescription] = useState(group.description);

 async function updatematerial() {
  try {
   const { data, error } = await supabase
    .from("groups")
    .update({
     name: name,
     description: description,
    })
    .eq("id", group.id);

   if (error) throw error;
   window.location.reload();
  } catch (error) {
   alert(error.message);
  }
 }

 async function deletematerial() {
  try {
   const { data, error } = await supabase.from("groups").delete().eq("id", group.id);

   if (error) throw error;
   window.location.reload();
  } catch (error) {
   alert(error.message);
  }
 }

 const originalDateTime = group.created_at;
 const dateObj = new Date(originalDateTime);
 const russianFormat = dateObj.toLocaleString("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
 });

 return (
  <>
   {editing == false ? (
    <div className="rounded-lg mb-5 flex p-5 flex-col gap-3 bg-[#f9f9f9]">
     <div className="bg-purple-100 rounded-t-lg -m-5 py-3 px-5 flex justify-between text-sm text-purple-600">
      <span className="font-medium">{russianFormat}</span>
     </div>
     <div className="mt-10 flex flex-wrap gap-5 items-center">
      <button className="bg-purple-500 btn" onClick={() => setEditing(true)}>
       Изменить блок
      </button>
      <button
       className="bg-red-500 btn"
       onClick={() => {
        deletematerial();
       }}
      >
       Удалить блок
      </button>
     </div>
     <h2 className="font-bold text-2xl md:text-3xl py-4">{group.name}</h2>
     <div className="content">
      <p
       className="text-slate-700 leading-relaxed"
       dangerouslySetInnerHTML={{ __html: group.description }}
      ></p>
     </div>
    </div>
   ) : (
    <>
     <div className="flex flex-col gap-5 items-start">
      <button onClick={() => setEditing(false)} className="bg-indigo-500 btn">
       Назад
      </button>
      <input
       className="bg-slate-100 w-full focus:outline-blue-500 max-w-full  focus:outline-none px-4 rounded-md py-2 text-2xl"
       type="text"
       id="name"
       defaultValue={group.name}
       onChange={(e) => setName(e.target.value)}
      />

      {/* вносит изменения в input, а далее в БД */}
      <textarea
       className="hidden"
       id="description"
       value={description}
       onChange={() => {}}
      />
      <ReactQuill
       modules={quillModules}
       value={description}
       onChange={(content, delta, source, editor) => {
        setDescription(editor.getHTML());
       }}
      />
      <button className="bg-purple-500 btn z-20" onClick={() => updatematerial()}>
       Обновить блок
      </button>
     </div>
    </>
   )}
  </>
 );
}

export default Group;
