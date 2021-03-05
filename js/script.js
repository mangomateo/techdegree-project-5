const gallery = document.querySelector('#gallery');


/**
 * Fetch random user data from API
 **/
async function getEmployeeData(url) {
    const employees = await fetch(url);
    const employeesJSON = await employees.json();

    console.log(employeesJSON.results[0]);
    generateEmployeeCards(employeesJSON.results);
    displayModalConstants();
    // document.querySelector('.modal-container').style.display = 'none';
    updateModal(employeesJSON.results[5]);
}

getEmployeeData('https://randomuser.me/api/?results=12&nat=ca');



/**
 * Generate HTML for employee cards and append to DOM
 **/
const generateEmployeeCards = data => {
    let employeeCardHTML = '';
    
    for (let i = 0; i < data.length; i++) {
        employeeCardHTML += `
        <div class="card">
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
 * Generate HTML for modal
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
 }

 

/**
 * Generate HTML for modal to show specific employee info
 **/
const updateModal = employee => {
    let modalInfoHTML = `
        <img class="modal-img" src="${ employee.picture.large }" alt="profile picture">
        <h3 id="name" class="modal-name cap">${ employee.name.first } ${ employee.name.last }</h3>
        <p class="modal-text">${ employee.email }</p>
        <p class="modal-text cap">${ employee.location.city }</p>
        <hr>
        <p class="modal-text">(${ employee.phone.slice(0, 3) }) ${ employee.phone.slice(4, 7) } - ${ employee.phone.slice(8, 12) }</p>
        <p class="modal-text">${ employee.location.street.number } ${ employee.location.street.name }, 
                              ${ employee.location.state } ${ employee.location.postcode }</p>
        <p class="modal-text">Birthday: ${ employee.dob.date.slice(5, 7) }/${ employee.dob.date.slice(8, 10) }/${ employee.dob.date.slice(0, 4) }</p>`;

    const modalInfo = document.querySelector('.modal-info-container');
    modalInfo.insertAdjacentHTML('afterbegin', modalInfoHTML);
}