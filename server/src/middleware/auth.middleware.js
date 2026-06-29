import { verifyToken } from '../utils/jwt.utils.js';
import User from '../models/User.model.js';

const authenticate = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;


        if (!authHeader || !authHeader.startsWith('Bearer ')) {

            return res.status(401).json({

                success: false,

                message: 'Please log in'

            });

        }


        const token = authHeader.split(' ')[1];


        const decoded = verifyToken(token);


        const user = await User.findById(decoded.id)
            .select('-password');


        if (!user) {

            return res.status(401).json({

                success: false,

                message: 'User not found'

            });

        }


        req.user = user;


        next();

    }

    catch (error) {

        return res.status(401).json({

            success: false,

            message: 'Invalid token'

        });

    }

};


export default authenticate;