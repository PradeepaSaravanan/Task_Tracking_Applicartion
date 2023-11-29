/* The function register() is used to register a new user 
and store the data in database */
function register() {
    let username = document.getElementById("reglogname").value;
    let email = document.getElementById("reglogemail").value;
    let pwd = document.getElementById("reglogpass").value;
    let req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8080/register");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify({
        "username": username,
        "email": email,
        "password": pwd
    }));
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status == 200) {
                Swal.fire({
                    title: "Good job!",
                    text: "Registered Suceessfully!!",
                    icon: "success",
                    timers: 2000
                }).then((res) => {
                    if (res.isConfirmed || res.isDismissed) {
                        location.replace("http://localhost:8080/adminViewUsers.html");
                    }
                })
            }
        }
    }
    event.preventDefault();

}


/*  the login() function retrieves data from database
and compare whether it is correct or incorrect ,generates a token
and store it in the local storage  */
function login() {
    let email = document.getElementById('logemail').value;
    localStorage.setItem("Email", email);
    let pwd = document.getElementById('logpass').value
    let req = new XMLHttpRequest();
    let newObj = {
        username: email,
        password: pwd
    }
    req.open("POST", "http://localhost:8080/login", true);
    req.setRequestHeader("Content-type", "application/json");
    req.send(JSON.stringify(newObj));
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status == 200) {
                let k = JSON.parse(req.responseText);
                localStorage.setItem("Token", k);
                loadUser();
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!"
                });
            }
        }
    }
    event.preventDefault();
}

/* the loadUser() function acts as a middleware and verify the password 
with token which is stored in local storage and grant permission to log in */
function loadUser() {
    let req = new XMLHttpRequest();
    req.open("GET", "http://localhost:8080/auth-user", true);
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("x-user-auth-token", localStorage.getItem("Token"));
    req.send();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                window.location.href = "userDashboard.html";
            }

        }
    }
}


/*   The function adminLogin() and provides login authentication for admin */
function adminLogin() {
    let username = document.getElementById("userName").value;
    let pwd = document.getElementById("password").value;

    let req = new XMLHttpRequest();
    let newObj = {
        email: username,
        password: pwd
    }

    req.open("POST", "http://localhost:8080/adminlogin", true);
    req.setRequestHeader("Content-type", "application/json");

    req.send(JSON.stringify(newObj));
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            if (req.status === 200) {
                console.log(this.responseText);
                // window.location.href="booking.html";
                let k = JSON.parse(req.responseText);
                localStorage.setItem("Admin-Token", k);
                AdminloadUser();
                event.preventDefault();
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Invalid credentials 😔",

                });
            }
        }
    }
    document.getElementById("adminForm").reset();
    event.preventDefault();

}
function AdminloadUser() {
    let req = new XMLHttpRequest();
    req.open("GET", "http://localhost:8080/auth-admin", true);
    req.setRequestHeader("Content-type", "application/json");
    req.setRequestHeader("x-admin-auth-token", localStorage.getItem("Admin-Token"));
    req.send();
    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                window.location.href = "adminViewUsers.html";
            }
        }
    }
}
