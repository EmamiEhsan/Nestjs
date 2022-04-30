import { Body, Controller,Delete,Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import {CoffeesService} from './coffees.service'
import { CreatCoffeeDto } from './dto/creat-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService:CoffeesService){}

    @Get()
    findAll(@Query() paginationQuerry:PaginationQueryDto){
        // const {limit,offset} = paginationQuerry
      return this.coffeesService.findAll(paginationQuerry);
    }

    @Get(':id')
    findOne(@Param('id') id:string) {
      return this.coffeesService.findOne(id)
    }
    @Post()
    create(@Body() creatCoffeeDto:CreatCoffeeDto){
        return this.coffeesService.creat(creatCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id:string,@Body() updateCoffeeDto:UpdateCoffeeDto){
        return this.coffeesService.update(id,updateCoffeeDto)
    }
    @Delete(':id')
    remove(@Param('id') id:string){
        return this.coffeesService.remove(id)
    }
}

//http://localhost:3000/coffees?limit=20&offset=10 the correct way to write  for pagination Querry

