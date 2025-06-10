export function initializeSearch(contacts, displayContacts) {
    const searchInput = document.querySelector('#input1');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredContacts = contacts.filter(contact => 
            contact.name.toLowerCase().includes(searchTerm)
        );
        displayContacts(filteredContacts);
    });
}