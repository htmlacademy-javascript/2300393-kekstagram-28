const imgFilters = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const inactivateButtons = () => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
};
const activateButton = (button) => {
  button.classList.add('img-filters__button--active');
};

const changeToButton = (button) => {
  inactivateButtons();
  activateButton(button);
};

const setFilterButtonsEvt = () => {
  imgFilters.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      changeToButton(evt.target);
      //console.log(evt.target.classList);
    }
  });
};

export { setFilterButtonsEvt };
