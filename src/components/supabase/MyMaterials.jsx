import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import { quillModules } from "../../js/quillModules.js";
import Material from "../supabase/materials/Material";
import { supabase } from "../supabaseClient.js";

function MyMaterials({ user }) {
 const [name, setName] = useState("");
 const [materials, setMaterials] = useState([]);
 const [description, setDescription] = useState("");
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  getMaterials();
 }, []);

 async function getMaterials() {
  try {
   const { data, error } = await supabase
    .from("materials")
    .select("*")
    .eq("userId", user.id)
    .limit(100);
   console.log(data);

   if (error) throw error;
   if (data != null) {
    setMaterials(data);
    setLoading(false); // set loading to false once data is fetched
   }
  } catch (error) {
   alert(error.message);
   setLoading(false); // also set loading to false if there's an error
  }
 }

 async function createMaterial() {
  try {
   const { data, error } = await supabase
    .from("materials")
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
     placeholder="Заголовок материала"
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
    <button className="self-start bg-green-500 btn" onClick={() => createMaterial()}>
     Добавить
    </button>
   </div>

   <div className="mt-10">
    <h1 className="text-2xl">
     Ваш материал <b>({materials.length})</b>
    </h1>
   </div>

   <div className="mt-10">
    {loading ? (
     <div className="green-place">Загрузка материалов...</div>
    ) : (
     <div className="pb-10 items-start grid gap-5 grid-cols-1 md:grid-cols-2">
      {materials.map((material) => (
       <Material key={material.id} material={material} />
      ))}
     </div>
    )}
   </div>
  </div>
 );
}

export default MyMaterials;
