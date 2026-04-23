const SUPABASE_URL = 'https://vqtwxbsaieuajaddvbsj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxdHd4YnNhaWV1YWphZGR2YnNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMjQ4MDQsImV4cCI6MjA4NzgwMDgwNH0.dGoigHDlSDxNELv07EL95-0N_Q6Q4aCrSVFC3jG2jyE';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
let currentUser = null;

async function checkUser() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session) {
        currentUser = session.user;
        document.getElementById('auth-screen').classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => document.getElementById('auth-screen').classList.add('hidden'), 500);
        loadDataFromCloud();
    } else {
        document.getElementById('auth-screen').classList.remove('hidden', 'opacity-0', 'pointer-events-none');
    }
}

async function handleLogin() {
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) alert("Erreur: " + error.message); else checkUser();
}

async function handleSignup() {
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    const { data, error } = await supabaseClient.auth.signUp({ email, password });
    if (error) alert("Erreur: " + error.message); else checkUser();
}

async function loginWithGoogle() {
    await supabaseClient.auth.signInWithOAuth({ provider: 'google' });
}

async function logout() {
    await supabaseClient.auth.signOut();
    location.reload();
}