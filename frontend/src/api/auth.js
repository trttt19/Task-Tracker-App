import api from './axios'
const signupUser = async (data) => {
    try {
        // const response = await api.post('/api/auth/signup', data);
        const response = await api.post('auth/signup', data);

        return response.data;
    } catch (error) {
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
        // const response = await api.post('/api/auth/login', data)
        const response = await api.post('auth/login', data)

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