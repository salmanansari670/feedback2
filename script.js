const scriptURL = "https://script.google.com/macros/s/AKfycbwJgUZeEeKr9sNhGvl5HQuqjAmHubQxmKxhXR8oVqCPSnqgXuW0BO-f-8YJuOE7Z88U/exec";


document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value,
      roll: document.getElementById("roll").value,
      year: document.getElementById("year").value,
      subject: document.getElementById("subject").value,
      q1: document.querySelector('input[name="q1"]:checked')?.value,
      q2: document.querySelector('input[name="q2"]:checked')?.value,
      q3: document.querySelector('input[name="q3"]:checked')?.value,
      q4: document.querySelector('input[name="q4"]:checked')?.value,
      q5: document.querySelector('input[name="q5"]:checked')?.value,
      q6: document.querySelector('input[name="q6"]:checked')?.value,
      q7: document.querySelector('input[name="q7"]:checked')?.value,
      q8: document.querySelector('input[name="q8"]:checked')?.value,
      q9: document.querySelector('input[name="q9"]:checked')?.value,
      q10: document.querySelector('input[name="q10"]:checked')?.value,
      q11: document.getElementById("q11").value
    };

    fetch(scriptURL, {
  method: "POST",
  mode: "no-cors",
  body: JSON.stringify(data)
})
.then(() => {
  window.location.href = "success.html";   // ✅ redirect
})
.catch(() => {
  alert("Error submitting form ❌");
});

  });

}); // ✅ THIS closing bracket was probably missing
