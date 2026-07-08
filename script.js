// === Configuration ===
// 실제 fal.ai API를 사용하려면 아래 키를 입력하세요. 비어있을 경우 시뮬레이션으로 동작합니다.
const FAL_API_KEY = ""; 

const jobsData = [
    {
        id: "athlete", title: "국가대표 운동선수", image: "assets/main_athlete.jpg",
        subcategories: [ { id: "taekwondo", title: "태권도", image: "assets/sub_taekwondo.jpg" }, { id: "soccer", title: "미래 축구선수" }, { id: "esports", title: "e-스포츠", image: "assets/sub_esports.jpg" }, { id: "baseball", title: "스마트 야구선수" } ]
    },
    {
        id: "doctor", title: "스마트 병원 전문의", image: "assets/main_doctor.jpg",
        subcategories: [ { id: "robot-surgeon", title: "로봇 수술 전문 외과의", image: "assets/sub_robot_surgeon.jpg" }, { id: "bioprinting", title: "3D 바이오 프린팅 전문가", image: "assets/sub_bioprinting.jpg" }, { id: "space-doctor", title: "우주 항공 전문의" }, { id: "digital-therapist", title: "디지털 심리 치료사" } ]
    },
    {
        id: "creator", title: "스타 크리에이터", image: "assets/main_creator.jpg",
        subcategories: [ { id: "short-form", title: "숏폼 미디어 기획자" }, { id: "vtuber", title: "버추얼 유튜버 (V-Tuber)" }, { id: "global-vlogger", title: "글로벌 여행 브이로거" }, { id: "metaverse-pd", title: "메타버스 공연 기획자" } ]
    },
    {
        id: "police", title: "특수 수사관 / 경찰관", image: "assets/main_police.jpg",
        subcategories: [ { id: "cyber-security", title: "사이버 보안 수사관" }, { id: "drone-patrol", title: "드론 순찰 경관" }, { id: "csi", title: "과학수사(CSI) 요원" }, { id: "marine-rescue", title: "해양 생태 구조대" } ]
    },
    {
        id: "chef", title: "미래 셰프 / 파티시에", image: "assets/main_chef.jpg",
        subcategories: [ { id: "3d-food", title: "3D 푸드 프린팅 파티시에" }, { id: "smart-farm", title: "스마트 팜 셰프" }, { id: "fusion-master", title: "전통 한식 퓨전 마스터" }, { id: "molecular", title: "분자 요리 전문가" } ]
    },
    {
        id: "robotics", title: "로봇공학자 / AI전문가", image: "assets/main_robotics.jpg",
        subcategories: [ { id: "ai-core", title: "AI 코어 엔지니어" }, { id: "robot-mech", title: "휴머노이드 메카트로닉스" }, { id: "agi", title: "AGI 연구원" }, { id: "ethics", title: "AI 윤리 검증관" } ]
    },
    {
        id: "space", title: "우주 탐험가", image: "assets/main_space.jpg",
        subcategories: [ { id: "mars", title: "화성 개척 대원" }, { id: "asteroid", title: "소행성 자원 채굴가" }, { id: "space-pilot", title: "성간 항행 조종사" }, { id: "astro-botany", title: "우주 식물학자" } ]
    },
    {
        id: "science", title: "생명과학 연구원", image: "assets/main_science.jpg",
        subcategories: [ { id: "dna", title: "유전자 편집 연구원" }, { id: "neuro", title: "뇌-컴퓨터 인터페이스 개발자" }, { id: "longevity", title: "수명 연장 생물학자" }, { id: "synthetic", title: "합성 생명 창조가" } ]
    },
    {
        id: "climate", title: "친환경 기후 과학자", image: "assets/main_climate.jpg",
        subcategories: [ { id: "weather", title: "기후 조절 마스터" }, { id: "carbon", title: "탄소 포집 기술자" }, { id: "ocean", title: "해양 산성화 복원가" }, { id: "eco-city", title: "친환경 공중 도시 설계자" } ]
    },
    {
        id: "vr-architect", title: "확장현실(XR) 기획자", image: "assets/main_vr_architect.jpg",
        subcategories: [ { id: "world", title: "가상 세계 렌더러" }, { id: "haptic", title: "햅틱 감각 디자이너" }, { id: "historical", title: "과거 시대 복원 건축가" }, { id: "fantasy", title: "판타지 랜드마크 디자이너" } ]
    }
];

// State
let state = {
    imageData: null,
    generatedImageUrl: null,
    selectedCategory: null,
    selectedSubcategory: null,
    stream: null,
    retakeCount: 1, // Max 1 retake
    qrCodeObj: null,
    welcomeInterval: null
};

// DOM Elements
const sections = {
    app: document.getElementById('app-container'),
    start: document.getElementById('start-overlay'),
    category: document.getElementById('step-category'),
    subcategory: document.getElementById('step-subcategory'),
    capture: document.getElementById('step-capture'),
    loading: document.getElementById('step-loading'),
    result: document.getElementById('step-result')
};

const btnStartApp = document.getElementById('btn-start-app');
const categoryGrid = document.getElementById('category-grid');
const subcategoryGrid = document.getElementById('subcategory-grid');
const selectedCategoryName = document.getElementById('selected-category-name');
const btnBackToCat = document.getElementById('btn-back-to-cat');
const btnBackToSub = document.getElementById('btn-back-to-sub');

const video = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const photoPreview = document.getElementById('photo-preview');
const cameraOverlay = document.getElementById('camera-overlay');
const countdownOverlay = document.getElementById('countdown-overlay');
const btnCapture = document.getElementById('btn-capture');
const btnRetake = document.getElementById('btn-retake');
const retakeCountSpan = document.getElementById('retake-count');
const btnGenerate = document.getElementById('btn-generate');

const loadingText = document.getElementById('loading-text');
const progressFill = document.getElementById('progress-fill');
const resultImage = document.getElementById('result-image');
const resultPlaceholder = document.getElementById('result-placeholder');
const resultTitle = document.getElementById('result-title');
const resultDesc = document.getElementById('result-desc');
const qrcodeBox = document.getElementById('qrcode');

const btnShowPrint = document.getElementById('btn-show-print');
const btnDownload = document.getElementById('btn-download');
const btnRestart = document.getElementById('btn-restart');

const printModal = document.getElementById('print-modal');
const btnClosePrint = document.getElementById('btn-close-print');
const printQtyBtns = document.querySelectorAll('.print-qty-btn');
const printContainer = document.getElementById('print-container');
const santaOverlay = document.getElementById('santa-overlay');

// === Audio Synthesis (TTS) Setup ===
const synth = window.speechSynthesis;
let voices = [];

function populateVoices() {
    voices = synth.getVoices();
}
populateVoices();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
}

function speak(text, isSanta = false) {
    if (synth.speaking || synth.pending) {
        synth.cancel();
    }
    
    // 브라우저 버그(이전 음성이 취소되지 않고 겹치는 현상)를 방지하기 위해 아주 짧은 지연 후 실행합니다.
    setTimeout(() => {
        const utterThis = new SpeechSynthesisUtterance(text);
        
        const koVoices = voices.filter(v => v.lang.includes('ko'));
        
        if (isSanta) {
            utterThis.pitch = 0.2; // Deep voice
            utterThis.rate = 0.8; // Slower
            if (koVoices.length > 0) utterThis.voice = koVoices[koVoices.length - 1]; 
        } else {
            utterThis.pitch = 1.2; 
            utterThis.rate = 1.0;
            if (koVoices.length > 0) utterThis.voice = koVoices[0];
        }
        
        synth.speak(utterThis);
    }, 100);
}

// === Audio Effects (Web Audio API) ===
function playShutterSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime); 
    oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1); 
    
    gainNode.gain.setValueAtTime(1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
    
    speak("찰칵!");
}

let magicAudioCtx = null;
let magicOscillators = [];

function playMagicSound() {
    magicAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const freqs = [220, 277.18, 329.63, 440]; // Mystical chord
    
    freqs.forEach(f => {
        const osc = magicAudioCtx.createOscillator();
        const gain = magicAudioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, magicAudioCtx.currentTime);
        
        // Tremolo effect
        const lfo = magicAudioCtx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 4;
        const lfoGain = magicAudioCtx.createGain();
        lfoGain.gain.value = 5;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();
        
        gain.gain.setValueAtTime(0, magicAudioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, magicAudioCtx.currentTime + 2); // Fade in
        
        osc.connect(gain);
        gain.connect(magicAudioCtx.destination);
        
        osc.start();
        magicOscillators.push({osc, gain, lfo});
    });
}

function stopMagicSound() {
    if(magicAudioCtx) {
        magicOscillators.forEach(nodes => {
            nodes.gain.gain.linearRampToValueAtTime(0, magicAudioCtx.currentTime + 1); // Fade out
            setTimeout(() => {
                nodes.osc.stop();
                nodes.lfo.stop();
            }, 1000);
        });
        magicOscillators = [];
        setTimeout(() => { if (magicAudioCtx.state !== 'closed') magicAudioCtx.close(); }, 1500);
    }
}


// === Initialization ===
function init() {
    renderCategories();
    setupEventListeners();
    
    document.body.addEventListener('click', () => {
        if (!state.welcomeInterval && !sections.start.classList.contains('hidden')) {
            speak("워너비 마술상자에 오신 것을 환영합니다. 시작하기 버튼을 누르시면 다음 화면으로 넘어갑니다!");
            state.welcomeInterval = setInterval(() => {
                if (!sections.start.classList.contains('hidden')) {
                    speak("워너비 마술상자에 오신 것을 환영합니다. 시작하기 버튼을 누르시면 다음 화면으로 넘어갑니다!");
                } else {
                    clearInterval(state.welcomeInterval);
                }
            }, 10000);
        }
    }, { once: true });
}

function setupEventListeners() {
    btnStartApp.addEventListener('click', startApp);
    btnBackToCat.addEventListener('click', goBackToCategory);
    btnBackToSub.addEventListener('click', goBackToSubcategory);
    btnCapture.addEventListener('click', startCountdownAndCapture);
    btnRetake.addEventListener('click', retakePhoto);
    btnGenerate.addEventListener('click', generateProfile);
    btnRestart.addEventListener('click', resetApp);
    btnDownload.addEventListener('click', downloadResult);
    
    btnShowPrint.addEventListener('click', () => {
        printModal.classList.remove('hidden');
    });
    btnClosePrint.addEventListener('click', () => printModal.classList.add('hidden'));
    
    printQtyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const qty = parseInt(e.target.dataset.qty);
            executePrint(qty);
        });
    });
}

function switchSection(hideSection, showSection) {
    hideSection.classList.remove('active');
    hideSection.classList.add('hidden');
    showSection.classList.remove('hidden');
    showSection.classList.add('active');
}

// --- App Flow ---

function startApp() {
    sections.start.classList.add('hidden');
    sections.app.style.display = 'flex';
    
    if(state.welcomeInterval) {
        clearInterval(state.welcomeInterval);
    }
    speak("마술상자 속 직업군을 선택하세요");
}

function renderCategories() {
    categoryGrid.innerHTML = '';
    jobsData.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = `<img src="${job.image}" class="job-image" alt="${job.title}"><div class="title-overlay">${job.title}</div>`;
        card.addEventListener('click', () => {
            state.selectedCategory = job;
            showSubcategorySelection();
        });
        categoryGrid.appendChild(card);
    });
}

function goBackToCategory() {
    state.selectedCategory = null;
    switchSection(sections.subcategory, sections.category);
    speak("마술상자 속 직업군을 선택하세요");
}

function showSubcategorySelection() {
    selectedCategoryName.innerText = state.selectedCategory.title;
    renderSubcategories();
    switchSection(sections.category, sections.subcategory);
    speak(`${state.selectedCategory.title} 직업군을 선택하셨습니다. 다음으로 구체적인 직업을 선택해 주세요!`);
}

function renderSubcategories() {
    subcategoryGrid.innerHTML = '';
    state.selectedCategory.subcategories.forEach(sub => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = sub.image 
            ? `<img src="${sub.image}" class="job-image" alt="${sub.title}"><div class="title-overlay">${sub.title}</div>`
            : `<span class="icon">🔹</span><div class="title">${sub.title}</div>`;
        card.addEventListener('click', () => {
            state.selectedSubcategory = sub;
            showCameraCapture();
        });
        subcategoryGrid.appendChild(card);
    });
}

function goBackToSubcategory() {
    state.selectedSubcategory = null;
    stopCamera();
    switchSection(sections.capture, sections.subcategory);
    speak("구체적인 직업을 선택하세요.");
}

async function showCameraCapture() {
    switchSection(sections.subcategory, sections.capture);
    
    video.style.display = 'block';
    cameraOverlay.style.display = 'flex';
    photoPreview.style.display = 'none';
    btnCapture.style.display = 'block';
    btnCapture.disabled = false;
    btnRetake.style.display = 'none';
    btnGenerate.style.display = 'none';
    countdownOverlay.classList.add('hidden');
    
    speak(`${state.selectedSubcategory.title} 직업을 선택하셨군요. 그럼 당신의 현재 모습을 촬영하겠습니다.`);

    try {
        state.stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
        video.srcObject = state.stream;
    } catch (err) {
        console.error("Camera error:", err);
        // Browser security prevents JS from forcing camera permissions. 
        // The user must manually allow it in the browser popup.
        alert("브라우저 팝업이나 설정에서 카메라 접근 권한을 반드시 허용해 주세요.");
    }
}

function stopCamera() {
    if (state.stream) {
        state.stream.getTracks().forEach(track => track.stop());
        state.stream = null;
    }
}

function startCountdownAndCapture() {
    btnCapture.disabled = true;
    let count = 7;
    countdownOverlay.innerText = count;
    countdownOverlay.classList.remove('hidden');
    
    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownOverlay.innerText = count;
            // 3초 남았을 때 멘트
            if (count === 3) {
                speak("카메라를 보세요. 눈을 뜨세요.");
            }
        } else {
            clearInterval(interval);
            takePhoto();
        }
    }, 1000);
}

function takePhoto() {
    countdownOverlay.classList.add('hidden');
    playShutterSound();
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    
    state.imageData = canvas.toDataURL('image/jpeg');
    photoPreview.src = state.imageData;
    
    video.style.display = 'none';
    cameraOverlay.style.display = 'none';
    photoPreview.style.display = 'block';
    
    btnCapture.style.display = 'none';
    btnGenerate.style.display = 'block';
    
    if (state.retakeCount > 0) {
        btnRetake.style.display = 'block';
        retakeCountSpan.innerText = state.retakeCount;
    }
    
    speak("재촬영은 1회만 가능합니다. AI 프로필 생성하기 버튼을 누르시면 마법상자는 당신을 당신이 원하는 직업의 세계로 안내합니다");
    
    stopCamera();
}

function retakePhoto() {
    if (state.retakeCount <= 0) return;
    state.retakeCount--;
    state.imageData = null;
    showCameraCapture();
}

// --- API & Result ---

async function generateProfile() {
    switchSection(sections.capture, sections.loading);
    speak("엑스펠리아무스! 마법상자가 마법을 시전하고 있습니다. 잠시 기다려 주세요!");
    playMagicSound();
    
    if (FAL_API_KEY) {
        await callFalApi();
    } else {
        simulateGeneration(); 
    }
}

async function callFalApi() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        if(progress > 90) progress = 90;
        progressFill.style.width = `${progress}%`;
    }, 500);

    try {
        const response = await fetch("https://fal.run/fal-ai/face-swap", {
            method: "POST",
            headers: {
                "Authorization": `Key ${FAL_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                swap_image_url: state.imageData, 
                target_image_url: "https://example.com/placeholder_job_image.jpg" 
            })
        });

        if (!response.ok) throw new Error("API Request Failed");
        const data = await response.json();
        
        clearInterval(interval);
        progressFill.style.width = "100%";
        
        state.generatedImageUrl = data.image ? data.image.url : state.imageData;
        
        setTimeout(showResult, 500);

    } catch (error) {
        console.error(error);
        clearInterval(interval);
        simulateGeneration(); 
    }
}

function simulateGeneration() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        progressFill.style.width = `${progress}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            state.generatedImageUrl = state.imageData; 
            setTimeout(showResult, 500);
        }
    }, 500);
}

function showResult() {
    switchSection(sections.loading, sections.result);
    stopMagicSound();
    
    resultTitle.innerText = state.selectedCategory.title;
    resultDesc.innerText = state.selectedSubcategory.title;
    
    if (FAL_API_KEY && state.generatedImageUrl !== state.imageData) {
        resultImage.src = state.generatedImageUrl;
        resultImage.style.display = 'block';
        resultPlaceholder.style.display = 'none';
    } else {
        resultPlaceholder.style.backgroundImage = `url(${state.imageData})`;
        resultPlaceholder.style.filter = "contrast(1.2) saturate(1.5) hue-rotate(15deg)";
        resultImage.style.display = 'none';
        resultPlaceholder.style.display = 'flex';
    }
    
    generateQR();
    
    speak("QR 코드를 휴대폰 카메라로 스캔하면 주소창이 보입니다. 해당 주소창을 누르시면 생성된 결과물을 휴대폰에 수동으로 다운 받을 수 있습니다. 출력을 원하시면 하단의 인쇄하기를 누르세요.");
}

function generateQR() {
    qrcodeBox.innerHTML = "";
    const qrData = state.generatedImageUrl.startsWith('data:') ? "https://example.com/mock-result" : state.generatedImageUrl;
    
    state.qrCodeObj = new QRCode(qrcodeBox, {
        text: qrData,
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}

function downloadResult() {
    if(!state.generatedImageUrl) return;
    const link = document.createElement('a');
    link.href = state.generatedImageUrl;
    link.download = `wannabee_${state.selectedCategory.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// --- Print & Reset ---

function executePrint(qty) {
    printModal.classList.add('hidden');
    
    printContainer.innerHTML = '';
    for(let i=0; i<qty; i++) {
        const wrapper = document.createElement('div');
        wrapper.className = 'print-img-wrapper';
        const img = document.createElement('img');
        img.src = state.generatedImageUrl;
        wrapper.appendChild(img);
        printContainer.appendChild(wrapper);
    }
    
    window.print();
    
    triggerSantaEnding();
}

function triggerSantaEnding() {
    santaOverlay.classList.remove('hidden');
    
    speak("원하는 직업이 맞나요? 그럼 소원성취 하세요. 허허허허허!", true);
    
    setTimeout(() => {
        santaOverlay.classList.add('fade-out');
    }, 1000); 

    setTimeout(() => {
        santaOverlay.classList.add('hidden');
        santaOverlay.classList.remove('fade-out');
        resetApp();
    }, 5000);
}

function resetApp() {
    state.imageData = null;
    state.generatedImageUrl = null;
    state.selectedCategory = null;
    state.selectedSubcategory = null;
    state.retakeCount = 1;
    
    progressFill.style.width = "0%";
    resultImage.style.display = 'none';
    resultPlaceholder.style.display = 'flex';
    
    document.querySelectorAll('.job-card').forEach(c => c.classList.remove('selected'));
    
    switchSection(sections.result, sections.start);
    sections.app.style.display = 'none';
    
    speak("워너비 마술상자에 오신 것을 환영합니다. 시작하기 버튼을 누르시면 다음 화면으로 넘어갑니다!");
    state.welcomeInterval = setInterval(() => {
        if (!sections.start.classList.contains('hidden')) {
            speak("워너비 마술상자에 오신 것을 환영합니다. 시작하기 버튼을 누르시면 다음 화면으로 넘어갑니다!");
        } else {
            clearInterval(state.welcomeInterval);
        }
    }, 10000);
}

// Start
window.addEventListener('DOMContentLoaded', init);
