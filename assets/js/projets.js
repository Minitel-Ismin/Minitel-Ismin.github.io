// Search functionality
const searchInput = document.getElementById('searchInput');
const projectCards = document.querySelectorAll('.projet__card');

searchInput.addEventListener('input', function(e) {
   const searchTerm = e.target.value.toLowerCase();
   
   projectCards.forEach(card => {
      const title = card.querySelector('.projet__title').textContent.toLowerCase();
      const description = card.querySelector('.projet__description').textContent.toLowerCase();
      const tags = Array.from(card.querySelectorAll('.projet__tag')).map(tag => tag.textContent.toLowerCase());
      
      if (title.includes(searchTerm) || description.includes(searchTerm) || tags.some(tag => tag.includes(searchTerm))) {
         card.style.display = 'block';
      } else {
         card.style.display = 'none';
      }
   });
});

// Filter functionality
const filterTags = document.querySelectorAll('.filter-tag');

filterTags.forEach(tag => {
   tag.addEventListener('click', function() {
      // Remove active class from all tags
      filterTags.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tag
      this.classList.add('active');
      
      const selectedTag = this.getAttribute('data-tag').toLowerCase();
      
      projectCards.forEach(card => {
         if (selectedTag === 'all') {
            card.style.display = 'block';
         } else {
            const cardTags = Array.from(card.querySelectorAll('.projet__tag')).map(t => t.textContent.toLowerCase());
            card.style.display = cardTags.includes(selectedTag) ? 'block' : 'none';
         }
      });
   });
}); 