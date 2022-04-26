import { PartialType } from "@nestjs/mapped-types";
import { CreatCoffeeDto } from "./creat-coffee.dto";
export class UpdateCoffeeDto extends PartialType(CreatCoffeeDto){}
