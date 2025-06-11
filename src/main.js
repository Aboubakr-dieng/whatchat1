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
    
    if (!authToken && currentPath !== './login.html') {
        window.location.href = './login.html';
        return false;
    }
    
    if (authToken && currentPath === './login.html') {
        window.location.href = './';
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

        const authToken = localStorage.getItem('auth_token');
        if (!authToken) {
            window.location.href = '/login.html';
            return;
        }

        // Précharger les images
        await preloadImages();
        
        // Initialiser l'interface principale uniquement si on est sur la page d'accueil
        if (window.location.pathname === '/') {
            try {
                const contacts = await fetchContacts();
                if (contacts) {
                    await displayContacts(contacts);
                    initializeSearch(contacts, displayContacts);
                    initializeFilters(contacts, displayContacts);
                    initializeContactModal(fetchContacts, displayContacts, createContact);
                    initializeLogout();
                }
            } catch (error) {
                console.error('Erreur lors du chargement des contacts:', error);
                // Afficher un message d'erreur à l'utilisateur
                alert('Erreur lors du chargement des contacts. Veuillez réessayer.');
            }
        }
    } catch (error) {
        console.error('Erreur lors de l\'initialisation:', error);
        // Rediriger vers la page de connexion en cas d'erreur d'authentification
        if (error.message.includes('authentification')) {
            window.location.href = '/login.html';
        }
    }
}

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', initializeApp);