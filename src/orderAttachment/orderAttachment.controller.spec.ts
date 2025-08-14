import { Test, TestingModule } from '@nestjs/testing';
import { OrderAttachmentController } from './orderAttachment.controller';
import { OrderAttachmentService } from './orderAttachment.service';

describe('OrderAttachmentController', () => {
  let controller: OrderAttachmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderAttachmentController],
      providers: [OrderAttachmentService],
    }).compile();

    controller = module.get<OrderAttachmentController>(OrderAttachmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
