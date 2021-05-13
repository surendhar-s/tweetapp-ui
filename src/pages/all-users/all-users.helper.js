import { HttpGet } from "../../services/api-services";
import { BASE_URI, BASE_TWEET_URL, ALL_USERS } from "../../constants/endpoints";

export const fetchAllUsers = async () => {
    try {
        let credentials = "Bearer " + localStorage.getItem("token");
        let apiUrl = BASE_URI + BASE_TWEET_URL + ALL_USERS;
        let headers = {
            "Authorization": credentials
        }
        let response = await HttpGet(apiUrl, {}, headers)
        return response.data.usersDto;
    } catch (e) {
        throw e;
    }
}

