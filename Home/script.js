document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.slides');
    const images = document.querySelectorAll('.slides picture');
    let currentIndex = 0;
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        slides.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    setInterval(nextSlide, 10
        000);
});