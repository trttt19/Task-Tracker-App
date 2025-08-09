import React from "react"
import { render, screen, cleanup } from "@testing-library/react"
import CreateNewTask from "../../pages/CreateNewTask";
import { it, expect, describe, beforeEach, afterEach, vi } from 'vitest';
import "@testing-library/jest-dom/vitest"
import { Router, MemoryRouter } from "react-router-dom";
import { userEvent } from '@testing-library/user-event'
import { createTask } from "../../api/tasks";
vi.mock("../../api/tasks", () => ({
    createTask: vi.fn()
}))
const mockNavigate = vi.fn()
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useParams: () => ({ task_id: "44" }),
        useNavigate: () => mockNavigate,
        Link: actual.Link
    }
})

describe("Creation form initial rendering", () => {

    beforeEach(() => {
        render(
            <MemoryRouter >
                <CreateNewTask />
            </MemoryRouter>
        )
    })
    afterEach(() => {
        cleanup()
        vi.resetAllMocks()

    })

    it("displays form formate", async () => {
        screen.logTestingPlaygroundURL()

        expect(screen.getByLabelText(/Task Title/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Estimated Time/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Logged Time/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Priority/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Status/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Due Date/i)).toBeInTheDocument()

    })


})

describe("handle user interaction", () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <CreateNewTask />
            </MemoryRouter>
        )
    })
    afterEach(() => {

        vi.resetAllMocks()
        cleanup()
    })
    //new task
    it("creates task when add task button is clicked", async () => {
        window.alert = vi.fn();
        createTask.mockResolvedValueOnce({
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

        })
        const user = userEvent.setup()

        const updateBtn = screen.getByRole("button", { name: /Add Task/i })
        const titleIp = screen.getByLabelText(/Task Title/i)
        await user.type(titleIp, "new title")
        await user.click(updateBtn)
        const payload = {

            "title": "new title",
        }
        expect(createTask).toHaveBeenCalledWith(payload)
        expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/Task Created Successfully!/i))


    })


    it("navigates to tasks when user click close button", async () => {
        const user = userEvent.setup()

        const closeBtn = screen.getByRole("button", { name: /close/i })
        await user.click(closeBtn)
        expect(mockNavigate).toHaveBeenCalledWith('/tasks')
    })
})

