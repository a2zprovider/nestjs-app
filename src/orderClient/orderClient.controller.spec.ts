import { Test, TestingModule } from '@nestjs/testing';
import { OrderClientController } from './orderClient.controller';
import { OrderClientService } from './orderClient.service';

describe('OrderClientController', () => {
  let controller: OrderClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderClientController],
      providers: [OrderClientService],
    }).compile();

    controller = module.get<OrderClientController>(OrderClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
