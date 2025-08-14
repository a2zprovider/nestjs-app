import { Test, TestingModule } from '@nestjs/testing';
import { OrderLabelService } from './orderLabel.service';

describe('OrderLabelService', () => {
  let service: OrderLabelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderLabelService],
    }).compile();

    service = module.get<OrderLabelService>(OrderLabelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
