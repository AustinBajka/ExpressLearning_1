
import colors from 'colors';


const logger = (req, res, next) => {
        let methodColor = 'red';
        switch(req.method) {
            case 'GET':
                methodColor = 'green';
                break;
            case 'POST':
                methodColor = 'blue';
                break;
            case 'PUT':
                methodColor = 'purple';
                break;
            case 'DELETE':
                methodColor = 'red';
                break;
            default:
                methodColor = 'white';
            break
        }

        console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`[`${methodColor}`]);
        next();
    }

export default logger;