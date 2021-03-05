const gallery = document.querySelector('#gallery');


/**
 * Fetch random user data from API
 **/
async function getEmployeeData(url) {
    const employees = await fetch(url);
    const employeesJSON = await employees.json();
    console.log(employeesJSON.results);

    generateEmployeeCards(employeesJSON.results);
    displayModal(employeesJSON.results);
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
 * Generate HTML for modal to display more employee info
 **/
 const displayModal = data => {
     let modalHTML = `
     <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                <h3 id="name" class="modal-name cap">name</h3>
                <p class="modal-text">email</p>
                <p class="modal-text cap">city</p>
                <hr>
                <p class="modal-text">(555) 555-5555</p>
                <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
                <p class="modal-text">Birthday: 10/21/2015</p>
            </div>
        </div>
    </div>`;

    gallery.insertAdjacentHTML('afterend', modalHTML);
    console.log(data);
 }

 
