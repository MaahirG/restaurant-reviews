import http from "../http-common"
// Using axios to do http requests

// Class comprised of functions that make API calls and return info
class RestaurantDataService {
    // In general: http.x(...) --> ... is the extension of the base URL for the API call

    getAll(page = 0) {
        return http.get(`?page=${page}`);
    }
    
    get(id) {
        return http.get(`/id/${id}`);
    }
    
    // qeuery is value of search term (which cuisine/name) or number (zip code)
    // by is the actual search term (name, cuisine, zipcode)
    find(query, by = "name", page = 0) {
        return http.get(`?${by}=${query}&page=${page}`);
    } 
    
    createReview(data) {
        return http.post("/review", data);
    }
    
    updateReview(data) {
        return http.put("/review", data);
    }
    
    deleteReview(id, userId) {
        return http.delete(`/review?id=${id}`);
    }
    
    getCuisines(id) {
        return http.get(`/cuisines`);
    }
    
}
    
export default new RestaurantDataService();