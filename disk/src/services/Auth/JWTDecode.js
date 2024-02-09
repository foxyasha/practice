import { jwtDecode } from 'jwt-decode';



const getToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            return true;
        } catch (error) {
            console.error('Error decoding JWT token:', error);

        }
    } else {
        console.log('No JWT token found in localStorage');
        return false;
    }
}

export {getToken}