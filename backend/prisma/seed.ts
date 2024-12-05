import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.todo.createMany({
    data: [
      { title: 'Here’s a task item 1', completed: false, order: 1 },
      { title: 'Here’s a task item 2', completed: false, order: 2 },
      { title: 'Here’s a task item 3', completed: false, order: 3 },
      { title: 'Here’s a task item 4', completed: false, order: 4 },
      { title: 'Here’s a task item 5', completed: false, order: 5 },
      { title: 'Here’s a task item 6', completed: false, order: 6 },
    ],
  });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
