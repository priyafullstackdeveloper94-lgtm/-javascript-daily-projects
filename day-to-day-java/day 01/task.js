let inputElement = document.getElementById('inputElement');
let team = document.getElementById('team');
let assignTask = document.getElementById('assignTask');
let sectionassign = document.getElementById('sectionassign');
let subcontainerTwo = document.getElementById('subcontainerTwo');


let assignActivity = document.getElementById('assignActivity');
let teamAlist = document.getElementById('teamAlist');
let teamBlist = document.getElementById('teamBlist');
let teamClist = document.getElementById('teamClist');
let teamDlist = document.getElementById('teamDlist');

assignActivity.classList.add("active");
sectionassign.classList.remove("section");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const menuItems = [
    assignActivity,
    teamAlist,
    teamBlist,
    teamClist,
    teamDlist
];

function removeActive() {
    menuItems.forEach(item => {
        item.classList.remove("active");
    });
}

const teams = [{
        team: "teamA",
        heading: "Team A Task Overview"
    },
    {
        team: "teamB",
        heading: "Team B Task Overview"
    },
    {
        team: "teamC",
        heading: "Team C Task Overview"
    },
    {
        team: "teamD",
        heading: "Team D Task Overview"
    }
];

const sections = {};

teams.forEach(team => {
    const section = document.createElement('div');
    section.classList.add("team-list");

    const headingElement = document.createElement('h2');
    headingElement.classList.add("subtwo-heading");
    headingElement.textContent = team.heading;

    const hr = document.createElement('hr');

    const ulElement = document.createElement('ul');
    ulElement.classList.add("subtwo-ul");

    const removeBtn = document.createElement('button');
    removeBtn.classList.add("assign-btn");
    removeBtn.textContent = "Remove Task";

    removeBtn.addEventListener("click", function() {

        const checkedBoxes =
            ulElement.querySelectorAll('input[type="checkbox"]:checked');

        checkedBoxes.forEach(checkbox => {
            checkbox.parentElement.remove();
        });

    });

    section.append(headingElement, hr, ulElement, removeBtn);

    subcontainerTwo.appendChild(section);

    sections[team.team] = {
        section,
        ulElement
    };
});


const allSections = [
    sectionassign,
    ...Object.values(sections).map(item => item.section)
];

function hideAllSections() {
    allSections.forEach(section => {
        section.classList.add("section");
    });
}

assignActivity.addEventListener("click", function() {
    hideAllSections();
    sectionassign.classList.remove("section");

    removeActive();
    assignActivity.classList.add("active");
});

teamAlist.addEventListener("click", function() {
    hideAllSections();
    sections.teamA.section.classList.remove("section");

    removeActive();
    teamAlist.classList.add("active");
});

teamBlist.addEventListener("click", function() {
    hideAllSections();
    sections.teamB.section.classList.remove("section");

    removeActive();
    teamBlist.classList.add("active");
});

teamClist.addEventListener("click", function() {
    hideAllSections();
    sections.teamC.section.classList.remove("section");

    removeActive();
    teamClist.classList.add("active");
});

teamDlist.addEventListener("click", function() {
    hideAllSections();
    sections.teamD.section.classList.remove("section");

    removeActive();
    teamDlist.classList.add("active");
});

assignTask.addEventListener("click", function() {
    const teamValue = team.value;
    const taskValue = inputElement.value.trim();

    if (teamValue === "") {
        alert("Please select a team");
        return;
    }

    if (taskValue === "") {
        alert("Please enter a task");
        return;
    }

    const task = {
        id: Date.now(),
        team: teamValue,
        activity: taskValue,
        completed: false
    };

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    const ulElement = sections[teamValue].ulElement;
    const listElement = document.createElement('li');
    listElement.classList.add("subtwo-li");
    let checkboxElement = document.createElement('input');
    const listcheckbox = `task-${Date.now()}`;
    checkboxElement.type = "checkbox";
    checkboxElement.id = listcheckbox;
    let labelElement = document.createElement('label');
    labelElement.htmlFor = listcheckbox;
    labelElement.textContent = task.activity;
    listElement.appendChild(checkboxElement);
    listElement.appendChild(labelElement);
    ulElement.appendChild(listElement);

    inputElement.value = "";
});

const savedTasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

console.log(savedTasks);
