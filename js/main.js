let fragment = document.createDocumentFragment();
let elWrapperCard = document.querySelector(".js-poke-list");
let eltempalteCard = document.querySelector(
  ".js-card-pokemon-template"
).content;
let elFormSearch = document.querySelector(".js-form-for-top-functionality");
let elInputSearch = document.querySelector(".js-search-input");
let elCategorySearch = document.querySelector(".js-search-by-category");
let elSortSelectOption = document.querySelector(".js-sort-by-category");

let categoryWeaknesses = [];

function uniqueCategories(arr) {
  for (const poke of arr) {
    let pokeWeaknesses = poke.weaknesses;
    for (const weaknesses of pokeWeaknesses) {
      if (!categoryWeaknesses.includes(weaknesses)) {
        categoryWeaknesses.push(weaknesses);
      }
    }
  }
}
uniqueCategories(pokemons);

function renderOptions(arr) {
  if (arr.length === 0) {
    console.warn("No category weaknesses found.");
    return;
  }
  arr.forEach((item) => {
    let option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    elCategorySearch.appendChild(option);
  });
}
renderOptions(categoryWeaknesses);

function handleRender(arr, node) {
  fragment.innerHTML = "";
  arr.forEach((poke) => {
    let clonenode = eltempalteCard.cloneNode(true);
    clonenode.querySelector(".js-poke-num").textContent = poke.num;
    clonenode.querySelector(".js-poke-image").src = poke.img;
    clonenode.querySelector(".js-poke-name").textContent = poke.name;
    clonenode.querySelector(
      ".js-poke-hight"
    ).textContent = `: ${poke.height} m`;
    clonenode.querySelector(
      ".js-poke-weight"
    ).textContent = `: ${poke.weight} kg`;
    clonenode.querySelector(".js-poke-spawn-time").textContent =
      poke.spawn_time;
    clonenode.querySelector(".js-poke-weaknesses").textContent =
      poke.weaknesses.join(", ");
    fragment.appendChild(clonenode);
  });

  node.appendChild(fragment);
}
handleRender(pokemons, elWrapperCard);

// search functionality
elFormSearch.addEventListener("submit", (evet) => {
  evet.preventDefault();
  elWrapperCard.innerHTML = "";
  let inputValue = elInputSearch.value.trim();
  let selectedCategory = elCategorySearch.value;
  let searchRegex = new RegExp(inputValue, "ig");
  let searchFunctionality = pokemons.filter((item) => {
    return (
      (inputValue == "" || item.name.match(searchRegex)) &&
      (selectedCategory === "all" || item.weaknesses.includes(selectedCategory))
    );
  });

  if (searchFunctionality.length > 0) {
    if (elSortSelectOption.value == "AtoZ") {
      searchFunctionality.sort((a, b) => {
        return (
          a.name.toLowerCase().charCodeAt(0) -
          b.name.toLowerCase().charCodeAt(0)
        );
      });
    }
    if (elSortSelectOption.value == "ZtoA") {
      searchFunctionality.sort((a, b) => {
        return (
          b.name.toLowerCase().charCodeAt(0) -
          a.name.toLowerCase().charCodeAt(0)
        );
      });
    }
    handleRender(searchFunctionality, elWrapperCard);
  } else {
    alert("not found");
  }
});
