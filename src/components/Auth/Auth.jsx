import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Tabs from "../CustomsUI/Tabs";
import MyGroups from "../supabase/MyGroups";
import MyMaterials from "../supabase/MyMaterials";

function Auth() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [loading, setLoading] = useState(false);

 const user = useUser();
 const supabase = useSupabaseClient();

 const handleAuthentication = async () => {
  try {
   setLoading(true);
   const { data, error } = await supabase.auth.signInWithPassword({
    // admin@maa.sis:12345678
    email: email,
    password: password,
   });
   if (error) throw error;
  } catch (error) {
   alert(error.error_description || error.message);
  } finally {
   setLoading(false);
  }
 };

 const handleLogout = async () => {
  try {
   const { error } = await supabase.auth.signOut();
   if (error) throw error;
  } catch (error) {
   alert(error.error_description || error.message);
  }
 };

 return (
  <>
   {user === null ? (
    <div className="flex flex-col md:flex-row gap-5">
     <form className="shrink-0">
      <div className="bg-white inline-flex rounded-md flex-col gap-5 p-5">
       <label className="font-medium text-2xl">email</label>

       <input
        type="email"
        className="bg-slate-100 focus:outline-blue-500 max-w-full  focus:outline-none px-4 rounded-md py-2"
        placeholder="bill.W@aakazan.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
       />

       <input
        type="password"
        className="bg-slate-100 focus:outline-blue-500 max-w-full  focus:outline-none px-4 rounded-md py-2"
        placeholder="*********"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
       />

       <button
        className="bg-slate-100 focus:outline-blue-500 max-w-full  focus:outline-none px-4 rounded-md py-2"
        onClick={(e) => {
         e.preventDefault();
         handleAuthentication();
        }}
        disabled={loading}
       >
        {loading ? <span>Подождите...</span> : <span>Вход...</span>}
       </button>
      </div>
     </form>
    </div>
   ) : (
    <>
     <div className="section-top flex flex-col gap-10">
      <div className="flex flex-wrap items-center gap-5">
       <span className="font-semibold  bg-slate-100 max-w-full  focus:outline-none px-5 rounded-md py-1">
        {user.email}
       </span>
       <button className="bg-red-500 max-w-full btn" onClick={handleLogout}>
        Выйти с аккаунта
       </button>
      </div>

      <Tabs>
       <div label="Добавить материалы">
        <div className="flex items-center gap-3">
         <a href="/materials" className="bg-indigo-500 max-w-full btn">
          К материалам
         </a>
        </div>
        <MyMaterials user={user} />
       </div>
       <div label="Добавить собрания">
        {" "}
        <div className="flex items-center gap-3">
         <a href="/groups" className="bg-indigo-500 max-w-full btn">
          К собраниям
         </a>
        </div>
        <MyGroups user={user} />
       </div>
      </Tabs>
     </div>
    </>
   )}
  </>
 );
}

export default Auth;
