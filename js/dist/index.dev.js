"use strict";
"https://restcountries.com/v2/all"; // Loader

/* 
<div class="lds-ring">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
*/
// Dark-mode and Light mode

$(".fa-sun").addEventListener("click", function (e) {
  if (e.target.getAttribute("class") == "nav__list_item-moon fa fa-sun") {
    $("body").classList.add("dark-mode");
    e.target.setAttribute("class", "nav__list_item-moon fa fa-moon");
  } else {
    $("body").classList.remove("dark-mode");
    e.target.setAttribute("class", "nav__list_item-moon fa fa-sun");
  }
}); // Api

var api = function api() {
  var request, result;
  return regeneratorRuntime.async(function api$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("https://restcountries.com/v2/all"));

        case 2:
          request = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(request.json());

        case 5:
          result = _context.sent;
          renderData(result);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

api(); // Render Data

function renderData() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  $(".section__card-title").innerHTML = "Ma'lumotlar soni: ".concat(data.length, " ta");
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      var element = createDiv("div", "section__card_container_box", "\n      <img class=\"section__card_container_box-img\" src=\"".concat(item.flags.png, "\" alt=\"rasm\" title=\"rasm\" />\n      <div class=\"section__card_container_box_body\">\n        <h2 class=\"section__card_container_box_body-title\">").concat(item.name, "</h2>\n          <p class=\"section__card_container_box_body-text\">\n            <strong>Population:</strong> ").concat(item.population, "\n          </p>\n        <p class=\"section__card_container_box_body-text\">\n          <strong>Region:</strong> ").concat(item.region, "\n        </p>\n          <p class=\"section__card_container_box_body-text\">\n            <strong>Capital:</strong> ").concat(item.capital, "\n          </p>\n        <button type=\"button\" class=\"section__card_container_box_body-btn\" data-information=\"").concat(item.name.split(" ").join(""), "\">\n          Information\n        </button>\n      </div>\n    "));
      $(".section__card_container").append(element);
    } // Search

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  function findFunction(regex) {
    return data.filter(function (item) {
      return item.name.match(regex);
    });
  }

  $("#search").addEventListener("change", function (e) {
    $(".section__card_container").innerHTML = "\n      <div class=\"lds-ring\">\n        <div></div>\n        <div></div>\n        <div></div>\n        <div></div>\n      </div>\n    ";
    var searchValue = e.target.value.trim();
    var regex = new RegExp(searchValue, "gi");
    var find = findFunction(regex);

    if (find.length > 0) {
      setTimeout(function () {
        searchRenderData(find);
      }, 2000);
    } else {
      $(".section__card_container").innerHTML = "<h1 class='section__card-title-second'>Hech qandey ma'lumot yo'q</h1>";
    }
  });

  function searchRenderData() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    $(".section__card_container").innerHTML = "";
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var item = _step2.value;
        var element = createDiv("div", "section__card_container_box", "\n        <img class=\"section__card_container_box-img\" src=\"".concat(item.flags.png, "\" alt=\"rasm\" title=\"rasm\" />\n        <div class=\"section__card_container_box_body\">\n          <h2 class=\"section__card_container_box_body-title\">").concat(item.name, "</h2>\n            <p class=\"section__card_container_box_body-text\">\n              <strong>Population:</strong> ").concat(item.population, "\n            </p>\n          <p class=\"section__card_container_box_body-text\">\n            <strong>Region:</strong> ").concat(item.region, "\n          </p>\n            <p class=\"section__card_container_box_body-text\">\n              <strong>Capital:</strong> ").concat(item.capital, "\n            </p>\n          <button type=\"button\" class=\"section__card_container_box_body-btn\" data-information=\"").concat(item.name.split(" ").join(""), "\">\n            Information\n          </button>\n        </div>\n      "));
        $(".section__card_container").append(element);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }
}