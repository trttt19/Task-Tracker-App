//const createTaskController = require('../../controllers/taskController')
const db = require('../../models')
const { createTask } = require('../../controllers/taskController')
const { validationResult } = require('express-validator')
const httpMocks = require('node-mocks-http')
//const { jest } = require('globals')
const { getAllTasks, getTask } = require('../../controllers/readTaskController')
const { patchTask } = require('../../controllers/updateTaskController')
const { deleteTask } = require('../../controllers/deleteTaskController')
jest.mock('../../models', () => ({
    task: {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
}))
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

describe('Task Controller - createTask', () => {
    beforeEach(() => {
        db.task.create.mockClear()
        validationResult.mockClear()
        validationResult.mockImplementation(() => ({
            isEmpty: jest.fn(() => true),
            array: jest.fn(() => []),
        }))
    })
    it('should create a new task and return a 201 status', async () => {
        const mockCreatedTask = {
            task_id: 1,
            title: 'Test Task',
            description: 'desc',
        }
        const mockSequelizeInstance = {
            task_id: 1,
            title: 'Test Task',
            description: 'desc',
            get: function () { return { task_id: this.task_id, title: this.title, description: this.description }; },
        }
        db.task.create.mockResolvedValueOnce(mockSequelizeInstance)
        const mockRequest = httpMocks.createRequest({
            method: 'POST',
            url: '/tasks',
            body: { title: 'Test Task', description: 'desc' },
            user: { user_id: 10 },
        })
        const mockResponse = httpMocks.createResponse()
        await createTask(mockRequest, mockResponse)
        expect(db.task.create).toHaveBeenCalledWith({
            user_id: 10,
            title: 'Test Task',
            description: 'desc',
        })
        expect(mockResponse.statusCode).toBe(201)
        // expect(mockResponse._getData()).toEqual(mockCreatedTask)
        expect(mockResponse._getJSONData()).toEqual(mockCreatedTask)
    })

    it('returns status code 400 with errors array for validation errors', async () => {
        const mockErrors = [{
            "type": "field",
            "value": "",
            "msg": "Title is required",
            "path": "title",
            "location": "body"
        }]
        validationResult.mockImplementation(() => ({
            isEmpty: jest.fn(() => false),
            array: jest.fn(() => mockErrors),
        }));
        //validationResult.mockResolvedValueOnce(mockErrors)
        const mockRequest = httpMocks.createRequest({
            method: 'POST',
            url: '/tasks',
            body: { title: "", description: 'desc' },
            user: { user_id: 10 },
        })
        const mockResponse = httpMocks.createResponse()
        await createTask(mockRequest, mockResponse)
        expect(db.task.create).not.toHaveBeenCalledWith()
        expect(mockResponse.statusCode).toBe(400)
        // expect(mockResponse._getData()).toEqual(mockCreatedTask)
        expect(mockResponse._getJSONData()).toEqual({ errors: mockErrors })
    })
})

describe('Task Controller - readTask', () => {
    beforeEach(() => {
        db.task.findAll.mockClear()
        validationResult.mockClear()
        validationResult.mockImplementation(() => ({
            isEmpty: jest.fn(() => true),
            array: jest.fn(() => []),
        }))
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
        const mockRequest = httpMocks.createRequest({
            method: 'GET',
            url: '/tasks',
            user: { user_id: 10 },
        })
        const mockResponse = httpMocks.createResponse()
        await getAllTasks(mockRequest, mockResponse)

        expect(db.task.findAll).toHaveBeenCalledWith({
            where: {
                user_id: 10
            },
            order: [["due_date", "asc"]],
            limit: 10,
            offset: 0,



        })
        expect(mockResponse.statusCode).toBe(200)
        // expect(mockResponse._getData()).toEqual(mockCreatedTask)
        expect(mockResponse._getJSONData()).toEqual({ tasks: mockReturnedTasks })
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
        const mockRequest = httpMocks.createRequest({
            method: 'GET',
            url: '/tasks/1',
            params: { task_id: 1 },
            user: { user_id: 10 },
        })
        const mockResponse = httpMocks.createResponse()
        await getTask(mockRequest, mockResponse)

        expect(db.task.findOne).toHaveBeenCalledWith({
            where: {
                user_id: 10,
                task_id: 1,
            },

        })
        expect(mockResponse.statusCode).toBe(200)
        // expect(mockResponse._getData()).toEqual(mockCreatedTask)
        expect(mockResponse._getJSONData()).toEqual({ task: mockReturnedTask })

    })

    it('returns 404 for task not found', async () => {


        db.task.findOne.mockResolvedValue(null)
        const mockRequest = httpMocks.createRequest({
            method: 'GET',
            url: '/tasks/100',
            params: { task_id: 100 },
            user: { user_id: 10 },
        })
        const mockResponse = httpMocks.createResponse()
        await getTask(mockRequest, mockResponse)

        expect(db.task.findOne).toHaveBeenCalledWith({
            where: {
                user_id: 10,
                task_id: 100,
            },

        })
        expect(mockResponse.statusCode).toBe(404)
        // expect(mockResponse._getData()).toEqual(mockCreatedTask)
        expect(mockResponse._getJSONData()).toEqual({ "message": "no task exists with this task id" })
    })
})

describe('Task Controller - updateTask', () => {
    beforeEach(() => {
        db.task.findAll.mockClear()
        validationResult.mockClear()
        validationResult.mockImplementation(() => ({
            isEmpty: jest.fn(() => true),
            array: jest.fn(() => []),
        }))
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
        const mockRequest = httpMocks.createRequest({
            method: 'PATCH',
            url: '/tasks/1',
            params: { task_id: 1 },
            body: {
                "title": "edit updateed",
                "description": "description",
                "logged_time": 3.5,
                "estimated_time": 9
            },
            user: { user_id: 10 },
        })
        const mockResponse = httpMocks.createResponse()
        await patchTask(mockRequest, mockResponse)
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
                    task_id: 1,
                },
                returning: true
            }

        )
        expect(mockResponse.statusCode).toBe(200)
        // expect(mockResponse._getData()).toEqual(mockCreatedTask)
        expect(mockResponse._getJSONData()).toEqual({ message: "Task updated successfully", task: mockReturnedTask })

    })
})



describe('Task Controller - deleteTask', () => {
    beforeEach(() => {
        db.task.findAll.mockClear()
        validationResult.mockClear()
        validationResult.mockImplementation(() => ({
            isEmpty: jest.fn(() => true),
            array: jest.fn(() => []),
        }))
    })
    it('deletes task by id with a status code 200', async () => {

        db.task.destroy.mockResolvedValue(null)
        const mockRequest = httpMocks.createRequest({
            method: 'DELETE',
            url: '/tasks/1',
            params: { task_id: 1 },
            user: { user_id: 10 },
        })
        const mockResponse = httpMocks.createResponse()
        await deleteTask(mockRequest, mockResponse)
        expect(db.task.destroy).toHaveBeenCalledWith(

            {
                where: {
                    user_id: 10,
                    task_id: 1,
                },

            }

        )
        expect(mockResponse.statusCode).toBe(204)

    })
})











