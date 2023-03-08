"use strict";

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
let response = false;
const api = async () => {
  const request = await fetch("https://restcountries.com/v2/all");
  const result = await request.json();
  response = true;
  renderData(result);
};
api();

if (!response) {
  $(".section__card-title").innerHTML = `
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `;
}

// Render Data

function renderData(data = []) {
  $(".section__card-title").innerHTML = `Ma'lumotlar soni: ${data.length} ta`;

  for (const item of data) {
    const element = createDiv(
      "div",
      "section__card_container_box",
      `
      <img class="section__card_container_box-img" src="${item.flags?.png}" alt="rasm" title="rasm" />
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
        <button type="button" class="section__card_container_box_body-btn" data-information="${item.area}">
          Information
        </button>
      </div>
    `
    );

    $(".section__card_container").append(element);
  }

  // Search

  function findFunction(regex) {
    if (regex == "/All/gi") {
      return data;
    }
    return data.filter(item => {
      return item.name.match(regex) || item.region.match(regex);
    });
  }

  $("#search").addEventListener("input", e => {

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

    if (find.length > 0) {
      setTimeout(() => {
        searchRenderData(find);
        $(".section__card-title").innerHTML = `Ma'lumotlar soni: ${find.length} ta`;
      }, 1000);
    } else {
      $(".section__card_container").innerHTML = `
        <h1 class="section__card-title">Hech qandey ma'lumot yo'q</h1>
      `;
    }

  });

  function searchRenderData(data = []) {
    $(".section__card_container").innerHTML = "";

    for (const item of data) {
      const element = createDiv(
        "div",
        "section__card_container_box",
        `
        <img class="section__card_container_box-img" src="${item.flags?.png}" alt="rasm" title="rasm" />
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
          <button type="button" class="section__card_container_box_body-btn" data-information="${item.area}">
            Information
          </button>
        </div>
      `
      );

      $(".section__card_container").append(element);
    }
  }

  // Filter Data
  const regions = [];

  for (const region of data) {
    if (!regions.includes(region.region)) {
      regions.push(region.region);
    }
  }

  regions.sort();
  regions.unshift("All");

  for (const region of regions) {
    const option = createDiv("option", "main__form_select-option", region);
    $(".main__form_select").append(option);
  }

  $(".main__form_select").addEventListener("change", (e) => {

    $(".section__card_container").innerHTML = `
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;

    const filterValue = e.target.value.trim();
    const regex = new RegExp(filterValue, "gi");
    const selectFilter = findFunction(regex);

    if (selectFilter.length > 0) {
      setTimeout(() => {
        selectRender(selectFilter);
      }, 1000);
      $(".section__card-title").innerHTML = `Ma'lumotlar soni: ${selectFilter.length} ta`;
    }
  });

  function selectRender(data = []) {
    $(".section__card_container").innerHTML = "";

    for (const item of data) {

      const element = createDiv(
        "div",
        "section__card_container_box",
        `
        <img class="section__card_container_box-img" src="${item.flags.png}" alt="rasm" title="rasm" />
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
          <button type="button" class="section__card_container_box_body-btn" data-information="${item.area}">
            Information
          </button>
        </div>
      `
      );

      $(".section__card_container").append(element);
    }
  }

  $(".section__card_container").addEventListener("click", (e) => {
    if (e.target.dataset.information) {
      $(".section__modal").classList.add("active");
      const clickBtnData = data.filter(el => el.area == e.target.dataset.information);
      modalRender(clickBtnData);
    }

    function modalRender(data = []) {
      for (const item of data) {
        $(".wrapper").innerHTML = `
        <button type="button" class="section__modal-btn">
          <i class="fa fa-arrow-left" aria-hidden="true"></i> Back
        </button>
          <div class="section__modal_container">
        <div class="section__modal_container_box">
          <img src="${item.flags?.svg}" alt="rasm" title="rasm" class="section__modal_container_box-img" />
        </div>
        <div class="section__modal_container_box">
          <div class="section__modal_container_box_fluid">
            <div class="section__modal_container_box_fluid_small">
              <h2 class="section__modal_container_box_fluid_small-title">
                ${item.name}
              </h2>
              <p class="section__modal_container_box_fluid_small_text">
                <span class="section__modal_container_fluid_box_small_text-span">
                  Native Name:
                </span>
                ${item.nativeName}
              </p>
              <p class="section__modal_container_box_fluid_small_text">
                <span class="section__modal_container_box_fluid_small_text-span">
                  Population:
                </span>
                ${item.population}
              </p>
              <p class="section__modal_container_box_fluid_small_text">
                <span class="section__modal_container_box_fluid_small_text-span">
                  Region:
                </span>
                ${item.region}
              </p>
              <p class="section__modal_container_box_fluid_small_text">
                <span class="section__modal_container_box_small_text-span">
                  Sub Region:
                </span>
                ${item.subregion}
              </p>
              <p class="section__modal_container_box_fluid_small_text">
                <span class="section__modal_container_box_fluid_small_text-span">
                  Capital:
                </span>
                ${item.capital}
              </p>
            </div>
            <div class="section__modal_container_box_fluid_small">
              <p class="section__modal_container_box_fluid_small_text">
                <span class="section__modal_container_box_fluid_small_text-span">
                  Top Level Domain:
                </span>
                ${item.topLevelDomain}
              </p>
              <p class="section__modal_container_box_fluid_small_text">
                <span class="section__modal_container_box_fluid_small_text-span">
                  Currencies:
                </span>
                ${item.currencies[0]?.name ? item.currencies[0]?.name : "NOT FOUND"}
              </p>
              <p class="section__modal_container_box_fluid_small_text">
                <span class="section__modal_container_box_fluid_small_text-span">
                  Languages:
                </span>
                ${item.languages[0]?.name}
              </p>
            </div>
            </div>
              <div class="section__modal_container_buttons">
                <h3 class="section__modal_container_buttons-title">
                  Border Countries:
                </h3>
              </div>
            </div>
          </div>
        `;
        item.borders ? item.borders.forEach(el => {
          const countries = createDiv("button", "section__modal_container_buttons-btn", el ? el : "NOT FOUND");
          $(".section__modal_container_buttons").append(countries);
        }) : $(".section__modal_container_buttons").textContent = "Border Countries: NOT FOUND";
      }

      $(".section__modal").addEventListener("click", (e) => {
        if (e.target.getAttribute("class") == "section__modal-btn") {
          $(".section__modal").classList.remove("active");
        }
      });
    }
  })
}
