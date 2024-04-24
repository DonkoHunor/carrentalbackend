import { IsInt, IsNotEmpty, IsPositive, IsString } from "class-validator"

export class CreateCarDto {
    @IsString()
    @IsNotEmpty()
    plate_number: string

    @IsString()
    @IsNotEmpty()
    brand: string

    @IsString()
    @IsNotEmpty()
    model: string

    @IsInt()
    @IsPositive()
    daily_cost: number
}
