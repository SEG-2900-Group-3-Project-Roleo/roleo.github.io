window.addEventListener('load', () => {
    const logo = document.querySelector('.logo');
    logo.style.opacity = '0';
    logo.style.transform = 'scaleX(1.0) translateY(-50px)';
    
    setTimeout(() => {
        logo.style.transition = 'all 1.5s ease-out';
        logo.style.opacity = '1';
        logo.style.transform = 'scaleX(1.0) translateY(0)';
    }, 100);
});
