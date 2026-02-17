// Contact form handling with validation and EmailJS send.
// Replace the placeholders below with your EmailJS public key, service ID and template ID.
// - Sign up at https://www.emailjs.com/
// - Create a service, create a template, then copy the public key and IDs into the placeholders.

/* Example setup (replace values):
   emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");
   emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
*/

// initialize (replace with your public key)
if (typeof emailjs !== 'undefined' && emailjs.init) {
  try { emailjs.init("ZxMekqTuldL-AswXM"); } catch(e) { /* noop if not configured */ }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const form = document.getElementById("contactForm");
const submitBtn = form.querySelector("button[type='submit']");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name) {
    alert("Please enter your name.");
    document.getElementById("name").focus();
    return;
  }

  if (!email || !isValidEmail(email)) {
    alert("Please enter a valid email address.");
    document.getElementById("email").focus();
    return;
  }

  if (!message) {
    alert("Please enter a message.");
    document.getElementById("message").focus();
    return;
  }

  // Disable button while sending
  submitBtn.disabled = true;
  const oldText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";

  const templateParams = {
    to_email: "mpreethimani07@gmail.com",
    from_name: name,
    from_email: email,
    message: message
  };

  // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with your EmailJS values
  emailjs.send("service_473au4x", "template_90ztyzd", templateParams)
    .then(function () {
      alert("Message sent — thank you!");
      form.reset();
    })
    .catch(function (error) {
      console.error("EmailJS error:", error);
      alert("Failed to send message. Please try again later.");
    })
    .finally(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = oldText;
    });
});
