/**
 * Particle Animation Fix
 * This ensures particles are created and animated properly
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get or create particles container
    let particlesContainer = document.getElementById('particles-js');
    
    // If it doesn't exist, create it
    if (!particlesContainer) {
        particlesContainer = document.createElement('div');
        particlesContainer.id = 'particles-js';
        document.body.insertBefore(particlesContainer, document.body.firstChild);
    }
    
    // Make sure the container has the right styles
    const particleStyles = document.createElement('style');
    particleStyles.textContent = `
        #particles-js {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            pointer-events: none;
            overflow: hidden;
        }
        
        .particle {
            position: absolute;
            border-radius: 50%;
            transition: none;
            will-change: transform, opacity;
            pointer-events: none;
            box-shadow: 0 0 10px rgba(79, 209, 197, 0.5);
        }
    `;
    document.head.appendChild(particleStyles);
    
    // Clear any existing particles
    particlesContainer.innerHTML = '';
    
    // Particle settings
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    const particleColors = [
        'rgba(79, 209, 197, 0.7)',  // Teal
        'rgba(104, 211, 145, 0.7)',  // Green
        'rgba(251, 191, 36, 0.6)',   // Amber
        'rgba(96, 165, 250, 0.6)',   // Blue
        'rgba(167, 139, 250, 0.5)'   // Purple
    ];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, particleColors);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Remove all particles
        particlesContainer.innerHTML = '';
        
        // Create new particles appropriate for the new window size
        const newParticleCount = window.innerWidth < 768 ? 40 : 80;
        for (let i = 0; i < newParticleCount; i++) {
            createParticle(particlesContainer, particleColors);
        }
    });
});

// Function to create a single particle
function createParticle(container, colors) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 1px and 10px
    const size = 1 + Math.random() * 9;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.left = `${Math.random() * 100}%`;
    
    // Random opacity
    particle.style.opacity = 0.1 + Math.random() * 0.5;
    
    // Random color
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.backgroundColor = color;
    
    // Add to container
    container.appendChild(particle);
    
    // Animate the particle
    animateParticle(particle, size);
}

// Animate a single particle
function animateParticle(particle, size) {
    // Movement range inversely proportional to size
    const movementRange = 70 * (1 - size/12);
    const xMove = -movementRange/2 + Math.random() * movementRange;
    const yMove = -movementRange/2 + Math.random() * movementRange;
    
    // Duration proportional to size (larger particles move slower)
    const duration = 15 + size * 3;
    
    // Initial position
    const startTop = parseFloat(particle.style.top);
    const startLeft = parseFloat(particle.style.left);
    
    // Animation start time
    const startTime = Date.now();
    
    // Animation function
    function move() {
        const elapsed = (Date.now() - startTime) / 1000; // seconds
        const progress = (elapsed % duration) / duration;
        
        // Calculate new position using sine wave pattern
        const xOffset = Math.sin(progress * Math.PI * 2) * xMove;
        const yOffset = Math.sin(progress * Math.PI * 2 + Math.PI/2) * yMove;
        
        // Apply transform instead of changing top/left for better performance
        particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        
        // Continue animation
        requestAnimationFrame(move);
    }
    
    // Start animation
    requestAnimationFrame(move);
}