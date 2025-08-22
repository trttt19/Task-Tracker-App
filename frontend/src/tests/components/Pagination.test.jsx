import React from "react"
import { render, screen, cleanup } from "@testing-library/react"
import Pagination from "../../components/Pagination";
import { it, expect, describe, beforeEach, vi } from 'vitest';
import "@testing-library/jest-dom/vitest"
import { Router, MemoryRouter } from "react-router-dom";
const onClickMock = vi.fn()
describe("pagination button visiblity", () => {
    beforeEach(() => {
        cleanup()
    })
    it("enables load more button when there is more pages", () => {
        render(
            <Pagination hasNext={true} onClick={onClickMock} />
        )
        expect(screen.getByRole("button", { name: /Load more/i })).toBeInTheDocument()
    })
    it("disables load more button when there is no more pages", () => {
        render(
            <Pagination hasNext={false} onClick={onClickMock} />
        )
        expect(screen.getByRole("button", { name: /Load more/i })).toBeDisabled()
    })
})