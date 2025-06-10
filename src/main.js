import { 
    fetchContacts, 
    displayContacts, 
    createContact,
    initializeContactModal 
} from './modules/contacts/index.js';
import { initializeFilters } from './filters.js';
import { initializeSearch } from './search.js';
import { preloadImages } from './utils/assets.js';

function checkAuth() {
    const authToken = localStorage.getItem('auth_token');
    const currentPath = window.location.pathname;
    
    if (!authToken && currentPath !== '/login.html') {
        window.location.href = '/login.html';
        return false;
    }
    
    if (authToken && currentPath === '/login.html') {
        window.location.href = '/';
        return false;
    }
    
    return true;
}

function initializeLogout() {
    const logoutBtn = document.querySelector('#logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('auth_token');
            window.location.href = '/login.html';
        });
    }
}

async function initializeApp() {
    try {
        // Vérifier l'authentification avant tout
        if (!checkAuth()) return;

        // Précharger les images
        await preloadImages();
        
        // Initialiser l'interface principale uniquement si on est sur la page d'accueil
        if (window.location.pathname === '/') {
            const contacts = await fetchContacts();
            await displayContacts(contacts);
            initializeSearch(contacts, displayContacts);
            initializeFilters(contacts, displayContacts);
            initializeContactModal(fetchContacts, displayContacts, createContact);
            initializeLogout();
        }
    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
    }
}

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', initializeApp);