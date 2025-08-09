import React from "react"
import { cleanup, render, screen } from "@testing-library/react"
import Signup from "../../pages/signup";
import { it, expect, describe, beforeEach, afterEach } from 'vitest';
import "@testing-library/jest-dom/vitest"
import { MemoryRouter } from "react-router-dom";
import { userEvent } from '@testing-library/user-event'
import { vi } from "vitest";
import { signupUser } from "../../api/auth"
const originalLocalStorage = window.localStorage;

vi.mock("../../api/auth", () => ({
    signupUser: vi.fn()
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

describe("Signup page initial rendering", () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        )
    })
    afterEach(() => {
        cleanup();
    })
    it("renders name label and input", () => {

        expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    })
    it("renders email label and input", () => {

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    })

    it("renders password label and input", () => {

        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    })
    it("renders Signup button", () => {

        expect(screen.getByRole("button", { name: /Sign up/i, exact: true })).toBeInTheDocument()
    })
    it("renders login link", () => {
        expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument()
    })

})
describe("Signup page navigation", () => {
    beforeEach(() => {
        localStorage.clear()
        mockNavigate.mockReset()
        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        )
    })
    afterEach(() => {
        cleanup();
    })


    it("should navigate to login when the login link is clicked", async () => {
        const loginLink = screen.getByRole("link", { name: /login/i })
        expect(loginLink).toHaveAttribute('href', '/auth/login')
    })
})

describe("user interaction", () => {
    beforeEach(() => {

        mockNavigate.mockReset()
        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        )
    })
    afterEach(() => {
        cleanup();
        Object.defineProperty(window, 'localStorage', { value: originalLocalStorage });

    })
    it("updates name, email and password as user types", async () => {
        const user = userEvent.setup()
        const nameIp = screen.getByLabelText(/name/i)
        const emailIp = screen.getByLabelText(/email/i)
        const passwordIp = screen.getByLabelText(/password/i)
        await user.type(nameIp, "userName")
        await user.type(emailIp, "user@gmail.com")
        await user.type(passwordIp, "pass123")
        expect(nameIp).toHaveValue("userName")
        expect(emailIp).toHaveValue("user@gmail.com")
        expect(passwordIp).toHaveValue("pass123")

    })
    it("alerts user of successful login", async () => {
        window.alert = vi.fn();
        const user = userEvent.setup()
        signupUser.mockResolvedValueOnce({ message: "User created successfully" })
        const nameIp = screen.getByLabelText(/name/i)
        const emailIp = screen.getByLabelText(/email/i)
        const passwordIp = screen.getByLabelText(/password/i)
        await user.type(nameIp, "userName")
        await user.type(emailIp, "user@gmail.com")
        await user.type(passwordIp, "pass123")
        const signinBtn = screen.getByRole("button", { name: /Sign up/i, exact: true })
        await user.click(signinBtn)
        expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/Signup successful/i));

    })


    it("shows error on existing user", async () => {
        const user = userEvent.setup()
        signupUser.mockRejectedValueOnce(
            new Error("user already exists")
        )
        const nameIp = screen.getByLabelText(/name/i)
        const emailIp = screen.getByLabelText(/email/i)
        const passwordIp = screen.getByLabelText(/password/i)
        await user.type(nameIp, "userName")
        await user.type(emailIp, "user@gmail.com")
        await user.type(passwordIp, "pass123")
        const signinBtn = screen.getByRole("button", { name: 'Sign up' })
        await user.click(signinBtn)

        expect(screen.getByText("user already exists")).toBeInTheDocument()
    })
})