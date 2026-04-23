let globalVisbodyData = [];
let sChart = null;
let vbCharts = {};

async function saveVisbody() {
    const payload = {
        weight: parseFloat(document.getElementById('vb-weight').value) || null,
        score: parseFloat(document.getElementById('vb-score').value) || null,
        fat: parseFloat(document.getElementById('vb-fat').value) || null,
        muscle: parseFloat(document.getElementById('vb-muscle').value) || null,
        water: parseFloat(document.getElementById('vb-water').value) || null,
        bone: parseFloat(document.getElementById('vb-bone').value) || null,
        visceral: parseFloat(document.getElementById('vb-visceral').value) || null,
        bmr: parseFloat(document.getElementById('vb-bmr').value) || null
    };
    
    document.getElementById('sync-status').innerText = "Envoi...";
    await supabaseClient.from('visbody').insert([{ user_id: currentUser.id, date: getLocalIsoDate(), ...payload }]);
    location.reload();
}

function renderStatsChart() {
    const exoSelect = document.getElementById('stats-exo-select');
    const metricSelect = document.getElementById('stats-metric-select');
    
    if (!exoSelect) return;
    const selectedExo = exoSelect.value;
    const metric = metricSelect ? metricSelect.value : '1rm';
    const chartData = [];

    globalWorkoutHistory.forEach(session => {
        if (session.data && session.data[selectedExo]) {
            const sets = session.data[selectedExo];
            let value = 0;
            if (metric === '1rm') {
                value = Math.max(...sets.map(s => Math.round(s.weight * (1 + s.reps / 30))));
            } else {
                value = sets.reduce((acc, s) => acc + (s.weight * s.reps), 0);
            }
            if (value > 0) chartData.push({ date: session.date, val: value });
        }
    });

    const gradeDiv = document.getElementById('stats-progression');
    if (chartData.length > 0) {
        if (metric === '1rm') {
            gradeDiv.innerHTML = `Dernière perf estimée : <span class="text-white font-black">${chartData[chartData.length - 1].val} kg</span>`;
        } else {
            gradeDiv.innerHTML = `Dernier Volume total : <span class="text-white font-black">${chartData[chartData.length - 1].val} kg</span>`;
        }
    } else {
        gradeDiv.innerHTML = "Pas de données pour cet exercice.";
    }

    const ctx = document.getElementById('statsChart').getContext('2d');
    if (sChart) sChart.destroy();
    sChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.map(d => d.date.split('-').reverse().slice(0,2).join('/')),
            datasets: [{
                label: metric === '1rm' ? 'Force (kg)' : 'Volume (kg)',
                data: chartData.map(d => d.val),
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                pointRadius: 4,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#9ca3af' } },
                x: { grid: { display: false }, ticks: { color: '#9ca3af' } }
            }
        }
    });
}

const visbodyConfig = [
    { id: 'weight', color: '#ffffff', bg: 'rgba(255,255,255,0.1)' },
    { id: 'score', color: '#c084fc', bg: 'rgba(192,132,252,0.1)' },
    { id: 'fat', color: '#a1a1aa', bg: 'rgba(161,161,170,0.1)' },
    { id: 'muscle', color: '#fb923c', bg: 'rgba(251,146,60,0.1)' },
    { id: 'water', color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
    { id: 'bone', color: '#d4d4d8', bg: 'rgba(212,212,216,0.1)' },
    { id: 'visceral', color: '#f87171', bg: 'rgba(248,113,113,0.1)' },
    { id: 'bmr', color: '#4ade80', bg: 'rgba(74,222,128,0.1)' }
];

function renderAllVisbodyCharts() {
    visbodyConfig.forEach(config => {
        const canvas = document.getElementById(`vbChart-${config.id}`);
        if(!canvas) return; 
        const ctx = canvas.getContext('2d');
        if (vbCharts[config.id]) vbCharts[config.id].destroy();

        let gradient = ctx.createLinearGradient(0, 0, 0, 150);
        gradient.addColorStop(0, config.bg);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        vbCharts[config.id] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: globalVisbodyData.map(d => new Date(d.date).toLocaleDateString('fr-FR', {day: '2-digit', month: 'short'})),
                datasets: [{
                    data: globalVisbodyData.map(d => d[config.id]),
                    borderColor: config.color, backgroundColor: gradient,
                    fill: true, tension: 0.4, borderWidth: 2,
                    pointBackgroundColor: '#000', pointBorderColor: config.color, pointRadius: 3
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#71717a', font: {size: 10} } },
                    x: { grid: { display: false }, ticks: { color: '#71717a', font: {size: 10} } }
                }
            }
        });
    });
}
