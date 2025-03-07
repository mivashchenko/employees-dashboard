const { PrismaClient } = require("../generated/prisma_client");

const prisma = new PrismaClient();

async function main() {
  console.log(`🌱 Starting seeding...`);

const engineering = await prisma.department.create({
  data: {
    name: 'Engineering',
  }
});

const marketing = await prisma.department.create({
  data: {
    name: 'Marketing',
  }
});

const sales = await prisma.department.create({
  data: {
    name: 'Sales',
  }
});

const hr = await prisma.department.create({
  data: {
    name: 'HR',
  }
});

const finance = await prisma.department.create({
  data: {
    name: 'Finance',
  }
});

const it = await prisma.department.create({
  data: {
    name: 'IT',
  }
});

const legal = await prisma.department.create({
  data: {
    name: 'Legal',
  }
});

const operations = await prisma.department.create({
  data: {
    name: 'Operations',
  }
});

const product = await prisma.department.create({
  data: {
    name: 'Product',
  }
});

const customerSupport = await prisma.department.create({
  data: {
    name: 'Customer Support',
  }
});

const research = await prisma.department.create({
  data: {
    name: 'Research',
  }
});

const qualityAssurance = await prisma.department.create({
  data: {
    name: 'Quality Assurance',
  }
});

const logistics = await prisma.department.create({
  data: {
    name: 'Logistics',
  }
});

const procurement = await prisma.department.create({
  data: {
    name: 'Procurement',
  }
});

const security = await prisma.department.create({
  data: {
    name: 'Security',
  }
});

const design = await prisma.department.create({
  data: {
    name: 'Design',
  }
});

const administration = await prisma.department.create({
  data: {
    name: 'Administration',
  }
});

const compliance = await prisma.department.create({
  data: {
    name: 'Compliance',
  }
});

const strategy = await prisma.department.create({
  data: {
    name: 'Strategy',
  }
});

const businessDevelopment = await prisma.department.create({
  data: {
    name: 'Business Development',
  }
});

// Employee seed data
const employees = [
  { name: 'Alice', email: 'alice@prisma.io', departmentId: engineering.id },
  { name: 'Nilu', email: 'nilu@prisma.io', departmentId: marketing.id },
  { name: 'Mahmoud', email: 'mahmoud@prisma.io', departmentId: engineering.id },
  { name: 'Eve', email: 'eve@prisma.io', departmentId: sales.id },
  { name: 'James', email: 'james@prisma.io', departmentId: hr.id },
  { name: 'Linda', email: 'linda@prisma.io', departmentId: finance.id },
  { name: 'Oliver', email: 'oliver@prisma.io', departmentId: it.id },
  { name: 'Sophie', email: 'sophie@prisma.io', departmentId: legal.id },
  { name: 'Lucas', email: 'lucas@prisma.io', departmentId: operations.id },
  { name: 'Chloe', email: 'chloe@prisma.io', departmentId: product.id },
  { name: 'John', email: 'john@prisma.io', departmentId: customerSupport.id },
  { name: 'Grace', email: 'grace@prisma.io', departmentId: research.id },
  { name: 'Mason', email: 'mason@prisma.io', departmentId: qualityAssurance.id },
  { name: 'Charlotte', email: 'charlotte@prisma.io', departmentId: logistics.id },
  { name: 'Benjamin', email: 'benjamin@prisma.io', departmentId: procurement.id },
  { name: 'Ava', email: 'ava@prisma.io', departmentId: security.id },
  { name: 'Isabella', email: 'isabella@prisma.io', departmentId: design.id },
  { name: 'Matthew', email: 'matthew@prisma.io', departmentId: administration.id },
  { name: 'Amelia', email: 'amelia@prisma.io', departmentId: compliance.id },
  { name: 'Henry', email: 'henry@prisma.io', departmentId: strategy.id },
  { name: 'Zoe', email: 'zoe@prisma.io', departmentId: businessDevelopment.id },
];

  // Insert employees using batch operation
  await prisma.employee.createMany({
    data: employees,
    skipDuplicates: true, // Avoid duplicates if script runs multiple times
  });

  console.log(`✅ Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(`❌ Seeding failed:`, error);
    await prisma.$disconnect();
    process.exit(1);
  });