document.addEventListener('DOMContentLoaded', function () {
    const moonElement = document.getElementById('moon');
    const embeddedSite = document.getElementById('embedded-site');
    const starChart = document.querySelector('.star-chart');
    const aboutText = document.querySelector('.about-text');

    // Initial setup
    embeddedSite.style.display = 'none';

    // Simplify by directly toggling a class instead of storing original styles
    function toggleEmbeddedSite() {
        const isShowing = embeddedSite.style.display !== 'none';

        embeddedSite.style.display = isShowing ? 'none' : 'block';

        // Apply styles with transitions
        starChart.style.transition = 'all 0.5s ease';
        aboutText.style.transition = 'all 0.5s ease';

        starChart.style.left = isShowing ? '50%' : '25%';
        aboutText.style.left = isShowing ? '' : '30%';
        aboutText.style.opacity = isShowing ? '0.3' : '1';
    }

    // Toggle on moon click
    moonElement.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleEmbeddedSite();
    });

    // Hide when clicking elsewhere
    document.addEventListener('click', function (event) {
        if (embeddedSite.style.display !== 'none' &&
            !moonElement.contains(event.target) &&
            !embeddedSite.contains(event.target)) {
            toggleEmbeddedSite();
        }
    });
});
