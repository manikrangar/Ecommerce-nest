import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { XyzService } from './xyz.service';
import { CreateXyzDto } from './dto/create-xyz.dto';
import { UpdateXyzDto } from './dto/update-xyz.dto';

@Controller('xyz')
export class XyzController {
  constructor(private readonly xyzService: XyzService) {}

  @Post()
  create(@Body() createXyzDto: CreateXyzDto) {
    return this.xyzService.create(createXyzDto);
  }

  @Get()
  findAll() {
    return this.xyzService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.xyzService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateXyzDto: UpdateXyzDto) {
    return this.xyzService.update(+id, updateXyzDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.xyzService.remove(+id);
  }
}
