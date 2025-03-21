// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// @todo: Функция создания карточки  

function createCard (cardContent, deleteCard, likeCard, openImageModal) {
    const card = cardTemplate.querySelector('.places__item').cloneNode(true);

    card.querySelector('.card__image').src = cardContent.link;
    card.querySelector('.card__image').setAttribute("alt", `Изображение ${cardContent.name}`);
    card.querySelector('.card__title').textContent = cardContent.name;

    const cardDeleteButton = card.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', () => deleteCard(card));

    const cardLikeButton = card.querySelector('.card__like-button');
    cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton));

    const cardImage = card.querySelector('.card__image');
    cardImage.addEventListener('click', () => openImageModal(cardContent));

    return card;
}

// @todo: Функция удаления карточки

function deleteCard(card) {
    card.remove();
}

// @todo: Изменение иконки лайка

function likeCard(cardLikeButton) {
    cardLikeButton.classList.toggle('card__like-button_is-active');
}


export {createCard, deleteCard, likeCard }