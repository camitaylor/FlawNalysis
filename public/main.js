fetch('/tickets').then(res => {
    if(res.ok){
        return res.json();
    }
  })
  .then(respose => {
      respose.forEach(data => {
        document.getElementById('tableBody').innerHTML += `<tr><td class = "name" >${data.name}</td><td class = "details">${data.ticketDetails}</td><td class = "Assigned">${data.assignedTo}</td><td class = "date">${data.requestedDate}</td><td class = "editButton"><a href = "#" value = ${data._id}><i class="glyphicon glyphicon-edit"></i></a></td><td class = "editButton"><a href = "#" value = ${data._id}><i class="glyphicon glyphicon-remove"></i></a></td></tr>`
      });
  })