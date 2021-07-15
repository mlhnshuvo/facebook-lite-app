import jwt_decode from "jwt-decode";

const loginUser = () => {
    const token = localStorage.getItem('token')
    if (token) {
        const decode = jwt_decode(token);
        return decode
    }
}

export default loginUser