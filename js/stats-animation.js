/**
 * Smooth Stats Counter Animation Fix
 * This provides smoother counter animations for the stats section
 */

document.addEventListener('DOMContentLoaded', function() {
    // Fix for stats counter animation
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            // Skip if already animated
            if (stat.hasAttribute('data-animated')) return;
            stat.setAttribute('data-animated', 'true');
            
            const targetNum = parseFloat(stat.getAttribute('data-count'));
            const decimalPlaces = String(targetNum).includes('.') ? 1 : 0;
            
            // Animation using requestAnimationFrame for smoothness
            const duration = 2000;
            const startTime = performance.now();
            
            function updateNumber(currentTime) {
                // Calculate elapsed time
                const elapsedTime = currentTime - startTime;
                
                if (elapsedTime >= duration) {
                    // Animation complete
                    stat.textContent = targetNum.toFixed(decimalPlaces);
                    return;
                }
                
                // Smooth easing function
                const progress = elapsedTime / duration;
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                
                // Calculate current value
                const currentValue = targetNum * easedProgress;
                
                // Update the element
                stat.textContent = currentValue.toFixed(decimalPlaces);
                
                // Continue animation
                requestAnimationFrame(updateNumber);
            }
            
            // Start animation
            requestAnimationFrame(updateNumber);
        });
    }
    
    // Run animation when scrolled into view
    function checkAndAnimateStats() {
        const statsSection = document.querySelector('.stats-grid');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        const isVisible = (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
        
        if (isVisible) {
            animateStats();
            // Remove scroll listener after animation starts
            window.removeEventListener('scroll', checkAndAnimateStats);
        }
    }
    
    // Check on scroll and initial load
    window.addEventListener('scroll', checkAndAnimateStats);
    
    // Also check after a slight delay to handle page loads that start in the middle
    setTimeout(checkAndAnimateStats, 500);
});