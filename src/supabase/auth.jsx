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

export function loggedUser(callback) {
  try {
    return supabase.auth.onAuthStateChange((event, session) => {
      callback({ event, session });
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getSessionUser() {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateUser(email, data, password) {
  try {
    return await supabase.auth.updateUser({
      email,
      data,
      password,
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
