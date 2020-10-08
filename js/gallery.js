import galleryItems from './gallery-items.js';

const galleryContainer = document.querySelector('.js-gallery');

galleryContainer.insertAdjacentHTML(
  'beforeend',
  createColorCardsMarkup(galleryItems),
);

galleryContainer.addEventListener('click', onModalClick);

function createColorCardsMarkup(cards) {
  return cards
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join('');
}

const lightbox = document.querySelector('.lightbox');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
const lightboxContent = document.querySelector('.lightbox__content');
const lightboxImage = document.querySelector('.lightbox__image');
const lightboxCloseButton = document.querySelector(
  '[data-action="close-lightbox"]',
);

function onModalClick(evt) {
  evt.preventDefault();

  console.log(evt.target.dataset);

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  window.addEventListener('keydown', onEscPress);
  lightbox.classList.add('is-open');

  lightboxImage.src = evt.target.dataset.source;
  lightboxImage.alt = evt.target.alt;

  //   window.addEventListener('keydown', onKeyLeftPress);
  //   window.addEventListener('keydown', onKeyRightPress);
}

lightboxCloseButton.addEventListener('click', onCloseBtnClick);

function onCloseBtnClick() {
  window.addEventListener('click', onEscPress);
  lightbox.classList.remove('is-open');

  lightboxImage.src = '';
  lightboxImage.alt = '';
}

lightboxOverlay.addEventListener('click', onOverlayClick);

function onOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseBtnClick();
  }
}

function onEscPress(evt) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = evt.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseBtnClick();
  }
}

// function onKeyLeftPress(evt) {
//   const isLeftKey = evt.code === 'ArrowLeft';
//   console.log(isLeftKey);
// }

// function onKeyRightPress(evt) {
//   const isRightKey = evt.code === 'ArrowRight';
//   if (index + 1 >= galleryItems.length) {
//     return;
//   }
// }
