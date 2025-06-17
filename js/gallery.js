document.addEventListener('DOMContentLoaded', function () {
  // Set appropriate class based on number of thumbnails
  const thumbnailGrid = document.querySelector('.thumbnail-grid');
  if (thumbnailGrid) {
    const thumbCount = thumbnailGrid.querySelectorAll('.thumb').length;

    // Add appropriate classes rather than inline styles
    if (thumbCount === 1) {
      thumbnailGrid.classList.add('single-item');
    } else if (thumbCount === 2) {
      thumbnailGrid.classList.add('two-items');
    } else {
      thumbnailGrid.classList.add('multi-item');
    }
  }

  // Rest of your existing code continues below...
  const thumbs = document.querySelectorAll('.thumb');
  const sidePanel = document.getElementById('sidePanel');
  const closeBtn = document.getElementById('closePanel');

  const details = {
    //performance
    1: {
      title: "traces",
      date: "2022",
      mediaType: "youtube",
      mediaId: "Uvxuum6luEY",
      description: "<strong>art direction and video:</strong><br>Sofia Pace<br><br><strong>music:</strong><br>We've Never Met but Can We Have a Cup of Coffee or Something by In Love with A Ghost<br>Empty Crown by YAS<br><br><strong>performance and choreography:</strong><br>Sofia Pace and Rainy Fan"
    },
    8: {
      title: "period god",
      date: "2025",
      mediaType: "youtube",
      mediaId: "TYAWdhVXL80",
      description: "Periods are often hidden, silenced, or treated with shame in society.<br><br>Through this project,Period God hopes to confront sigmas around menstruation and the female body in a way they could be seen, heard, and celebrated. <br><br> co-choreographed by Sofia Pace <br><br><a href='https://periodgod.cargo.site' target='_blank'>full project site here</a>"


    },
    //media
    2: {
      title: "corporeal lines",
      date: "2021",
      description: "photographical depictions of moving bodies through light.",
      mediaType: "image",
      mediaId: "work/photo3.jpg", // Main image
      additionalImages: ["work/photo1.jpg", "work/photo2.jpg", "work/photo4.jpg", "work/photo5.jpg"], // Additional imagese
    },

    3: {
      title: "la muerte se escribe sola",
      date: "2023",
      mediaType: "vimeo",
      mediaId: "536153920",
      description: "poem:<br>“La muerte se escribe sola” by Blanca Varela.<br><br>voice:<br>Gisella Díaz<br><br> video and sound<br>Sofia Pace"
    },

    4: {
      title: "anatomic composition",
      date: "2023",
      mediaType: "vimeo",
      mediaId: "705201149",
      description: "dance video/animation project"
    },

    5: {
      title: "body as textile",
      date: "2025",
      mediaType: "image",
      mediaId: "",
      description: "This Project explore textile as hypertext extends beyond thread and fabric, weaving information through bodies, spaces, and histories. By expanding ideas on human kinesthetics and exploring the potential for unconventional archival mediums, we can rethink how bodies inhabit space and how textiles both enclose and provide comfort within it—ultimately revealing how even the clothing we wear may serve as carriers of informatio.<br><br>by Julia Kan and Sofia Pace"

    },

    //new media
    6: {
      title: "chromadance",
      date: "2024",
      mediaType: "youtube",
      mediaId: "-lirpl3Cy7I",
      description: "An audiovisual experience where individuals are encouraged to connect more deeply with their senses through movement. The abstracted kinetic visual expression of the installation invites inner self into the outer world. Our user experience is one where the dancer is able to feel synchronization between what they see, hear, and feel. Through achieving this mind-body-spirit harmony, users can relax and unplug from the hustle of daily life.<br><br>by Prisha Jain, Niki Hu, and Sofia Pace"
    },

    //design
    7: {
      title: "fabrication projects",
      date: "2025",
      description: "For these projects, I wanted to explore cosmic and celestial shapes and forms, with an experimental approach to more popular interpretations of these concepts. I’m particularly drawn to organic flowing shapes and dream-like aesthetics. By framing this as both a focused and open-ended prompt, I aimed to expand my possibilities in terms of materials and fabrication practices.<br><br><a href='https://sofiasfabrication.cargo.site' target='_blank'>full project site here</a>",
      mediaType: "image",
      mediaId: "work/purse.jpeg", // Main image
      additionalImages: ["work/coaster.jpeg", "work/embox.jpeg", "work/mooncycle.jpeg"]
    },

  };

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const id = thumb.getAttribute('data-id');
      const data = details[id];

      if (data) {
        sidePanel.querySelector('h2').textContent = data.title;
        sidePanel.querySelector('p').textContent = data.date || "";

        // Create or update media container
        const mediaContainer = sidePanel.querySelector('.media-container') || document.createElement('div');
        mediaContainer.className = 'media-container';

        // Handle different media types
        if (data.mediaType && data.mediaId) {
          switch (data.mediaType) {
            case 'youtube':
              mediaContainer.innerHTML = `
                <iframe width="100%" 
                        height="315" 
                        src="https://www.youtube.com/embed/${data.mediaId}" 
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                </iframe>
              `;
              break;

            case 'vimeo':
              mediaContainer.innerHTML = `
                <iframe src="https://player.vimeo.com/video/${data.mediaId}"
                        width="100%" 
                        height="315" 
                        frameborder="0" 
                        allow="autoplay; fullscreen; picture-in-picture" 
                        allowfullscreen>
                </iframe>
              `;
              break;

            case 'image':
              mediaContainer.innerHTML = `
                <img src="${data.mediaId}" alt="${data.title}" class="detail-image">
              `;
              break;

            default:
              mediaContainer.innerHTML = '';
          }
        } else {
          mediaContainer.innerHTML = ''; // No media for this item
        }

        // Multiple images support
        if (data.additionalImages && data.additionalImages.length > 0) {
          let imagesHTML = '';
          data.additionalImages.forEach(img => {
            imagesHTML += `<img src="${img}" alt="${data.title}" class="detail-image additional-image">`;
          });
          mediaContainer.innerHTML += imagesHTML;
        }

        // Insert after date (p) and before description (h3)
        const descriptionEl = sidePanel.querySelector('h3');
        descriptionEl.parentNode.insertBefore(mediaContainer, descriptionEl);

        // Update description
        sidePanel.querySelector('h3').innerHTML = data.description;
      } else {
        sidePanel.querySelector('h2').textContent = `Page ${id} Content`;
        sidePanel.querySelector('p').textContent = `This is the date for page ${id}.`;
        sidePanel.querySelector('h3').textContent = `This is the detailed view for artwork number ${id}.`;

        // Remove any media if present
        const existingMedia = sidePanel.querySelector('.media-container');
        if (existingMedia) existingMedia.remove();
      }

      sidePanel.classList.add('open');
      document.querySelector('.layout').classList.add('shifted');
    });
  });

  // Keep your existing close functionality
  document.addEventListener('click', (event) => {
    const isClickInsidePanel = sidePanel.contains(event.target);
    const isClickOnThumb = event.target.closest('.thumb');

    if (sidePanel.classList.contains('open') && !isClickInsidePanel && !isClickOnThumb) {
      sidePanel.classList.remove('open');
      document.querySelector('.layout').classList.remove('shifted');
    }
  });
});


//close button functionality
const sidePanel = document.querySelector('.side-panel');
const closeButton = document.querySelector('.closePanel');

closeButton.addEventListener('click', () => {
  sidePanel.classList.remove('open');
  document.querySelector('.layout').classList.remove('shifted');
});

