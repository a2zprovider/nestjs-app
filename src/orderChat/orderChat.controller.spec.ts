import { Test, TestingModule } from '@nestjs/testing';
import { OrderChatController } from './orderChat.controller';
import { OrderChatService } from './orderChat.service';

describe('OrderChatController', () => {
  let controller: OrderChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderChatController],
      providers: [OrderChatService],
    }).compile();

    controller = module.get<OrderChatController>(OrderChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
