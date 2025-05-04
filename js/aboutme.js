document.addEventListener('DOMContentLoaded', function () {
    const moonElement = document.getElementById('moon');
    const embeddedSite = document.getElementById('embedded-site');
    const starChart = document.querySelector('.star-chart');
    const abouttext = document.querySelector('.about-text');

    // Store original position and styles
    const originalStyles = {
        position: starChart.style.position,
        top: starChart.style.top,
        left: starChart.style.left,
        transform: starChart.style.transform,

        position: abouttext.style.position,
        top: abouttext.style.top,
        left: abouttext.style.left,
        transform: abouttext.style.transform
    };

    // Function to show embedded site
    function showEmbeddedSite() {
        embeddedSite.style.display = 'block';

        // Move star chart to center left
        starChart.style.position = 'absolute';
        starChart.style.top = '50%';
        starChart.style.left = '25%';
        starChart.style.transform = 'translate(-50%, -50%)';
        starChart.style.transition = 'all 0.5s ease';

        // Only move about-text if it exists
        if (abouttext) {
            // Save current position only if not already saved
            if (!originalStyles.aboutTextSaved) {
                originalStyles.aboutTextPosition = abouttext.style.position || '';
                originalStyles.aboutTextTop = abouttext.style.top || '';
                originalStyles.aboutTextLeft = abouttext.style.left || '';
                originalStyles.aboutTextTransform = abouttext.style.transform || '';
                originalStyles.aboutTextSaved = true;
            }

            // Move about-text to the left
            abouttext.style.position = 'absolute';
            abouttext.style.top = '20%';
            abouttext.style.left = '25%';
            abouttext.style.transform = 'translateX(-50%)';
            abouttext.style.transition = 'all 0.5s ease';
        }
    }

    // Function to hide embedded site
    function hideEmbeddedSite() {
        embeddedSite.style.display = 'none';

        // Reset star chart to original position
        starChart.style.position = originalStyles.position;
        starChart.style.top = originalStyles.top;
        starChart.style.left = originalStyles.left;
        starChart.style.transform = originalStyles.transform;

        // Reset about-text only if it exists
        if (abouttext && originalStyles.aboutTextSaved) {
            abouttext.style.position = originalStyles.aboutTextPosition;
            abouttext.style.top = originalStyles.aboutTextTop;
            abouttext.style.left = originalStyles.aboutTextLeft;
            abouttext.style.transform = originalStyles.aboutTextTransform;
        }
    }

    moonElement.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent click from bubbling to document
        if (embeddedSite.style.display === 'none') {
            showEmbeddedSite();
        }
    });

    // Hide embedded site when clicking anywhere else on the document
    document.addEventListener('click', function (event) {
        if (embeddedSite.style.display !== 'none' &&
            !moonElement.contains(event.target) &&
            !embeddedSite.contains(event.target)) {
            hideEmbeddedSite();
        }
    });

    // Make moon element appear clickable
    moonElement.style.cursor = 'pointer';
});