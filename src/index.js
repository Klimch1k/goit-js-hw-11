import './css/styles.css';
import dotenv from 'dotenv';
dotenv.config();
import { createMarkupImages } from './createMarkup';
import Notiflix from 'notiflix';
import ImagesApiServise from './fetchImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const imagesApiServise = new ImagesApiServise();
const loadMoreButton = document.querySelector('.load-more');
const lightBox = new SimpleLightbox('.gallery a', {
  scrollZoom: false,
  captionsData: 'alt',
  captionDelay: '250',
});

searchForm.addEventListener('submit', onSubmitForm);
loadMoreButton.addEventListener('click', onLoadMore)

function onSubmitForm(evt) {
  evt.preventDefault();
  imagesApiServise.query = evt.target.elements.searchQuery.value;
  imagesApiServise.resetPage();
  imagesApiServise.fetchImages().then(data => {
    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
        
      );
      return;
    }
    gallery.innerHTML = createMarkupImages(data.hits);
    lightBox.refresh();
    loadMoreButton.style.display = "block";
    
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
  });
}

function onLoadMore() {
  loadMoreButton.style.display = 'none';
  imagesApiServise.fetchImages().then(data => {
    gallery.insertAdjacentHTML("beforeend", createMarkupImages(data.hits)) 
    lightBox.refresh();
    
    const galleryItems = document.querySelectorAll(".gallery a");
    if (galleryItems.length >= data.totalHits) {
      loadMoreButton.style.display = 'none';
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
      return;
    }
    loadMoreButton.style.display = 'block';
    
  })
};

