import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import { quillModules } from "../../js/quillModules.js";
import { supabase } from "../supabaseClient.js";
import Group from "./groups/Group.jsx";

function MyGroups({ user }) {
 const [name, setName] = useState("");
 const [groups, setGroups] = useState([]);
 const [description, setDescription] = useState("");

 useEffect(() => {
  getGroups();
 }, []);

 async function getGroups() {
  try {
   const { data, error } = await supabase
    .from("groups")
    .select("*")
    .eq("userId", user.id)
    .limit(100);
   console.log(data);

   if (error) throw error;
   if (data != null) {
    setGroups(data);
   }
  } catch (error) {
   alert(error.message);
  }
 }

 async function createMaterial() {
  try {
   const { data, error } = await supabase
    .from("groups")
    .insert({
     name: name,
     description: description,
     userId: user.id,
    })
    .single();

   if (error) throw error;
   window.location.reload();
  } catch (error) {
   alert(error.message);
  }
 }

 return (
  <div className="mt-10">
   <div className="flex flex-col gap-5">
    <input
     className="text-2xl bg-slate-100 text-1xl focus:outline-blue-500 max-w-full  focus:outline-none px-4 rounded-md py-2"
     type="text"
     placeholder="Название группы"
     id="name"
     required
     onChange={(e) => setName(e.target.value)}
    />

    <ReactQuill
     required
     modules={quillModules}
     value={description}
     onChange={setDescription}
    />
    <button
     className="self-start bg-green-500 btn"
     onClick={() => {
      createMaterial();
     }}
    >
     Добавить
    </button>
   </div>

   <div className="mt-10">
    <h1 className="text-2xl">
     Ваш материал <b>({groups.length})</b>
    </h1>
   </div>

   <div className="py-10 grid gap-5 grid-cols-1 md:grid-cols-2">
    {groups.map((group) => (
     <Group key={group.id} group={group} />
    ))}
   </div>
  </div>
 );
}

export default MyGroups;
