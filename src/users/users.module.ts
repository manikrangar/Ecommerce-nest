import { UsersController } from './users.controller';
import { User, userSchema } from './../Schema/userSchema';
import { Module, Controller } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { create } from 'domain';

@Module({
  imports:[MongooseModule.forFeature([{ name: User.name, schema: userSchema }])],
  providers: [UsersService],
  
})
export class UsersModule {}
