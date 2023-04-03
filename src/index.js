import './css/styles.css';
import dotenv from 'dotenv';
dotenv.config();
// import { fetchImages } from "./fetchImages"
import { createMarkupImages } from "./createMarkup"
import Notiflix from 'notiflix';
import ImagesApiServise from './fetchImages'
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const imagesApiServise = new ImagesApiServise();

const lightBox = new SimpleLightbox('.gallery a', {
  scrollZoom: false,
  captionsData: 'alt',
  captionDelay: '250',
});


searchForm.addEventListener("submit", onSubmitForm)

function onSubmitForm(evt) {
  evt.preventDefault()
  imagesApiServise.query = evt.target.elements.searchQuery.value;
  imagesApiServise.resetPage();
  imagesApiServise.fetchImages().then(data => {
    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    gallery.insertAdjacentHTML('beforeend', createMarkupImages(data.hits));
   lightBox.refresh();
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  });
  

}