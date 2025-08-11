jest.mock('../../config/logger', () => ({
    http: jest.fn(),
    warn: jest.fn(), // for direct calls like logger.warn()
    info: jest.fn(),
    error: jest.fn(),
    child: () => ({
        http: jest.fn(),      // <--- Add here as well if you call child().http()
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
    }),
}));
