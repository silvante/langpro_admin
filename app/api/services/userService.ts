import api from "../api.config";
import apiEndpoints from "../api.endpoint";

const userService = {
  search: async (
    page: number,
    limit: number,
    name: string = "",
    surname: string = "",
    email: string = ""
  ) => {
    try {
      return api.get(
        apiEndpoints.searchUsers(page, limit, name, surname, email)
      );
    } catch (error) {
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      return api.get(apiEndpoints.getUserById(id));
    } catch (error) {
      throw error;
    }
  },
};

export default userService;
