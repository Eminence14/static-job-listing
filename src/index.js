const container = document.querySelector('.container')

const getData = async () => {
  const response = await fetch('data.json')
  const data = await response.json()
  displayData(data)
}
getData()

function displayData(data) {
  container.innerHTML = `${data.map(dataTemp).join('')}`
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
      ${datum.new ? showNew() : ''}
      ${datum.featured ? showFeatured() : ''}
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
${datum.languages.map(dat => `<li class="skills">${dat}</li>`).join('')}
${datum.tools.map(dat => `<li class="skills">${dat}</li>`).join('')}
  </ul>
</div>

    `
}

function showNew() {
  return `<span class="new">New!</span>`
}
function showFeatured() {
  return `<span class="featured">Featured</span>`
}