let user = JSON.parse(sessionStorage.getItem("user"))
console.log(user)
document.getElementById("form_name").value = user.firstName;
document.getElementById("form_lastname").value = user.lastName;
document.getElementById("form_email").value = user.email;


function reload() {
    window.location = "./dashboard.html";
}

function submitForm() {
    let firstName = document.getElementById("form_name").value;
    let lastName = document.getElementById("form_lastname").value;
    let email = document.getElementById("form_email").value;
    let type = document.getElementById("form_need").value;
    let ticketDetails = document.getElementById("form_message").value;

    let date = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`

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
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then((res) => {
            window.location.href = "./confirmation.html"


            // try that...
            /*    
                if (res.redirect) {
                  
                  window.location.href = res.url;
                }
            */
        })
}

