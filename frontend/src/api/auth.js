import api from './axios'
// frontend/src/api/auth.js
const signupUser = async (data) => {
    try {
        const response = await api.post('/auth/signup', data);
        return response.data;
    } catch (error) {
        // Handles both validation errors and conflicts
        throw new Error(
            error.response?.data?.message ||
            (error.response?.data?.errors
                ? error.response.data.errors[0].msg
                : 'Signup failed')
        );
    }
};

const loginUser = async (data) => {
    try {
        const response = await api.post('/auth/login', data)
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.message ||
            (error.response?.data?.errors
                ? error.response.data.errors[0].msg
                : 'Login failed')
        );
    }
}
export { signupUser, loginUser };