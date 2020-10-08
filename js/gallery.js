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

// const galleryImage = document.querySelector('[data-source]');

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

  window.addEventListener('keydown', onKeyLeftPress);
  window.addEventListener('keydown', onKeyRightPress);
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

function onKeyLeftPress(evt) {
  const isLeftKey = evt.code === 'ArrowLeft';
  console.log(isLeftKey);

  let index = 0;

  setActiveImage(index);

  if (index - 1 < 0) {
    return;
  }

  index -= 1;
  setActiveImage(index);
}

function onKeyRightPress(evt) {
  const isRightKey = evt.code === 'ArrowRight';
  if (index + 1 >= galleryItems.length) {
    return;
  }

  index += 1;
  setActiveImage(index);
}

function setActiveImage(imageIdx) {
  const activeImage = galleryItems[imageIdx];
  // refs.imageOutput.textContent = activeImage;
}

// function modalOpen(event) {
//     event.preventDefault();

//     if (event.target.nodeName !== "IMG") {
//         return
//     };
//     modal.classList.add("is-open");
//     modalImg.src = event.target.dataset.source;
//     modalImg.alt = event.target.alt;
//     overlay.addEventListener("click", modalCloseByOverlayClick);
//     document.addEventListener("keydown", modalCloseByEsc);
//     modalBtnClose.addEventListener('click', modalClose);
//      window.addEventListener("keydown", modalImgScrolling);
//     modalBtnRight.addEventListener("click", modalImgScrolling);
//     modalBtnLeft.addEventListener("click", modalImgScrolling);
//     modalContent.addEventListener("click", modalImgScrolling);
// };

// function modalClose(event) {
//     modal.classList.remove("is-open");
//     overlay.removeEventListener("click", modalCloseByOverlayClick);
//     document.removeEventListener("keydown", modalCloseByEsc);
//     modalBtnClose.removeEventListener('click', modalClose);
//     window.removeEventListener("keydown", modalImgScrolling);
//     modalBtnRight.removeEventListener("click", modalImgScrolling);
//     modalBtnLeft.removeEventListener("click", modalImgScrolling);
//     modalContent.removeEventListener("click", modalImgScrolling);
// };

// function modalCloseByEsc(event) {
//     if (event.code === "Escape") {
//         modalClose(event)
//     }
// };

// function modalCloseByOverlayClick(event) {
//     if (event.currentTarget === event.target) {
//         modalClose(event)
//     }
// };

// function modalImgScrolling(event) {

//     let imgIndex = galleryItems.findIndex(img => img.original === modalImg.src);

//     if (event.code === 'ArrowLeft' || event.code === 'ArrowDown' || modalBtnLeft === event.target) {
//         if (imgIndex === 0) {
//             imgIndex += galleryItems.length;
//         }
//         imgIndex -= 1;
//     };

//     if (event.code === 'ArrowRight' || event.code === 'ArrowUp' || modalBtnRight === event.target || modalContent === event.target) {
//         if (imgIndex === galleryItems.length - 1) {
//             imgIndex -= galleryItems.length;
//         }
//         imgIndex += 1;
//     };

//     modalImg.src = galleryItems[imgIndex].original;
//     modalImg.alt = galleryItems[imgIndex].description;

// };
