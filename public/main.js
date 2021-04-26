fetch('/tickets').then(res => {
    if(res.ok){
        return res.json();
    }
  })
  .then(respose => {
      respose.forEach(data => {
        document.getElementById('tableBody2').innerHTML += `<tr class = "card">
        <td class="col">
        <span class = "${data.priority}-box"></span>
        </td>
        <td class="tableHeader col-10">
          <h4 class = "name">${data.name}</h4>
          <p class = "note">${data.ticketDetails}</p>
          <p class = "assigned">Assigned to ${data.assignedTo}</p>
          <p class = " status"> ${data.status}</p>
          <p class = "date">Ticket Submitted on ${data.requestedDate}</p>
        </td>
        <td class= "editButton col-1"><button class ="edit" title = "click to view detail" value = ${data._id}><i class="glyphicon glyphicon-menu-right"></i></buton>
        </td>
        </tr>`;
        document.getElementById('tableBody').innerHTML += `<tr>
          <td class = "details col-5" >
            <h4 class = "name">${data.name}</h4>
            <p class = "note">${data.ticketDetails}</p>
            <p class = "date">Ticket Submitted on ${data.requestedDate}</p>
          </td>
          <td class = "Assigned col-2">${data.assignedTo}</td>
          <td class = " status col-2"> ${data.status}</td>
          <td class = "${data.priority} col-1">${data.priority}</td>
          <td class = "editButton col-2"><button class ="edit" title = "click to view detail" value = ${data._id}>View Detail <i class="glyphicon glyphicon-menu-right"></i></buton></td>
        </tr> `
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
      // finds clicked update button. 
      if (element.nodeName === "BUTTON" && /edit/.test(element.className)) {
        console.log(element.value)
        sessionStorage.setItem("id",`${element.value}`);
        window.location.href='/updateTicket.html'
        break;
      }
      element = element.parentNode;
  }
}


function deleteTicket() {
  id = sessionStorage.getItem('id');
  url = `/tickets/${id}`;
  fetch(url, {
    method: 'delete'
  }).then(res => {
    return res.json();
  })
    .then(result => {
      console.log(result)
      localStorage.removeItem('id')
      window.location.href = 'http://localhost:3030/dashboard.html';
    })

}

module.exports = function () {

}




