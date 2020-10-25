import axios from "axios";

class Axios {
    state = {
        coursesUrl: "http://localhost:3001/api/courses",
        usersUrl: "http://localhost:3001/api/login"
    };

    getCourses () {
        return axios.get(this.state.coursesUrl);
    }

    getUsers (email, password) {
        return axios
            .post(this.state.usersUrl, {
                login: email,
                password: password
        });
    }

    editCourse (id, course) {
        return axios.put(this.state.coursesUrl + '/' + id, course);
    }

    addCourse (course) {
        return axios.post(this.state.coursesUrl, course);
    }

    deleteCourse (id) {
        return axios.delete(this.state.coursesUrl + "/" + id);
    }
}

export default Axios;