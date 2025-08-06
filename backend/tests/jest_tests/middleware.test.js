const { authToken } = require('../../middleware/authMiddleware')
const httpMocks = require('node-mocks-http');


jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));


describe('Auth Middleware - authToken', () => {

    it('should retuern a 401 if token invalid', async () => {
        const mockRequest = httpMocks.createRequest(
            { headers: 'kkk', }
        )
        const mockResponse = httpMocks.createResponse()
        const nextFunction = jest.fn()
        authToken(mockRequest, mockResponse, nextFunction)
        expect(mockResponse.statusCode).toBe(401)
        expect(mockResponse._getJSONData()).toEqual({ message: "Invalid token format" })
    })

})
