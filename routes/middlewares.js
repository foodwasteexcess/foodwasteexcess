const loginCheck = () => {
  return (req, res, next) => {
    // if the user is logged in proceed with the next step
    if (req.session.user) {
      next();
    } else {
      // else redirect to login
      res.redirect('/login');
    }
  }
}

// const productOwnerCheck = () => {
  
//   return (req,res,next) => {
//     console.log("I am inside product owner check", req.body)
//     // if (req.session.user === ownerid){
//     //   next();
//     // } else {
//     //   res.redirect('/products-overview');
//     // }
//   }
// }
module.exports = {
  loginCheck : loginCheck,
  //productOwnerCheck: productOwnerCheck
}