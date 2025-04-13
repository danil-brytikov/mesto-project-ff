import '../pages/index.css';
import {createCard, likeCardImage, deleteCard} from '../components/card.js';
import {openPopup, closePopup} from '../components/modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {getCardData, getHostProfile, patchProfile, postHostCard, patchAvatar, deleteHostCard, likeCard} from './api.js';

let idCardForDel = null; 
const cardsContainer = document.querySelector('.places__list');
const popupEditProfile = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const imagePopup = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption')
const allPopups = document.querySelectorAll('.popup');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput =  formEditProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const imageProfile = document.querySelector('.profile__image');
const formEditCard = newCardPopup.querySelector('.popup__form');
const namePlaceInput = formEditCard.querySelector('.popup__input_type_card-name');
const UrlEditCard = formEditCard.querySelector('.popup__input_type_url');
const editAvatarProfile = document.querySelector('.popup_type_avatar-image');
const formEditAvatarProfile = editAvatarProfile.querySelector('.popup__form');
const avatarUrl = formEditAvatarProfile.querySelector('.popup__input_type_url');
const popupTypeDelete = document.querySelector('.popup_type_del-card');
const popupDeleteBtn = popupTypeDelete.querySelector('.popup__button');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
let cardDel = null;   

Promise.all([getHostProfile(), getCardData()])
  .then(([userData, cardsArray]) => {
    ProfileInform (userData);
    getDataCards(userData, cardsArray);
  })
  .catch((err) => {
    console.log(err);
  });

const handleFormSubmitEditCard = (evt) => {
  evt.preventDefault();
  saveLoad(newCardPopup, false)
  postHostCard(namePlaceInput.value, UrlEditCard.value)
    .then ((result) => {
      cardsContainer.prepend(createCard(result, result.owner, result.likes.slice(), openPopupImage, DeletePopup, likeCardImage, likeCard))
      closePopup(newCardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => saveLoad(newCardPopup, true))
};

formEditCard.addEventListener('submit', handleFormSubmitEditCard);

const getDataCards = (dataMyProfile, dataCards) => {
  dataCards.forEach(function (item) {
    cardsContainer.append(createCard(item, dataMyProfile, item.likes.slice(), openPopupImage, DeletePopup, likeCardImage, likeCard));
  });
};

const ProfileInform = (data) => {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  imageProfile.style.backgroundImage = `url(${data.avatar})`;
};

buttonEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value =  profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
});

imageProfile.addEventListener('click', () => {
  openPopup(editAvatarProfile);
  formEditAvatarProfile.reset();
  clearValidation(formEditAvatarProfile, validationConfig);
});

addButton.addEventListener('click', () => {
  openPopup(newCardPopup);
  formEditCard.reset();
  clearValidation(formEditCard, validationConfig);
});

function openPopupImage(cardImageLink, cardImageName) {
  imagePopup.src = cardImageLink;
  popupCaption.textContent = cardImageName;
  imagePopup.alt = cardImageName;
  openPopup(popupImage);
};

allPopups.forEach(function (item) {
  item.classList.add('popup_is-animated');
  item.querySelector('.popup__close').addEventListener('click', function (evt) {
    closePopup(item);
  });
  item.addEventListener('mousedown', function (evt) {
     if (evt.target.classList.contains('popup')){
      closePopup(evt.target);
    };
  });
});

//взаимодействие с профилем
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault();
  saveLoad(popupEditProfile, false)
  patchProfile(nameInput.value, jobInput.value)
    .then ((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => saveLoad(popupEditProfile, true))
}

formEditProfile.addEventListener('submit', handleFormSubmitEditProfile);

function handleAvatarProfileFormSubmitEdit(evt) {
  evt.preventDefault();
  saveLoad(editAvatarProfile, false); 
  patchAvatar(avatarUrl.value)
    .then ((result) => {
      imageProfile.style.backgroundImage = `url(${result.avatar})`;
      closePopup(editAvatarProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => saveLoad(editAvatarProfile, true))
}

formEditAvatarProfile.addEventListener('submit', handleAvatarProfileFormSubmitEdit);

// Удаленеи предупреждение
function DeletePopup(card, cardData) {
  openPopup(popupTypeDelete);
  idCardForDel = cardData._id;
  cardDel = card;
};

function DeleteCard(id, card) {
  deleteHostCard(id)
    .then (() => {
      deleteCard(card);
      closePopup(popupTypeDelete);
    })
    .catch((err) => {
      console.log(err);
    });
};

//UX Сохранение
function saveLoad(form, isLoading) {
  const loadingеText = form.querySelector('.popup__button');
  
  if (!isLoading) {
    loadingеText.textContent = 'Сохранение...';
  } else {
    loadingеText.textContent = 'Сохранить';
  }
};

popupDeleteBtn.addEventListener('click', () => DeleteCard(idCardForDel, cardDel));
enableValidation(validationConfig);