import { createClient } from "@supabase/supabase-js";

const ProjectURL = "https://jbgqmfyxsdblgqzoilix.supabase.co";
const APIKey =
 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZ3FtZnl4c2RibGdxem9pbGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg4MDI3MzEsImV4cCI6MjAwNDM3ODczMX0.Ai-vfUJxVTDKO317wh0d3wbCJWYUZeOF0Iff3H_Mnz0";

export const supabase = createClient(ProjectURL, APIKey);
