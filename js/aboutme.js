document.addEventListener('DOMContentLoaded', function () {
    const moonElement = document.getElementById('moon');
    const sunElement = document.getElementById('sun');
    const risingElement = document.getElementById('rising');

    const embeddedSite = document.getElementById('embedded-site');
    const sunContent = document.getElementById('sun-content');
    const risingContent = document.getElementById('rising-content');

    const starChart = document.querySelector('.star-chart');
    const aboutText = document.querySelector('.about-text');

    // Initial setup - hide all content sections
    embeddedSite.style.display = 'none';
    sunContent.style.display = 'none';
    risingContent.style.display = 'none';

    // Function to hide all content sections
    function hideAllContent() {
        embeddedSite.style.display = 'none';
        sunContent.style.display = 'none';
        risingContent.style.display = 'none';

        const isMobile = window.innerWidth <= 768;

        // Reset transitions
        starChart.style.transition = '';
        aboutText.style.transition = '';

        // Reset positioning styles appropriately
        if (isMobile) {
            starChart.style.left = '50%';
            starChart.style.position = 'absolute';

            aboutText.style.left = '50%';
            aboutText.style.position = 'absolute';
            aboutText.style.opacity = '1';
        } else {
            starChart.style.left = '50%';
            starChart.style.position = 'absolute';

            aboutText.style.left = '30%';
            aboutText.style.position = 'absolute';
            aboutText.style.opacity = '1';
        }
    }

    // Function to toggle specific content
    function toggleContent(contentElement) {
        const isMobile = window.innerWidth <= 768;
        const isShowing = contentElement.style.display !== 'none';

        // Hide all first
        hideAllContent();

        if (!isShowing) {
            contentElement.style.display = 'block';

            if (!isMobile) {
                // Apply transitions for desktop only
                starChart.style.transition = 'all 0.5s ease';
                aboutText.style.transition = 'all 0.5s ease';

                // Move elements to the side
                starChart.style.left = '25%';
                aboutText.style.left = '5%';
            }
        }
    }

    // Toggle moon content on moon click
    moonElement.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleContent(embeddedSite);
    });

    // Toggle sun content on sun click
    sunElement.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleContent(sunContent);
    });

    // Toggle rising content on rising click
    risingElement.addEventListener('click', function (event) {
        event.stopPropagation();
        toggleContent(risingContent);
    });

    // Hide all content when clicking elsewhere
    document.addEventListener('click', function (event) {
        if ((embeddedSite.style.display === 'block' ||
            sunContent.style.display === 'block' ||
            risingContent.style.display === 'block') &&
            !moonElement.contains(event.target) &&
            !sunElement.contains(event.target) &&
            !risingElement.contains(event.target) &&
            !embeddedSite.contains(event.target) &&
            !sunContent.contains(event.target) &&
            !risingContent.contains(event.target)) {

            hideAllContent();
        }
    });

    // Make all elements appear clickable
    moonElement.style.cursor = 'pointer';
    sunElement.style.cursor = 'pointer';
    risingElement.style.cursor = 'pointer';
});
