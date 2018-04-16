var elements = {
    form: document.querySelector('.builder'),
    saved: document.querySelector('.add'),
    debug: document.querySelector('.debug'),
    age: document.querySelector('input[name="age"]'),
    rel: document.querySelector('select[name="rel"]'),
    smoker: document.querySelector('input[name="smoker"]'),
    submit: document.querySelector('button[type="submit"]')
  };

var message = {
    ageNumber : "Please enter a valid number!",
    relBlank : "Please choose a relationship status!",
} 


var errorAge = document.createElement("div");
errorAge.style.color = "red";
var errRel = document.createElement("div");
errRel.style.color = "red";
var added = document.createElement("button");
var submitMsg = document.createElement("div");
elements.form.appendChild(submitMsg);
var smoke;
var fam;
var div;

function Add (age, rel, smoker) {
    this.age = age;
    this.relationship = rel;
    this.smoker = smoker;
}




elements.saved.onclick = function(event) {
    event.preventDefault();
    errorAge.innerHTML = "";
    errRel.innerHTML = "";
    console.log(elements.age.value);
    console.log(elements.rel.value);
    console.log(elements.smoker.checked);
   if (elements.age.value === "" || isNaN(elements.age.value) || elements.age.value <= 0) { 
       errorAge.innerHTML = message.ageNumber;
       elements.form.appendChild(errorAge);    
   }
   if (elements.rel.value  == "") {
       errRel.innerHTML = message.relBlank;
       elements.form.appendChild(errRel);
   };

   if (elements.smoker.checked) {
        smoke = "Yes";
   }
        else {
            smoke = "non-smoker";
        }

   if ( errorAge.innerHTML == "" && errRel.innerHTML == "") {
       console.log('progress');
        fam = new Add(elements.age.value, elements.rel.value, smoke)
        elements.debug.style.display = "none";
        // buttonStyle();
        // displayInfo();
        var added = document.createElement("button");
        added.style.display = "block";
        added.style.marginBottom = "20px";
        added.className = "remove";
        added.innerHTML = "Remove";
        added.setAttribute('type', 'button');
        var newDiv = document.createElement("div");
        var div = document.createElement("p");
        div.innerHTML = "Age: " + elements.age.value + "<br> Relationship: " + elements.rel.value + "<br> Smoker: " + smoke;
        var div2 =document.createElement("p");
        div2.innerHTML = JSON.stringify(fam, null, 2);
        newDiv.appendChild(div);
        newDiv.appendChild(added);
        elements.debug.appendChild(div2);
        elements.saved.parentElement.appendChild(newDiv);
        added.onclick = function (data) {
            data.preventDefault();
            this.parentNode.removeChild(div);
            this.parentNode.removeChild(added); 
            div2.innerHTML = "";   
            submitMsg.style.color = "red";
            submitMsg.innerHTML = "Please click the submit button once you're done removing family members."
            elements.debug.style.display = "none";
         }

        }

        if (elements.debug.childElementCount >= 1) {
            submitMsg.style.color = "green";
            submitMsg.innerHTML = "Please click the submit button once you're done adding family members."
            
            console.log(3);
        }
 }

elements.submit.onclick = function(data) {
    data.preventDefault();
    if(!elements.debug.innerHTML) {
        alert("Please add family members to submit!")
        console.log(true);
    }
    if (elements.debug.childElementCount >= 1) {
    elements.debug.style.display = "block";
    alert("Thank you, your submission has been recorded.");
    submitMsg.style.color = "blue";
    submitMsg.innerHTML = "If any additional changes need to be made, please click the submit again to confirm."
}
}


// elems.form.submit.onclick = function(data){
//     data.preventDefault();
  
//     // pushing to server
//     var request = new XMLHttpRequest();
//     var data = JSON.stringify(elements.debug.innerHTML, null, 2);
//     request.open('POST', '/', true);
//     request.setRequestHeader('Content-Type', 'path', 'charset=UTF-8');
//     request.send(data);
  
// }







