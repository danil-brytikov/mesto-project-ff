const getTemplate = () => { 
  return document.querySelector("#card-template").content.querySelector(".card").cloneNode(true);
};

function createCard (cardContent, userProfile, likeCard, openImageModal, deleteCardImage, likeImageNumber, requestLikeCard)  {
  const card = getTemplate();

  const cardImage = card.querySelector('.card__image');
  const likeScore = card.querySelector('.card__like-score');
  const delButton = card.querySelector('.card__delete-button');
  const likeButton = card.querySelector('.card__like-button');

  cardImage.src = cardContent.link;
  card.querySelector('.card__title').textContent = cardContent.name;
  cardImage.alt = `Фотография места: ${cardContent.name}`;
  likeScore.textContent = cardContent.likes.length;
  
  if (cardContent.owner._id === userProfile._id){
    delButton.addEventListener('click', () => deleteCardImage(card, cardContent));
  } else {
    delButton.style.visibility = 'hidden';
  };

  likeCard.forEach((like) => {
    if (like._id === userProfile._id) {
      likeImage(likeButton);
    }
  })

  likeButton.addEventListener('click',() => likeImageNumber(likeScore, likeButton, cardContent, requestLikeCard));
  cardImage.addEventListener('click', () => openImageModal(cardContent.link, cardContent.name));
  return card;
};

//Функция лайка/дизлайка карточек
const likeCardImage = (scoreLikes, likeButton, cardContent, request) => {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    request(cardContent._id, 'DELETE')
    .then ((result) => {
      likeImage(likeButton);
      scoreLikes.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    request(cardContent._id, 'PUT')
    .then ((result) => {
      likeImage(likeButton);
      scoreLikes.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err);
    })
  }
}

const deleteCard = (deleteItem) => deleteItem.remove();
const likeImage = (likeItem) => likeItem.classList.toggle('card__like-button_is-active');

export {createCard, likeCardImage, deleteCard}