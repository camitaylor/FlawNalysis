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
        <td class = "editButton"><a href = "#" value = ${data._id}><i class="glyphicon glyphicon-edit"></i></a></td>
        <td class = "editButton"><button class = "remove" href = "#" value = ${data._id}><i class="glyphicon glyphicon-remove"></i></button></td>
        </tr>`
      });
  })

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
      if (element.nodeName === "BUTTON" && /remove/.test(element.className)) {
        deleteTicket(element)
        break;
      }

      element = element.parentNode;
  }
}


function deleteTicket(element){
  _id = element.value;
  console.log(_id)
  url = `/tickets/${_id})`;
  fetch(url).then(res => {
    if(res.body.id){
        return res.json();
    }
  })
  .then(result =>{
    console.log(result)
  //   fetch('/tickets',{
  //     method: 'delete',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(result)
  //   }).then(res=> res.json)
  // .then(result => console.log(result))
  })
}
// if (document.addEventListener) {
//   document.addEventListener("click", findClickedRow, false);
// }
// else if (document.attachEvent) {
//   document.attachEvent("onclick", findClickedRow);
// }

// function findClickedRow(event) {
//   event = event || window.event;
//   event.target = event.target || event.srcElement;

//   var element = event.target;

//   // Climb up the document tree from the target of the event
//   while (element) {
//       if (element.nodeName === "BUTTON" && /remove/.test(element.className)) {
//         console.log()
//         break;
//       }

//       element = element.parentNode;
//   }
// }

