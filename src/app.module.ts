import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User, userSchema } from './Schema/userSchema';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { XyzModule } from './xyz/xyz.module';

@Module({
  imports: [UsersModule,MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),MongooseModule.forRoot('mongodb+srv://manikrangar:12345678910111213@cluster0.47o6nu7.mongodb.net/?retryWrites=true&w=majority'), XyzModule],
  controllers: [AppController, UsersController],
  providers: [AppService,UsersService],
})
export class AppModule {}
