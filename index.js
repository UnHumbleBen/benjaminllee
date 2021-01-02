var jumbotron = document.getElementById('jumbotron');

function handleResize() {
  jumbotron.style.height = window.innerHeight + 'px';
}

window.addEventListener('resize', (_) => { handleResize() });

handleResize();
