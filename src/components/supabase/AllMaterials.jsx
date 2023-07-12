import { useEffect, useState } from "react";
import MaterialNoBtns from "../supabase/MaterialNoBtns";
import { supabase } from "../supabaseClient.js";

function AllMaterials() {
 const [materials, setMaterials] = useState([]);
 const [loading, setLoading] = useState(true); // Добавьте новое состояние "loading"

 useEffect(() => {
  getMaterials();
 }, []);

 async function getMaterials() {
  setLoading(true); // Устанавливаем "loading" в "true", когда начинаем загрузку
  try {
   const { data, error } = await supabase.from("materials").select("*").limit(100);

   if (error) throw error;
   if (data != null) {
    setMaterials(data);
   }
  } catch (error) {
   alert(error.message);
  } finally {
   setLoading(false); // Устанавливаем "loading" в "false", когда загрузка закончилась
  }
 }

 // Если состояние "loading" - "true", то отображаем лоадер, иначе - данные
 return loading ? (
  <div className="bg-green-200 text-green-600 rounded-lg px-5 py-2">
   Загрузка материалов...
  </div> // Место для вашего лоадера
 ) : (
  <div className="pb-10 items-start grid gap-5 grid-cols-1 md:grid-cols-2">
   {materials.map((material) => (
    <MaterialNoBtns key={material.id} material={material}/>
   ))}
  </div>
 );
}

export default AllMaterials;
