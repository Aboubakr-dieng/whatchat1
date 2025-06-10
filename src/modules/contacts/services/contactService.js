const API_URL = 'https://whatchat-xbg2.onrender.com';

export async function fetchContacts() {
    try {
        const response = await fetch(`${API_URL}/contacts`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erreur lors du chargement des contacts:', error);
        return [];
    }
}

export async function createContact(contactData) {
    try {
        const response = await fetch(`${API_URL}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la création du contact');
        }

        return await response.json();
    } catch (error) {
        console.error('Erreur:', error);
        return null;
    }
}