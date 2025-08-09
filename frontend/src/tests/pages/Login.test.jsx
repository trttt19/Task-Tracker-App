import React from "react"
import { cleanup, render, screen } from "@testing-library/react"
import Login from "../../pages/Login"
import { it, expect, describe, beforeEach, afterEach } from 'vitest';
import "@testing-library/jest-dom/vitest"
import { MemoryRouter } from "react-router-dom";
import { userEvent } from '@testing-library/user-event'
import { vi } from "vitest";
import { loginUser } from "../../api/auth"
const originalLocalStorage = window.localStorage;

vi.mock("../../api/auth", () => ({
    loginUser: vi.fn()
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

describe("login page initial rendering", () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )
    })
    afterEach(() => {
        cleanup();
    })
    it("renders email label and input", () => {

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    })

    it("renders password label and input", () => {

        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    })
    it("renders login button", () => {

        expect(screen.getByRole("button", { name: /log in/i, exact: true })).toBeInTheDocument()
    })
    it("renders signup link", () => {
        expect(screen.getByRole("link", { name: /signup/i })).toBeInTheDocument()
    })

})
describe("login page navigation", () => {
    beforeEach(() => {
        localStorage.clear()
        mockNavigate.mockReset()
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )
    })
    afterEach(() => {
        cleanup();
    })
    it("should navigate to tasks if correct credentials", async () => {

        loginUser.mockResolvedValueOnce({
            name: "username",
            accessToken: "dfghj"
        })
        const user = userEvent.setup()
        await user.type(screen.getByLabelText(/email/i), "user@gmail.com")
        await user.type(screen.getByLabelText(/password/i), "pass123")
        const loginBtn = screen.getByRole("button", { name: 'Log in' })
        await user.click(loginBtn)
        expect(mockNavigate).toHaveBeenCalledWith("/tasks")
    })

    it("should navigate to signup when the signup link is clicked", async () => {
        const signupLink = screen.getByRole("link", { name: /signup/i })
        expect(signupLink).toHaveAttribute('href', '/auth/signup')
    })
})

describe("user interaction", () => {
    beforeEach(() => {

        mockNavigate.mockReset()
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )
    })
    afterEach(() => {
        cleanup();
        Object.defineProperty(window, 'localStorage', { value: originalLocalStorage });

    })
    it("updates email and password as user types", async () => {
        const user = userEvent.setup()
        const emailIp = screen.getByLabelText(/email/i)
        const passwordIp = screen.getByLabelText(/password/i)

        await user.type(emailIp, "user@gmail.com")
        await user.type(passwordIp, "pass123")
        expect(emailIp).toHaveValue("user@gmail.com")
        expect(passwordIp).toHaveValue("pass123")

    })
    it("alerts user of successful login", async () => {
        window.alert = vi.fn();
        const user = userEvent.setup()
        loginUser.mockResolvedValueOnce({
            name: "username",
            accessToken: "token"
        })
        const emailIp = screen.getByLabelText(/email/i)
        const passwordIp = screen.getByLabelText(/password/i)
        await user.type(emailIp, "user@gmail.com")
        await user.type(passwordIp, "pass123")
        const loginBtn = screen.getByRole("button", { name: 'Log in' })
        await user.click(loginBtn)
        expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/login successful/i));

    })
    it("stores token in localStorage on successful login", async () => {
        const localStorageMock = {
            setItem: vi.fn(),
            clear: vi.fn(),
            getItem: vi.fn()
        }
        Object.defineProperty(window, 'localStorage', { value: localStorageMock, configurable: true })
        const user = userEvent.setup()
        loginUser.mockResolvedValueOnce({
            name: "username",
            accessToken: "token"
        })
        const emailIp = screen.getByLabelText(/email/i)
        const passwordIp = screen.getByLabelText(/password/i)

        await user.type(emailIp, "user@gmail.com")
        await user.type(passwordIp, "pass123")
        const loginBtn = screen.getByRole("button", { name: 'Log in' })
        await user.click(loginBtn)

        expect(localStorageMock.setItem).toHaveBeenCalledWith('token', "token")
    })

    it("shows error on invalid credentials", async () => {
        const user = userEvent.setup()
        loginUser.mockRejectedValueOnce(
            new Error("Invalid credentials")
        )
        const emailIp = screen.getByLabelText(/email/i)
        const passwordIp = screen.getByLabelText(/password/i)
        await user.type(emailIp, "user@gmail.com")
        await user.type(passwordIp, "pass123")
        const loginBtn = screen.getByRole("button", { name: 'Log in' })
        await user.click(loginBtn)

        expect(screen.getByText("Invalid credentials")).toBeInTheDocument()
    })
})