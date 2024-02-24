import axios from 'axios';

export class AxiosUtils {
  async get<T>(url: string): Promise<T> {
    try {
      const response = await axios.get<T>(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
