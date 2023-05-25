/**
 * Author:
 */
(function () {
  "use strict";
  const tokenTg = "6248979310:AAGGKL2Ox9dgsQRoZ3HRehuNvuueWVQIDNA";
  const chat_id = "1369608081";
  const formMessage = document.querySelector("#message");
  const nameValue = document.querySelector("#name");
  const emailValue = document.querySelector("#email");
  const textValue = document.querySelector("#subject");
  const toastLive = document.getElementById("liveToast");
  const toastBody = document.querySelector(".toast-body");
  const imageCheck = document.querySelector(".image-check");
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);
  const subscribe = document.querySelector("#subscribe");
  const subscribeEmail = document.querySelector("#subscribe-email");
  formMessage.addEventListener("submit", (event) => {
    event.preventDefault();
    if (
      nameValue.value.length ||
      emailValue.value.length ||
      textValue.value.length
    ) {
      sendTelegram(nameValue.value, emailValue.value, textValue.value);
    }
  });
  subscribe.addEventListener("submit", (event) => {
    event.preventDefault();
    if (subscribeEmail.value.length) {
      sendTelegram("subscribe", subscribeEmail.value, "subscribe text");
      setTimeout(() => subscribeEmail.value = "", 1000)
    }
  });
  function sendTelegram(name, email, text) {
    const message = `Sizga yangi xabar bor ${name} dan pochtasi ${email}  matni ${text}`;
    const url = `https://api.telegram.org/bot${tokenTg}/sendMessage?chat_id=${chat_id}&text=${message}`;
    fetch(url)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          imageCheck.setAttribute("src", "./assets/img/check.png");
          toastBody.textContent = "Message Send Success";
          toastBootstrap.show();
          nameValue.value = "";
          emailValue.value = "";
          textValue.value = "";
        }
      })
      .catch((error) => {
        imageCheck.setAttribute("src", "./assets/img/errorIcon.png");
        toastBody.textContent = error.message || "something went wrong";
        toastBootstrap.show();
      });
  }
})();