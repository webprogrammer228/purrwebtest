let inputs = document.querySelectorAll(".main-form__input");
let textarea = document.querySelector(".main-form__textarea");
let form = document.querySelector(".main-form");

form.addEventListener("submit", (e) => {
  inputs.forEach((elem) =>
    elem.value === ""
      ? elem.classList.add("error")
      : elem.classList.remove("error")
  );
  textarea.value === ""
    ? textarea.classList.add("error")
    : textarea.classList.remove("error");

  let errors = document.querySelectorAll(".error");

  if (errors.length === 0) {
    form.submit();
  } else {
    e.preventDefault();
  }
});
