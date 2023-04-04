document.addEventListener("DOMContentLoaded", function () {
  let rim = document.querySelector(".rim");
  let eight = document.querySelector(".eight");
  let triangle = document.querySelector(".triangle");
  let response = document.querySelector(".response");
  let eye = document.querySelector(".eye");
  let ballContainer = document.querySelector(".ball-container");
  let isShaking = false;
  
  var responses = [
      "It is certain",
      "It is decidedly so",
      "Without a doubt",
      "Yes definitely",
      "You may rely on it",
      "As I see it, yes",
      "Most likely",
      "Outlook good",
      "Yes",
      "Signs point to yes",
      "Reply hazy try again",
      "Ask again later",
      "Better not tell you now",
      "Cannot predict now",
      "Do not count on it",
      "My reply is no",
      "My sources say no",
      "Outlook not so good",
      "Very doubtful",
  ];
  
  var getResponse = function () {
      return responses[Math.floor(Math.random() * responses.length)];
  };

  rim.addEventListener("mousedown", startDrag);
  rim.addEventListener("touchstart", startDrag);

  function startDrag(event) {
      event.preventDefault();
      isShaking = true;
      
      let initialX = event.clientX || event.touches[0].clientX;
      let initialY = event.clientY || event.touches[0].clientY;

      let xOffset = 0;
      let yOffset = 0;

      document.addEventListener("mousemove", trackDrag);
      document.addEventListener("touchmove", trackDrag);
      document.addEventListener("mouseup", stopDrag);
      document.addEventListener("touchend", stopDrag);

      function trackDrag(event) {
          if (isShaking) {
              let currentX = event.clientX || event.touches[0].clientX;
              let currentY = event.clientY || event.touches[0].clientY;

              xOffset = currentX - initialX;
              yOffset = currentY - initialY;

              initialX = currentX;
              initialY = currentY;

              rim.style.transform = "translate3d(" + xOffset + "px, " + yOffset + "px, 0)";
          }
      }

      function stopDrag(event) {
          isShaking = false;
          rim.style.transform = "none";
          ballContainer.classList.remove("no-shadow");
          document.removeEventListener("mousemove", trackDrag);
          document.removeEventListener("touchmove", trackDrag);
          document.removeEventListener("mouseup", stopDrag);
          document.removeEventListener("touchend", stopDrag);
          shakeBall();
      }

      eight.style.opacity = 1;
      triangle.classList.remove("active");
      response.classList.remove("active");
      rim.classList.remove("pulse");
      eye.classList.remove("glow");
      ballContainer.classList.add("no-shadow");
  }

  function shakeBall() {
      if (!isShaking) {
          eight.style.opacity = 0;
          triangle.classList.add("active");
          response.classList.add("active");
          response.innerHTML = getResponse();
          rim.classList.add("pulse");
          eye.classList.add("glow");
      } else {
          let colors = ["#FF4136", "#FF851B", "#FFDC00", "#2ECC40", "#0074D9", "#B10DC9"];
          let color = colors[Math.floor(Math.random() * colors.length)];
          ballContainer.style.boxShadow = `0 0 20px ${color}`;
      }
  }
});
