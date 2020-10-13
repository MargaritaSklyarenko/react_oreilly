class LocalhostService {
    setState (userName, isLoggedIn) {
        localStorage.setItem('userName', userName);
        localStorage.setItem('isLoggedIn', isLoggedIn);
    }

    getState () {
        return {
            userName: localStorage.getItem('userName'),
            isLoggedIn: localStorage.getItem('isLoggedIn')
        };
    }
}

export default LocalhostService;