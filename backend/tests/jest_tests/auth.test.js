const db = require('../../models')
const env = require('../../config/env')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = require('../../app')
const request = require('supertest')
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

describe('Signup Controller - createUser', () => {
    beforeEach(() => {
        db.user.create.mockClear()
        db.user.findOne.mockClear()
    })
    it('should create a new user and return a 201 status', async () => {
        const mockCreatedUser = {
            user_id: 1,
            name: 'username',
            email: 'user@gmail.com',
        }
        db.user.findOne.mockResolvedValueOnce(null)
        db.user.create.mockResolvedValueOnce(mockCreatedUser)
        const response = await request(app)
            .post('/auth/signup')
            .send({
                "name": "username",
                "email": "user@gmail.com",
                "password": "pass123"
            })

        expect(db.user.findOne).toHaveBeenCalledWith({
            where: {
                email: "user@gmail.com"
            }
        })
        expect(db.user.create).toHaveBeenCalledWith({
            name: "username",
            email: "user@gmail.com",
            password: expect.any(String)
        })
        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual({ message: "User created successfully" })
    })


})



describe('Login Controller - loginUser', () => {
    beforeEach(() => {
        db.user.findOne.mockClear()
        bcrypt.compare.mockClear()
        jwt.sign.mockClear()
        env.ACCESS_TOKEN_SECRET = 'test_secret_key'
    })
    it('returns token and user name and email if login successful', async () => {
        const mockAccessToken = 'token'
        const mockUser = {
            "user_id": 10,
            "name": "toqua",
            "email": "toqua@gmail.com",
            "password": "hashedPassword"
        }

        db.user.findOne.mockResolvedValueOnce(mockUser)
        bcrypt.compare.mockResolvedValueOnce(true)
        jwt.sign.mockReturnValue(mockAccessToken)
        const response = await request(app)
            .post('/auth/login')
            .send({
                "email": "toqua@gmail.com",
                "password": "pass123"
            })
            .expect(200)
        expect(db.user.findOne).toHaveBeenCalledWith({
            where: {
                email: "toqua@gmail.com"
            }
        })
        expect(bcrypt.compare).toHaveBeenCalledWith("pass123", "hashedPassword")
        const mockUserInfo = { user_id: 10, email: "toqua@gmail.com", name: "toqua" }

        expect(jwt.sign).toHaveBeenCalledWith(mockUserInfo, 'test_secret_key', { expiresIn: '30m' })
        expect(response.body).toEqual({ accessToken: mockAccessToken, name: "toqua", email: "toqua@gmail.com" })
    })

})
