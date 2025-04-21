const thumbs = document.querySelectorAll('.thumb');
const sidePanel = document.getElementById('sidePanel');
const closeBtn = document.getElementById('closePanel');

thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    const id = thumb.getAttribute('data-id');
    // You can customize this to load content dynamically!
    sidePanel.querySelector('h2').textContent = `Page ${id} Content`;
    sidePanel.querySelector('p').textContent = `This is the detailed view for artwork number ${id}.`;
    sidePanel.classList.add('open');
  });
});

closeBtn.addEventListener('click', () => {
  sidePanel.classList.remove('open');
});
