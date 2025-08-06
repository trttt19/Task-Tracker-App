jest.mock('../../config/logger', () => ({
    warn: jest.fn(), // for direct calls like logger.warn()
    info: jest.fn(),
    error: jest.fn(),
    child: () => ({
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
    }),
}));
