import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { OrderLabelModule } from './orderLabel/orderLabel.module';
import { OrderAttachmentModule } from './orderAttachment/orderAttachment.module';
import { OrderClientModule } from './orderClient/orderClient.module';
import { OrderChatModule } from './orderChat/orderChat.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'nestjs_app',
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
    OrderModule,
    OrderLabelModule,
    OrderAttachmentModule,
    OrderClientModule,
    OrderChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
