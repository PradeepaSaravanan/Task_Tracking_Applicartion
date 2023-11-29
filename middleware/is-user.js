const { verify } = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.get("x-user-auth-token");
  console.log("Tokeeeeeeee",token);
  console.log(token)
  if (!token || token === "") {
    req.isAuth = false;
    return res.status(401).send("Authorization failed1..");
  } else {
    let decoded;

    try {
      decoded = verify(token, "Pradeeepa@23090978648374");
      // console.log("DDDDDD",decoded)
    } catch (error) {
      req.isAuth = false;
      return res.status(401).send("Authorization failed2..");
    }

    if (!decoded) {
      req.isAuth = false;
      return res.status(401).send("Authorization failed3..");
    }

  

    req.isAuth = true;
    req.user = decoded.user;
    req.userData = decoded;
    return next();
  }
};