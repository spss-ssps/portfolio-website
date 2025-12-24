// Work Gallery - Tag-based filtering system

// All projects with their tags
const allProjects = [
    {
        id: "proj-1",
        title: "period god",
        date: "2025",
        month: 3, // March
        role: "co-choreographer",
        tags: ["performance"],
        mediaType: "youtube",
        mediaId: "TYAWdhVXL80",
        thumbnail: "work/periodgod.jpeg",
        description: "Periods are often hidden, silenced, or treated with shame in society.<br><br>Through this project, Period God hopes to confront stigmas around menstruation and the female body in a way they could be seen, heard, and celebrated.<br><br><a href='https://periodgod.cargo.site' target='_blank' style='color: #e6e6e6; text-decoration: underline;'>full project site here</a>"
    },
    {
        id: "proj-2",
        title: "traces",
        date: "2022",
        month: 4, // April
        role: "art direction, video, performance, choreography",
        tags: ["performance", "media"],
        mediaType: "youtube",
        mediaId: "Uvxuum6luEY",
        thumbnail: "work/traces.jpg",
        description: "<strong>art direction and video:</strong><br>Sofia Pace<br><br><strong>music:</strong><br>We've Never Met but Can We Have a Cup of Coffee or Something by In Love with A Ghost<br>Empty Crown by YAS<br><br><strong>performance and choreography by</strong><br>Sofia Pace and Rainy Fan"
    },
    {
        id: "proj-3",
        title: "body as textile",
        date: "2025",
        month: 5, // May
        role: "co-creator",
        tags: ["design", "newmedia"],
        mediaType: "image",
        mediaId: "work/bodyastextile.jpg",
        thumbnail: "work/bodyastextile.jpg",
        description: "This web and installation project explores textile as hypertext extending beyond thread and fabric, weaving information through bodies, spaces, and histories. By expanding ideas on human kinesthetics and exploring the potential for unconventional archival mediums, we can rethink how bodies inhabit space and how textiles both enclose and provide comfort within it—ultimately revealing how even the clothing we wear may serve as carriers of information.<br><br>by Julia Kan and Sofia Pace"
    },
    {
        id: "proj-4",
        title: "la muerte se escribe sola",
        month: 11, // November
        date: "2021",
        role: "video and sound",
        tags: ["media"],
        mediaType: "vimeo",
        mediaId: "536153920",
        thumbnail: "work/varela.gif",
        description: "poem:<br>La muerte se escribe sola by Blanca Varela<br><br>voice:<br>Gisella Díaz<br><br>video and sound:<br>Sofia Pace"
    },
    {
        id: "proj-5",
        title: "anatomic composition",
        date: "2020",
        month: 12, // December
        role: "video/animation",
        tags: ["media", "performance"],
        mediaType: "vimeo",
        mediaId: "705201149",
        thumbnail: "work/anatomic.gif",
        description: "dance video/animation project"
    },
    {
        id: "proj-6",
        title: "corporeal lines",
        date: "2021",
        month: 12, // December
        role: "photographer",
        tags: ["media"],
        mediaType: "image",
        mediaId: "work/photo3.jpg",
        thumbnail: "work/photo3.jpg",
        additionalImages: ["work/photo1.jpg", "work/photo2.jpg", "work/photo4.jpg", "work/photo5.jpg"],
        description: "photographical depictions of moving bodies through light"
    },
    {
        id: "proj-7",
        title: "chromadance",
        date: "2024",
        month: 11, // November
        role: "co-creator",
        tags: ["newmedia", "performance"],
        mediaType: "youtube",
        mediaId: "-lirpl3Cy7I",
        thumbnail: "work/chromadance.jpg",
        description: "An audiovisual experience where individuals are encouraged to connect more deeply with their senses through movement. The abstracted kinetic visual expression of the installation invites inner self into the outer world. Our user experience is one where the dancer is able to feel synchronization between what they see, hear, and feel. Through achieving this mind-body-spirit harmony, users can relax and unplug from the hustle of daily life.<br><br>by Prisha Jain, Niki Hu, and Sofia Pace"
    },
    {
        id: "proj-8",
        title: "fabrication projects",
        date: "2025",
        month: 3, // March
        role: "designer",
        tags: ["design"],
        mediaType: "image",
        mediaId: "work/purse.jpeg",
        thumbnail: "work/purse.jpeg",
        additionalImages: ["work/coaster.jpeg", "work/embox.jpeg", "work/mooncycle.jpeg"],
        description: "For these projects, I wanted to explore cosmic and celestial shapes and forms, with an experimental approach to more popular interpretations of these concepts. I'm particularly drawn to organic flowing shapes and dream-like aesthetics. By framing this as both a focused and open-ended prompt, I aimed to expand my possibilities in terms of materials and fabrication practices.<br><br><a href='https://sofiasfabrication.cargo.site' target='_blank' style='color: #e6e6e6; text-decoration: underline;'>full project site here</a>"
    },
    // {
    //     id: "proj-9",
    //     title: "el tocador de la abuela",
    //     month: 4, // April
    //     date: "2025",
    //     role: "creator and designer",
    //     tags: ["design"],
    //     mediaType: "image",
    //     mediaId: "",
    //     additionalImages: ["work/...jpeg"],
    //     thumbnail: "work/cinestesia1.jpeg",
    //     description: "<i>Touch and rummage. Take and enjoy any of the drinkable/eatable items.</i><br><br>A cabinet designed to recreate the experience of rummaging through a grandmother’s dresser or vanity.This memory is brought to life through tactile, scent, and visual elements.<br><br>Made by found, reused, and altered materials."
    // },
    {
        id: "proj-10",
        title: "cinestesia",
        month: 11, // November
        date: "2025",
        role: "creator and performer",
        tags: ["performance", "newmedia"],
        mediaType: "youtube",
        mediaId: "dmbsXpf5ZgM",
        thumbnail: "work/cinestesia.jpg",
        description: "How do rhythmic practices take shape within the body? Made with with conductive materials, this wearable instrument explores, abstracts, and re-manifests the human body through ‘kineticized’ textiles and percussive rhythms."
    }
];

document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('projectsGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Check URL for filter parameter
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilter = urlParams.get('filter');
    let currentFilter = urlFilter || 'all';

    // Set initial active button based on URL or default to 'all'
    filterBtns.forEach(btn => {
        if (btn.getAttribute('data-category') === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Render projects based on filter
    function renderProjects(filter) {
        // Only create cards once on initial load
        if (grid.children.length === 0) {
            // Sort by year (newest first), then by month (if present)
            const sortedProjects = [...allProjects].sort((a, b) => {
                if (parseInt(b.date) !== parseInt(a.date)) {
                    return parseInt(b.date) - parseInt(a.date);
                }
                // If years are the same, sort by month (descending for newest first)
                return (b.month || 0) - (a.month || 0);
            });

            sortedProjects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.setAttribute('data-id', project.id);
                card.setAttribute('data-tags', project.tags.join(','));

                const tagLabels = project.tags.map(tag =>
                    `<span class="tag">${tag === 'newmedia' ? 'new media' : tag}</span>`
                ).join('');

                card.innerHTML = `
            <div class="project-card-compact">
              <div class="card-image">
                <img src="${project.thumbnail}" alt="${project.title}">
              </div>
              <div class="card-info">
                <h3>${project.title}</h3>
                <p class="card-date">${project.date}</p>
                ${project.role ? `<p class="card-role">${project.role}</p>` : ''}
                <div class="card-tags">${tagLabels}</div>
              </div>
            </div>
            <div class="project-card-expanded">
              <button class="close-expanded">&times;</button>
              <div class="expanded-left">
                <div class="expanded-media"></div>
              </div>
              <div class="expanded-right">
                <div class="expanded-header">
                  <h2 class="expanded-title">${project.title}</h2>
                  <p class="expanded-date">${project.date}</p>
                  ${project.role ? `<p class="expanded-role">${project.role}</p>` : ''}
                  <div class="expanded-tags">${tagLabels}</div>
                </div>
                <div class="expanded-description"></div>
              </div>
            </div>
          `;

                card.addEventListener('click', (e) => {
                    if (!card.classList.contains('expanded')) {
                        expandCard(card, project);
                    }
                });

                // Close button handler
                const closeBtn = card.querySelector('.close-expanded');
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    collapseCard(card);
                });

                grid.appendChild(card);
            });
        }

        // Show/hide cards based on filter
        const cards = Array.from(grid.children);
        const visibleProjects = [];

        cards.forEach(card => {
            const cardTags = card.getAttribute('data-tags').split(',');
            const shouldShow = filter === 'all' || cardTags.includes(filter);

            if (shouldShow) {
                card.style.display = '';
                card.style.visibility = 'visible';
                card.style.opacity = '1';
                card.style.pointerEvents = 'auto';
                const project = allProjects.find(p => p.id === card.getAttribute('data-id'));
                visibleProjects.push(project);
            } else {
                // Use display none on mobile, visibility hidden on desktop
                if (window.innerWidth <= 768) {
                    card.style.display = 'none';
                } else {
                    card.style.visibility = 'hidden';
                    card.style.opacity = '0';
                    card.style.pointerEvents = 'none';
                }
            }
        });

        // Draw constellation lines after cards are shown/hidden
        setTimeout(() => drawConstellationLines(visibleProjects), 50);
    }

    // Draw lines between projects that share tags
    function drawConstellationLines(projects) {
        const svg = document.getElementById('constellationLines');
        svg.innerHTML = '';

        // Only get visible cards
        const cards = Array.from(grid.children).filter(card => card.style.visibility !== 'hidden');

        // Get card centers with their projects (only for visible cards)
        const cardPositions = cards.map(card => {
            const rect = card.getBoundingClientRect();
            const containerRect = svg.getBoundingClientRect();
            const project = projects.find(p => p.id === card.getAttribute('data-id'));
            return {
                x: rect.left + rect.width / 2 - containerRect.left,
                y: rect.top + rect.height / 2 - containerRect.top,
                project: project
            };
        }).filter(pos => pos.project); // Filter out any undefined projects

        // Group projects by tag
        const tagGroups = {};
        cardPositions.forEach(pos => {
            pos.project.tags.forEach(tag => {
                if (!tagGroups[tag]) {
                    tagGroups[tag] = [];
                }
                tagGroups[tag].push(pos);
            });
        });

        // For each tag, create a circle connecting all projects with that tag
        Object.keys(tagGroups).forEach(tag => {
            const group = tagGroups[tag];

            // Sort by date (oldest to newest) within each tag group
            group.sort((a, b) => parseInt(a.project.date) - parseInt(b.project.date));

            // Connect projects in chronological circle for this tag
            for (let i = 0; i < group.length; i++) {
                const pos1 = group[i];
                const pos2 = group[(i + 1) % group.length]; // Loop back to first

                const dx = pos2.x - pos1.x;
                const dy = pos2.y - pos1.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Calculate angle
                const angle = Math.atan2(dy, dx);

                // Create more natural-looking curves with varied offsets
                const tagIndex = Object.keys(tagGroups).indexOf(tag);
                const baseDirection = (tagIndex % 2 === 0) ? 1 : -1;

                // Add subtle variation based on node positions
                const variation = Math.sin(pos1.x * 0.01 + pos1.y * 0.01) * 0.3;
                const perpOffset = 40 * baseDirection * (1 + variation); // Perpendicular offset for diagonal

                // Calculate perpendicular direction
                const perpAngle = angle + Math.PI / 2;

                // Midpoint with diagonal offset
                const midX = (pos1.x + pos2.x) / 2 + Math.cos(perpAngle) * perpOffset;
                const midY = (pos1.y + pos2.y) / 2 + Math.sin(perpAngle) * perpOffset;

                // Create two line segments that meet at the midpoint (forming a diagonal junction)
                // First line: from pos1 to midpoint
                const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line1.setAttribute('x1', pos1.x);
                line1.setAttribute('y1', pos1.y);
                line1.setAttribute('x2', midX);
                line1.setAttribute('y2', midY);
                line1.setAttribute('data-tag', tag);
                svg.appendChild(line1);

                // Second line: from midpoint to pos2
                const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line2.setAttribute('x1', midX);
                line2.setAttribute('y1', midY);
                line2.setAttribute('x2', pos2.x);
                line2.setAttribute('y2', pos2.y);
                line2.setAttribute('data-tag', tag);
                svg.appendChild(line2);
            }
        });
    }

    // Filter button handlers
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Collapse any expanded cards when filtering
            const expandedCard = document.querySelector('.project-card.expanded');
            if (expandedCard) {
                collapseCard(expandedCard);
            }

            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-category');
            renderProjects(currentFilter);
        });
    });

    // Expand card to show details
    function expandCard(card, project) {
        // Collapse any other expanded cards
        const expandedCard = document.querySelector('.project-card.expanded');
        if (expandedCard && expandedCard !== card) {
            collapseCard(expandedCard);
        }

        card.classList.add('expanded');

        // Populate expanded content
        const mediaContainer = card.querySelector('.expanded-media');
        const descriptionEl = card.querySelector('.expanded-description');

        descriptionEl.innerHTML = project.description;

        // Add media
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

        if (project.additionalImages) {
            project.additionalImages.forEach(img => {
                mediaContainer.innerHTML += `<img src="${img}" alt="${project.title}">`;
            });
        }

        // Redraw constellation lines after expansion animation completes
        setTimeout(() => {
            const filtered = currentFilter === 'all'
                ? allProjects
                : allProjects.filter(p => p.tags.includes(currentFilter));
            drawConstellationLines(filtered);

            // Scroll to position the card nicely below the filter bar
            const cardRect = card.getBoundingClientRect();
            const filterBar = document.querySelector('.filter-bar');
            const filterBarRect = filterBar.getBoundingClientRect();
            const targetPosition = filterBarRect.bottom + 30; // 30px gap below filter bar

            const scrollAmount = cardRect.top - targetPosition;

            if (scrollAmount !== 0) {
                window.scrollBy({
                    top: scrollAmount,
                    behavior: 'auto' // Instant scroll for quicker response
                });
            }
        }, 100); // Reduced timeout for quicker scroll
    }

    // Collapse card back to compact view
    function collapseCard(card) {
        card.classList.remove('expanded');
        const mediaContainer = card.querySelector('.expanded-media');
        mediaContainer.innerHTML = '';

        // Redraw constellation lines after collapse
        setTimeout(() => {
            const filtered = currentFilter === 'all'
                ? allProjects
                : allProjects.filter(p => p.tags.includes(currentFilter));
            drawConstellationLines(filtered);
        }, 100);
    }

    // Redraw lines on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const filtered = currentFilter === 'all'
                ? allProjects
                : allProjects.filter(p => p.tags.includes(currentFilter));
            drawConstellationLines(filtered);
        }, 250);
    });

    // Initial render with current filter
    renderProjects(currentFilter);
});
