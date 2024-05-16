import axios from "axios";
const API_KEY = '43802076-938fa3042b8f90b237e1b6cb9';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchPhotoSearch = async (q, page, perPage = 15) => {
    const params = {
        q,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
    };

    try {
        const response = await axios.get(BASE_URL, { params });
        return response.data; 
    } catch (error) {
        throw new Error('Failed to fetch photos from Pixabay');
    }
}