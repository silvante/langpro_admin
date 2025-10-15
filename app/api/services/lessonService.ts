import api from "../api.config";
import apiEndpoints from "../api.endpoint";
import { CreateLessonData, updateLessonData } from "./utils/lessonsTypes";

const lessonService = {
  create: async (unique_name: string, data: CreateLessonData) => {
    try {
      return api.post(apiEndpoints.createNewLesson(unique_name), data);
    } catch (error) {
      throw error;
    }
  },

  update: async (unique_name: string, id: string, data: updateLessonData) => {
    try {
      return api.put(apiEndpoints.updateLesson(unique_name, id), data);
    } catch (error) {
      throw error;
    }
  },

  delete: async (unique_name: string, id: string) => {
    try {
      return api.delete(apiEndpoints.deleteLesson(unique_name, id));
    } catch (error) {
      throw error;
    }
  },
};

export default lessonService;
