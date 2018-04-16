// finds html elements to change later
var elements = {
  form: document.querySelector(".builder"),
  saved: document.querySelector(".add"),
  debug: document.querySelector(".debug"),
  age: document.querySelector('input[name="age"]'),
  rel: document.querySelector('select[name="rel"]'),
  smoker: document.querySelector('input[name="smoker"]'),
  submit: document.querySelector('button[type="submit"]'),
};

// error messages to display
var message = {
  ageNumber: "Please enter a valid number!",
  relBlank: "Please choose a relationship status!",
};

// declare variables and create elements for messages
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

// constructor that creates object out of each family member added
function Add(age, rel, smoker) {
  this.age = age;
  this.relationship = rel;
  this.smoker = smoker;
}

// event handler for clicking on add, clear error messages
elements.saved.onclick = function(event) {
  event.preventDefault();
  errorAge.innerHTML = "";
  errRel.innerHTML = "";

  // conditionals for messages to display and if smoker
  if (
    elements.age.value === "" ||
    isNaN(elements.age.value) ||
    elements.age.value <= 0
  ) {
    errorAge.innerHTML = message.ageNumber;
    elements.form.appendChild(errorAge);
  }
  if (elements.rel.value == "") {
    errRel.innerHTML = message.relBlank;
    elements.form.appendChild(errRel);
  }

  if (elements.smoker.checked) {
    smoke = "Yes";
  } else {
    smoke = "non-smoker";
  }

  // if no errors present, proceed to creating family member object.
  if (errorAge.innerHTML == "" && errRel.innerHTML == "") {
    fam = new Add(elements.age.value, elements.rel.value, smoke);
    elements.debug.style.display = "none";
    var newDiv = document.createElement("div");

    // creates and styles button element
    var added = document.createElement("button");
    added.style.display = "block";
    added.style.marginBottom = "20px";
    added.className = "remove";
    added.innerHTML = "Remove";
    added.setAttribute("type", "button");

    //   creates p element for displaying family members
    var div = document.createElement("p");
    div.innerHTML =
      "Age: " +
      elements.age.value +
      "<br> Relationship: " +
      elements.rel.value +
      "<br> Smoker: " +
      smoke;
    var div2 = document.createElement("p");
    div2.innerHTML = JSON.stringify(fam, null, 2);

    // appends instance of fam member to container div.
    newDiv.appendChild(div);
    newDiv.appendChild(added);
    elements.debug.appendChild(div2);
    elements.saved.parentElement.appendChild(newDiv);

    // event handler that removes fam member of clicked button.
    added.onclick = function(data) {
      data.preventDefault();
      this.parentNode.removeChild(div);
      this.parentNode.removeChild(added);
      div2.innerHTML = "";
      submitMsg.style.color = "red";
      submitMsg.innerHTML =
        "Please click the submit button once you're done removing family members.";
      elements.debug.style.display = "none";
    };
  }

  // able to submit after one fam member, message notifies user.
  if (elements.debug.childElementCount >= 1) {
    submitMsg.style.color = "green";
    submitMsg.innerHTML =
      "Please click the submit button once you're done adding family members.";
  }
};

//  event handler for submit that reveals submitted data as an object
elements.submit.onclick = function(data) {
  data.preventDefault();

  // messages for no fam members, and for one or more fam members.
  if (!elements.debug.innerHTML) {
    alert("Please add family members to submit!");
    console.log(true);
  }
  if (elements.debug.childElementCount >= 1) {
    elements.debug.style.display = "block";
    alert("Thank you, your submission has been recorded.");
    submitMsg.style.color = "blue";
    submitMsg.innerHTML =
      "If any additional changes need to be made, please click the submit again to confirm.";
  }
};

// pushing to server
// elems.form.submit.onclick = function(data){
//     data.preventDefault();

//
//     var request = new XMLHttpRequest();
//     var data = JSON.stringify(elements.debug.innerHTML, null, 2);
//     request.open('POST', '/', true);
//     request.setRequestHeader('Content-Type', 'path', 'charset=UTF-8');
//     request.send(data);

// }
