fetch('/tickets').then(res => {
    if(res.ok){
        return res.json();
    }
  })
  .then(respose => {
      respose.forEach(data => {
        document.getElementById('tableBody').innerHTML += `<tr><td>${data.name}</td><td>${data.ticketDetails}</td><td>${data.assignedTo}</td><td>${data.requestedDate}</td></tr>`
      });
  })