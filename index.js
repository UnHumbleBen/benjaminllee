var jumbotron = document.getElementById('jumbotron');

window.addEventListener('resize', (_) => {
  jumbotron.style.height = window.innerHeight + 'px';
});
