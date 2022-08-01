import { userDto } from './user.dto';
import { userSchema ,User ,UserDocument} from './../Schema/userSchema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createCatDto: userDto): Promise<any> {
    
    
    if((await this.findByEmail(createCatDto.email)).length > 0)
    {
      return { " msg " : " Email Already Exist "};
    }
    const user = new this.userModel(createCatDto);
    return user.save();
     
  }

  async findAll(): Promise<any> {
    let users= this.userModel.find().exec();
    if((await users).length == 0)
    return {" msg " : "no record found "};
    else
    return users;
  }

  async findById(id):Promise<User> {

    return this.userModel.findById(id);
  }

  async findByEmail(email):Promise<User[]> {
    console.log(email);
    return this.userModel.find({email:email});
  }

  async findByName(name):Promise<User[]> {
    // console.log(name);
    return this.userModel.find({name:name});
  }

  async deleteById(id):Promise<any> {
    return this.userModel.deleteMany({_id:id});
  }

  async deleteByEmail(email):Promise<any> {
    
    // console.log(email);
    return this.userModel.deleteMany({email:email});

  }

  async updateByEmail(userProf):Promise<any> {

    let userEmail = userProf.email;
    console.log(userEmail);

    return this.userModel.findOneAndUpdate({email:userEmail},{email:userProf.email , name:userProf.name , password:userProf.password , confirmPassword:userProf.confirmPassword , phn:userProf.phn , country: userProf.country },{ new : true});
  }

  async isAuthenticated(userInput):Promise<any> {
    
    console.log(userInput);
    let users  = await this.userModel.find({email:userInput.email , password:userInput.password });
    console.log(" result = \n" ,users );

    if((await users).length == 0 )
    return { "statusCode" : 404 ," msg " : " User Not Authenticated " }

    return users[0];

  }


}
