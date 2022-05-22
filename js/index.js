let page = 1;
function init() {
    loadDatabase();
    createForm();

    const back = document.querySelector('button#back');
    const forward = document.querySelector('button#forward');

    back.addEventListener('click', () => {
        if(page === 1) {
            window.alert('There are no more monsters before this!');
        } else {
            page = page - 1;
            loadDatabase();
        }
    });

    forward.addEventListener('click', () => {
        page = page + 1;
        loadDatabase();
    });
};
document.addEventListener("DOMContentLoaded", init);

function createForm() {
    const div = document.querySelector('div#create-monster');
    const form = document.createElement('form');
    const nameInput = document.createElement('input');
    const ageInput = document.createElement('input');
    const descriptionInput = document.createElement('input');
    const createButton = document.createElement('button');

    nameInput.placeholder = 'name...';
    ageInput.placeholder = 'age...';
    descriptionInput.placeholder = 'description...';
    createButton.innerText = 'Create';
    createButton.type = "submit";

    form.append(nameInput, ageInput, descriptionInput, createButton);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/monsters', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"   
            },
            body: JSON.stringify({
                name: nameInput.value, 
                age: ageInput.value, 
                description: descriptionInput.value
            })
        })
        .then((res) => res.json())
        .then((data) => {
            const monsterList = document.querySelector('div#monster-container');
            const div = document.createElement('div');
            const p = document.createElement('p');
            const h2 = document.createElement('h2');
            const h4 = document.createElement('h4');
            h2.innerText = `${data.name}`
            h4.innerText = `Age: ${data.age}`
            p.innerText = `Bio: ${data.description}`;

            div.append(h2, h4, p);
            monsterList.appendChild(div);
        })
    });
    div.append(form);
};

function loadDatabase() {
    // Clear monster container
    const monsterList = document.querySelector('div#monster-container');
    monsterList.innerHTML = '';

    // Load the list of monsters
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .catch((error) => console.log(error))
    .then((res) => res.json())
    .then((data) => {
        data.forEach(d => {
            const div = document.createElement('div');
            const p = document.createElement('p');
            const h2 = document.createElement('h2');
            const h4 = document.createElement('h4');
            h2.innerText = `${d.name}`
            h4.innerText = `Age: ${d.age}`
            p.innerText = `Bio: ${d.description}`;

            div.append(h2, h4, p);
            monsterList.appendChild(div);
        });
    });
};