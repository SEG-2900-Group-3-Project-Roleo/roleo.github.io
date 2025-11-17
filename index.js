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

window.addEventListener('load', () => {
  const startTime = sessionStorage.getItem('gradientStartTime');
  const currentTime = Date.now();
  
  if (startTime) {
    const elapsed = (currentTime - parseInt(startTime)) / 1000;
    const animationDuration = 60; // 60 seconds
    const offset = elapsed % animationDuration;
    
    document.body.style.setProperty('--animation-offset', `-${offset}s`);
  } else {
    // First load, set start time
    sessionStorage.setItem('gradientStartTime', currentTime.toString());
  }
});

window.addEventListener('beforeunload', () => {
  const startTime = sessionStorage.getItem('gradientStartTime');
  if (!startTime) {
    sessionStorage.setItem('gradientStartTime', Date.now().toString());
  }
});
