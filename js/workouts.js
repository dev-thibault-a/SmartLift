let globalWorkoutHistory = [];
let currentWorkoutId = null;

const workoutsData = [
    { id: 'push', type: 'base', name: 'Séance Push', color: 'from-blue-600 to-blue-900', muscles: ['Pecs', 'Épaules', 'Bras'], exercises: ['Développé couché', 'Chest press inclinée', 'Développé militaire', 'Triceps barre droite', 'Triceps barre V'] },
    { id: 'pull', type: 'base', name: 'Séance Pull', color: 'from-emerald-600 to-emerald-900', muscles: ['Dos', 'Bras'], exercises: ['Tirage vertical', 'Tirage horizontal', 'Rowing', 'Biceps poulie', 'Curl marteau'] },
    { id: 'legs', type: 'base', name: 'Séance Legs', color: 'from-orange-600 to-orange-900', muscles: ['Cuisses'], exercises: ['Squat pendulum', 'Soulevé de terre roumain', 'Presse', 'Leg extension', 'Leg curl', 'Mollets'] },
    { id: 'bonus_fb', type: 'bonus', name: 'Full Body (Général)', color: 'from-purple-600 to-purple-900', muscles: ['Pecs', 'Dos', 'Cuisses', 'Épaules', 'Bras'], exercises: ['Fentes bulgares', 'Développé incliné haltères', 'Tirage poitrine', 'Élévations latérales', 'Curl pupitre', 'Abdos'] },
    { id: 'bonus_arms', type: 'bonus', name: 'Focus Bras & Épaules', color: 'from-pink-600 to-pink-900', muscles: ['Bras', 'Épaules'], exercises: ['Curl haltères', 'Extension triceps poulie', 'Élévations latérales', 'Oiseau machine', 'Curl marteau', 'Dips'] },
    { id: 'bonus_weak', type: 'bonus', name: 'Points Faibles (Dos/Pecs)', color: 'from-red-600 to-red-900', muscles: ['Dos', 'Pecs'], exercises: ['Pec Deck machine', 'Tirage vertical', 'Chest press machine', 'Rowing haltère', 'Pull-over'] }
];



const exerciseImages = {
    'Développé couché': 'https://blog.myarsenalstrength.com/hs-fs/hubfs/Screenshot%202024-07-24%20at%209.54.41%20AM.png?width=460&height=388&name=Screenshot%202024-07-24%20at%209.54.41%20AM.png',
    'Chest press inclinée': 'https://i.pinimg.com/originals/df/fd/85/dffd856bea5056e1adbb683c6ea54613.gif',
    'Développé militaire': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif',
    'Triceps barre droite': 'https://fitliferegime.com/wp-content/uploads/2023/06/Triceps-Pushdown.gif',
    'Triceps barre V': 'https://fitnessprogramer.com/wp-content/uploads/2022/02/V-bar-Pushdown.gif',
    'Tirage vertical': 'https://pump-app.s3.eu-west-2.amazonaws.com/exercise-assets/12041101-Cable-one-arm-lat-pulldown_back_small.jpg',
    'Tirage horizontal': 'https://images.squarespace-cdn.com/content/v1/5ffcea9416aee143500ea103/1638351904146-GDGXXL9IHXKQKTXULLHF/Seated%2BCable%2BRow.jpeg',
    'Rowing': 'https://training.fit/wp-content/uploads/2020/02/rudern-langhantel.png',
    'Biceps poulie': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/One-Arm-Cable-Curl.gif',
    'Curl marteau': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif',
    'Squat pendulum': 'https://www.inspireusafoundation.org/file/2022/03/reverse-hack-squat.gif',
    'Soulevé de terre roumain': 'https://cdn.shopify.com/s/files/1/0645/8762/8770/files/RDL_Muscles_worked_480x480.jpg?v=1702889620',
    'Presse': 'https://images.squarespace-cdn.com/content/v1/5ffcea9416aee143500ea103/1638426325877-TWFW03QZXN1H460YAJRD/Leg%2BPress%2BMachine.jpeg',
    'Leg extension': 'https://www.fitadium.com/conseils/wp-content/uploads/2020/06/leg-extension.gif',
    'Leg curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/08/Seated-Leg-Curl.gif',
    'Mollets': 'https://training.fit/wp-content/uploads/2020/03/wadenheben-stehend-geraet-800x448.png',
    'Fentes bulgares': 'https://fitnessprogramer.com/wp-content/uploads/2021/05/Barbell-Bulgarian-Split-Squat.gif',
    'Développé incliné haltères': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif',
    'Tirage poitrine': 'https://images.squarespace-cdn.com/content/v1/5ffcea9416aee143500ea103/1638411759184-YY7D7NHFS5GLKANOFH6R/Underhand%2BGrip%2BLat%2BPulldown%2BMachine.jpeg',
    'Élévations latérales': 'https://cdn.shopify.com/s/files/1/0754/7279/8002/files/Blog-dumbbells_3.webp?v=1739252606',
    'Curl pupitre': 'https://fitnessprogramer.com/wp-content/uploads/2021/04/Lever-Preacher-Curl.gif',
    'Abdos': 'https://training.fit/wp-content/uploads/2020/01/bauchpresse-maschine-geraet-800x448.png',
    'Pec Deck machine': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pec-Deck-Fly.gif',
    'Rowing haltère': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif',
    'Chest press machine': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Chest-Press-Machine.gif',
    'Pull-over': 'https://lifefitindia.com/wp-content/uploads/2025/04/Dumbbell-Pullover-Muscles-Worked.jpg',
    'Curl haltères': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif',
    'Extension triceps poulie': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pushdown-with-Rope.gif',
    'Oiseau machine': 'https://www.docteur-fitness.com/wp-content/uploads/2021/12/pec-deck-inverse-exercice-epaules.jpg',
    'Dips': 'https://images.squarespace-cdn.com/content/v1/5ffcea9416aee143500ea103/1638261992305-VGLCGRH2LX2N3VKJSTOZ/Triceps%2BDips.jpeg'
};

function renderWorkoutList() {
    const baseContainer = document.getElementById('base-workouts-container');
    const bonusContainer = document.getElementById('bonus-workouts-container');
    baseContainer.innerHTML = ''; bonusContainer.innerHTML = '';

    workoutsData.forEach(w => {
        const card = `
            <button onclick="openWorkout('${w.id}')" class="w-full h-full bg-gradient-to-br ${w.color} p-6 rounded-3xl flex flex-col justify-center items-start shadow-xl active:scale-95 transition-all hover:scale-[1.02] text-left border border-white/10 relative overflow-hidden group">
                <h3 class="text-2xl font-black text-white mb-2 relative z-10">${w.name}</h3>
                <p class="text-white/80 text-sm font-semibold relative z-10 bg-black/20 px-3 py-1 rounded-full">${w.exercises.length} exercices</p>
            </button>
        `;
        if(w.type === 'base') baseContainer.innerHTML += card;
        else bonusContainer.innerHTML += card;
    });
}


window.togglePhoto = function(id) {
    const el = document.getElementById(id);
    el.classList.toggle('hidden');
};

window.updatePrevRecord = function(exoIndex, baseExo) {
    const variant = document.getElementById(`variant-${exoIndex}`).value;
    const fullExoName = baseExo + variant;
    
    let prevText = "Pas de record";
    let targetText = "Objectif : Trouver ta charge";
    let targetClass = "text-zinc-400 border-zinc-700 bg-zinc-900";
    
    for(let i = globalWorkoutHistory.length - 1; i >= 0; i--) {
        if(globalWorkoutHistory[i].data && globalWorkoutHistory[i].data[fullExoName]) {
            const bestSet = globalWorkoutHistory[i].data[fullExoName][0];
            prevText = `Dernier : ${bestSet.weight}kg x ${bestSet.reps}`;
            
            if(bestSet.reps >= 10) {
                targetText = `Objectif : ${bestSet.weight + 2.5}kg`;
                targetClass = "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
            } else if (bestSet.reps > 0) {
                targetText = `Objectif : ${bestSet.weight}kg x ${bestSet.reps + 1}`;
                targetClass = "text-blue-400 border-blue-500/30 bg-blue-500/10";
            }
            break;
        }
    }
    document.getElementById(`prev-${exoIndex}`).innerText = prevText;
    const targetEl = document.getElementById(`target-${exoIndex}`);
    targetEl.innerText = targetText;
    targetEl.className = `text-[10px] px-2 py-1 rounded-lg font-bold border ${targetClass} max-w-[120px] text-right leading-tight mt-1`;
};


function openWorkout(id) {
    currentWorkoutId = id;
    const workout = workoutsData.find(w => w.id === id);
    document.getElementById('workout-list').classList.add('hidden');
    document.getElementById('workout-title').innerText = workout.name;
    document.getElementById('active-workout').classList.remove('hidden');
    
    const exoList = document.getElementById('exercises-list');
    exoList.innerHTML = '';

    workout.exercises.forEach((exo, exoIndex) => {
        let prevText = "Pas de record";
        let targetText = "Objectif : Trouver ta charge";
        let targetClass = "text-zinc-400 border-zinc-700 bg-zinc-900";

        // Recherche du dernier record pour l'exo de base
        for(let i = globalWorkoutHistory.length - 1; i >= 0; i--) {
            if(globalWorkoutHistory[i].data && globalWorkoutHistory[i].data[exo]) {
                const bestSet = globalWorkoutHistory[i].data[exo][0];
                prevText = `Dernier : ${bestSet.weight}kg x ${bestSet.reps}`;
                
                if(bestSet.reps >= 10) {
                    targetText = `Objectif : ${bestSet.weight + 2.5}kg`;
                    targetClass = "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
                } else if (bestSet.reps > 0) {
                    targetText = `Objectif : ${bestSet.weight}kg x ${bestSet.reps + 1}`;
                    targetClass = "text-blue-400 border-blue-500/30 bg-blue-500/10";
                }
                break;
            }
        }

        const imgUrl = exerciseImages[exo] || `https://placehold.co/600x300/18181b/3b82f6?text=${encodeURIComponent(exo)}`;
        const safeExo = exo.replace(/'/g, "\\'"); 

        let html = `
            <div class="bg-zinc-900/80 p-5 rounded-3xl border border-zinc-800 shadow-md backdrop-blur-sm transition-colors hover:border-zinc-700">
                <div class="mb-4 flex justify-between items-start gap-2">
                    <div>
                        <h3 class="font-bold text-lg text-white">${exo}</h3>
                        <select id="variant-${exoIndex}" onchange="updatePrevRecord(${exoIndex}, '${safeExo}')" class="mt-1 bg-zinc-950 text-xs text-zinc-400 rounded-lg px-2 py-1 outline-none border border-zinc-800 focus:border-blue-500 cursor-pointer">
                            <option value="">Matériel standard</option>
                            <option value=" (Haltères)">Variante : Haltères</option>
                            <option value=" (Machine)">Variante : Machine</option>
                            <option value=" (Barre)">Variante : Barre</option>
                            <option value=" (Poulie)">Variante : Poulie</option>
                        </select>
                    </div>
                    <div class="flex flex-col items-end shrink-0">
                        <span id="prev-${exoIndex}" class="text-[10px] text-zinc-500 font-medium">${prevText}</span>
                        <span id="target-${exoIndex}" class="text-[10px] px-2 py-1 rounded-lg font-bold border ${targetClass} max-w-[120px] text-right leading-tight mt-1">${targetText}</span>
                        <button onclick="togglePhoto('img-${exoIndex}')" class="text-[10px] text-zinc-600 hover:text-white transition-colors mt-2">Afficher Photo</button>
                    </div>
                </div>
                
                <div id="img-${exoIndex}" class="hidden mb-4 rounded-xl overflow-hidden border border-zinc-700/50">
                    <img src="${imgUrl}" alt="${exo}" class="w-full h-40 object-cover opacity-90">
                </div>

                <div class="space-y-3">
        `;
        
        for(let i=0; i<3; i++) {
            html += `
                <div class="flex gap-3 items-center bg-zinc-950/50 p-2 rounded-xl">
                    <span class="text-zinc-500 font-bold text-sm w-8 text-center">S${i+1}</span>
                    <input type="number" id="val-${exoIndex}-set-${i}-w" placeholder="Kg" class="w-1/2 bg-zinc-900 p-3 rounded-lg border border-zinc-700 text-center outline-none focus:border-white focus:ring-1 focus:ring-white text-white font-bold transition-all">
                    <input type="number" id="val-${exoIndex}-set-${i}-r" placeholder="Reps" class="w-1/2 bg-zinc-900 p-3 rounded-lg border border-zinc-700 text-center outline-none focus:border-white focus:ring-1 focus:ring-white text-white font-bold transition-all">
                </div>
            `;
        }
        html += `</div></div>`;
        exoList.innerHTML += html;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeWorkout() {
    document.getElementById('active-workout').classList.add('hidden');
    document.getElementById('workout-list').classList.remove('hidden');
    document.getElementById('floating-timer').classList.add('hidden');
}

async function saveWorkout() {
    const workout = workoutsData.find(w => w.id === currentWorkoutId);
    const sessionData = {};
    
    workout.exercises.forEach((exo, exoIndex) => {
        const sets = [];
        for(let s=0; s<3; s++) {
            const w = document.getElementById(`val-${exoIndex}-set-${s}-w`).value;
            const r = document.getElementById(`val-${exoIndex}-set-${s}-r`).value;
            if(w || r) sets.push({ weight: parseFloat(w)||0, reps: parseInt(r)||0 });
        }
        if(sets.length) {
            const variant = document.getElementById(`variant-${exoIndex}`).value;
            sessionData[exo + variant] = sets;
        }
    });

    if(Object.keys(sessionData).length === 0) return alert("Tu n'as rien rempli !");

    document.getElementById('sync-status').innerText = "Envoi...";
    await supabaseClient.from('workouts').insert([{ user_id: currentUser.id, date: getLocalIsoDate(), workout_id: currentWorkoutId, data: sessionData }]);
    location.reload();
}

function openCardio() {
    document.getElementById('workout-list').classList.add('hidden');
    document.getElementById('active-cardio').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeCardio() {
    document.getElementById('active-cardio').classList.add('hidden');
    document.getElementById('workout-list').classList.remove('hidden');
}

async function saveCardio() {
    const type = document.getElementById('cardio-type').value;
    const time = document.getElementById('cardio-time').value;
    const dist = document.getElementById('cardio-dist').value;
    const cal = document.getElementById('cardio-cal').value;
    
    if(!time && !dist && !cal) return alert("Renseigne au moins une donnée !");

    document.getElementById('sync-status').innerText = "Envoi...";
    const sessionData = { [type]: [{ weight: parseFloat(dist)||0, reps: parseInt(time)||0, cal: parseInt(cal)||0 }] };
    await supabaseClient.from('workouts').insert([{ user_id: currentUser.id, date: getLocalIsoDate(), workout_id: 'cardio', data: sessionData }]);
    location.reload();
}


function renderRecoveryHeatmap() {
    const container = document.getElementById('recovery-bars');
    if (!container) return;
    
    const muscles = { 'Pecs': 100, 'Dos': 100, 'Cuisses': 100, 'Épaules': 100, 'Bras': 100 };
    
    
    globalWorkoutHistory.forEach(s => {
        const diff = (new Date() - new Date(s.date)) / (1000 * 60 * 60 * 24);
        if (diff < 4) {
            const workout = workoutsData.find(w => w.id === s.workout_id);
            if (workout) workout.muscles.forEach(m => muscles[m] -= (4 - diff) * 20);
        }
    });

    
    let htmlContent = Object.entries(muscles).map(([m, s]) => `
        <div class="flex items-center gap-4">
            <span class="w-16 text-xs text-zinc-500">${m}</span>
            <div class="flex-grow h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div class="h-full bg-emerald-500 transition-all duration-1000" style="width: ${Math.max(0, s)}%"></div>
            </div>
        </div>
    `).join('');

    
    let bestWorkout = '';
    let maxScore = -1;

workoutsData.forEach(w => {
        // Ajout de "if (w.muscles)" pour éviter tout crash si un jour tu oublies les muscles d'une séance
        if (w.muscles) {
            let score = w.muscles.reduce((acc, m) => acc + Math.max(0, muscles[m]), 0) / w.muscles.length;
            if (score > maxScore) {
                maxScore = score;
                bestWorkout = w.name;
            }
        }
    });

   
    htmlContent += `
        <div class="mt-6 p-4 bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center justify-between shadow-lg">
            <div>
                <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Conseil Algorithme</p>
                <p class="text-sm font-bold text-emerald-400"> ${bestWorkout} recommandée</p>
            </div>
        </div>
    `;

    
    container.innerHTML = htmlContent;
}
