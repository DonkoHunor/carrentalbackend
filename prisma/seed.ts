import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 15; i++) {
    const date = faker.date.recent({refDate: '2024-01-01T00:00:00.000Z'})
    const date_end = new Date(date)
    date_end.setDate(date.getDate() + 7)

    await prisma.rentals.create({
        data: {
            car_id: faker.number.int({min: 1, max: 10}),
            start_date: date,
            end_date: date_end
        }
    })
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })