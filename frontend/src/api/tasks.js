import api from './axios'

const getAllTasks = async (params = {}) => {
    try {
        const response = await api.get('/api/tasks', { params });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            (error.response?.data?.errors
                ? error.response.data.errors[0].msg
                : 'Data Retrival failed')
        );
    }
};

const getTask = async (task_id) => {
    try {
        const response = await api.get(`/api/tasks/${task_id}`)
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            (error.response?.data?.errors
                ? error.response.data.errors[0].msg
                : 'Data Retrival failed')
        );
    }
}

const updateTask = async (task_id, data) => {
    try {
        const response = await api.patch(`/api/tasks/${task_id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            (error.response?.data?.errors
                ? error.response.data.errors[0].msg
                : 'Update failed')
        );
    }
};
const createTask = async (data) => {
    try {
        const response = await api.post(`/api/tasks`, data);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            (error.response?.data?.errors
                ? error.response.data.errors[0].msg
                : 'Creation failed')
        );
    }
};
const deleteTask = async (task_id) => {
    try {
        const response = await api.delete(`/api/tasks/${task_id}`)
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            (error.response?.data?.errors
                ? error.response.data.errors[0].msg
                : 'Delete failed')
        );
    }
}
export { getAllTasks, getTask, updateTask, deleteTask, createTask }