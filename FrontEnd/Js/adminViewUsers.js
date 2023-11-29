window.onload = getUsers;
let tasks;

/** the function showTask() shows a form for collecting all deatils of the task for creating a task*/
function showTask() {
  document.getElementById("taskForm").style.display = 'inline';
  document.getElementById("table").style.width = '550px'
}

let users = '';
/** getUsers() function shows all registered users  */
function getUsers() {
  console.log("get users called...")
  let req1 = new XMLHttpRequest();
  const url = "http://localhost:8080/users";
  req1.open("GET", url, true);
  req1.send();
  req1.onreadystatechange = function () {
    if (req1.readyState === 4) {
      if (req1.status === 200) {
        users = JSON.parse(req1.responseText);
        console.log("Users", users);
        display(users);

      }
    }
  }
  event.preventDefault();

}


/**AssignTaskToUser()  shows a popup for selecting available task and assign to specfic user */
function AssignTaskToUser(username) {
  let req1 = new XMLHttpRequest();
  const url = "http://localhost:8080/tasks";
  req1.open("GET", url, true);
  req1.send();
  req1.onreadystatechange = function () {
    if (req1.readyState === 4) {
      if (req1.status === 200) {
        tasks = JSON.parse(req1.responseText);
        let usertasks = `  <label for="cars" id="lists">Choose a Task:</label>
          <select name="task" id="menu" class="form-select" aria-label="Default select example">`
        for (let j in tasks) {
          if (tasks[j].assignto == "") {
            usertasks += `
             <option value="${tasks[j]._id}">${tasks[j].taskname}</option>`
          }
        }
        let usertasks1 = ` </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="updateTask('${username}')">Assign</button>
            `
        document.getElementById("assignModal").innerHTML = usertasks;
        document.getElementById("assignFooter").innerHTML = usertasks1;

      }
    }
  }
}
/**updateTask() function assigns task to specific user
 * @ username represents a unique username of the particular user
 */
function updateTask(username) {
  document.getElementById("AssignModal").style.display = 'none';
  let id = document.getElementById('menu').value;
  let num = 1;
  let updatedTime = new Date().toLocaleString();
  let req = new XMLHttpRequest();
  req.open("PUT", "http://localhost:8080/tasks/" + id, true);
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify({
    "assignto": username,
    "notifications": num,
    "updatedDate": updatedTime

  }));
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status == 200) {
        Swal.fire({
          title: "Good job!",
          text: "Task Assigned Suceessfully!!",
          icon: "success",
          timers: 2000000
        }).then((res) => {
          if (res.isConfirmed || res.isDismissed) {
            location.replace("http://localhost:8080/adminViewUsers.html");
          }
        })

        event.preventDefault();
      }
    }
  }
  event.preventDefault();
}

/** display() functin shows all users in the form of table */
function display(users) {
  let table = `
    <thead>
      <tr style="margin:10px; border-radius:30px; background-color:white">
        <th scope="col"   >Name</th>
        <th scope="col">Email</th>
        <th scope="col">Assign task</th>
      </tr>
    </thead>`;
  for (let i in users) {
    table += `
        
          <tbody>
            <tr  style="margin:10px; border-radius:30px; background-color:white"  >
              <td> ${users[i].username}</td>
              <td>${users[i].email}</td>
              <td>
                <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#AssignModal" onclick="AssignTaskToUser('${users[i].username}')">Assign Task</button> 
              </td>
            </tr>
            
          
  `
  }
  table += `</tbody>`;
  document.getElementById("table").innerHTML = table
}

let user = '';
/** AssignTask() function creates a task */
function AssignTask() {
  document.getElementById("taskForm").style.display = "none";
  let taskname = document.getElementById("taskname").value;
  let desc = document.getElementById("description").value;
  let status = document.getElementById("status").value;
  let priority = document.getElementById("priority").value;
  let duration = document.getElementById("duration").value;
  let taskid = Math.floor((Math.random() * 1000000) + 1);
  let num = 0;
  let req = new XMLHttpRequest();
  req.open("POST", "http://localhost:8080/tasks");
  req.setRequestHeader("Content-Type", "application/json");
  req.send(JSON.stringify({
    "taskId": taskid,
    "taskname": taskname,
    "description": desc,
    "assignto": user,
    "priority": priority,
    "duration": duration,
    "status": status,
    "notifications": num,
    "comments": ""
  }));
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status == 201) {
        Swal.fire({
          title: "Good job!",
          text: "Task Assigned Suceessfully!!",
          icon: "success",
          timers: 2000000
        }).then((res) => {
          if (res.isConfirmed || res.isDismissed) {
            location.replace("http://localhost:8080/adminViewUsers.html");
          }
        })
        event.preventDefault();
      }
    }
  }
  document.getElementById("taskForm").reset();
  event.preventDefault();
}