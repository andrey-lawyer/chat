import axios from "axios";

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response === undefined || error.response.status === 401) {

            if (error.config.url !== "/api/auth/login") {
                window.location.href = "/signin";
            }
        }

        return Promise.reject(error);
    }
);


export class ApiService {

    /**
     * @param {Object} user
     * @param {String} user.username
     * @param {String} [user.password]
     * @returns {Promise<Object>}
     */
    static async signUp(user) {
        const { data } = await axios.post(`/api/auth/register`, user);
        return data;
    }

    /**
     * @param {Object} user
     * @param {String} user.username
     * @param {String} [user.password]
     * @returns {Promise<Object>}
     */
    static async signIn(user) {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            const params = new URLSearchParams();
            for (const [key, value] of Object.entries(user)) {
                params.append(key, value);
            }
            const response = await axios.post(`/api/auth/login`, params, config);
            if (response.status === 200) {
                return true;
            }
            else throw new Error("Unauthorized");
    }



    static async checkAuth() {
            const {data} = await axios.get(`/api/user/current-user`)
        return data;

    }

    /**
     * @param {Object} updateUser
     * @param {String} user.newUsername
     * @param {String} [user.newPassword]
     * @returns {Promise<Object>}
     */

    static async updateProfileUser(updateUser) {
        const {data} = await axios.put(`/api/user/update`, updateUser)
        return data;

    }


    static async logout() {
        return axios.post(`/api/auth/logout`)

    }

}