import axios from 'axios';
 
const apiUrl = process.env.REACT_APP_API_URL;
const apiclient=axios.create({baseURL:apiUrl});
apiclient.interceptors.response.use(response => response, error => {console.error('Axios error response:',error.response)
return Promise.reject(error);});
export default {
  // פונקציה לקבלת כל המשימות
  getTasks: async () => {
    try {
      const result = await apiclient.get(`/items`);
      return result.data;
    } catch (error) {
      console.error('Error in getTasks:', error.message);
      return [];
    }
  },

  // פונקציה להוספת משימה חדשה
  addTask: async (name) => {
    try {
      const result = await apiclient.post(`/items`, { name ,isComplete:false});
      console.log('addTask', result.data);
      return result.data;
    } catch (error) {
      console.error('Error in addTask:', error.message);
      return {};
    }
  },

  // פונקציה לעדכון סטטוס משימה
  setCompleted: async (id, isComplete) => {
    try {
      const result = await apiclient.put(`/items/${id}?inputItem=${isComplete}`);
      console.log('setCompleted', { id, isComplete });
      return result.data;
    } catch (error) {
      console.error('Error in setCompleted:', error.message);
      return {};
    }
  },
  

  // פונקציה למחיקת משימה לפי מזהה
  deleteTask: async (id) => {
    try {
      await apiclient.delete(`/items/${id}`);
      console.log('deleteTask', id);
      return {};
    } catch (error) {
      console.error('Error in deleteTask:', error.message);
      return {};
    }
  },
};
