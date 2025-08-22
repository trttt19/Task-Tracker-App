const app = require('../../app')
const request = require('supertest')

describe('Auth Middleware - authToken', () => {

    it('should retuern a 401 if token invalid', async () => {
        const response = await request(app)
            .get('/tasks')
            .set('Authorization', 'kkk')
        expect(response.statusCode).toBe(401)
        expect(response.body).toEqual({ message: "Invalid token format" })
    })

})
