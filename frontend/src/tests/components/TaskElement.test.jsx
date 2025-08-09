//handle row click
import React from "react"
import { render, screen } from "@testing-library/react"
import TaskElement from "../../components/TaskElement";
import { it, expect, describe, vi } from 'vitest';
import "@testing-library/jest-dom/vitest"
import { Router, MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
vi.mock("../../api/tasks", () => ({
    getTask: vi.fn()
}))
const mockNavigate = vi.fn()
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        Link: actual.Link
    }
})
describe("task element", () => {
    it("navigates to /tasks/task:id on click", async () => {
        const taskMock = {
            "task_id": 44,
            "user_id": 1,
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
        render(
            <TaskElement task={taskMock} />
        )
        const taskElement = screen.getByTestId("task_element")
        const user = userEvent.setup()
        await user.click(taskElement)
        expect(mockNavigate).toHaveBeenCalledWith("/tasks/44")

    })
})