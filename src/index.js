import './css/styles.css';
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
loadMoreButton.addEventListener('click', onLoadMore);

async function onSubmitForm(evt) {
  evt.preventDefault();
  imagesApiServise.query = evt.target.elements.searchQuery.value;
  imagesApiServise.resetPage();
  if (imagesApiServise.query.trim() === '') {
    return;
  }
  try {
    const response = await imagesApiServise.fetchImages();
    const dataImages = await response.hits;

    if (dataImages.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    gallery.innerHTML = createMarkupImages(dataImages);
    lightBox.refresh();
    loadMoreButton.style.display = 'block';
    Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  loadMoreButton.style.display = 'none';
  try {
    const response = await imagesApiServise.fetchImages();
    const dataImages = await response.hits;
    gallery.insertAdjacentHTML('beforeend', createMarkupImages(dataImages));
    lightBox.refresh();

    const galleryItems = document.querySelectorAll('.gallery a');
    if (galleryItems.length >= response.totalHits) {
      loadMoreButton.style.display = 'none';
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }
    loadMoreButton.style.display = 'block';
  } catch (error) {
    console.log(error);
  }
}
