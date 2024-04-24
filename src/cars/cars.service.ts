import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService){}

  create(createCarDto: CreateCarDto) {
    return this.prisma.cars.create({
      data: {
        license_plate_number: createCarDto.plate_number,
        brand: createCarDto.brand,
        model: createCarDto.model,
        daily_cost: createCarDto.daily_cost
      }
    });
  }

  async rent(carString: string){
    const carId = parseInt(carString);
    const date_start = new Date(Date.now());
    const date_end = new Date(date_start);
    date_end.setDate(date_end.getDate() + 7);

    const car = await this.prisma.cars.findFirst({where: {id: carId}});
    if(car === undefined) {
      throw new NotFoundException('There is no such car in the database');
    }

    const rented = await this.prisma.rentals.findFirst({
      where: {
        car_id: car.id,
        end_date: {gt: date_start}
      }
    });

    if(rented !== undefined && rented !== null) {
      throw new ConflictException('The car is already rented');
    }

    return this.prisma.rentals.create({
      data: {
        car_id: car.id,
        start_date: date_start,
        end_date: date_end
      }
    });
  }

  findAll() {
    return this.prisma.cars.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
