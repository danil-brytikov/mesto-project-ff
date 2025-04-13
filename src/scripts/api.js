export {getCardData , getHostProfile, patchProfile, postHostCard, deleteHostCard, likeCard, patchAvatar}

const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-35',
  headers: {
    authorization: '464ca5b2-f2ba-4e4c-b3ad-5d60d7597982',
    'Content-Type': 'application/json'
  }
};


function resStatus(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

function getCardData() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => resStatus(res))
};

const postHostCard = (nameCard, linkCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard
    })
  })
  .then(res => resStatus(res))
};

const deleteHostCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => resStatus(res))
};

const likeCard = (cardId, methodFetch) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: methodFetch,
    headers: config.headers,
  })
  .then(res => resStatus(res))
};

//профиль
function getHostProfile () {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => resStatus(res))
};


function patchProfile(nameProfile, job) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameProfile,
      about: job
    })
  })
  .then(res => resStatus(res))
};

function patchAvatar (urlAvatarImage) {
  return fetch(`${config.baseUrl}/users/me/avatar `, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: urlAvatarImage,
    })
  })
  .then(res => resStatus(res))
};

