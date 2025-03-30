document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.order__form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('fullName').value;
        const message = document.getElementById('apartmentNumber').value;
        
        // Créer le lien mailto avec les informations du formulaire
        const mailtoLink = `mailto:minitel@etu.emse.fr?subject=Message de ${name}&body=${encodeURIComponent(message)}`;
        
        // Ouvrir le client mail par défaut
        window.location.href = mailtoLink;
        
        // Réinitialiser le formulaire
        form.reset();
    });
}); 