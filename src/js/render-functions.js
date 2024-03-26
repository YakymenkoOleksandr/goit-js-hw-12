import iziToast from 'izitoast'; // Бібліотека для повідомлень
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox'; // Бібліотека для галереї
import 'simplelightbox/dist/simple-lightbox.min.css';

export const userList = document.querySelector('.userList'); // Галерея
export const areaForLoader = document.querySelector('.areaForLoader'); // Лоадер

export const lightbox = new SimpleLightbox('.gallery a', {
  // Великі картинки
  captionDelay: 250,
  captionsData: 'alt',
});

export let imagesLength = '';
export let loadPage = 1;

export function renderImg(images) {
  // Рендар фото в браузері
  imagesLength = images.length;

  const markupImg = images
    .map(image => {
      return `<div class="blockForAllElements">
          <li>
          <a href=${image.largeImageURL} download="false">
          <img src=${image.webformatURL} alt = "${image.tags}" class = "imgOfUser">
          </a>
          </li>
          <div class = "divForDescription"> 
          <ul class="blockOfInfo"> 
            <li class="title">Likes</li>
            <li class="info">${image.likes}</li>
          </ul>
          <ul class="block">
            <li class="title">Views</li>
            <li class="info">${image.views}</li>
          </ul>
          <ul class="block">
            <li class="title">Comments</li>
            <li class="info">${image.comments}</li>
          </ul>
          <ul class="block">
            <li class="title">Downloads</li>
            <li class="info">${image.downloads}</li>
          </ul>
          </div>
        </div>`;
    })
    .join('');
  userList.insertAdjacentHTML('beforeend', markupImg);
  lightbox.refresh();
  if (amountOfHits < loadPage * 15) {
    iziToast.show({
      color: 'red',
      message: `We're sorry, but you've reached the end of search results.`,
      position: 'topCenter',
    });
  } else if (amountOfHits < 15) {
    iziToast.show({
      color: 'red',
      message: `We're sorry, but you've reached the end of search results.`,
      position: 'topCenter',
    });
  } else {
    addButtonLoad();
  }
}

export function loaderF() {
  // Створюємо лоадер
  const spanElement = document.createElement('span');
  areaForLoader.appendChild(spanElement);
  spanElement.classList.add('loader');
}

export function spanElementRem() {
  // Видаляємо лоадер
  const loaderF = document.querySelector('.loader');
  loaderF.remove();
}

export function addButtonLoad() {
  // Кнопка лоад море

  const buttonLoad = document.createElement('button');
  userList.appendChild(buttonLoad);
  buttonLoad.classList.add('buttonForLoad');
  buttonLoad.textContent = 'Load more';

  buttonLoad.addEventListener('click', event => {
    loaderF();
    event.preventDefault();
    buttonLoad.textContent = 'Loading...';
    wordOfUser;
    checkInputValidity();
    buttonLoad.remove();
    loadPage++;
  });
}

export function scrollByTwoImages() {
  // Прокрутка на 2 картинки вниз
  const blockForAllElements = document.querySelectorAll('.blockForAllElements');
  if (blockForAllElements.length > 0) {
    const blockHeight = blockForAllElements[0].offsetHeight;
    window.scrollBy({
      top: blockHeight * 2,
      behavior: 'smooth',
    });
  }
}

import { amountOfHits, wordOfUser, checkInputValidity } from './pixabay-api.js';
