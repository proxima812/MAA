import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient.js";
import GroupNoBtns from "../groups/GroupNoBtns";

function AllGroup() {
 const [groups, setGroups] = useState([]);
 const [loading, setLoading] = useState(true); // Добавьте новое состояние "loading"

 useEffect(() => {
  getGroups();
 }, []);

 async function getGroups() {
  setLoading(true); // Устанавливаем "loading" в "true", когда начинаем загрузку
  try {
   const { data, error } = await supabase.from("groups").select("*").limit(100);

   if (error) throw error;
   if (data != null) {
    setGroups(data);
   }
  } catch (error) {
   alert(error.message);
  } finally {
   setLoading(false); // Устанавливаем "loading" в "false", когда загрузка закончилась
  }
 }

 // Если состояние "loading" - "true", то отображаем лоадер, иначе - данные
 return loading ? (
  <div className="purple-place">Загрузка групп...</div> // Место для вашего лоадера
 ) : (
  <div className="pb-10 items-start grid gap-5 grid-cols-1 md:grid-cols-2">
   {groups < 0 ? (
    groups.map((group) => <GroupNoBtns key={group.id} group={group} />)
   ) : (
    <span className='red-place'>В настоящее время не открыто ни одной группы.</span>
   )}
  </div>
 );
}

export default AllGroup;
