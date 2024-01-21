let flag = 0
let res = []
function handleEventChange() {
    const eventSelect = document.getElementById('event');
    const ageInputDiv = document.getElementById('ageInput');
    const ageInput = document.getElementById('age');
  
    if (eventSelect.value === 'יום הולדת') {
      ageInputDiv.style.display = 'block';
    } else {
      ageInputDiv.style.display = 'none';
      ageInput.value = '';
    }
  }
  function rel(){
    location.reload();
    flag = 0
    res = []
    }
  function submitChoices() {
    const responseContainer = document.getElementById('responseContainer')
    const category = document.getElementById('category').value;
    const event = document.getElementById('event').value;
    const age = document.getElementById('age').value;
    const atmosphere = document.getElementById('atmosphere').value
    const obj = {
      category:category,
      atmosphere:atmosphere,
      event:event,
      age:age
    }

    responseContainer.style.display = 'block';
    responseContainer.innerHTML = `<p>אנא המתן</p>`;
    const ageInput = document.getElementById('age');
    const categorySelect = document.getElementById('category');
    const eventSelect = document.getElementById('event');
    const atmosphereSelect = document.getElementById('atmosphere');
    const reButton = document.getElementById("rel")
    
    categorySelect.style.display = 'none'
    eventSelect.style.display = 'none'
    atmosphereSelect.style.display = 'none'
    ageInput.style.display = 'none';
    document.querySelector('label[for="category"]').style.display = 'none';    
    document.querySelector('label[for="event"]').style.display = 'none';    
    document.querySelector('label[for="age"]').style.display = 'none';    
    document.querySelector('label[for="atmosphere"]').style.display = 'none';   
    
    reButton.style.display = 'block'
    
    reButton.textContent = "אווירה: "+atmosphere+ "סוג: "+category +" אירוע: " +event;
    if (age!='')
    reButton.textContent += " גיל: "+age;

    document.getElementById("submitButton").innerText = "משהו אחר"

    // Send a request to the server with the choices
    if (!flag){
    const queryString = Object.keys(obj).map(key => key + '=' + obj[key]).join('&'); 
    const Url = `http://localhost:8080/generate-greeting` + '?' + "category=ברכה&event=חתונה&atmosphere=שמחה&age=12";  
    fetch(Url)
      .then(response =>response.text()
         )
      .then(data => {
        flag = 3
        res[0] = data
        res = res[0].split(flag+".")
        const responseContainer = document.getElementById('responseContainer');
        responseContainer.innerHTML = `<p>${res[1]}</p>`;
        flag-=1
      })
      .catch(error => {
        console.error('Error:', error);
      });

    }
    else{
      res = res[0].split(flag+".")
      responseContainer.innerHTML = `<p>${res[1]}</p>`;
      flag-=1;
    }
  }

  