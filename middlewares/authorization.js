const jwt = require('jsonwebtoken')

const privateKey =  'j0jOnäkimÿoN4b0k3Nb35toan1më';

exports.verifyToken = async ( req, res, next)=>{
    try {
        const token = req.get(`token`)

        const decoded = jwt.verify(token, privateKey);

        req.user = decoded.user;

        next();
    } catch (error) {
        return res.status(200).send({message:'Token no es valido'})        
    }
}