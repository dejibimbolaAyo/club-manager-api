const JWT = require('jsonwebtoken');
/**
 * Generate jwt token
 * @param user id
 */

 exports.generateJWT = (id, roleId) =>{
     // generate a token
     const token = JWT.sign({
        iss: 'QUICK_SERVE',
        sub: id,
        role: roleId,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 90),
    }, process.env.JWT_SECRET)
    return token;
 }


 exports.generatePasswordResetToken = (id) =>{
    // generate password reset token and it expires in 10 minutes
    const token = JWT.sign({
       iss: 'QUICK_SERVE',
       sub: id,
       iat: new Date().getTime(),
       exp: Math.floor(Date.now() / 1000) + 600, 
   }, process.env.JWT_SECRET)
   return token;
}