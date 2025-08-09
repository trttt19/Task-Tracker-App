//create navigate
import React from "react"
import { render, screen, cleanup } from "@testing-library/react"
import NavBar from "../../components/NavBar";
import { it, expect, describe, beforeEach, afterEach, vi } from 'vitest';
import "@testing-library/jest-dom/vitest"
import { Router, MemoryRouter } from "react-router-dom";
import { userEvent } from '@testing-library/user-event'
const mockNavigate = vi.fn()
const onChangeMock = vi.fn()
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        Link: actual.Link
    }
})
describe("nav bar rendering", () => {
    beforeEach(() => {

        const onChangeMock = vi.fn()
        render(
            <MemoryRouter>
                <NavBar value="" onChange={onChangeMock} />
            </MemoryRouter>
        )
    })
    afterEach(() => {
        onChangeMock.mockReset()
        cleanup()
    })
    it("renders create task button", () => {
        expect(screen.getByTestId("create_button")).toBeInTheDocument()
    })
    it("renders search bar", () => {
        expect(screen.getByTestId("search_bar")).toBeInTheDocument()
    })
})
describe("navBar functionality", () => {
    beforeEach(() => {

        render(
            <MemoryRouter>
                <NavBar value="" onChange={onChangeMock} />
            </MemoryRouter>
        )
    })
    afterEach(
        () => {
            cleanup()
            mockNavigate.mockReset()
            onChangeMock.mockReset()
        }
    )
    it("calls on change when value in searchbar changes", async () => {

        const user = userEvent.setup()
        const searchBar = screen.getByTestId("search_bar")
        await user.type(searchBar, "look")
        expect(onChangeMock).toHaveBeenCalledTimes(4)
        expect(onChangeMock).toHaveBeenCalledWith("l")
        expect(onChangeMock).toHaveBeenCalledWith("o")
        expect(onChangeMock).toHaveBeenCalledWith("o")
        expect(onChangeMock).toHaveBeenCalledWith("k")
    })
    it("navigates to /create on create task button click", async () => {
        const user = userEvent.setup()
        const createBtn = screen.getByTestId("create_button")
        await user.click(createBtn)
        expect(mockNavigate).toHaveBeenCalledWith('/tasks/create')
    })
})