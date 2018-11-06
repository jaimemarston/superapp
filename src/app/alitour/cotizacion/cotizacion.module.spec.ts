import { CotizacionModule } from './cotizacion.module';

describe('CotizacionModule', () => {
  let cotizacionModule: CotizacionModule;

  beforeEach(() => {
    cotizacionModule = new CotizacionModule();
  });

  it('should create an instance', () => {
    expect(cotizacionModule).toBeTruthy();
  });
});
