import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axiosInstance = axios.create();
const mock = new MockAdapter(axiosInstance);

// Mock sign-up endpoint
mock.onPost('/signup').reply(200, {
    user: { id: 1, name: 'User' }
});

// Mock sign-in endpoint
mock.onPost('/login').reply((config) => {
    const { email, password } = JSON.parse(config.data);

    // Define roles based on email
    const userRoles = {
        'employer@gmail.com': 'employer',
        'applicant1@gmail.com': 'applicant',
        'applicant2@gmail.com': 'applicant',
    };

    // Check if the email is in the userRoles object and verify the password
    if (userRoles[email] && password === 'password123') {
        const session = { token: 'mockToken' };
        const user = {
            id: 1,
            name: userRoles[email] === 'employer' ? 'Employer' : 'Applicant',
            photo: 'sam.jpg',
            role: userRoles[email]
        };

        return [200, { session, user }];
    } else {
        return [400, { message: 'Incorrect username or password' }];
    }
});

export default axiosInstance;
