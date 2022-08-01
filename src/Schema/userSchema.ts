import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User{
    
    @Prop({required:true})
    name:string;
    
    @Prop({required:true,unique:true})
    email:String
    
    @Prop({required:true})
    password:string;
    
    @Prop({required:true})
    confirmPassword:string;
    
    @Prop({required:true})
    phn:string;
    
    @Prop({required:true})
    country:string;
}


export const userSchema = SchemaFactory.createForClass(User);
