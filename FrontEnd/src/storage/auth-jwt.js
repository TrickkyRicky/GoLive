const auth = {
    isAuthenticated() {
        if(localStorage.getItem("token")) {
            console.log(localStorage.getItem("userId"))
            return localStorage.getItem("userId");
        } else {
            return false;
        }
    }
}

export default auth;