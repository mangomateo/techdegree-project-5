const gallery = document.querySelector('#gallery');
const searchContainer = document.querySelector('.search-container');


/**
 * Fetch random user data from API
 * Create employee cards and modals using fetched data
 **/
async function getEmployeeData(url) {
    const employees = await fetch(url);
    const employeesJSON = await employees.json();

    generateEmployeeCards(employeesJSON.results);
    displayModalConstants();
    document.querySelector('.modal-container').style.display = 'none';
    addClickHandler(gallery.children, employeesJSON.results);

    /**
     * EXCEEDS EXPECTATIONS REQUIREMENT
     * Move from one employee to another in modal view
     * Show/Hide previous and next buttons when appropriate
     **/
    const previousButton = document.querySelector('#modal-prev');
    const nextButton = document.querySelector('#modal-next');

    previousButton.addEventListener('click', () => {
        let modalEmail = document.querySelector('.modal-name').nextElementSibling.textContent;
        let modalEmployeeData = document.querySelector('.modal-info-container');

        for (let i=0; i<gallery.children.length; i++) {
            let cardEmail = gallery.children[i].lastElementChild.firstElementChild.nextElementSibling.textContent;
            let previousEmployeeIndex = 0;
            
            
            if (modalEmail === cardEmail) {
                previousEmployeeIndex = i - 1;
                modalEmployeeData.innerHTML = '';

                if (previousEmployeeIndex >= 0) {
                    updateModal(employeesJSON.results[previousEmployeeIndex]);
                    nextButton.style.display = 'inline-block';
                    previousButton.style.display = 'inline-block';
                } else {
                    updateModal(employeesJSON.results[i]);
                    nextButton.style.display = 'inline-block';
                    previousButton.style.display = 'none';
                }
            } 
        }
    });

    nextButton.addEventListener('click', () => {
        let modalEmail = document.querySelector('.modal-name').nextElementSibling.textContent;
        let modalEmployeeData = document.querySelector('.modal-info-container');

        for (let i=0; i<gallery.children.length; i++) {
            let cardEmail = gallery.children[i].lastElementChild.firstElementChild.nextElementSibling.textContent;
            let nextEmployeeIndex = 0;
        
            if (modalEmail === cardEmail) {
                nextEmployeeIndex = i + 1;
                modalEmployeeData.innerHTML = '';
                
                if (nextEmployeeIndex < gallery.children.length) {
                    updateModal(employeesJSON.results[nextEmployeeIndex]);
                    nextButton.style.display = 'inline-block';
                    previousButton.style.display = 'inline-block';
                } else {
                    updateModal(employeesJSON.results[i]);
                    nextButton.style.display = 'none';
                    previousButton.style.display = 'inline-block';
                } 
            }
        } 
    });
}

getEmployeeData('https://randomuser.me/api/?results=12&nat=ca');


/**
 * EXCEEDS EXPECTATIONS REQUIREMENT
 * Appends search bar to HTML
 **/
 const searchBarHTML = `<form action="#" method="get">
 <input type="search" id="search-input" class="search-input" placeholder="Search...">
 <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
 </form>`;
 
 searchContainer.insertAdjacentHTML('afterbegin', searchBarHTML);


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
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`;

    gallery.insertAdjacentHTML('afterend', modalHTML);

    const modal = document.querySelector('.modal-container');
    const closeBtn = document.querySelector('#modal-close-btn');

    closeBtn.addEventListener('click', e => {
        e.target.tagName === 'BUTTON' || e.target.tagName === 'STRONG' ?
            modal.style.display = 'none' :
            modal.style.display = 'block'
    })


 }

 

/**
 * Generate HTML for modal to show specific employee info
 **/
const updateModal = employee => {
    let modalInfoHTML = `
        <img class="modal-img" src="${ employee.picture.large }" alt="profile picture">
        <h3 id="name" class="modal-name cap">${ employee.name.first } 
                                             ${ employee.name.last }</h3>
        <p class="modal-text">${ employee.email }</p>
        <p class="modal-text cap">${ employee.location.city }</p>
        <hr>
        <p class="modal-text">(${ employee.phone.slice(0, 3) }) 
                               ${ employee.phone.slice(4, 7) } - ${ employee.phone.slice(8, 12) }</p>
        <p class="modal-text">${ employee.location.street.number } ${ employee.location.street.name }, 
                              ${ employee.location.state } ${ employee.location.postcode }</p>
        <p class="modal-text">Birthday: ${ employee.dob.date.slice(5, 7) } /
                                        ${ employee.dob.date.slice(8, 10) } /
                                        ${ employee.dob.date.slice(0, 4) }</p>`;

    const modalInfo = document.querySelector('.modal-info-container');
    modalInfo.insertAdjacentHTML('afterbegin', modalInfoHTML);
}


/**
 * Add click handlers to each employee card
 **/
const addClickHandler = (array, data) => {
    const modal = document.querySelector('.modal-container');
    const modalInfo = document.querySelector('.modal-info-container');
    const previousButton = document.querySelector('#modal-prev');

    for (let i = 0; i < array.length; i++) {
        array[i].addEventListener('click', e => {
            modalInfo.innerHTML = '';
            e.target.className.includes('card') ?
                modal.style.display = 'block' :
                modal.style.display = 'none';
            updateModal(data[i]);
            i == 0 ? previousButton.style.display = 'none' : previousButton.style.display = 'inline-block';
        });
    }
}



/**
 * EXCEEDS EXPECTATIONS REQUIREMENT
 * Search employee directory by first or last name
 **/
const searchBox = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-submit');

searchBox.addEventListener('keyup', () => {
    let searchValue = searchBox.value.toLowerCase();

    for (let i=0; i<gallery.children.length; i++) {
        let fullName = gallery.children[i].lastElementChild.firstElementChild.textContent;
        
        fullName.toLowerCase().includes(searchValue) ?
            gallery.children[i].style.display = 'flex' :
            gallery.children[i].style.display = 'none'; 
    }
});

searchButton.addEventListener('click', () => {
    let searchValue = searchBox.value.toLowerCase();

    for (let i=0; i<gallery.children.length; i++) {
        let fullName = gallery.children[i].lastElementChild.firstElementChild.textContent;
        
        fullName.toLowerCase().includes(searchValue) ?
            gallery.children[i].style.display = 'flex' :
            gallery.children[i].style.display = 'none'; 
    }
});






