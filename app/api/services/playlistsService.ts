import api from "../api.config";
import apiEndpoints from "../api.endpoint";

const playlistService = {
  create: (data: FormData) => {
    try {
      console.log(data);
      return api.post(apiEndpoints.createplaylist, data);
    } catch (error) {
      throw error;
    }
  },

  getAll: () => {
    try {
      return api.get(apiEndpoints.getAllPlaylists);
    } catch (error) {
      throw error;
    }
  },

  getByUniqueName: (unique_name: string) => {
    try {
      return api.get(apiEndpoints.getPlaylistByName(unique_name));
    } catch (error) {
      throw error;
    }
  },

  update: (unique_name: string, data: FormData) => {
    try {
      return api.patch(apiEndpoints.getPlaylistByName(unique_name), data);
    } catch (error) {
      throw error;
    }
  },

  delete: (unique_name: string) => {
    try {
      return api.delete(apiEndpoints.getPlaylistByName(unique_name));
    } catch (error) {
      throw error;
    }
  },

  addNewUser: async (unique_name: string, user_id: string) => {
    try {
      return api.post(apiEndpoints.addUserToPlaylist(unique_name, user_id));
    } catch (error) {
      throw error;
    }
  },

  removeUser: async (unique_name: string, user_id: string) => {
    try {
      return api.delete(
        apiEndpoints.removeUserFromPlaylist(unique_name, user_id)
      );
    } catch (error) {
      throw error;
    }
  },
};

export default playlistService;
