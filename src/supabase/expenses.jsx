import { supabase } from "../supabaseClient";

const table = import.meta.env.VITE_SUPABASE_TABLE;

export async function getAllExpenses() {
  try {
    return await supabase.from(table).select("*");
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getAllExpensesByUserLogged(userId) {
  try {
    return await supabase.from(table).select("*").eq("usuario_id", userId);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getExpenseById(id) {
  try {
    return await supabase.from(table).select("*").eq("id", id).single();
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createNewExpense(data) {
  try {
    return await supabase.from(table).insert([data]);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function editExpense(id, data) {
  try {
    return await supabase.from(table).update(data).eq("id", id);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteExpense(id) {
  try {
    return await supabase.from(table).delete().eq("id", id);
  } catch (error) {
    throw new Error(error.message);
  }
}
