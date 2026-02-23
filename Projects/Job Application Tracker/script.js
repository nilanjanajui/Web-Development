
let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';


const total = document.getElementById('total');
const interviewCount = document.getElementById('interviewCount');
const rejectedCount = document.getElementById('rejectedCount');
const jobCount = document.getElementById('jobCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('allCards');
const filterSection = document.getElementById('filtered-section');
const mainContainer = document.querySelector('main');
const emptyState = document.getElementById('emptyState');


function calculateCount() {
    const totalCards = allCardSection.querySelectorAll('.card').length;

    total.innerText = totalCards;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    if (currentStatus === 'interview-filter-btn') {
        jobCount.innerText = `${interviewList.length} of ${totalCards}`;
    }
    else if (currentStatus === 'rejected-filter-btn') {
        jobCount.innerText = `${rejectedList.length} of ${totalCards}`;
    }
    else {
        jobCount.innerText = totalCards;
    }

    if (totalCards === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
}

calculateCount();


function updateStatusBadge(statusEl, status) {
    statusEl.className = 'status inline-block px-3 py-1 rounded text-xs';

    if (status === 'INTERVIEW') {
        statusEl.classList.add('bg-green-100', 'text-green-600');
        statusEl.innerText = 'INTERVIEW';
    }
    else if (status === 'REJECTED') {
        statusEl.classList.add('bg-red-100', 'text-red-600');
        statusEl.innerText = 'REJECTED';
    }
    else {
        statusEl.classList.add('bg-gray-200', 'text-gray-600');
        statusEl.innerText = 'NOT APPLIED';
    }
}


function toggleStyle(id) {
    [allFilterBtn, interviewFilterBtn, rejectedFilterBtn].forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('bg-gray-200');
    });

    const selected = document.getElementById(id);
    selected.classList.remove('bg-gray-200');
    selected.classList.add('bg-blue-600', 'text-white');

    currentStatus = id;

    if (id === 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    }
    else if (id === 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
    }
    else {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }

    calculateCount();
}


allFilterBtn.addEventListener('click', () => toggleStyle('all-filter-btn'));
interviewFilterBtn.addEventListener('click', () => toggleStyle('interview-filter-btn'));
rejectedFilterBtn.addEventListener('click', () => toggleStyle('rejected-filter-btn'));



mainContainer.addEventListener('click', function (event) {
    const card = event.target.closest('.card');
    if (!card) return;

    const company = card.querySelector('.company').innerText;
    const role = card.querySelector('.role').innerText;
    const meta = card.querySelector('.text-sm').innerText;
    const description = card.querySelector('.text-gray-600').innerText;
    const statusEl = card.querySelector('.status');


    if (event.target.classList.contains('interview-btn')) {
        updateStatusBadge(statusEl, 'INTERVIEW');

        rejectedList = rejectedList.filter(job => job.company !== company);

        if (!interviewList.find(job => job.company === company)) {
            interviewList.push({ company, role, meta, description });
        }

        if (currentStatus === 'interview-filter-btn') renderInterview();
        if (currentStatus === 'rejected-filter-btn') renderRejected();

        calculateCount();
    }


    else if (event.target.classList.contains('rejected-btn')) {
        updateStatusBadge(statusEl, 'REJECTED');

        interviewList = interviewList.filter(job => job.company !== company);

        if (!rejectedList.find(job => job.company === company)) {
            rejectedList.push({ company, role, meta, description });
        }

        if (currentStatus === 'interview-filter-btn') renderInterview();
        if (currentStatus === 'rejected-filter-btn') renderRejected();

        calculateCount();
    }


    else if (event.target.classList.contains('btn-delete')) {
        card.remove();
        interviewList = interviewList.filter(job => job.company !== company);
        rejectedList = rejectedList.filter(job => job.company !== company);

        if (currentStatus === 'interview-filter-btn') renderInterview();
        if (currentStatus === 'rejected-filter-btn') renderRejected();

        calculateCount();
    }


    if (event.target.classList.contains('interview-btn')) {
        card.classList.add('interview');
        card.classList.remove('rejected', 'not-applied');
    }
    if (event.target.classList.contains('rejected-btn')) {
        card.classList.add('rejected');
        card.classList.remove('interview', 'not-applied');
    }
});


function createEmptyMessage() {
    return `
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 mt-6 p-16 text-center">
            <div class="flex flex-col items-center justify-center space-y-4">
                <img src="./images/jobs.png" alt="No jobs icon" class="w-20 h-20 object-contain" />
                <h3 class="text-xl font-semibold text-blue-900">No jobs available</h3>
                <p class="text-gray-500 text-sm">Check back soon for new job opportunities</p>
            </div>
        </div>
    `;
}


function renderInterview() {
    filterSection.innerHTML = '';

    const totalCards = allCardSection.querySelectorAll('.card').length;

    if (interviewList.length === 0 && totalCards > 0) {
        filterSection.innerHTML = createEmptyMessage();
        return;
    }

    interviewList.forEach(job => {
        const div = document.createElement('div');
        div.className = 'card bg-white rounded-lg shadow p-6 flex justify-between';
        div.innerHTML = generateCardHTML(job);
        filterSection.appendChild(div);
        updateStatusBadge(div.querySelector('.status'), 'INTERVIEW');
    });
}


function renderRejected() {
    filterSection.innerHTML = '';

    const totalCards = allCardSection.querySelectorAll('.card').length;

    if (rejectedList.length === 0 && totalCards > 0) {
        filterSection.innerHTML = createEmptyMessage();
        return;
    }

    rejectedList.forEach(job => {
        const div = document.createElement('div');
        div.className = 'card bg-white rounded-lg shadow p-6 flex justify-between';
        div.innerHTML = generateCardHTML(job);
        filterSection.appendChild(div);
        updateStatusBadge(div.querySelector('.status'), 'REJECTED');
    });
}

function generateCardHTML(job) {
    return `
        <div class="space-y-4">
            <div>
                <h2 class="company text-xl font-bold text-blue-900">${job.company}</h2>
                <p class="role text-gray-600">${job.role}</p>
            </div>

            <p class="text-sm text-gray-500">${job.meta}</p>
            <span class="status"></span>
            <p class="text-gray-600 text-sm">${job.description}</p>

            <div class="flex gap-3">
                <button class="interview-btn px-4 py-2 text-sm rounded border border-green-500 text-green-600">Interview</button>
                <button class="rejected-btn px-4 py-2 text-sm rounded border border-red-500 text-red-600">Rejected</button>
            </div>
        </div>

        <div>
            <button class="btn-delete w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100">
                <img src="./images/Trash.png" alt="Delete" class="w-5 h-5 object-contain" />
            </button>
        </div>
    `;
}