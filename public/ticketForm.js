
function reload(){
    window.location = "http://localhost:3030";
}

function submitForm(){
    let firstName = document.getElementById("form_name").nodeValue;
    let lastName = document.getElementById("form_lastname").nodeValue;
    let email = document.getElementById("form_email").nodeValue;
    let type = document.getElementById("form_need").nodeValue;
    let ticketDetails = document.getElementById("form_message").nodeValue;
    let data = {
        name: `${firstName} ${lastName}`,
        email: email,
        type: type,
        ticketDetails: ticketDetails,
        assignedTo: 'pending'
    }
    fetch('/tickets', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
    console.log('Success:', result);
    reload()
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}