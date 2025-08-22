import React from "react"
import { render, screen, waitFor, cleanup } from "@testing-library/react"
import Tasks from "../../pages/Tasks";
import { it, expect, describe, beforeEach, afterEach, vi } from 'vitest';
import "@testing-library/jest-dom/vitest"
import { MemoryRouter } from "react-router-dom";
import { userEvent } from '@testing-library/user-event'
const mockNavigate = vi.fn()
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        Link: actual.Link
    }
})
const localStorageMock = {
    setItem: vi.fn(),
    clear: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn()
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock, configurable: true })

describe("tasks initial rendering", () => {

    beforeEach(() => {
        localStorageMock.getItem.mockImplementation((key) => {
            if (key === "name")
                return "testUsername"
            else if (key === "token")
                return "thisTokenVal"
        })
        render(
            <MemoryRouter>
                <Tasks />
            </MemoryRouter>
        )
    })
    afterEach(() => {
        vi.resetAllMocks()
        cleanup()
    })
    it("displays username", async () => {
        expect(screen.getByText("Welcome back, testUsername")).toBeInTheDocument()
    })

    it("fetches and displays user tasks", async () => {


        await waitFor(() => {
            expect(screen.getByText("task")).toBeInTheDocument()
            expect(screen.getByText("task2")).toBeInTheDocument()

        })

    })

})

describe("handle user interaction", () => {
    beforeEach(() => {
        localStorageMock.getItem.mockImplementation((key) => {
            if (key === "name")
                return "testUsername"
            else if (key === "token")
                return "thisTokenVal"
        })
        render(
            <MemoryRouter>
                <Tasks />
            </MemoryRouter>
        )
    })
    afterEach(() => {
        vi.resetAllMocks()
        cleanup()
    })
    it("searches for input in search bar", async () => {
        const user = userEvent.setup()
        const searchBar = await screen.findByRole("textbox")
        await user.type(searchBar, "task2")
        await waitFor(() => {
            expect(screen.getByText("task2")).toBeInTheDocument()
        })
    })
    it("handles user logout", async () => {
        const user = userEvent.setup()
        const logoutBtn = screen.getByRole("button", { name: /logout/i })
        await user.click(logoutBtn)
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('token')
        expect(mockNavigate).toHaveBeenCalledWith('/auth/login')

    })


})