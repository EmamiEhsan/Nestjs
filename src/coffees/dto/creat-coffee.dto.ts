import { IsString } from "class-validator";

export class CreatCoffeeDto {
    @IsString()
    readonly name:string;
    
    @IsString()
    readonly brand:string;

    @IsString({each:true})
    readonly flavors:string[]
}
