let firstName = document.getElementById("form_name")
let lastName = document.getElementById("form_lastname")
let textArea = document.getElementById("form_message")
let email = document.getElementById("form_email")
let assignedTO = document.getElementById("form_assigned")
let selection = document.getElementById("form_need")
let priority = document.getElementById("form_priority")
let status = document.getElementById("form_status")

id = sessionStorage.getItem('id');
// Getting Ticket details to view on the page
url = `/tickets/${id}`;
fetch(url).then(res => {
    return res.json();
})
.then(result =>{
    console.log(result.email)
    let firstLastName = result.name.split(" ");
    console.log(firstLastName);
    firstName.value = firstLastName[0];
    lastName.value = firstLastName[1];
    textArea.value = result.ticketDetails;
    email.value = result.email || "No email attached";
    assignedTO.value = result.assignedTo|| "";
    status.value = result.status|| "";
    priority.value = result.priority|| "";
    selection.value = result.type || "";


})

// to tuggle btw disable and unable to limit error
function disableEnable(){
  elements = [email, assignedTO, status, selection, priority, textArea]
  elements.forEach(element => {
    if(element.disabled)
        element.disabled = false;
    else
        element.disabled = true;
  });
  showHide()
}

function showHide(){
   cancel = document.getElementById('cancel')
   submit = document.getElementById('submit')
   backToDashboard = document.getElementById('dashboard')
   elements = [cancel, submit, backToDashboard]
   elements.forEach(element =>{
     if(element.style.display === "none"){
      element.style.display = "block"
     }
     else{
      element.style.display = "none"
     }
   })

}

function reload() {
    window.location = "./dashboard.html";
}
function submitUpdate(){
  let data = {
    name: `${firstName.value} ${lastName.value}`,
    email: email.value,
    type: selection.value,
    assignedTo: assignedTO.value,
    status: status.value,
    priority: priority.value,
    ticketDetails: textArea.value
  }
  console.log(data)
  id = sessionStorage.getItem('id');
  url = `/tickets/${id}`
  fetch(url,{
    method:"put",
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify(data)
  }).then(res => res.json())
  .then(result => {
    console.log(result)
    window.location.href = "./confirmation.html"
    sessionStorage.setItem("message", "Your ticket was successfully updated.")
  })

}

function deleteTicket(){
  id = sessionStorage.getItem('id');
  url = `/tickets/${id}`;
  fetch(url,{
    method: 'delete'
  }).then(res => {
      return res.json();
  })
  .then(result =>{
    sessionStorage.setItem("message", "Ticket was Successfylly Deleted")
    window.location.href='./confirmation.html';
})

}
