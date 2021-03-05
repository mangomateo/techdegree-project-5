const gallery = document.querySelector('#gallery');


/**
 * Fetch random user data from API
 **/
async function getEmployeeData(url) {
    const employees = await fetch(url);
    const employeesJSON = await employees.json();
    console.log(employeesJSON.results);

    generateEmployeeCards(employeesJSON.results);
    displayModalConstants();
    document.querySelector('.modal-container').style.display = 'none';
    
}

getEmployeeData('https://randomuser.me/api/?results=12&nat=ca');



/**
 * Generate HTML for employee cards and append to DOM
 **/
const generateEmployeeCards = data => {
    let employeeCardHTML = '';
    
    for (let i = 0; i < data.length; i++) {
        employeeCardHTML += `
        <div class="card" data-index=${[i]}>
            <div class="card-img-container">
                <img class="card-img" src="${ data[i].picture.large }" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${ data[i].name.first } ${ data[i].name.last }</h3>
                <p class="card-text">${ data[i].email }</p>
                <p class="card-text cap">${ data[i].location.city }, ${ data[i].location.state }</p>
            </div>
        </div>`;
    }
    
    gallery.insertAdjacentHTML('beforeend', employeeCardHTML);
}



/**
 * Generate HTML for modal constants to display more employee info
 * Add event listeners to show/hide modal on click
 **/
 const displayModalConstants = () => {
     let modalHTML = `
     <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
            <!-- INFO GOES HERE -->
            </div>
        </div>
    </div>`;

    gallery.insertAdjacentHTML('afterend', modalHTML);

    const modal = document.querySelector('.modal-container');
    const closeBtn = document.querySelector('#modal-close-btn');

    gallery.addEventListener('click', e => {
        e.target.className.includes('card') ?
            modal.style.display = 'block' :
            modal.style.display = 'none';
    });

    closeBtn.addEventListener('click', e => {
        e.target.tagName === 'BUTTON' || e.target.tagName == 'STRONG' ?
        modal.style.display = 'none' :
        modal.style.display = 'block';
    });
 }

 



