import { logout } from "../store/auth/auth-actions";

const auth = {
    isAuthenticated() {
        if(localStorage.getItem("token")) {
            const user = {
                userId: localStorage.getItem("userId"),
                token: localStorage.getItem("token"),
                username: localStorage.getItem("username") 
            }
            return user;
        } else {
            return false;
        }
    },
    removeJWT() {
        //remove from storage
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("username");

        logout().then((data) => {
            document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

            console.log(data)
        })
    }
}

export default auth;