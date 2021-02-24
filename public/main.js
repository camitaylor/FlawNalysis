fetch('/tickets').then(res => {
    if(res.ok){
        return res.json();
    }
  })
  .then(respose => {
      respose.forEach(data => {
        document.getElementById('tableBody').innerHTML += `<tr>
        <td class = "details col-5" >
        <h3 class = "name">${data.name}</h3>
        <p class = "note">${data.ticketDetails}</p>
        <p class = "date">${data.requestedDate}</p></td>
        <td class = "Assigned col-2">${data.assignedTo}</td>
        <td class = " status col-2">${data.status}</td>
        <td class = "${data.priority} col-2">${data.priority}</td>
        <td class = "editButton col-1"><button class ="edit" title = "click to view details" value = ${data._id}><i class="glyphicon glyphicon-pencil"></i></buton></td>
        </tr>`
      });
  })

// lestening to button clicked
if (document.addEventListener) {
  document.addEventListener("click", findClickedRowRemove, false);
}
else if (document.attachEvent) {
  document.attachEvent("onclick", findClickedRowRemove);
}

function findClickedRowRemove(event) {
  event = event || window.event;
  event.target = event.target || event.srcElement;

  var element = event.target;

  // Climb up the document tree from the target of the event
  while (element) {
    // finds clicked Delete Button
      if (element.nodeName === "BUTTON" && /remove/.test(element.className)) {
        console.log(element.value)
        sessionStorage.setItem("id",`${element.value}`);
        window.location.href='#popup1'
        break;
      }
      // finds clicked update button. 
      else if (element.nodeName === "BUTTON" && /edit/.test(element.className)) {
        console.log(element.value)
        sessionStorage.setItem("id",`${element.value}`);
        window.location.href='/updateTicket.html'
        break;
      }
      element = element.parentNode;
  }
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
    console.log(result)
    sessionStorage.removeItem('id')
    window.location.href='http://localhost:3030/dashboard.html';
})

}
