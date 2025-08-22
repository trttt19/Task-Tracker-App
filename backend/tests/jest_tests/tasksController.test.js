const db = require('../../models')
const app = require('../../app')
const request = require('supertest')
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn((token, secret, callback) => {
        callback(null, { user_id: 10 })
    })
}))
jest.mock('../../models', () => ({
    task: {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
}))
describe('Task Controller - createTask', () => {
    beforeEach(() => {
        db.task.create.mockClear()
    })
    it('should create a new task and return a 201 status', async () => {
        const mockCreatedTask = {
            user_id: 10,
            task_id: 1,
            title: 'Test Task',
            description: 'desc',
        }
        const mockSequelizeInstance = {
            user_id: 10,
            task_id: 1,
            title: 'Test Task',
            description: 'desc',
            get: function () { return { user_id: this.user_id, task_id: this.task_id, title: this.title, description: this.description }; },
        }
        db.task.create.mockResolvedValueOnce(mockSequelizeInstance)
        const response = await request(app).post('/tasks')
            .send({
                title: 'Test Task', description: 'desc'
            }).set('Authorization', 'Bearer mockValidToken')

        expect(db.task.create).toHaveBeenCalledWith({
            user_id: 10,
            title: 'Test Task',
            description: 'desc',
        })
        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual(mockCreatedTask)
    })

    it('returns status code 400 with errors array for validation errors', async () => {
        const mockErrors = [{
            "type": "field",
            "value": "",
            "msg": "Title is required",
            "path": "title",
            "location": "body"
        }]

        const response = await request(app).post('/tasks').send({
            title: "", description: 'desc'
        }).set('Authorization', 'Bearer mockValidToken')

        expect(db.task.create).not.toHaveBeenCalledWith()
        expect(response.statusCode).toBe(400)
        expect(response.body).toEqual({ errors: mockErrors })
    })
})

describe('Task Controller - readTask', () => {
    beforeEach(() => {
        db.task.findAll.mockClear()
    })
    it('gets first 10 tasks with status code 200', async () => {
        const mockReturnedTasks =
            [
                {
                    "task_id": 1,
                    "user_id": 10,
                    "title": "Mock Task 1",
                    "description": "this desc",
                    "logged_time": 1,
                    "status": "toDo",
                    "estimated_time": 2.5,
                    "priority": "low",
                    "due_date": "2000-08-10T12:30:00.000Z",
                    "createdAt": "2025-07-29T13:14:26.784Z",
                    "updatedAt": "2025-08-03T08:25:54.279Z"
                },
                {
                    "task_id": 2,
                    "user_id": 10,
                    "title": "Mock Task 2",
                    "description": "desc",
                    "logged_time": 0,
                    "status": "inProgress",
                    "estimated_time": 0,
                    "priority": "medium",
                    "due_date": "2000-08-10T12:50:00.000Z",
                    "createdAt": "2025-07-29T13:14:35.455Z",
                    "updatedAt": "2025-08-03T07:15:49.117Z"
                },
            ]


        db.task.findAll.mockResolvedValue(mockReturnedTasks)
        const response = await request(app)
            .get('/tasks')
            .set('Authorization', 'Bearer mockValidToken')
        expect(db.task.findAll).toHaveBeenCalledWith({
            where: {
                user_id: 10
            },
            order: [["due_date", "asc"]],
            limit: 10,
            offset: 0,

        })
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({ tasks: mockReturnedTasks })
    })

    it('gets task by id with a status code 200', async () => {
        const mockReturnedTask = {
            "task_id": 1,
            "user_id": 10,
            "title": "Mock Task 1",
            "description": "this desc",
            "logged_time": 1,
            "status": "toDo",
            "estimated_time": 2.5,
            "priority": "low",
            "due_date": "2000-08-10T12:30:00.000Z",
            "createdAt": "2025-07-29T13:14:26.784Z",
            "updatedAt": "2025-08-03T08:25:54.279Z"
        }

        db.task.findOne.mockResolvedValue(mockReturnedTask)
        const response = await request(app)
            .get('/tasks/1')
            .set('Authorization', 'Bearer mockValidToken')

        expect(db.task.findOne).toHaveBeenCalledWith({
            where: {
                user_id: 10,
                task_id: "1",
            },

        })
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({ task: mockReturnedTask })

    })

    it('returns 404 for task not found', async () => {


        db.task.findOne.mockResolvedValue(null)

        const response = await request(app).get('/tasks/1000')
            .set('Authorization', 'Bearer mockValidToken')
        expect(db.task.findOne).toHaveBeenCalledWith({
            where: {
                user_id: 10,
                task_id: "1000",
            },

        })
        expect(response.statusCode).toBe(404)
        expect(response.body).toEqual({ "message": "no task exists with this task id" })
    })
})

describe('Task Controller - updateTask', () => {
    beforeEach(() => {
        db.task.findAll.mockClear()

    })
    it('updates task by id with a status code 200', async () => {
        const mockReturnedTask = {
            "task_id": 1,
            "user_id": 10,
            "title": "updateed title",
            "description": "description",
            "logged_time": 3.5,
            "status": "toDo",
            "estimated_time": 9,
            "priority": "low",
            "due_date": "2000-08-10T12:30:00.000Z",
            "createdAt": "2025-07-29T13:14:26.784Z",
            "updatedAt": "2025-08-06T00:39:14.545Z"
        }


        db.task.update.mockResolvedValue([1, [mockReturnedTask]])

        const response = await request(app)
            .patch('/tasks/1')
            .set('Authorization', 'Bearer mockValidToken')
            .send({
                "title": "edit updateed",
                "description": "description",
                "logged_time": 3.5,
                "estimated_time": 9
            })
        expect(db.task.update).toHaveBeenCalledWith(
            {
                "title": "edit updateed",
                "description": "description",
                "logged_time": 3.5,
                "estimated_time": 9
            },
            {
                where: {
                    user_id: 10,
                    task_id: "1",
                },
                returning: true
            }

        )
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({ message: "Task updated successfully", task: mockReturnedTask })

    })
})



describe('Task Controller - deleteTask', () => {
    beforeEach(() => {
        db.task.findAll.mockClear()

    })
    it('deletes task by id with a status code 200', async () => {

        db.task.destroy.mockResolvedValue(null)

        const response = await request(app)
            .delete('/tasks/1')
            .set('Authorization', 'Bearer mockValidToken')
        expect(db.task.destroy).toHaveBeenCalledWith(

            {
                where: {
                    user_id: 10,
                    task_id: "1",
                },

            }

        )
        expect(response.statusCode).toBe(204)

    })
})











