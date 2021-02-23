fetch('/tickets').then(res => {
    if(res.ok){
        return res.json();
    }
  })
  .then(respose => {
      respose.forEach(data => {
        document.getElementById('tableBody').innerHTML += `<tr>
        <td class = "name" >${data.name}</td>
        <td class = "details">${data.ticketDetails}</td>
        <td class = "Assigned">${data.assignedTo}</td>
        <td class = "date">${data.requestedDate}</td>
        <td class = "editButton"><button class ="edit" value = ${data._id}><i class="glyphicon glyphicon-pencil"></i></buton></td>
        <td class = "editButton"><button class = "remove" value = ${data._id}><i class="glyphicon glyphicon-trash"></button></a></td>
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

// TO identify the row where delete and edit buttons are clicked.
function findClickedRowRemove(event) {
  event = event || window.event;
  event.target = event.target || event.srcElement;

  let element = event.target;

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



