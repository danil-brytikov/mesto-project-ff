// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list'); 

// @todo: DOM узлы

// @todo: Функция создания карточки  

function addCard (cardContent) {
    const card = cardTemplate.querySelector('.places__item').cloneNode(true);

    card.querySelector('.card__image').src = cardContent.link;
    card.querySelector('.card__image').setAttribute("alt", `Изображение ${cardContent.name}`);
    card.querySelector('.card__title').textContent = cardContent.name;

    const cardDeleteButton = card.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', deleteCard);

    return card;
}

// @todo: Функция удаления карточки

function deleteCard() {
    this.parentElement.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(cardContent => placesList.append(addCard(cardContent)));