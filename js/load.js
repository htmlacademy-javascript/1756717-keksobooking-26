const getData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/keksobookin/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail('Не удалось получить данные объявлений');
    });
};

export { getData };
