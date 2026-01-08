import { Test, TestingModule } from '@nestjs/testing';
import { VagasController } from './vagas.controller';

describe('VagasController', () => {
  let controller: VagasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VagasController],
    }).compile();

    controller = module.get<VagasController>(VagasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
