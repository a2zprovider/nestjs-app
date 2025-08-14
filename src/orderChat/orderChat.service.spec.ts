import { Test, TestingModule } from '@nestjs/testing';
import { OrderChatService } from './orderChat.service';

describe('OrderChatService', () => {
  let service: OrderChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderChatService],
    }).compile();

    service = module.get<OrderChatService>(OrderChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
