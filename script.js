const form = document.getElementById("form");
const nameInput = document.getElementById("nameInput");
const submit = document.getElementById("submit");
const mainContainer = document.getElementById("mainContainer");
const informationContainer = document.createElement("informationContainer");
informationContainer.classList.add("informationContainer");
const nameContainer = document.createElement("div");
const genderContainer = document.createElement("div");
const agePredictionContainer = document.createElement("div");
const countryContainer = document.createElement("div");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(`https://api.genderize.io?name=${nameInput.value}`)
    .then((res) => res.json())
    .then((data) => {
      const gender = data.gender;
      fetch(`https://api.agify.io?name=${nameInput.value}`)
        .then((res) => res.json())
        .then((data) => {
          const age = data.age;
          fetch(`https://api.nationalize.io?name=${nameInput.value}`)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              const country = data.country[0].country_id;
              nameContainer.textContent = "Name: " + nameInput.value;
              genderContainer.textContent = "Gender: " + gender;
              agePredictionContainer.textContent = "Predicted age: " + age;
              countryContainer.textContent = "Predicted country: " + country;
            });
        });
    });
  mainContainer.append(informationContainer);
  informationContainer.append(
    nameContainer,
    genderContainer,
    agePredictionContainer,
    countryContainer
  );
});
