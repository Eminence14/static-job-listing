const container = document.querySelector(".container");
const filterContainer = document.querySelector(".filter");
const clearFilters = document.querySelector(".clear");

// Fetch data from data.json
const getData = async () => {
  const response = await fetch("data.json");
  const data = await response.json();
  displayData(data);
  return data;
};
getData();

// display data to the page
function displayData(data) {
  container.innerHTML = `${data.map(dataTemp).join("")}`;
}

function dataTemp(datum) {
  return `
    
<div class="card">
  <div class="card_image">
    <img src="${datum.logo}" alt="">
  </div>
  <div class="card_description">
    <div class="card_description_top bott">
      <h4 class="company_name">${datum.company}</h4>
      ${datum.new ? `<span class='new'>New!</span>` : ""}
      ${datum.featured ? `<span class="featured">Featured</span>` : ""}
    </div>
    <h4 class="card_description_middle bott">${datum.position}
    </h4>
    <div class="card_description_bottom bott">
      <span class="post_time">${datum.postedAt}</span> &nbsp; &bull; &nbsp;
      <span class="contract">${datum.contract}</span> &nbsp; &bullet; &nbsp;
      <span class="location">${datum.location}</span>
    </div>
  </div>
  <hr>
  <ul class="card_skills">
${datum.languages.map((dat) => `<li class="skills">${dat}</li>`).join("")}
${datum.tools.map((dat) => `<li class="skills">${dat}</li>`).join("")}
  </ul>
</div>

    `;
}

async function filter() {
  await getData();
  const skills = document.querySelectorAll(".skills");
  const allFilters = [];

  skills.forEach((skill) => {
    skill.addEventListener("click", (e) => {
      let token = true;
      const targetText = e.target.textContent;
      const skillSet = document.querySelectorAll(".card_skills");
      const filterTexts = document.querySelectorAll(".search_title");

      allFilters.push(targetText);

      filterTexts.forEach((text) => {
        if (text.textContent.includes(e.target.textContent)) token = false;
      });

      filterCards(skillSet, allFilters);
      showFilter(token, targetText);
    });
  });
}
filter();

function filterCards(set, target) {
  for (let key of target) {
    set.forEach((subSet) => {
      if (!subSet.textContent.includes(key))
        container.removeChild(subSet.parentElement);
    });
  }
}

function showFilter(token, targetText) {
  if (token) {
    filterContainer.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="search">
      <span class="search_title">${targetText}</span>
      <span class="remove">&times;</span>
      </div>`
    );
  }
}

clearFilters.addEventListener("click", () => {
  const searchParams = Array.from(filterContainer.children);
  searchParams.forEach((param) => {
    if (param.tagName.toLowerCase() === "div")
      filterContainer.removeChild(param);
  });
  clearFilter();
  filter();
});
async function clearFilter() {
  const pageData = await getData();
  displayData(pageData);
}

filterContainer.addEventListener("click", (e) => {
  if (!e.target.closest("span.remove")) return;
  e.target.parentElement.remove();

  const allFilters = [];
  const appliedFilters = Array.from(filterContainer.children);
  appliedFilters.splice(appliedFilters.length - 1, 1);

  // get index of the clicked filter
  appliedFilters.forEach((filter) => {
    allFilters.push(Array.from(filter.children)[0].textContent);
  });

  clearFilter();
  pageAfterRemFilter(allFilters);
  if (allFilters.length === 0) {
    clearFilters.click()
  }
});

async function pageAfterRemFilter(allFilters) {
  await clearFilter();
  const allSkills = document.querySelectorAll(".card_skills");

  for (let key of allFilters) {
    allSkills.forEach((skill) => {
      const skillParent = skill.parentElement;
      if (skill.innerText.includes(key)) {
        if (window.innerWidth > 800)
          skillParent.style.display = 'flex'
        else {
          skillParent.style.display = 'block';
        }
      } else {
        skillParent.style.display = 'none'
      }
    });
  }
}
