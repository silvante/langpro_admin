import api from "../api.config";
import apiEndpoints from "../api.endpoint";
import { CreateVocData } from "./utils/vocTypes";

const vocService = {
  create: async (lesson_id: string, data: CreateVocData) => {
    try {
      return await api.post(apiEndpoints.createVoc(lesson_id), data);
    } catch (error) {
      throw error;
    }
  },

  getAll: async (lesson_id: string) => {
    try {
      return await api.get(apiEndpoints.getAllVocs(lesson_id));
    } catch (error) {
      throw error;
    }
  },

  delete: async (lesson_id: string, id: string) => {
    try {
      return await api.delete(apiEndpoints.deleteVoc(lesson_id, id));
    } catch (error) {
      throw error;
    }
  },
};

export default vocService;
