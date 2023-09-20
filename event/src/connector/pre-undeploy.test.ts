import { assertError } from '../utils/assert.utils';
import * as preUndeploy from './pre-undeploy';
import * as actions from './actions';

jest.mock('../utils/assert.utils', () => ({
  assertError: jest.fn(),
}));

jest
  .spyOn(actions, 'deleteOrderCreateSubscription')
  .mockReturnValue(Promise.resolve());

describe('run function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call postDeploy and handle errors gracefully', async () => {
    const mockError = new Error('Test error');
    const mockErrorMessage = `Pre-undeploy failed: ${mockError.message}`;
    jest
      .spyOn(actions, 'deleteOrderCreateSubscription')
      .mockRejectedValueOnce(mockError);

    const writeSpy = jest.spyOn(process.stderr, 'write');

    await preUndeploy.run();

    expect(assertError).toHaveBeenCalledWith(mockError);
    expect(writeSpy).toHaveBeenCalledWith(mockErrorMessage);
  });

  it('should not throw an error when preUndeploy succeeds', async () => {
    const mockError = new Error('Test error');
    jest
      .spyOn(preUndeploy, 'run')
      .mockImplementationOnce(() => Promise.resolve());
    const writeSpy = jest.spyOn(process.stderr, 'write');
    await preUndeploy.run();
    jest
      .spyOn(actions, 'deleteOrderCreateSubscription')
      .mockRejectedValueOnce(mockError);

    expect(assertError).not.toHaveBeenCalled();
    expect(writeSpy).not.toHaveBeenCalled();
  });
});
