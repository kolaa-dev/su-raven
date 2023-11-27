$(document).ready(function () {
  const darkModeBtn = $("#darkMode");
  const bodyMain = $("#main-body");

  const sendMessageButton = $("#sendMessageButton");
  const contactForm = $("#contactForm");
  const errorMessage = $("#errorMessage");
  const successModal = $("#successModal");
  const modalMessage = $("#modalMessage");

  $(document).ready(function () {
    $("#exp-view1").removeClass('hide');
  });
  // Event listener using jQuery
  darkModeBtn.on("click", function () {
    bodyMain.toggleClass('darkON');
    // Store the dark mode preference in localStorage
    if (bodyMain.hasClass('darkON')) {
      localStorage.setItem('darkMode', 'on');
    } else {
      localStorage.removeItem('darkMode');
    }
  });

  // Check if the dark mode preference is stored in localStorage
  if (localStorage.getItem('darkMode') === 'on') {
    bodyMain.addClass('darkON');
  }

  if (window.location.hash) {
    // If the URL contains a hash, scroll to the corresponding section
    const targetSection = $(window.location.hash);
    if (targetSection.length) {
      $('html, body').animate({
        scrollTop: targetSection.offset().top
      }, 'slow');
    }
  }
  // Scroll event using jQuery
  // $('.wrapper').on('scroll', function(event) {
  //   if ($(event.target).scrollTop() === 0) {
  //     header.addClass('scrolled');
  //   } else {
  //     header.addClass('scrolled');
  //   }
  // });

  // DOMContentLoaded event handler for the menu
  var menuIcon = $("#menu-icon");
  var clNav = $("#cl-nav");

  // Function to handle menu click event
  function handleMenuClick() {
    clNav.toggleClass("open");
  }

  // Function to handle outside click event
  function handleOutsideClick(event) {
    if (!clNav.is(event.target) && !menuIcon.is(event.target) && !clNav.has(event.target).length && !menuIcon.has(event.target).length) {
      clNav.removeClass("open");
    }
  }

  // Add click event listener to menu icon
  menuIcon.on("click", handleMenuClick);

  // Add click event listener to document for outside click
  $(document).on("click", handleOutsideClick);

  $(document).on("click", function (event) {
    var clickedElement = event.target;

    // Check if the clicked element has an ID and matches the desired pattern
    if (clickedElement.id == 'close-view') {
      $("#exp-view1, #exp-view2, #exp-view3, #exp-view4, #exp-view5, #exp-view6, #exp-view7, #exp-view8, #exp-view9, #exp-view10").removeClass('hide');
      toggleExperienceView()
    }

    if (clickedElement.id.startsWith('experience-toggle')) {
      var experienceView = $("#exp-view" + clickedElement.id.slice(-1));
      $("#exp-view1, #exp-view2, #exp-view3, #exp-view4, #exp-view5, #exp-view6, #exp-view7, #exp-view8, #exp-view9, #exp-view10").removeClass('hide');
      experienceView.toggleClass("hide");
      toggleExperienceView()
    }
  });

  $(document).on("click", function (event) {
    var clickedElement = event.target;

    if (clickedElement.id == 'close-view') {
      $("#education-view1, #education-view2, #education-view3, #education-view4, #education-view5").removeClass('hide');
      toggleExperienceView()
    }
    if (clickedElement.id.startsWith('education-toggle')) {
      var educationView = $("#education-view" + clickedElement.id.slice(-1));
      $("#education-view1, #education-view2, #education-view3, #education-view4, #education-view5").removeClass('hide');
      educationView.toggleClass("hide");
      toggleExperienceView()
    }
  });
});

// js plane coded
let commentbtn = document.getElementById('commentButton')
let commentbox = document.getElementById('commentbox')
if (commentbtn) {
  commentbtn.addEventListener("click", () => {
    commentbox.classList.toggle('hide')
  })
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Attach an event listener to the button for the click event
document.getElementById('scrollToTopButton').addEventListener('click', scrollToTop);
function changeTab(tabId) {
  console.log('tab clicked')
  // Remove "active" class from all tabs
  const tabs = document.querySelectorAll('#cl-nav-tabs');
  tabs.forEach(tab => tab.classList.remove('active'));
  console.log(tabs)
  // Add "active" class to the clicked tab
  const clickedTab = document.getElementById(tabId);
  clickedTab.classList.add('active');

  // Store the active tab's ID in session storage
  localStorage.setItem('activeTab', tabId);
}
// Retrieve the active tab ID from session storage
const activeTab = localStorage.getItem('activeTab');

if (activeTab) {
  // Remove "active" class from all tabs
  const tabs = document.querySelectorAll('#cl-nav-tabs');
  tabs.forEach(tab => tab.classList.remove('active'));

  // Add "active" class to the stored active tab
  const storedTab = document.getElementById(activeTab);
  if (storedTab) {
    storedTab.classList.add('active');
  }
}
function toggleExperienceView() {
  const elementsWithHideClass = document.querySelectorAll('.experience-view');
  const elementsWithEduHideClass = document.querySelectorAll('.education-view');
  const body = document.body;

  const anyElementHidden = Array.from(elementsWithHideClass).some(element => element.classList.contains('hide'));
  const anyElementEduHidden = Array.from(elementsWithEduHideClass).some(element => element.classList.contains('hide'));

  if (anyElementHidden || anyElementEduHidden) {
    body.classList.add('modal-open');
  } else {
    body.classList.remove('modal-open');
  }
}

// plane javascript

document.addEventListener("DOMContentLoaded", function () {
  // Function to handle button click and open CAPTCHA
  function openCaptcha() {
    // Display the CAPTCHA
    document.getElementById('captcha').style.display = "block";
    // Hide the "Open CAPTCHA" button
    document.getElementById('openCaptchaButton').style.display = "none";
    // Show the "Send Message" button
    document.getElementById('sendMessageButton').style.display = "block";
  }

  // Function to handle form submission
  async function submitForm() {
    // Check if CAPTCHA is checked
    const captchaVerified = await grecaptcha.getResponseAsync();

    if (captchaVerified === null || captchaVerified === "") {
      alert("Please complete the CAPTCHA before submitting.");
      return;
    }

    // Modify your form data if needed
    const form = document.getElementById("demo-form");
    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server (success or error message)
        if (data.success) {
          // CAPTCHA verified and message sent successfully
          alert("Message sent successfully.");
          form.reset(); // Clear the form
        } else {
          alert("Error: " + data.message); // Display the error message
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Add event listener to the "Open CAPTCHA" button
  const openCaptchaButton = document.getElementById("openCaptchaButton");
  openCaptchaButton.addEventListener("click", function () {
    // Open the CAPTCHA when the button is clicked
    openCaptcha();
  });

  // Add event listener to the "Send Message" button
  const sendMessageButton = document.getElementById("sendMessageButton");
  sendMessageButton.addEventListener("click", function () {
    // Submit the form when the button is clicked
    submitForm();
  });
});