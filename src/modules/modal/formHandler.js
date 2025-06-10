import { validateContact } from '../../utils/validators.js';
import { showErrors, closeModal } from './modalHandlers.js';

export async function handleSubmit(e, modal, form, createContact, fetchContacts, displayContacts) {
    e.preventDefault();
    
    const photoPreview = document.querySelector('#photoPreview');
    const formData = {
        name: form.querySelector('#contactName').value.trim(),
        phone: form.querySelector('#contactPhone').value.trim(),
        email: form.querySelector('#contactEmail').value.trim(),
        photo: photoPreview.src // Utiliser directement le chemin de l'image
    };
    
    const { isValid, errors } = validateContact(formData);
    
    if (!isValid) {
        showErrors(errors);
        return;
    }
    
    try {
        const newContact = await createContact({
            ...formData,
            id: Date.now(),
            status: "En ligne",
            lastMessage: "",
            timestamp: new Date().toLocaleTimeString(),
            unread: 0
        });

        if (newContact) {
            const updatedContacts = await fetchContacts();
            displayContacts(updatedContacts);
            closeModal(modal, form);
        }
    } catch (error) {
        console.error('Erreur:', error);
        const errorSpan = document.querySelector('#nameError');
        errorSpan.textContent = "Erreur lors de la création du contact";
        errorSpan.classList.remove('hidden');
    }
}