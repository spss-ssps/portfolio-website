document.querySelector('.thumb.tall').addEventListener('click', function() {
    const content = document.getElementById('thumbnail-content');
    if (content.style.display === 'none') {
        content.style.display = 'block';
    } else {
        content.style.display = 'none';
    }
});