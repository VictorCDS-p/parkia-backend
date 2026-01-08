import { Test, TestingModule } from '@nestjs/testing';
import { VagasService } from './vagas.service';

describe('VagasService', () => {
  let service: VagasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VagasService],
    }).compile();

    service = module.get<VagasService>(VagasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
