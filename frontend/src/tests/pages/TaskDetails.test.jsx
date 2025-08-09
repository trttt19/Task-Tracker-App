import React from "react"
import { render, screen, waitFor, cleanup } from "@testing-library/react"
import TaskDetails from "../../pages/TaskDetails";
import { it, expect, describe, beforeEach, afterEach, vi } from 'vitest';
import "@testing-library/jest-dom/vitest"
import { Router, MemoryRouter } from "react-router-dom";
import { userEvent } from '@testing-library/user-event'
import { updateTask, deleteTask, getTask } from "../../api/tasks";
vi.mock("../../api/tasks", () => ({
    getTask: vi.fn(),
    deleteTask: vi.fn(),
    updateTask: vi.fn()
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

describe("task details initial rendering", () => {

    beforeEach(() => {

        getTask.mockResolvedValue({
            "task": {
                "task_id": 44,
                "user_id": 100,
                "title": "Edited Task 2",
                "description": "this desc",
                "logged_time": 1,
                "status": "toDo",
                "estimated_time": 2.5,
                "priority": "low",
                "due_date": "2000-08-10T12:30:00.000Z",
                "createdAt": "2025-07-29T13:14:26.784Z",
                "updatedAt": "2025-08-03T08:25:54.279Z"
            }
        })
        render(
            <MemoryRouter >
                <TaskDetails />


            </MemoryRouter>
        )
    })
    afterEach(() => {
        cleanup()
        vi.resetAllMocks()

    })

    it("displays task details", async () => {
        await waitFor(() => {
            expect(screen.queryByText(/Loading task details/i)).not.toBeInTheDocument()
        })

        expect(screen.getByLabelText(/Task Title/i)).toHaveValue("Edited Task 2")
        expect(screen.getByLabelText(/description/i)).toHaveValue("this desc")
        expect(screen.getByLabelText(/Estimated Time/i)).toHaveValue(2.5)
        expect(screen.getByLabelText(/Logged Time/i)).toHaveValue(1)
        expect(screen.getByLabelText(/Priority/i)).toHaveValue("low")
        expect(screen.getByLabelText(/Status/i)).toHaveValue("toDo")

    })


})

describe("handle user interaction", () => {
    beforeEach(() => {

        getTask.mockResolvedValue({
            "task": {
                "task_id": 44,
                "user_id": 100,
                "title": "Task 2",
                "description": "this desc",
                "logged_time": 1,
                "status": "toDo",
                "estimated_time": 2.5,
                "priority": "low",
                "due_date": "2000-08-10T12:30:00.000Z",
                "createdAt": "2025-07-29T13:14:26.784Z",
                "updatedAt": "2025-08-03T08:25:54.279Z"
            }
        })
        render(
            <MemoryRouter>
                <TaskDetails />
            </MemoryRouter>
        )
    })
    afterEach(() => {

        vi.resetAllMocks()
        cleanup()
    })
    //     //task deletion
    it("deletes task when delete button is clicked", async () => {
        window.alert = vi.fn();

        deleteTask.mockResolvedValueOnce(null)
        const user = userEvent.setup()
        await waitFor(() => {
            expect(screen.queryByText(/Loading task details/i)).not.toBeInTheDocument()
        })
        const deleteBtn = screen.getByRole("button", { name: /delete/i })
        await user.click(deleteBtn)
        expect(deleteTask).toHaveBeenCalledWith("44")
        expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/Task Deleted/i))
        expect(mockNavigate).toHaveBeenCalledWith('/tasks')


    })


    //     //task editing
    it("edits task when save changes button is clicked", async () => {
        window.alert = vi.fn();
        updateTask.mockResolvedValueOnce({
            "message": "Task updated successfully",
            "task": {
                "task_id": 44,
                "user_id": 1,
                "title": "edit tile",
                "description": "add description",
                "logged_time": 3.5,
                "status": "toDo",
                "estimated_time": 9,
                "priority": "low",
                "due_date": "2000-08-10T12:30:00.000Z",
                "createdAt": "2025-07-29T13:14:26.784Z",
                "updatedAt": "2025-08-06T00:39:14.545Z"
            }

        })
        const user = userEvent.setup()
        await waitFor(() => {
            expect(screen.queryByText(/Loading task details/i)).not.toBeInTheDocument()
        })
        const updateBtn = screen.getByRole("button", { name: /save changes/i })
        const titleIp = screen.getByLabelText(/Task Title/i)
        await user.clear(titleIp)
        await user.type(titleIp, "edit title")
        await user.click(updateBtn)
        const payload = {

            "title": "edit title",
        }
        expect(updateTask).toHaveBeenCalledWith(44, payload)
        expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/Task Updated Successfully!/i))


    })
    it("handles when user click save changes without editing anything", async () => {
        window.alert = vi.fn();
        const user = userEvent.setup()
        await waitFor(() => {
            expect(screen.queryByText(/Loading task details/i)).not.toBeInTheDocument()
        })
        const updateBtn = screen.getByRole("button", { name: /save changes/i })
        await user.click(updateBtn)
        expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/No changes detected to update./i))
    })


    it("navigates to tasks when user click close button", async () => {
        const user = userEvent.setup()
        await waitFor(() => {
            expect(screen.queryByText(/Loading task details/i)).not.toBeInTheDocument()
        })
        const closeBtn = screen.getByRole("button", { name: /close/i })
        await user.click(closeBtn)
        expect(mockNavigate).toHaveBeenCalledWith('/tasks')
    })
})

