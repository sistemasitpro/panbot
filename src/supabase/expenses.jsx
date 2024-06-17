import { supabase } from "../supabaseClient";

export async function getAllExpenses() {
  try {
    return await supabase.from("expenses").select("*");
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getAllExpensesByUserLogged(userId) {
  try {
    return await supabase.from("expenses").select("*").eq("usuario_id", userId);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getExpenseById(id) {
  try {
    return await supabase.from("expenses").select("*").eq("id", id).single();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createNewExpense(data) {
  try {
    return await supabase.from("expenses").insert([data]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function editExpense(id, data) {
  try {
    return await supabase.from("expenses").update(data).eq("id", id);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteExpense(id) {
  try {
    return await supabase.from("expenses").delete().eq("id", id);
  } catch (error) {
    throw new Error(error.message);
  }
}
