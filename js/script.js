const gallery = document.querySelector('#gallery');


/**
 * Fetch random user data from API
 **/
async function getEmployeeData(url) {
    const employees = await fetch(url);
    const employeesJSON = await employees.json();
    console.log(employeesJSON);

    generateEmployeeCards(employeesJSON.results);
    
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