window.addEventListener('load', () => {
    const logo = document.querySelector('.logo');
    const branches = document.querySelectorAll('.branch');
    
    // Animate logo first
    logo.style.opacity = '0';
    logo.style.transform = 'scaleX(1.0) translateY(-50px)';
    
    setTimeout(() => {
        logo.style.transition = 'all 1.5s ease-out';
        logo.style.opacity = '1';
        logo.style.transform = 'scaleX(1.0) translateY(0)';
    }, 100);
    
    // Animate branches after logo animation
    setTimeout(() => {
        branches.forEach((branch, index) => {
            setTimeout(() => {
                const line = branch.querySelector('.branch-line');
                const button = branch.querySelector('.branch-button');
                
                // Animate line
                line.classList.add('animate');
                
                // Animate button after line finishes
                setTimeout(() => {
                    button.classList.add('animate');
                }, 1000);
                
            }, index * 300); // Stagger each branch animation
        });
    }, 1600); // Start after logo animation completes
});
