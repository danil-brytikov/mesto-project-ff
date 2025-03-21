import '../pages/index.css';
import {createCard, deleteCard, cardLike} from '../components/card';
import {initialCards} from './cards';
import { openPopup , closePopup} from '../components/modal';



const cardsContainer = document.querySelector('.places__list'); 
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput =  formEditProfile.querySelector('.popup__input_type_description');
const addButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const formAddElement = document.forms['new-place'];
const allPopup = document.querySelectorAll('.popup');


// @todo: Редактирование информации профиля
buttonEditProfile.addEventListener('click', () => {
    openPopup(popupEditProfile);
    nameInput.value = profileTitle.textContent;
    jobInput.value =  profileDescription.textContent;
  });

function handleEditFormSubmit(evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupEditProfile);
}
formEditProfile.addEventListener('submit', handleEditFormSubmit);

//@todo: Добавление карточки
addButton.addEventListener('click', () => openPopup (newCardPopup));
formAddElement.addEventListener('submit', handleAddFormSubmit);

function handleAddFormSubmit(evt) {
    evt.preventDefault(); 
    const cardContent = {
        name: formAddElement.elements['place-name'].value,
        link: formAddElement.elements.link.value
    };
    const newCard = createCard(cardContent, deleteCard, cardLike, openImageModal);
    cardsContainer.prepend(newCard);
    closePopup(newCardPopup);
    formAddElement.reset();
  }

// @todo: Открытие картинки по нажатию
function openImageModal (cardContent) {
    const imagePopup = document.querySelector('.popup_type_image');
    imagePopup.querySelector('.popup__caption').textContent = cardContent.name; 
    
    const popupImage = imagePopup.querySelector('.popup__image');
    popupImage.src = cardContent.link;
    popupImage.alt = cardContent.name;
    openPopup (imagePopup);
}

// @todo: закрытие попапов по клику на оверлей

allPopup.forEach(function (item) {
    item.classList.add('popup_is-animated');
    item.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close') || evt.currentTarget === evt.target) {
        closePopup(item);
        }
    });
  });

  // @todo: Вывести карточки на страницу
initialCards.forEach(cardContent => cardsContainer.append(createCard(cardContent, deleteCard, cardLike, openImageModal)));