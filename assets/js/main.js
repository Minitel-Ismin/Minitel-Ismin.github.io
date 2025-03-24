// Sélectionnez toutes les diapositives de votre carrousel
const slides = document.querySelectorAll('.carousel__slide');

let currentSlide = 0;

function nextSlide() {
    // Cachez toutes les diapositives
    slides.forEach(slide => {
        slide.style.display = 'none';
    });
    // Afficher la prochaine diapositive
    slides[currentSlide].style.display = 'block';

    // Incrémentez le compteur de diapositives
    currentSlide++;
    // Si nous avons atteint la fin du carrousel, revenez à la première diapositive
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
}

// Déclencher la fonction nextSlide() toutes les 3 secondes
setInterval(nextSlide, 3000);
