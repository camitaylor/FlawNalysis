

if(sessionStorage.getItem("message")){
    let message = sessionStorage.getItem("message")
    document.getElementById("message").innerHTML = message;
    sessionStorage.removeItem("message");
}