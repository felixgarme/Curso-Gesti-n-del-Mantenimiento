
let currentSection = 0;
const sections = ['expectativas', 'investigaciones', 'tecnicas'];

function showSection(sectionName) {
document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
});

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
});

document.getElementById(sectionName).classList.add('active');
document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

currentSection = sections.indexOf(sectionName);
updateProgress();
updateNavigationButtons();
}

function updateProgress() {
const progress = ((currentSection + 1) / sections.length) * 100;
document.getElementById('progressBar').style.width = progress + '%';
}

function updateNavigationButtons() {
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

prevBtn.disabled = currentSection === 0;
nextBtn.disabled = currentSection === sections.length - 1;
}

function navigateSection(direction) {
const newSection = currentSection + direction;
if (newSection >= 0 && newSection < sections.length) {
    showSection(sections[newSection]);
}
}

document.querySelectorAll('.tab-btn').forEach(btn => {
btn.addEventListener('click', (e) => {
    const sectionName = e.target.getAttribute('data-section');
    showSection(sectionName);
});
});

document.addEventListener('keydown', (e) => {
if (e.key === 'ArrowLeft') {
    navigateSection(-1);
} else if (e.key === 'ArrowRight') {
    navigateSection(1);
}
});

updateProgress();
updateNavigationButtons();
