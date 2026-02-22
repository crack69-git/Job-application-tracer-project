let interviewList = [];
let rejectedList = [];
let currentList = [];
let currentStatus = 'all-btn';


let total = document.getElementById("total");
let interview = document.getElementById("interview");
let rejected = document.getElementById("rejected");
const allcards = document.getElementById("all-card");
let jobcount = document.getElementById("job-count");


const maincontainer = document.querySelector('main');
function getStatusBadge(status) {
    if (status === 'Interview') return '<div class="badge badge-success description rounded-md py-5 px-6 font-bold">Interview</div>';
    if (status === 'Rejected') return '<div class="badge badge-error description rounded-md py-5 px-6 font-bold">Rejected</div>';
    return '<div class="badge badge-md bg-primary-content rounded-md py-5 description">Not Applied</div>';
}

function updateJobCount() {
    if (currentStatus === 'all-btn') {
        jobcount.innerHTML = `<p><span>${allcards.children.length}</span> Jobs</p>`;
    } else if (currentStatus === 'interview-btn') {
        jobcount.innerHTML = `<p><span>${interviewList.length}</span> of ${allcards.children.length} Jobs</p>`;
    } else if (currentStatus === 'rejected-btn') {
        jobcount.innerHTML = `<p><span>${rejectedList.length}</span> of ${allcards.children.length} Jobs</p>`;
    }
}

function updatecounts() {
    total.innerText = allcards.children.length;
    interview.innerText = interviewList.length;
    rejected.innerText = rejectedList.length;
    updateJobCount();
}
updatecounts();

function toggleStyle(id) {
    selected = document.getElementById(id);
    currentStatus = id;
    updateJobCount();
    if (id == 'interview-btn') {
        allcards.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterviewList();
        if (interviewList.length == 0) {
            filterSection.innerHTML = `
                <div class="card bg-base-100 w-full shadow-sm">
                <figure class="px-10 pt-10">
                    <img src="jobs.png" alt="Shoes" class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title font-bold">No jobs available</h2>
                    <p>Check back soon for new job opportunities</p>
                </div>
            </div>
            `;
        }
    }
    else if (id == 'all-btn') {
        allcards.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }
    else if (id == 'rejected-btn') {
        allcards.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejectedList();
        if (rejectedList.length == 0) {
            filterSection.innerHTML = `
                <div class="card bg-base-100 w-full shadow-sm">
                <figure class="px-10 pt-10">
                    <img src="jobs.png" alt="Shoes" class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title font-bold">No jobs available</h2>
                    <p>Check back soon for new job opportunities</p>
                </div>
            </div>
            `;
        }
    }

}
maincontainer.addEventListener('click', function (event) {
    const deleteBtn = event.target.closest('.delete-button');
    if (deleteBtn) {
        const card = deleteBtn.closest('.card');
        const companyName = card.querySelector('.companyName').innerText;
        if (card.closest('#all-card')) {
            interviewList = interviewList.filter(item => item.companyName !== companyName);
            rejectedList = rejectedList.filter(item => item.companyName !== companyName);
            card.remove();
        } else {
            if (currentStatus === 'interview-btn') {
                interviewList = interviewList.filter(item => item.companyName !== companyName);
                renderInterviewList();
                if (interviewList.length === 0) {
                    filterSection.innerHTML = `
                        <div class="card bg-base-100 w-full shadow-sm">
                        <figure class="px-10 pt-10">
                            <img src="jobs.png" alt="Shoes" class="rounded-xl" />
                        </figure>
                        <div class="card-body items-center text-center">
                            <h2 class="card-title font-bold">No jobs available</h2>
                            <p>Check back soon for new job opportunities</p>
                        </div>
                    </div>`;
                }
            } else if (currentStatus === 'rejected-btn') {
                rejectedList = rejectedList.filter(item => item.companyName !== companyName);
                renderRejectedList();
                if (rejectedList.length === 0) {
                    filterSection.innerHTML = `
                        <div class="card bg-base-100 w-full shadow-sm">
                        <figure class="px-10 pt-10">
                            <img src="jobs.png" alt="Shoes" class="rounded-xl" />
                        </figure>
                        <div class="card-body items-center text-center">
                            <h2 class="card-title font-bold">No jobs available</h2>
                            <p>Check back soon for new job opportunities</p>
                        </div>
                    </div>`;
                }
            }
        }
        updatecounts();
        return;
    }
    if (event.target.classList.contains('inter-btn')) {
        const parentNode = event.target.parentNode.parentNode;
        const companyName = parentNode.querySelector('.companyName').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const location = parentNode.querySelector('.location').innerText;
        const type = parentNode.querySelector('.type').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const status = parentNode.querySelector('.description').innerText;
        const note = parentNode.querySelector('.note').innerText;
        const cardInfo = {
            companyName,
            position,
            location,
            type,
            salary,
            status: 'Interview',
            note
        }
        const companyExists = interviewList.find(item => item.companyName == cardInfo.companyName);
        parentNode.querySelector('.description').outerHTML = getStatusBadge('Interview');
        if (!companyExists) {
            interviewList.push(cardInfo);
        }
        rejectedList = rejectedList.filter(item => item.companyName !== cardInfo.companyName);
        updatecounts();
        if (currentStatus == 'rejected-btn') {
            renderRejectedList();
            if (rejectedList.length == 0) {
                filterSection.innerHTML = `
                    <div class="card bg-base-100 w-full shadow-sm">
                    <figure class="px-10 pt-10">
                        <img src="jobs.png" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title font-bold">No jobs available</h2>
                        <p>Check back soon for new job opportunities</p>
                    </div>
                </div>
                `;
            }

        }

    }
    else if (event.target.classList.contains('reject-btn')) {
        const parentNode = event.target.parentNode.parentNode;
        const companyName = parentNode.querySelector('.companyName').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const location = parentNode.querySelector('.location').innerText;
        const type = parentNode.querySelector('.type').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const status = parentNode.querySelector('.description').innerText;
        const note = parentNode.querySelector('.note').innerText;

        const cardInfo = {
            companyName,
            position,
            location,
            type,
            salary,
            status: 'Rejected',
            note
        }
        const companyExists = rejectedList.find(item => item.companyName == cardInfo.companyName);
        parentNode.querySelector('.description').outerHTML = getStatusBadge('Rejected');
        if (!companyExists) {
            rejectedList.push(cardInfo);
        }
        interviewList = interviewList.filter(item => item.companyName !== cardInfo.companyName);
        updatecounts();
        if (currentStatus == 'interview-btn') {
            renderInterviewList();
            if (interviewList.length == 0) {
                filterSection.innerHTML = `
                    <div class="card bg-base-100 w-full shadow-sm">
                    <figure class="px-10 pt-10">
                        <img src="jobs.png" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title font-bold">No jobs available</h2>
                        <p>Check back soon for new job opportunities</p>
                    </div>
                </div>
                `;
            }
        }
    }

});
const filterSection = document.getElementById("filtered-section");
function renderInterviewList() {
    filterSection.innerHTML = '';
    for (let inter of interviewList) {
        let div = document.createElement("div");
        div.className = "card bg-base-100 card-md shadow-sm w-full mb-5";
        div.innerHTML = `
            <div class="card-body">
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="companyName card-title">${inter.companyName}</h2>
                        <p class="position opacity-80">${inter.position}</p>
                    </div>
                    <div
                        class="delete-button border border-neutral-content rounded-full p-2 opacity-80 cursor-pointer hover:text-red-600">
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                </div>
                <br>
                <p class="opacity-80"><span class="location">${inter.location}</span> • <span class="type">${inter.type}</span> •
                    <span class="salary">${inter.salary}</span>
                </p>
                <br>
                <div>
                    ${getStatusBadge(inter.status)}
                </div>
                <p class="note">${inter.note}</p>
                <div class="flex gap-2 mt-4">
                        <button class="inter-btn btn btn-outline btn-success border-2 font-semibold">Interview</button>
                        <button class="reject-btn btn btn-outline btn-error border-2 font-semibold">Rejected</button>
                    </div>
            </div>
            
        `;
        filterSection.appendChild(div);
    }
}
function renderRejectedList() {
    filterSection.innerHTML = '';
    for (let rejec of rejectedList) {
        let div = document.createElement("div");
        div.className = "card bg-base-100 card-md shadow-sm w-full mb-5";
        div.innerHTML = `
            <div class="card-body">
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="companyName card-title">${rejec.companyName}</h2>
                        <p class="position opacity-80">${rejec.position}</p>
                    </div>
                    <div
                        class="delete-button border border-neutral-content rounded-full p-2 opacity-80 cursor-pointer hover:text-red-600">
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                </div>
                <br>
                <p class="opacity-80"><span class="location">${rejec.location}</span> • <span class="type">${rejec.type}</span> •
                    <span class="salary">${rejec.salary}</span>
                </p>
                <br>
                <div>
                    ${getStatusBadge(rejec.status)}
                </div>
                <p class="note">${rejec.note}</p>
                <div class="flex gap-2 mt-4">
                        <button class="inter-btn btn btn-outline btn-success border-2 font-semibold">Interview</button>
                        <button class="reject-btn btn btn-outline btn-error border-2 font-semibold">Rejected</button>
                    </div>
            </div>
            
        `;
        filterSection.appendChild(div);
    }
}