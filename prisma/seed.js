const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const initialPrizes = [
    {
      name: "Colocación de Bótox",
      description: "Valorizado en S/1,400. Incluye consulta previa.",
      providerIg: "Dermaesthetic",
      isFeatured: true
    },
    {
      name: "Aspiradora Robot Roomba Essential",
      description: "Valorizada en S/1,299. Robot de limpieza inteligente.",
      providerIg: "iRobot",
      isFeatured: true
    },
    {
      name: "Premio Mayor en Efectivo",
      description: "S/.500 en efectivo para que lo gastes en lo que desees.",
      providerIg: "Promoción 2032",
      isFeatured: true
    },
    {
      name: "01 giftcard por S/.390",
      description: "Para uso exclusivo en Botería Negreiros.",
      providerIg: "boterianegreiros",
      isFeatured: false
    },
    {
      name: "01 Faja Modeladora Marca Fascia",
      description: "Valorizada en S/.375.",
      providerIg: "marcafascia",
      isFeatured: false
    },
    {
      name: "01 Limpieza facial dermatológica",
      description: "Valorizada en S/250.",
      providerIg: "Dermaesthetic",
      isFeatured: false
    },
    {
      name: "01 Semana de clases de fútbol para niñ@s",
      description: "Clases en la escuela Sekafit.",
      providerIg: "sekafit",
      isFeatured: false
    },
    {
      name: "01 Maquillaje social de Michela Infante",
      description: "Maquillaje profesional por Michela Infante Makeup Artist.",
      providerIg: "michelainfante",
      isFeatured: false
    },
    {
      name: "03 Vales de consumo en YUUKI",
      description: "Valorizado en S/100 c/u.",
      providerIg: "yuuki",
      isFeatured: false
    }
  ]

  console.log('Seeding prizes...')
  for (const prize of initialPrizes) {
    await prisma.prize.create({
      data: prize
    })
  }
  console.log('Database seeded successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
