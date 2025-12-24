// Randomly rotate stars at different intervals
function randomRotateStarsOneAtATime() {
    const stars = document.querySelectorAll('.star img');
    function rotateRandomStar() {
        // Random delay between 2s and 5s
        const delay = Math.random() * 3000 + 2000;
        setTimeout(() => {
            const star = stars[Math.floor(Math.random() * stars.length)];
            star.style.transition = 'transform 0.6s ease';
            star.style.transform = 'rotate(180deg)';
            // Reset after 1s
            setTimeout(() => {
                star.style.transform = '';
            }, 1000);
            rotateRandomStar();
        }, delay);
    }
    rotateRandomStar();
}

// Start the random rotation after DOM is loaded
if (document.readyState !== 'loading') {
    randomRotateStarsOneAtATime();
} else {
    document.addEventListener('DOMContentLoaded', randomRotateStarsOneAtATime);
}