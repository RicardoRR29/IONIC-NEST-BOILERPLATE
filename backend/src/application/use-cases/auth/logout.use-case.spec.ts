import { LogoutUseCase } from './logout.use-case';

describe('LogoutUseCase', () => {
  it('executes without error', () => {
    const useCase = new LogoutUseCase();
    expect(useCase.execute()).toBeUndefined();
  });
});
