import { Test, TestingModule } from '@nestjs/testing';
import { OrderClientService } from './orderClient.service';

describe('OrderClientService', () => {
  let service: OrderClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderClientService],
    }).compile();

    service = module.get<OrderClientService>(OrderClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
