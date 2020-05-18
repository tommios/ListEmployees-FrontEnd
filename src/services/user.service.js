import http from "../http-common";
import authHeader from "./auth-header";

class UserService {
  getPublicContent() {
    return http.get("/test/all");
  }

  getUserBoard() {
    return http.get("/test/user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return http.get("/test/mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return http.get("/test/admin", { headers: authHeader() });
  }

  getAll() {
    return http.get("/employees", { headers: authHeader() });
  }

  get(id) {
    return http.get(`/employees/${id}`, { headers: authHeader() });
  }

  create(data) {
    return http.post("/employees", data, { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/employees/${id}`, data, {
      headers: authHeader(),
    });
  }

  delete(id) {
    return http.delete(`/employees/${id}`, {
      headers: authHeader(),
    });
  }

  deleteAll() {
    return http.delete(`/employees`, { headers: authHeader() });
  }

  findByFirstName(firstname) {
    return http.get(`/employees?firstname=${firstname}`, {
      headers: authHeader(),
    });
  }
}

export default new UserService();
