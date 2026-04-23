let timerInterval = null;
let timeRemaining = 0;
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
    checkUser();
    renderWorkoutList();
});

async function loadDataFromCloud() {
    const { data: w } = await supabaseClient.from('workouts').select('*').order('date', { ascending: true });
    globalWorkoutHistory = w || [];
    const { data: v } = await supabaseClient.from('visbody').select('*').order('date', { ascending: true });
    globalVisbodyData = v || [];
    renderRecoveryHeatmap();
    populateStatsSelect();
    
    document.getElementById('sync-status').innerText = "Connecté";
    document.getElementById('sync-status').className = "text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20 shadow-sm transition-colors";
}

function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById('tab-' + id).classList.add('active');
    
    document.querySelectorAll('nav button').forEach(btn => btn.classList.replace('opacity-100', 'opacity-40') || btn.classList.replace('opacity-40', 'opacity-40'));
    document.getElementById('nav-' + id).classList.replace('opacity-40', 'opacity-100');

    if(id === 'visbody') renderAllVisbodyCharts();
    if(id === 'progress') renderStatsChart();
    if(id === 'history') renderCalendar();
}

function toggleTimer() { document.getElementById('floating-timer').classList.toggle('hidden'); }
function addTime(s) {
    if(s === 0) { clearInterval(timerInterval); timeRemaining = 0; document.getElementById('floating-timer').classList.add('hidden'); } else { timeRemaining = s; }
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeRemaining--;
        const m = Math.floor(Math.abs(timeRemaining)/60).toString().padStart(2, '0');
        const sc = (Math.abs(timeRemaining)%60).toString().padStart(2, '0');
        document.getElementById('timer-display').innerText = `${m}:${sc}`;
        if(timeRemaining <= 0) {
             clearInterval(timerInterval);
             document.getElementById('timer-display').classList.replace('text-white', 'text-red-500');
        } else {
             document.getElementById('timer-display').classList.replace('text-red-500', 'text-white');
        }
    }, 1000);
}

function getLocalIsoDate() { return new Date().toISOString().split('T')[0]; }

function populateStatsSelect() {
    const select = document.getElementById('stats-exo-select');
    const currentSelection = select.value;
    let allExos = new Set();
    
    
    workoutsData.forEach(w => w.exercises.forEach(exo => allExos.add(exo)));
    globalWorkoutHistory.forEach(session => {
        if(session.workout_id !== 'cardio' && session.data) {
            Object.keys(session.data).forEach(key => allExos.add(key));
        }
    });

    const sortedExos = [...allExos].sort();
    select.innerHTML = sortedExos.map(e => `<option value="${e}">${e}</option>`).join('');
    if(currentSelection && sortedExos.includes(currentSelection)) select.value = currentSelection;
}

function changeMonth(offset) {
    currentMonth += offset;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    else if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar();
}

function renderCalendar() {
    const grid = document.getElementById('calendar-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const startDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Ajustement : Lundi = 0

    for (let i = 0; i < startDay; i++) {
        grid.innerHTML += `<div></div>`;
    }

    let monthCounter = 0;
    
  
    for (let i = 1; i <= daysInMonth; i++) {
        const dateStr = `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        
        // On filtre toutes les séances de la journée en gérant le format de date Supabase
        const workoutsThisDay = globalWorkoutHistory.filter(s => s.date && String(s.date).startsWith(dateStr));
        
        if (workoutsThisDay.length > 0) {
            monthCounter += workoutsThisDay.length; // Ajoute les séances de ce jour au total du mois
            
            grid.innerHTML += `
                <div class="aspect-square flex items-center justify-center rounded-xl border text-sm transition-all bg-emerald-500 text-black border-emerald-400 font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                    ${i}
                </div>`;
        } else {
            grid.innerHTML += `
                <div class="aspect-square flex items-center justify-center rounded-xl border text-sm transition-all bg-zinc-900 text-zinc-500 border-zinc-800">
                    ${i}
                </div>`;
        }
    }
    
    
    document.getElementById('calendar-month-year').innerText = new Date(currentYear, currentMonth).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    
    const totalEl = document.getElementById('month-total');
    if (totalEl) {
        totalEl.innerText = monthCounter;
    }
}
