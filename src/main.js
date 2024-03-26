import iziToast from 'izitoast'; // Бібліотека для повідомлень
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox'; // Бібліотека для галереї
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios'; // Бібліотека для запитів

const inputOfWords = document.querySelector('.inputOfWords'); // Інпут
const buttonForInput = document.querySelector('.buttonForInput'); // Кнопка пошуку
const userList = document.querySelector('.userList'); // Галерея
const areaForLoader = document.querySelector('.areaForLoader'); // Лоадер

let wordOfUser = '';
let imagesLength = '';
let loadPage = 1;
let amountOfHits = 0;

const lightbox = new SimpleLightbox('.gallery a', {
  // Великі картинки
  captionDelay: 250,
  captionsData: 'alt',
});

buttonForInput.addEventListener('click', event => {
  // Надсилання запиту на сервер  pixabay-api.js
  loaderF();
  event.preventDefault();
  userList.innerHTML = '';
  wordOfUser = inputOfWords.value.trim();
  checkInputValidity();
  inputOfWords.value = '';
  if (wordOfUser !== inputOfWords.value.trim()) {
    loadPage = 1;
  }
});

async function checkInputValidity() {
  // Перевірка валідності запиту pixabay-api.js
  return fetchImages()
    .then(images => {
      if (wordOfUser === '') {
        iziToast.show({
          color: 'red',
          message: `Sorry, the input field must be filled in to start the photo search.`,
          position: 'topCenter',
        });
      } else if (images.length === 0) {
        iziToast.show({
          color: 'red',
          message: `Sorry, there are no images matching your search query. Please try again!`,
          position: 'topCenter',
        });
      } else {
        renderImg(images);
      }
    })
    .catch(error => console.log(error))
    .finally(() => spanElementRem());
}

function renderImg(images) {
  // Рендар фото в браузері render-functions.js
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
    scrollByTwoImages();
    loadPage++;
  }
}

async function fetchImages() {
  // Запит на сервер для отримання даних про фотографії pixabay-api.js
  const myApiKey = '42977219-0f6c9f9217f976d8651793c3a';
  const params = {
    key: myApiKey,
    q: wordOfUser,
    image_type: 'photo',
    per_page: 15,
    orientation: 'horizontal',
    safesearch: true,
    page: loadPage,
  };

  const data = await axios
    .get('https://pixabay.com/api/', { params })
    .then(response => {
      if (!response.data.hits) {
        throw new Error('No images found');
      }
      const totalHits = response.data.totalHits;
      amountOfHits = totalHits;
      return response.data.hits;
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error;
    });

  return data;
}

function loaderF() {
  // Створюємо лоадер render-functions.js
  const spanElement = document.createElement('span');
  areaForLoader.appendChild(spanElement);
  spanElement.classList.add('loader');
}

function spanElementRem() {
  // Видаляємо лоадер render-functions.js
  const loaderF = document.querySelector('.loader');
  loaderF.remove();
}

function addButtonLoad() {
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
  });
}

function scrollByTwoImages() {
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
