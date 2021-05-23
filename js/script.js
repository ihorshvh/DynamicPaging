// determinition of number of items per page.
const ITEMS_PER_PAGE = 10;

// reading contacts from file and parsing the JSON into array of object contacts
// with the following structure {"name":"name","email":"email","avatar":"path_to_image","date":"date_of_join_text"}
const contacts = JSON.parse(data);

// pageItem arrow function to create the pattern of the page button
const pageItem = title => `<li id="pageItem${title}" onclick=handlePageClick(${title})><a>${title}</a></li>`;
// contactItem arrow function to create the pattern of the item in the contact list
const contactItem = contact => `<li class="contact-item cf">
    <div class="contact-details">
        <img class="avatar" src=${contact.src}>
        <h3>${contact.name}</h3>
        <span class="email">${contact.email}</span>
    </div>
    <div class="joined-details">
           <span class="date">${contact.date}</span>
   </div>
</li>`;

// handles the click on the appropriate page button
function handlePageClick(page) {
  showContactsOnPage(contacts, page);
}

// generates page icons and adds it to the html file dynamically
function generatePageIcons(contactsQuantity) {
  const paginationContainer = document.querySelector('.pagination');

  var numberOfPages = getNumberOfPages(contactsQuantity);
  insertPageIconsIntoContainer(paginationContainer, numberOfPages);
}

function insertPageIconsIntoContainer(paginationContainer, numberOfPages) {
  for (i = 1; i <= numberOfPages; i++) {
    paginationContainer.insertAdjacentHTML( `beforeend`, pageItem(i));
  }
}

// returns the number of pages required based on the quantity of contacts
function getNumberOfPages(contactsQuantity) {
    return calculateNumberOfPages(contactsQuantity);
}

function calculateNumberOfPages(contactsQuantity) {
  return Math.ceil(contactsQuantity/ITEMS_PER_PAGE);
}

// shows the contacts on the appropriate page
function showContactsOnPage(contacts, page) {
  const contactsContainer = document.querySelector('.contact-list');

  var range = getRange(page);
  clearContacts(contactsContainer);
  insertContactsIntoContainer(contactsContainer, contacts, range);
}

// determines the range of contacts positions in contacts array to be shown
// on the particular page
function getRange(page) {
  var end = page * ITEMS_PER_PAGE;
  var start = end - ITEMS_PER_PAGE;
  return {"start": start, "end": end};
}

function clearContacts(contactsContainer) {
    contactsContainer.textContent = '';
}

function insertContactsIntoContainer(contactsContainer, contacts, range) {
  for(i = range.start; (i < contacts.length) && (i < range.end); i++) {
    contactsContainer.insertAdjacentHTML( `beforeend`, contactItem(contacts[i]));
  }
}

generatePageIcons(contacts.length);
showContactsOnPage(contacts, 1);
