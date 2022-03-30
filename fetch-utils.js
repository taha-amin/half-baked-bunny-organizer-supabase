// Create your own supabase database using the provided seeds.sql file
const SUPABASE_URL = 'https://nmgmdkwatcmqrexvwhql.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tZ21ka3dhdGNtcXJleHZ3aHFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc5NzA2MTcsImV4cCI6MTk2MzU0NjYxN30.3xHneXPhk8TMzUGRgqhQh9EMm_NmROG5YLi0ZnrTNUY';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export async function getFamilies() {
    // fetch all families and their bunnies
    const response = await client
        .from('loving_families')
        .select('*, fuzzy_bunnies (*)')
        
        //will only fetch bunnies that were created by the current account
        .match({ 'fuzzy_bunnies.user_id': client.auth.session().user.id });

    return checkError(response);
}

export async function deleteBunny(id) {
    // delete a single bunny using the id argument

    return checkError(response);
}

export async function createBunny(bunny) {
    // create a bunny using the bunny argument

    return checkError(response);
}

// MARTHA STEWART (PRE-MADE) FUNCTIONS

export async function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export async function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./families');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
