const topElement = document.getElementById('top');
const nav = document.querySelector('#navigation-bar');
const templateIds = ["five-star", "four-star", "three-star", "two-star", "one-star"];

// Size the top element so that the transparent overlay is properly sized.
function handleResize() {
  topElement.style.height = window.innerHeight + 'px';
}

// Fix issue with Scrollspy which causes wrong navigation item to be highlighted
// because scroll offsets are miscalculated when page is loaded at non-zero
// scroll position (i.e. loading a section in the middle of the page).
// https://github.com/twbs/bootstrap/issues/32496#issuecomment-761728519
function hotfixScrollSpy() {
  curScroll = getCurrentScroll();
  offsets = bootstrap.ScrollSpy.getInstance(document.body)['_offsets']
  for (let i = 0; i < offsets.length; i++) {
    offsets[i] += curScroll;
  }
}

function getCurrentScroll() {
  return window.pageYOffset || document.documentElement.scrollTop;
}

// Changes navbar color and fill to white when scroll is at the top.
function handleWhiteNavBar() {
  if (this.scrollY < window.innerHeight) {
    nav.classList.add('nav-white');
  } else {
    nav.classList.remove('nav-white');
  }
}

// DEBUG: display offsets of sections
function debugScrollSpy() {
  console.log(bootstrap.ScrollSpy.getInstance(document.body)['_offsets'])
}

function defineCustomElementsFromTemplates() {
  for (let i = 0; i < templateIds.length; i++) {
    defineCustomElementFromTemplate(templateIds[i]);
  }
}

function defineCustomElementFromTemplate(templateId) {
  customElements.define(
    templateId,
    class extends HTMLElement {
      constructor() {
        super();
        let template = document.getElementById(templateId);
        let templateContent = template.content;
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(templateContent.cloneNode(true));
      }
    }
  );
}

function main() {
  handleResize();
  window.addEventListener('resize', (_) => { handleResize(); });
  window.addEventListener('load', (_) => {
    handleWhiteNavBar();
    // For some reason, need to call this in order to make a ScrollSpy instance.
    new bootstrap.ScrollSpy(document.body, {
      target: '#navbarSupportedContent'
    });
    hotfixScrollSpy();
    window.scrollBy(0, 1);
  });
  window.addEventListener('scroll', () => { handleWhiteNavBar(); });
  defineCustomElementsFromTemplates();
}

main();