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
const loading = document.createElement("p");
const invalidName = document.createElement("p");
const genderProbability = document.createElement("div");
//pppppppp
form.addEventListener("submit", (e) => {
  e.preventDefault();
  loading.textContent = "Loading...";
  loading.style.margin = "auto";
  fetch(`https://api.genderize.io?name=${nameInput.value}`)
    .then((res) => res.json())
    .then((data) => {
      const name = nameInput.value;
      const probability = data.probability;
      const gender = data.gender;
      fetch(`https://api.agify.io?name=${nameInput.value}`)
        .then((res) => res.json())
        .then((data) => {
          const age = data.age;
          fetch(`https://api.nationalize.io?name=${nameInput.value}`)
            .then((res) => res.json())
            .then((data) => {
              if (probability > 0) {
                nameContainer.textContent =
                  "Name: " +
                  name.charAt(0).toUpperCase() +
                  name.slice(1).toLowerCase();
                genderProbability.textContent =
                  "Gender Probability: " + probability * 100 + "%";
                genderContainer.textContent =
                  "Gender: " + gender.charAt(0).toUpperCase() + gender.slice(1);
                agePredictionContainer.textContent = "Predicted Age: " + age;
                countryContainer.textContent =
                  "Predicted Country: " + data.country[0].country_id;
                invalidName.textContent = "";
              } else {
                nameContainer.textContent = "";
                genderContainer.textContent = "";
                agePredictionContainer.textContent = "";
                countryContainer.textContent = "";
                invalidName.textContent = "Invalid Name!";
                invalidName.style.margin = "auto";
              }
            });
        });
      loading.style.display = "none";
    });
  mainContainer.append(informationContainer);
  informationContainer.append(
    nameContainer,
    genderContainer,
    genderProbability,
    agePredictionContainer,
    countryContainer,
    loading,
    invalidName
  );
});
