import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../modules/auth/auth.module';
import { UserModule } from '../modules/user/user.module';
import { CustomersModule } from '../modules/customers/customers.module';
import { PlansModule } from '../modules/plans/plans.module';
import { TicketsModule } from '../modules/tickets/tickets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    CustomersModule,
    PlansModule,
    TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}