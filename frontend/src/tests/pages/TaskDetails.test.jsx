import React from "react"
import { render, screen, waitFor, cleanup } from "@testing-library/react"
import TaskDetails from "../../pages/TaskDetails";
import { it, expect, describe, beforeEach, afterEach, vi } from 'vitest';
import "@testing-library/jest-dom/vitest"
import { Router, MemoryRouter } from "react-router-dom";
import { userEvent } from '@testing-library/user-event'
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
        expect(screen.getByLabelText(/Task Title/i)).toHaveValue("new title")
        expect(screen.getByLabelText(/description/i)).toHaveValue("this desc")
        expect(screen.getByLabelText(/Estimated Time/i)).toHaveValue(8)
        expect(screen.getByLabelText(/Logged Time/i)).toHaveValue(7)
        expect(screen.getByLabelText(/Priority/i)).toHaveValue("low")
        expect(screen.getByLabelText(/Status/i)).toHaveValue("toDo")

    })


})

describe("handle user interaction", () => {
    beforeEach(() => {
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
    it("deletes task when delete button is clicked", async () => {
        window.alert = vi.fn();
        const user = userEvent.setup()
        await waitFor(() => {
            expect(screen.queryByText(/Loading task details/i)).not.toBeInTheDocument()
        })
        const deleteBtn = screen.getByRole("button", { name: /delete/i })
        await user.click(deleteBtn)
        expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/Task Deleted/i))
        expect(mockNavigate).toHaveBeenCalledWith('/tasks')


    })


    it("edits task when save changes button is clicked", async () => {
        window.alert = vi.fn();
        const user = userEvent.setup()
        await waitFor(() => {
            expect(screen.queryByText(/Loading task details/i)).not.toBeInTheDocument()
        })
        const updateBtn = screen.getByRole("button", { name: /save changes/i })
        const titleIp = screen.getByLabelText(/Task Title/i)
        await user.clear(titleIp)
        await user.type(titleIp, "edit title")
        await user.click(updateBtn)
        expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/Task Updated Successfully!/i))
        expect(screen.getByLabelText(/Task Title/i)).toHaveValue("edit title")

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

