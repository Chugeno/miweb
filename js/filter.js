document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los enlaces de filtro
    const filterLinks = document.querySelectorAll('.filter-tags .tag');
    
    // Añadir event listener a cada enlace
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Eliminar la clase 'active' de todos los enlaces
            filterLinks.forEach(l => l.classList.remove('active'));
            
            // Añadir la clase 'active' al enlace clickeado
            this.classList.add('active');
            
            // Obtener el tag seleccionado (sin el #)
            const selectedTag = this.textContent.replace('#', '');
            
            // Filtrar los posts
            filterPosts(selectedTag);
        });
    });
    
    function filterPosts(tag) {
        // Seleccionar todos los posts
        const posts = document.querySelectorAll('.post-card');
        
        // Si el tag es 'todos', mostrar todos los posts
        if (tag === 'todos') {
            posts.forEach(post => {
                post.style.display = 'block';
            });
            return;
        }
        
        // Filtrar posts según el tag seleccionado
        posts.forEach(post => {
            const postTags = post.querySelectorAll('.post-tags .tag');
            let hasTag = false;
            
            postTags.forEach(postTag => {
                if (postTag.textContent.replace('#', '') === tag) {
                    hasTag = true;
                }
            });
            
            // Mostrar u ocultar el post según si tiene el tag seleccionado
            post.style.display = hasTag ? 'block' : 'none';
        });
    }
});