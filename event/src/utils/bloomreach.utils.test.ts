import {
  getBloomreachAuthHeader,
  getBloomreachProjectToken,
} from './bloomreach.utils';

// Mock the readConfiguration function
jest.mock('./config.utils', () => ({
  readConfiguration: jest.fn(() => ({
    bloomreachEngagementApiKey: 'mockApiKey',
    bloomreachEngagementApiSecret: 'mockApiSecret',
    bloomreachEngagementProjectToken: 'mockProjectToken',
    projectKey: 'mockProjectKey',
  })),
}));

describe('getBloomreachAuthHeader', () => {
  it('should return a valid Basic Auth header', () => {
    const authHeader = getBloomreachAuthHeader();
    expect(authHeader).toEqual('Basic bW9ja0FwaUtleTptb2NrQXBpU2VjcmV0');
  });
});

describe('getBloomreachProjectToken', () => {
  it('should return the project token', () => {
    const projectToken = getBloomreachProjectToken();
    expect(projectToken).toEqual('mockProjectToken');
  });
});

