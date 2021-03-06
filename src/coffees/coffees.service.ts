import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Coffee } from './coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees : Coffee[] = [{
        id:1,
        name:'ehsan emami',
        brand:'Buddy Brew',
        flavors:['chocolate','vanilla']
    },
    {
        id:2,
        name:'reza emami',
        brand:'Buddy Green',
        flavors:['chocolate','Ice cream']
    }];

    findAll(){
        return this.coffees
    }

    findOne(id:string){
        const coffee =  this.coffees.find(item => item.id === +id)
        if(!coffee){
            throw new HttpException(`Coffee -${id}- not  found`,HttpStatus.NOT_FOUND)
        }
        return coffee
    }

    creat(crearCoffeeDto:any){
        this.coffees.push(crearCoffeeDto)
        return crearCoffeeDto
    }

    update(id:string,updateCoffeeDto:any){
        const existingCoffee = this.findOne(id)
        if (existingCoffee) {
        }
        return updateCoffeeDto
    }

    remove(id:string){
        const coffeeIndex = this.coffees.findIndex(item=> item.id === +id)
        if (coffeeIndex >=0) {
            this.coffees.splice(coffeeIndex,1)
        }
    }
}

