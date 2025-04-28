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
    description: "<strong>Art Direction and Video:</strong><br>Sofia Pace<br><br><strong>Music:</strong><br>We've Never Met but Can We Have a Cup of Coffee or Something by In Love with A Ghost<br>Empty Crown by YAS<br><br><strong>Performance and Choreography:</strong><br>Sofia Pace, Rainy Fan"
  },

  //media
  2: {
    title: "Anatomic Animation",
    date: "2023",
    mediaType: "image",
    mediaId: "work/anatomic.gif", // Path to image
    description: "A looping GIF exploring the internal structures of a human body."
  },

  3: {
    title: "Varela GIF",
    date: "2023",
    mediaType: "vimeo",
    mediaId: "123456789", // Vimeo video ID
    description: "A colorful animated piece inspired by the patterns of nature."
  },

  4: {
    title: "Sunset Photo",
    date: "2024",
    mediaType: "image",
    mediaId: "work/photo3.jpg", // Path to image
    description: "A dreamy photograph capturing the fading pink light over the ocean."
  },

  //new media
  5: {
    title: "anatomic composition",
    date: "2022",
    mediaType: "image",
    mediaId: "work/anatomic.gif", // Path to image
    description: "A looping GIF exploring the internal structures of a human body."
  },

  //design
  7: {
    title: "fabrication projects",
    date: "2025",
    description: "A dreamy photograph capturing the fading pink light over the ocean."
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
        switch(data.mediaType) {
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

