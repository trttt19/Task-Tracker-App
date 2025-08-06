const db = require('../../models')
const env = require('../../config/env')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { createUser } = require('../../controllers/signupController')
const { loginUser } = require('../../controllers/loginController')
const { validationResult } = require('express-validator')
const httpMocks = require('node-mocks-http')
jest.mock('../../models', () => ({
    user: {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
}))
jest.mock('bcrypt', () => ({
    compare: jest.fn(),
}));
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
}));
jest.mock('express-validator', () => {
    return {
        body: jest.fn().mockReturnThis(),
        check: jest.fn().mockReturnThis(),
        isString: jest.fn().mockReturnThis(),
        isLength: jest.fn().mockReturnThis(),
        notEmpty: jest.fn().mockReturnThis(),
        withMessage: jest.fn().mockReturnThis(),
        validationResult: jest.fn(() => ({
            isEmpty: jest.fn(() => true),
            array: jest.fn(() => []),
        })),
    };
});

describe('Signup Controller - createUser', () => {
    beforeEach(() => {
        db.user.create.mockClear()
        validationResult.mockClear()
        validationResult.mockImplementation(() => ({
            isEmpty: jest.fn(() => true),
            array: jest.fn(() => []),
        }))
    })
    it('should create a new user and return a 201 status', async () => {
        const mockCreatedUser = {
            user_id: 1,
            name: 'user',
            email: 'user@gmail.com',
        }

        db.user.findOne.mockResolvedValueOnce(null)
        db.user.create.mockResolvedValueOnce(mockCreatedUser)
        const mockRequest = httpMocks.createRequest({
            method: 'POST',
            url: '/users',
            body:
            {
                "name": "user",
                "email": "user@gmail.com",
                "password": "password"
            },
        })
        const mockResponse = httpMocks.createResponse()
        await createUser(mockRequest, mockResponse)
        expect(db.user.findOne).toHaveBeenCalledWith({
            where: {
                email: "user@gmail.com"
            }
        })
        expect(db.user.create).toHaveBeenCalledWith({
            name: "user",
            email: "user@gmail.com",
            password: "password"
        })
        expect(mockResponse.statusCode).toBe(201)
        // expect(mockResponse._getData()).toEqual(mockCreateduser)
        expect(mockResponse._getJSONData()).toEqual({ message: "User created successfully" })
    })

})



describe('Login Controller - loginUser', () => {
    beforeEach(() => {
        db.user.create.mockClear()
        validationResult.mockClear()
        validationResult.mockImplementation(() => ({
            isEmpty: jest.fn(() => true),
            array: jest.fn(() => []),
        }))
    })
    it('returns tken and user name and email if login successful', async () => {
        const mockAccessToken = 'token'
        const mockUser = {
            "user_id": 10,
            "name": "user",
            "email": "user@gmail.com",
            "password": "password"
        }

        db.user.findOne.mockResolvedValueOnce(mockUser)
        bcrypt.compare.mockResolvedValueOnce(true)
        jwt.sign.mockReturnValue(mockAccessToken)
        const mockRequest = httpMocks.createRequest({
            method: 'POST',
            url: '/users',
            body:
            {
                "email": "user@gmail.com",
                "password": "password"
            },
        })
        const mockResponse = httpMocks.createResponse()
        await loginUser(mockRequest, mockResponse)
        expect(db.user.findOne).toHaveBeenCalledWith({
            where: {
                email: "user@gmail.com"
            }
        })
        expect(bcrypt.compare).toHaveBeenCalledWith("password", "password")
        const mockUserInfo = { user_id: 10, email: "user@gmail.com", name: "user" }

        expect(jwt.sign).toHaveBeenCalledWith(mockUserInfo, env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
        expect(mockResponse.statusCode).toBe(200)
        // expect(mockResponse._getData()).toEqual(mockCreateduser)
        expect(mockResponse._getJSONData()).toEqual({ accessToken: mockAccessToken, name: "user", email: "user@gmail.com" })
    })

})
