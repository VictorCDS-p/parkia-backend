import { Test, TestingModule } from '@nestjs/testing';
import { MovimentacoesController } from './movimentacoes.controller';

describe('MovimentacoesController', () => {
  let controller: MovimentacoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovimentacoesController],
    }).compile();

    controller = module.get<MovimentacoesController>(MovimentacoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
