import './css/styles.css';
import dotenv from 'dotenv';
dotenv.config();
import { fetchImages } from "./fetchImages"
import { createMarkupImages} from "./createMarkup"

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

searchForm.addEventListener("submit", onSubmitForm)

function onSubmitForm(evt) {
  evt.preventDefault()
  const searchInputValue = evt.target.elements.searchQuery.value;
 
  fetchImages(searchInputValue).then(data => gallery.insertAdjacentHTML('beforeend', createMarkupImages(data.hits)))
  

}