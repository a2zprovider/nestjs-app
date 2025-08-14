import { Test, TestingModule } from '@nestjs/testing';
import { OrderLabelController } from './orderLabel.controller';
import { OrderLabelService } from './orderLabel.service';

describe('OrderLabelController', () => {
  let controller: OrderLabelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderLabelController],
      providers: [OrderLabelService],
    }).compile();

    controller = module.get<OrderLabelController>(OrderLabelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
