import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost/paynettask'),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController], // ⬅️ adicione aqui
  providers: [AppService],      // ⬅️ e aqui também
})
export class AppModule {}
