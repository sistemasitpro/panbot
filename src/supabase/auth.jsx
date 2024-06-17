import { supabase } from "../supabaseClient";

export async function loginUser(data) {
  try {
    return await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function signOutUser() {
  try {
    return await supabase.auth.signOut({ scope: "local" });
  } catch (error) {
    throw new Error(error.message);
  }
}
