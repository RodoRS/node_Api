const boom = require('@hapi/boom');
const { config } = require('./../config/config');


function checkApiKey(req, res, next){
  const apiKey = req.headers['api'];
  if(apiKey === config.apiKey){
    next();
  }else{
    next(boom.unauthorized());
  }
}


function checkAdminRole(req, res, next){
  console.log(req.user , "Check Admin Role");
  const user = req.user;
  if(user.role === 'admin'){
    next();
  }else{
    next(boom.unauthorized());
  }
}

function checkRoles(...roles){ //Checar que roles son permitidos en ese EndPoint
  return (req, res, next)=>{
    console.log(req.user , roles ,"Check Roles");
    const user = req.user;

    if(roles.includes(user.role)){
      next();
    }else{
      next(boom.unauthorized());
    }
  }
}

module.exports = { checkApiKey, checkAdminRole, checkRoles };
