let data;
let currentInputChecked;



function createTemplate() {
  //MAKING TEMPLATE
 
}

//WEB COMPONENT EXPORT

export class Card extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.getData();
    this.shadowRoot.addEventListener("change", (e) => {
       
        
        
        e.target.style.color = "green;"
        console.log(e.target.checked);
        console.log(e.target.id)
        this.getData(e.target.id);
        console.log("EEE");
        
        currentInputChecked = e.target.id;
        });
  }


  
  render(template) {
    this.shadowRoot.innerHTML = template;
    if(currentInputChecked) this.shadowRoot.querySelector(`#${currentInputChecked}`).checked = true;
    else this.shadowRoot.querySelector("#weekly").checked = true;
    

  }
  async getData(dataId) {
    let dataIdNOW = "weekly"
    if(dataId) dataIdNOW = dataId;
    let response;
    try {
      response = await fetch("./data.json");
    } catch (error) {
      console.log("ERROR: ", error);
    }
  
    if (response?.ok) {
      data = await response.json();
      let template = this.createTemplate(dataIdNOW);
      this.render(template)
    } else {
      console.log(`HTTP Response Code: ${response?.status}`);
    }
  }


  createTemplate(dataId) {

    let templateHTML = data
    .map((data) => {
      return `
       

      <div>
      <div style="background: url(/images/icon-${
        data.title.split(" ")[0]
      }.svg) no-repeat right 1rem center,
    ${data.bgcolor};" class="card-img"></div>
      <div class="card">
      
 <div class="card__title">
     <h2>${data.title}</h2>
     <img src="/images/icon-ellipsis.svg" alt="">
   </div>
   <div class="card__stats">
     <h3>${data.timeframes[dataId].current}hrs</h3>
     <p>Last Week - ${data.timeframes[dataId].previous}hrs</p>
   </div>
   </div>
   </div>
  
  `;
    })
    .join("");

    let profileCard = `<div class="profile-card">
    <div class="profile-card__descr">
      <img src="/images/image-jeremy.png" alt="Jeremy face picture">
      <p>Report for</p>
      <h1>Jeremy Robson</h1>
    </div>
    <div class="profile-card__nav">
      <input id="daily" type="radio" name="nav"><label for="daily">Daily</label>
      <input id="weekly" type="radio" name="nav"><label for="weekly">Weekly</label>
      <input id="monthly" type="radio" name="nav"><label for="monthly">Monthly</label>
    </div>
  </div>`; 
  templateHTML =
    `<link rel="stylesheet" href="/dist/card-items.css">` + profileCard + `<div class="cards-wrapper">` + templateHTML + `</div>`;
    return templateHTML;
  }
  
}
