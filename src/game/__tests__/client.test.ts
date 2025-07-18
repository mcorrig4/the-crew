import { vi, describe, it, expect, beforeAll } from 'vitest';
import { createClient } from '../client';

// Mock socket.io-client to avoid real network connections
vi.mock('socket.io-client', () => ({
  default: vi.fn(() => ({
    on: vi.fn(),
    emit: vi.fn(),
    disconnect: vi.fn(),
    connect: vi.fn(),
    connected: true,
  })),
}));

describe('createClient', () => {
  beforeAll(() => {
    // Mock console methods to avoid noise in tests
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should instantiate boardgame.io client without error', () => {
    expect(() => {
      const Client = createClient();
      expect(Client).toBeDefined();
      expect(typeof Client).toBe('function');
    }).not.toThrow();
  });
});
