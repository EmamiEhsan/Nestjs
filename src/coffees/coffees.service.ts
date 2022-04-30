import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { Repository } from 'typeorm';
import { Coffee } from './coffee.entity';
import { CreatCoffeeDto } from './dto/creat-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepsitory:Repository<Coffee>
    ){}

    findAll(){
        return this.coffeeRepsitory.find()
    }

    async findOne(id:string){
        const coffee =await this.coffeeRepsitory.findOne(id)
        if(!coffee){
            throw new HttpException(`Coffee -${id}- not  found`,HttpStatus.NOT_FOUND)
        }
        return coffee
    }

    creat(crearCoffeeDto:CreatCoffeeDto){
        const coffee = this.coffeeRepsitory.create(crearCoffeeDto)
        return this.coffeeRepsitory.save(coffee)
    }

    async update(id:string,updateCoffeeDto:UpdateCoffeeDto){
        const coffee = await this.coffeeRepsitory.preload({
            id: +id,
            ...updateCoffeeDto
        })
        if (!coffee) {
            throw new HttpException(`Coffee -${id}- not  found`,HttpStatus.NOT_FOUND)
        }
        return this.coffeeRepsitory.save(coffee)
    }

   async remove(id:string){
        const coffeeIndex = await this.coffeeRepsitory.findOne(id)
        return this.coffeeRepsitory.remove(coffeeIndex)
    }
}

