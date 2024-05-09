import { Prisma } from '@prisma/client';
import db from '../src/db';

const playersData = Prisma.validator<Prisma.PlayerCreateInput[]>()([
  {
    name: 'Kylian Mbappé',
    firstName: 'Kylian',
    lastName: 'Mbappé',
    dateOfBirth: new Date('1998-12-20'),
    nationality: 'French'
  },
  {
    name: 'Antoine Griezmann',
    firstName: 'Antoine',
    lastName: 'Griezmann',
    dateOfBirth: new Date('1991-03-21'),
    nationality: 'French'
  }
])

async function main() {
  console.log('Start seeding...')
  await db.player.createMany({
    data: playersData
  });

  console.log('Data seed complete');
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })