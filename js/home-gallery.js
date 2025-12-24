// Home page interactive gallery with tag-based filtering

document.addEventListener('DOMContentLoaded', function () {
    const starsContainer = document.querySelector('.stars-container');
    const projectsGallery = document.getElementById('projectsGallery');
    const projectsGrid = document.getElementById('projectsGrid');
    const galleryTitle = document.getElementById('galleryTitle');
    const backButton = document.getElementById('backButton');
    const projectDetail = document.getElementById('projectDetail');
    const closeDetail = document.getElementById('closeDetail');

    // Get all projects from gallery-timeline.js
    const allProjects = window.projectData;

    // Handle category star clicks - redirect to work page with filter
    document.querySelectorAll('.star[data-category]').forEach(star => {
        star.style.cursor = 'pointer';

        star.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            // Redirect to work page with category parameter
            window.location.href = `work.html?filter=${category}`;
        });
    });

    // Show projects for selected category
    function showCategory(category) {
        const projects = allProjects[category] || [];

        // Update title
        const categoryNames = {
            'performance': 'performance',
            'media': 'media',
            'newmedia': 'new media',
            'design': 'design'
        };
        galleryTitle.textContent = categoryNames[category];

        // Hide stars, show gallery
        starsContainer.style.display = 'none';
        projectsGallery.style.display = 'block';

        // Clear and populate grid
        projectsGrid.innerHTML = '';

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.setAttribute('data-id', project.id);

            card.innerHTML = `
                <div class="card-image">
                    <img src="${project.thumbnail}" alt="${project.title}">
                </div>
                <div class="card-info">
                    <h3>${project.title}</h3>
                    <p class="card-date">${project.date}</p>
                </div>
            `;

            card.addEventListener('click', () => showProjectDetail(project));
            projectsGrid.appendChild(card);
        });
    }

    // Show individual project detail
    function showProjectDetail(project) {
        projectDetail.querySelector('.detail-title').textContent = project.title;
        projectDetail.querySelector('.detail-date').textContent = project.date;
        projectDetail.querySelector('.detail-description').innerHTML = project.description;

        // Add media
        const mediaContainer = projectDetail.querySelector('.detail-media');
        mediaContainer.innerHTML = '';

        if (project.mediaType && project.mediaId) {
            let mediaHTML = '';
            switch (project.mediaType) {
                case 'youtube':
                    mediaHTML = `<iframe width="100%" height="400" src="https://www.youtube.com/embed/${project.mediaId}" frameborder="0" allowfullscreen></iframe>`;
                    break;
                case 'vimeo':
                    mediaHTML = `<iframe src="https://player.vimeo.com/video/${project.mediaId}" width="100%" height="400" frameborder="0" allowfullscreen></iframe>`;
                    break;
                case 'image':
                    mediaHTML = `<img src="${project.mediaId}" alt="${project.title}">`;
                    break;
            }
            mediaContainer.innerHTML = mediaHTML;
        }

        // Add additional images
        if (project.additionalImages) {
            project.additionalImages.forEach(img => {
                mediaContainer.innerHTML += `<img src="${img}" alt="${project.title}" style="margin-top: 1rem;">`;
            });
        }

        projectDetail.classList.add('open');
    }

    // Back button - return to stars
    backButton.addEventListener('click', () => {
        projectsGallery.style.display = 'none';
        starsContainer.style.display = 'block';
        projectsGrid.innerHTML = '';
    });

    // Close detail panel
    closeDetail.addEventListener('click', () => {
        projectDetail.classList.remove('open');
    });

    // Close detail when clicking outside
    projectDetail.addEventListener('click', (e) => {
        if (e.target === projectDetail) {
            projectDetail.classList.remove('open');
        }
    });
});
