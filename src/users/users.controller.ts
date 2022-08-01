import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { get, STATUS_CODES } from 'http';
import { userDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) { }

    @Post()
    createUser(@Body() user: userDto) {
        console.log(user);
        if (user.confirmPassword != user.password)
            return { " msg ": " password mismatch " };

        let result = this.service.create(user);
        return result;
    }

    @Get()
    getUsers() {
        return this.service.findAll();
    }

    @Get('/:id')
    getUserById(@Param('id') id: string) {

        let user = this.service.findById(id);
        if (user == null)
            return { " msg ": "no record found " }
        else
            return user
    }

    @Get('/email/:email')
    getUserByEmail(@Param('email') email: string) {
        return this.service.findByEmail(email);
    }

    @Get('/name/:name')
    getUserByName(@Param('name') name: string) {
        // console.log(name);
        return this.service.findByName(name);
    }


    @Delete('/delete/id/:id')
    deleteUserById(@Param('id') id: string) {

        console.log(id);
        console.log("deleated Success");
        if (!this.service.findById(id))
            return { "msg ": " no Record to delete " }
        else
            return this.service.deleteById(id);
    }

    @Delete('/delete/email/:email')
    async deleteUserByEmail(@Param('email') email: string) {

        console.log("deleated Success");
        return await this.service.deleteByEmail(email);

    }

    @Post('/update/')
    updateUserByEmail(@Body() userProf: String) {
        console.log("update Info successfully");
        console.log(userProf)
        return this.service.updateByEmail(userProf);
    }

    @Post('/login')
    isAuthenticated(@Body() userInput) {
        return this.service.isAuthenticated(userInput);
    }



}
