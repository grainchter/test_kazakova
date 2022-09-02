let PASSWORD; // сохраняем пароль, который ввел пользователь
let CONF_PASS; // сохраняем пароль, введенные в поле "проверка пароля"
let MAX_DATE; // сохраняем максимально допустимое значение даты рождения

// этот блок функций предназначен для отслеживания изменений в input`ах
// и проверки введенных данных в реальном времени
// если введенные данные удовлетворяют условию регулярного выражение,
// то подсказка исчезает и появляется символ "✓" как знак успешного выполнения
// если условие не выполняется, символу "✓" присаивается цвет "transparent", чтобы визуально скрыть,
// а не  удалить из DOM-дерева, как это делает атрибут hidden.
// Если правильно будет так сказать. Hidden заставляет элемент вести себя так, словно его не существует.
let changeFirstName = (name) => {
  const regular = /^[a-zA-ZА-Яа-яЁё]+$/g;
  let firstNameLabel = document.querySelector("#firstnameLabel");
  let firstnameBoxSucess = document.querySelector("#firstnameBoxSucess");

  if (regular.test(name)) {
    firstNameLabel.hidden = "hidden";
    firstnameBoxSucess.style.color = "rgb(15, 181, 0)";
  } else {
    firstNameLabel.removeAttribute("hidden");
    firstnameBoxSucess.style.color = "transparent";
  }
};

let changeLastName = (name) => {
  const regular = /^[a-zA-ZА-Яа-яЁё]+$/g;
  let lastNameLabel = document.querySelector("#lastnameLabel");
  let lastnameBoxSucess = document.querySelector("#lastnameBoxSucess");

  if (regular.test(name)) {
    lastNameLabel.hidden = "hidden";
    lastnameBoxSucess.style.color = "rgb(15, 181, 0)";
  } else {
    lastNameLabel.removeAttribute("hidden");
    lastnameBoxSucess.style.color = "transparent";
  }
};

let changeEmail = (name) => {
  const regular = /([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})/g;
  let emailLabel = document.querySelector("#emailLabel");
  let emailBoxSucess = document.querySelector("#emailBoxSucess");

  if (regular.test(name)) {
    emailLabel.hidden = "hidden";
    emailBoxSucess.style.color = "rgb(15, 181, 0)";
  } else {
    emailLabel.removeAttribute("hidden");
    emailBoxSucess.style.color = "transparent";
  }
};

let changePass = (name) => {
  PASSWORD = name;

  const regularNum = /[0-9]/g;
  const regularLowercase = /[a-zа-я]/g;
  const regularCursive = /[A-ZА-Я]/g;
  const regularSymbol = /[!@#$%^&*~]/g;
  let labelPassLength = document.querySelector("#labelPassLength");
  let labelPassNum = document.querySelector("#labelPassNum");
  let labelPassLowercase = document.querySelector("#labelPassLowercase");
  let labelPassCursive = document.querySelector("#labelPassCursive");
  let labelPassSymbol = document.querySelector("#labelPassSymbol");

  if (PASSWORD == CONF_PASS) {
    labelConfPass.hidden = "hidden";
    confPassBoxSucess.style.color = "rgb(15, 181, 0)";
  } else {
    labelConfPass.removeAttribute("hidden");
    confPassBoxSucess.style.color = "transparent";
  }

  if (regularNum.test(name)) {
    labelPassNum.hidden = "hidden";
  } else {
    labelPassNum.removeAttribute("hidden");
  }

  if (regularLowercase.test(name)) {
    labelPassLowercase.hidden = "hidden";
  } else {
    labelPassLowercase.removeAttribute("hidden");
  }

  if (regularCursive.test(name)) {
    labelPassCursive.hidden = "hidden";
  } else {
    labelPassCursive.removeAttribute("hidden");
  }

  if (regularSymbol.test(name)) {
    labelPassSymbol.hidden = "hidden";
  } else {
    labelPassSymbol.removeAttribute("hidden");
  }

  if (name.length >= 8) {
    labelPassLength.hidden = "hidden";
  } else {
    labelPassLength.removeAttribute("hidden");
  }

  checkPassValid(
    labelPassLength,
    labelPassNum,
    labelPassLowercase,
    labelPassCursive,
    labelPassSymbol
  );
};

let changeConfPass = (name) => {
  let labelConfPass = document.querySelector("#labelConfPass");
  let confPassBoxSucess = document.querySelector("#confPassBoxSucess");

  CONF_PASS = name;

  if (PASSWORD == name) {
    labelConfPass.hidden = "hidden";
    confPassBoxSucess.style.color = "rgb(15, 181, 0)";
  } else {
    labelConfPass.removeAttribute("hidden");
    confPassBoxSucess.style.color = "transparent";
  }
};

let changeBirthday = (name) => {
  let currentDate = new Date(name);
  let maxate = new Date(MAX_DATE);

  let labelBirthday = document.querySelector("#labelBirthday");
  let birthdayBoxSucess = document.querySelector("#birthdayBoxSucess");

  if (maxate >= currentDate) {
    labelBirthday.hidden = "hidden";
    birthdayBoxSucess.style.color = "rgb(15, 181, 0)";
  } else {
    labelBirthday.removeAttribute("hidden");
    birthdayBoxSucess.style.color = "transparent";
  }
};

// --------------------------------------------------------
// конец блока

// данная функция проверяет, что выполнены все условия валидности пароля: длина, наличие символов и т.д.
let checkPassValid = (
  labelPassLength,
  labelPassNum,
  labelPassLowercase,
  labelPassCursive,
  labelPassSymbol
) => {
  let passBoxSucess = document.querySelector("#passBoxSucess");

  if (
    labelPassLength.hidden == true &&
    labelPassNum.hidden == true &&
    labelPassLowercase.hidden == true &&
    labelPassCursive.hidden == true &&
    labelPassSymbol.hidden == true
  ) {
    passBoxSucess.style.color = "rgb(15, 181, 0)";
  } else {
    passBoxSucess.style.color = "transparent";
  }
};

// находим значение максимально допустимой даты в миллисекундах и преобразуем в человекочитаем вид
let changeMaxDate = () => {
  let date = new Date();
  const years18 = 568036800000 - 86400000;
  let max = date - years18;

  let maxDate = new Date(max);
  MAX_DATE = maxDate;
};

// проверяем итоги валидации
// если все поля заполнены верно, то делаем кнопку "Отправить" активной
let checkValidation = () => {
  let counter = 0;
  let labelsArr = document.getElementsByClassName("sucessfull");
  let submitBtn = document.querySelector("#submitBtn");

  for (let i = 0; i < labelsArr.length; i++) {
    if (labelsArr[i].style.color == "rgb(15, 181, 0)") {
      counter++;
    }
  }

  if (counter == 6) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
};
