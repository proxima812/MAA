import { SessionContextProvider } from "@supabase/auth-helpers-react";
import Auth from "../Auth/Auth";
import { supabase } from "../supabaseClient.js";

function MySession() {
 return (
  <>
   <SessionContextProvider supabaseClient={supabase}>
    <Auth />
   </SessionContextProvider>
  </>
 );
}

export default MySession;
