export { openPopup , closePopup};

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', escClose);
}

function closePopup (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', escClose);
}

function escClose (evt) {
  if( evt.key === 'Escape' ) { 
    closePopup(document.querySelector('.popup_is-opened'));
  }
}