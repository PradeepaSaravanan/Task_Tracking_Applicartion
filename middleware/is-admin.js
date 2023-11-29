const { verify } = require("jsonwebtoken");
 
 
module.exports = (req, res, next) => {
  const token = req.get("x-admin-auth-token");
  console.log(typeof(token));
  if (!token || token === "") {
    req.isAuth = false;
    return res.status(401).send("Authorization failed.dddddddddd.");
  } else {
    let decoded;
 
    try {
      decoded = verify(token,"Pradeeepa@23090978648374" );
      console.log(decoded);
    } catch (error) {
      req.isAuth = false;
      return res.status(401).send("Authorization failedzzzzzzzzzzzz..");
    }
 
    if (!decoded) {
      req.isAuth = false;
      return res.status(401).send("Authorization failedvvvvvvvvvvvvvv..");
    }
 
    // if (decoded?.admin?.role !== 'admin') {
    //   req.isAuth = false;
    //   return res.status(401).send("Authorization failed..");
    // }
 
    req.isAuth = true;
    req.admin = decoded.admin;
    return next();
  }
};
 