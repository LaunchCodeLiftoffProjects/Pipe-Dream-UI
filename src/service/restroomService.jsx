import axios from 'axios';

const RESTROOM_API_URL = 'http://localhost:8080';

class RestroomService {

    retrieveAllRestrooms() {
        return axios.get(`${RESTROOM_API_URL}/restrooms`);
    }

    retrieveRestroom(id) {
        return axios.get(`${RESTROOM_API_URL}/restrooms/${id}`);
    }

    deleteRestroom(id) {
        return axios.delete(`${RESTROOM_API_URL}/restrooms/${id}`);
    }

    updateRestroom(id, restroom) {
        return axios.put(`${RESTROOM_API_URL}/restrooms/${id}`);
    }

    createRestroom(restroom) {
        return axios.post(`${RESTROOM_API_URL}/restrooms/`);

    }
}

export default new RestroomService();