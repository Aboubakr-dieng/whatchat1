export function validateContact(formData) {
    const errors = {};
    
    if (!formData.name.trim()) {
        errors.name = "Le nom est requis";
    } else if (formData.name.length < 2) {
        errors.name = "Le nom doit contenir au moins 2 caractères";
    }
    
    if (formData.phone && !isValidPhone(formData.phone)) {
        errors.phone = "Numéro de téléphone invalide";
    }
    
    if (formData.email && !isValidEmail(formData.email)) {
        errors.email = "Email invalide";
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

function isValidPhone(phone) {
    return /^(\+221|221)?[76|77|78|70|75]\d{8}$/.test(phone);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}