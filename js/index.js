"use strict";

"https://restcountries.com/v2/all";

// Loader
/* 
<div class="lds-ring">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
*/

// Dark-mode and Light mode

$(".fa-sun").addEventListener("click", e => {
  if (e.target.getAttribute("class") == "nav__list_item-moon fa fa-sun") {
    $("body").classList.add("dark-mode");
    e.target.setAttribute("class", "nav__list_item-moon fa fa-moon");
  } else {
    $("body").classList.remove("dark-mode");
    e.target.setAttribute("class", "nav__list_item-moon fa fa-sun");
  }
});

// Api

const api = async () => {
  const request = await fetch("https://restcountries.com/v2/all");
  const result = await request.json();
  renderData(result);
};
api();

// Render Data

function renderData(data = []) {
  $(".section__card-title").innerHTML = `Ma'lumotlar soni: ${data.length} ta`;

  for (const item of data) {
    const element = createDiv(
      "div",
      "section__card_container_box",
      `
      <img class="section__card_container_box-img" src="${item.flags
        .png}" alt="rasm" title="rasm" />
      <div class="section__card_container_box_body">
        <h2 class="section__card_container_box_body-title">${item.name}</h2>
          <p class="section__card_container_box_body-text">
            <strong>Population:</strong> ${item.population}
          </p>
        <p class="section__card_container_box_body-text">
          <strong>Region:</strong> ${item.region}
        </p>
          <p class="section__card_container_box_body-text">
            <strong>Capital:</strong> ${item.capital}
          </p>
        <button type="button" class="section__card_container_box_body-btn" data-information="${item.name
          .split(" ")
          .join("")}">
          Information
        </button>
      </div>
    `
    );

    $(".section__card_container").append(element);
  }

  // Search

  function findFunction(regex) {
    return data.filter(item => {
      return item.name.match(regex);
    });
  }

  $("#search").addEventListener("change", e => {

    $(".section__card_container").innerHTML = `
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;

    const searchValue = e.target.value.trim();
    const regex = new RegExp(searchValue, "gi");
    const find = findFunction(regex);

    if(find.length > 0){
      setTimeout(()=> {
        searchRenderData(find);
      },1000);
    }else {
      $(".section__card_container").innerHTML = "<h1 class='section__card-title-second'>Hech qandey ma'lumot yo'q</h1>";
    }
    
  });

  function searchRenderData(data = []) {
    $(".section__card_container").innerHTML = "";

    for (const item of data) {
      const element = createDiv(
        "div",
        "section__card_container_box",
        `
        <img class="section__card_container_box-img" src="${item.flags
          .png}" alt="rasm" title="rasm" />
        <div class="section__card_container_box_body">
          <h2 class="section__card_container_box_body-title">${item.name}</h2>
            <p class="section__card_container_box_body-text">
              <strong>Population:</strong> ${item.population}
            </p>
          <p class="section__card_container_box_body-text">
            <strong>Region:</strong> ${item.region}
          </p>
            <p class="section__card_container_box_body-text">
              <strong>Capital:</strong> ${item.capital}
            </p>
          <button type="button" class="section__card_container_box_body-btn" data-information="${item.name
            .split(" ")
            .join("")}">
            Information
          </button>
        </div>
      `
      );

      $(".section__card_container").append(element);
    }
  }
}
