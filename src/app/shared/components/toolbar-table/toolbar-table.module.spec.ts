import { ToolbarTableModule } from './toolbar-table.module';

describe('ToolbarTableModule', () => {
  let toolbarTableModule: ToolbarTableModule;

  beforeEach(() => {
    toolbarTableModule = new ToolbarTableModule();
  });

  it('should create an instance', () => {
    expect(toolbarTableModule).toBeTruthy();
  });
});
