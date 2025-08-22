import { beforeAll, afterAll, afterEach } from "vitest";
import { server } from '../mocks/node'
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
