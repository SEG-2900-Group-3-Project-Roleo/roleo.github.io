window.addEventListener('load', () => {
    const logo = document.querySelector('.logo');
    const branches = document.querySelectorAll('.branch');
    
    logo.style.opacity = '0';
    logo.style.transform = 'scaleX(1.0) translateY(-50px)';
    
    setTimeout(() => {
        logo.style.transition = 'all 1.5s ease-out';
        logo.style.opacity = '1';
        logo.style.transform = 'scaleX(1.0) translateY(0)';
    }, 100);
    
    setTimeout(() => {
        branches.forEach((branch, index) => {
            setTimeout(() => {
                const line = branch.querySelector('.branch-line');
                const button = branch.querySelector('.branch-button');
                
                // Animate line
                line.classList.add('animate');
                
                setTimeout(() => {
                    button.classList.add('animate');
                }, 1000);
                
            }, index * 300); 
        });
    }, 1600); 
});


window.addEventListener('load', () => {
  const startTime = sessionStorage.getItem('gradientStartTime');
  const currentTime = Date.now();
  
  if (startTime) {
    const elapsed = (currentTime - parseInt(startTime)) / 1000;
    const animationDuration = 60;
    const offset = elapsed % animationDuration;
    
    document.body.style.setProperty('--animation-offset', `-${offset}s`);
  } else {
    sessionStorage.setItem('gradientStartTime', currentTime.toString());
  }
});

window.addEventListener('beforeunload', () => {
  const startTime = sessionStorage.getItem('gradientStartTime');
  if (!startTime) {
    sessionStorage.setItem('gradientStartTime', Date.now().toString());
  }
});
