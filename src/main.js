import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import {fetchPhotoSearch} from './js/pixabay-api.js';
import {createImagesMarkup} from './js/render-functions.js';

const searchFormEl = document.querySelector('.js-search-form');
const searchRes = document.querySelector('.gallery');
const loaderEl = document.querySelector('.js-loader');
const loadMoreBtnEl = document.querySelector('.load-more-button');


let currentPage = 1;
let currentSearchQuery = '';

async function onSearchFormSubmit(event) {
    event.preventDefault();
    currentPage = 1;
    currentSearchQuery = event.target.querySelector('.search-input').value.trim();

    if (currentSearchQuery === '') {
        searchRes.innerHTML = '';
        event.target.reset();
        iziToast.error({
            title: 'Error',
            message: 'Illegal operation, enter a name',
            position: 'topRight',
        });
        return;
    }
    
    searchRes.innerHTML = '';
    loaderEl.classList.remove('is-hidden');
    loadMoreBtnEl.classList.add('is-hidden');

try {
    const imagesData = await fetchPhotoSearch(currentSearchQuery, currentPage)
    if (imagesData.total === 0 || !imagesData.hits) {
        iziToast.error({
            title: 'Error',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
        });
        return;
        }
    searchRes.innerHTML = createImagesMarkup(imagesData.hits);
    new SimpleLightbox('.gallery a', {
        captions: true,
        captionDelay: 250,
        captionPosition: 'bottom',
    }).refresh();
    if (imagesData.hits.length < 15) {
        setTimeout(() => { iziToast.info({
                title: 'Info',
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            });}, 2000);
        } else {
            loadMoreBtnEl.classList.remove('is-hidden');
        }
} catch (error) {
    console.log(error);
}
event.target.reset();
loaderEl.classList.add('is-hidden');
}
const smoothScroll = () => {
    const galleryItem = document.querySelector('.gallery-item');
    const imageHeight = galleryItem.getBoundingClientRect().height;
    const scrollHeight = imageHeight * 2;
    console.log(scrollHeight);
    window.scrollBy({
    top: imageHeight,
    left: 0,
    behavior: 'smooth',
});
};
async function loadMoreImages() {
    currentPage++;
    try {
        loaderEl.classList.remove('is-hidden');
        const imagesData = await fetchPhotoSearch(currentSearchQuery, currentPage);
        if (imagesData.total === 0 || !imagesData.hits) {
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no more images to load.',
                position: 'topRight',
            });
            return;
        }
        const newImagesMarkup = createImagesMarkup(imagesData.hits);
        searchRes.insertAdjacentHTML('beforeend', newImagesMarkup);
        new SimpleLightbox('.gallery a', {
            captions: true,
            captionDelay: 250,
            captionPosition: 'bottom',
        }).refresh();
        
          if (currentPage * 15 >= imagesData.totalHits|| imagesData.hits.length < 15) {
            loadMoreBtnEl.classList.add('is-hidden');
            setTimeout(() => {iziToast.info({
                title: 'Info',
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
            });
                }, 2000);
        }
        smoothScroll();

    } catch (error) {
        console.log(error);
    } finally {
        loaderEl.classList.add('is-hidden'); 
    }
}

loadMoreBtnEl.addEventListener('click', loadMoreImages);
searchFormEl.addEventListener('submit', onSearchFormSubmit);