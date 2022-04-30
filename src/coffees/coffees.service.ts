import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { Repository } from 'typeorm';
import { Coffee } from './entities/coffee.entity';
import { CreatCoffeeDto } from './dto/creat-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepsitory:Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepsitory:Repository<Flavor>
    ){}

    findAll(paginationQuerry:PaginationQueryDto){
        const {limit,offset} = paginationQuerry
        return this.coffeeRepsitory.find({
            relations:['flavors'],
            skip:offset,
            take:limit
        })
    }

    async findOne(id:string){
        const coffee =await this.coffeeRepsitory.findOne(id,{
            relations:['flavors']
        })
        if(!coffee){
            throw new HttpException(`Coffee -${id}- not  found`,HttpStatus.NOT_FOUND)
        }
        return coffee
    }

    async creat(crearCoffeeDto:CreatCoffeeDto){
        const flavors = await Promise.all(crearCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)))
        const coffee = this.coffeeRepsitory.create({
            ...crearCoffeeDto,
            flavors
        })
        return this.coffeeRepsitory.save(coffee)
    }

    async update(id:string,updateCoffeeDto:UpdateCoffeeDto){
        const flavors = await Promise.all(updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)))
        const coffee = await this.coffeeRepsitory.preload({
            id: +id,
            ...updateCoffeeDto,
            flavors
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

    private async preloadFlavorByName(name:string):Promise<Flavor>{
        const existingFlavor = await this.flavorRepsitory.findOne({name})
        if(existingFlavor){
            return existingFlavor
        }

        return this.flavorRepsitory.create({name})
    }
}

