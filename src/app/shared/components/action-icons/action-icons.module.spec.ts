import { ActionIconsModule } from './action-icons.module';

describe('ActionIconsModule', () => {
  let actionIconsModule: ActionIconsModule;

  beforeEach(() => {
    actionIconsModule = new ActionIconsModule();
  });

  it('should create an instance', () => {
    expect(actionIconsModule).toBeTruthy();
  });
});
