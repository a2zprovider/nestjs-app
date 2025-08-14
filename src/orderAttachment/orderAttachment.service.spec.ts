import { Test, TestingModule } from '@nestjs/testing';
import { OrderAttachmentService } from './orderAttachment.service';

describe('OrderAttachmentService', () => {
  let service: OrderAttachmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderAttachmentService],
    }).compile();

    service = module.get<OrderAttachmentService>(OrderAttachmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
