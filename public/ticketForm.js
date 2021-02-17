
function reload(){
    window.location = "http://localhost:3030";
}

function submitForm(){
  let firstName = document.getElementById("form_name").value;
  let lastName = document.getElementById("form_lastname").value;
  let email = document.getElementById("form_email").value;
  let type = document.getElementById("form_need").value;
  let ticketDetails = document.getElementById("form_message").value;
  
  let date = `${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}`

  let data = {
      name: `${firstName} ${lastName}`,
      email: email,
      type: type,
      ticketDetails: ticketDetails,
      assignedTo: 'pending',
      requestedDate: date
  }
  console.log(data)
  fetch('/tickets', {
      method:'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
  })  
  .then(res => {
    if (res.redirected) {
      window.location.href = res.url;
    }
  })
}