import { http, HttpResponse } from 'msw'
export const handlers = [
    http.post('/api/auth/login', async ({ request }) => {
        const { email, password } = await request.json()
        if (email === 'user@gmail.com' && password === 'pass123') {
            return HttpResponse.json({
                accessToken: 'token',
                name: 'username',
                email: 'user@gmail.com'
            }, { status: 200 })
        }
        else {
            return HttpResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            )
        }
    }),
    http.post('/api/auth/signup', async ({ request }) => {
        const { email } = await request.json()
        if (email === 'user@gmail.com') {
            return HttpResponse.json(
                { message: "user already exists" }, { status: 409 }
            )
        } else {
            return HttpResponse.json({
                message: "User created successfully"
            },
                { status: 201 }
            )
        }

    }),
    http.post('/api/tasks', async ({ request }) => {
        const { title } = await request.json()
        if (!title) {
            return HttpResponse.json({
                "errors": [
                    {
                        "type": "field",
                        "value": "",
                        "msg": "Title is required",
                        "path": "title",
                        "location": "body"
                    }
                ]

            }, { status: 400 })
        } else {
            return HttpResponse.json({
                "task": {
                    "task_id": 44,
                    "user_id": 1,
                    "title": "new title",
                    "description": null,
                    "logged_time": 0,
                    "status": "toDo",
                    "estimated_time": 0,
                    "priority": "low",
                    "due_date": null,
                    "createdAt": "2025-07-29T13:14:26.784Z",
                    "updatedAt": "2025-08-03T08:25:54.279Z"
                }

            }, { status: 200 })
        }
    }),
    http.patch('/api/tasks/:task_id', async ({ request, params }) => {
        const { task_id } = params
        const task = await request.json()
        return HttpResponse.json(
            {
                "message": "Task updated successfully",
                "task": {
                    "task_id": task_id,
                    "user_id": 1,
                    "title": task.title ?? "new title",
                    "description": task.description ?? "this desc",
                    "logged_time": task.logged_time ?? 0,
                    "status": task.status ?? "toDo",
                    "estimated_time": task.estimated_time ?? 0,
                    "priority": task.priority ?? "low",
                    "due_date": task.due_date ?? null,
                    "createdAt": "2025-07-29T13:14:26.784Z",
                    "updatedAt": new Date().toISOString()
                }
            },
            {
                status: 200
            }
        )
    }),
    http.get('/api/tasks/:task_id', async ({ params }) => {
        const { task_id } = params
        if (task_id === '44') {
            return HttpResponse.json({
                "task": {
                    "task_id": 44,
                    "user_id": 1,
                    "title": "new title",
                    "description": "this desc",
                    "logged_time": 7,
                    "status": "toDo",
                    "estimated_time": 8,
                    "priority": "low",
                    "due_date": null,
                    "createdAt": "2025-07-29T13:14:26.784Z",
                    "updatedAt": "2025-08-03T08:25:54.279Z"
                }
            }, { status: 200 })
        } else {
            return HttpResponse.json({
                message: "no task exists with this task id"
            }, { status: 404 })
        }
    }),
    http.delete('/api/tasks/:task_id', async ({ params }) => {
        const { task_id } = params
        if (task_id === '44') {
            return HttpResponse.json({
                status: 204
            })
        }
    }),
    http.get('/api/tasks', () => {

        return HttpResponse.json({
            "tasks": [
                {
                    "task_id": 3,
                    "title": "task",
                    "status": "toDo",
                    "priority": "medium",
                    "due_date": "2000-08-10T12:30:00.000Z",

                },
                {
                    "task_id": 4,
                    "title": "task2",

                    "status": "toDo",

                    "priority": "medium",
                    "due_date": "2000-08-10T12:30:00.000Z",
                }]
        }, { status: 200 })
    })
]

