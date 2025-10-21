import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Bắt đầu seed database...')

  // Tạo user admin mặc định
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@maplestory.com' },
    update: {},
    create: {
      email: 'admin@maplestory.com',
      username: 'admin',
      password: hashedPassword,
      role: 'ADMIN',
      isActive: true,
    },
  })

  console.log('✅ Created admin user:', adminUser.email)

  // Tạo API key mặc định cho admin
  const apiKey = await prisma.aPIKey.upsert({
    where: { key: 'default-api-key' },
    update: {},
    create: {
      key: 'default-api-key',
      name: 'Default API Key',
      userId: adminUser.id,
      isActive: true,
    },
  })

  console.log('✅ Created API key:', apiKey.name)

  // Tạo một số dữ liệu mẫu
  const sampleCharacters = [
    {
      msuId: 'char_001',
      name: 'MapleHero',
      level: 150,
      job: 'Hero',
      server: 'Scania',
      guild: 'MapleLegends',
      lastLogin: new Date(),
    },
    {
      msuId: 'char_002',
      name: 'IceMage',
      level: 120,
      job: 'Ice/Lightning Mage',
      server: 'Bera',
      guild: 'FrozenGuild',
      lastLogin: new Date(),
    },
  ]

  for (const char of sampleCharacters) {
    await prisma.character.upsert({
      where: { msuId: char.msuId },
      update: {},
      create: char,
    })
  }

  console.log('✅ Created sample characters')

  const sampleGuilds = [
    {
      msuId: 'guild_001',
      name: 'MapleLegends',
      server: 'Scania',
      level: 25,
      members: 150,
      leader: 'MapleHero',
    },
    {
      msuId: 'guild_002',
      name: 'FrozenGuild',
      server: 'Bera',
      level: 20,
      members: 120,
      leader: 'IceMage',
    },
  ]

  for (const guild of sampleGuilds) {
    await prisma.guild.upsert({
      where: { msuId: guild.msuId },
      update: {},
      create: guild,
    })
  }

  console.log('✅ Created sample guilds')

  const sampleItems = [
    {
      msuId: 'item_001',
      name: 'Maple Sword',
      type: 'weapon',
      rarity: 'rare',
      level: 100,
      stats: { attack: 150, magic: 50 },
      description: 'A legendary sword forged from maple leaves',
    },
    {
      msuId: 'item_002',
      name: 'Ice Staff',
      type: 'weapon',
      rarity: 'epic',
      level: 120,
      stats: { magic: 200, ice: 100 },
      description: 'A staff imbued with the power of ice',
    },
  ]

  for (const item of sampleItems) {
    await prisma.item.upsert({
      where: { msuId: item.msuId },
      update: {},
      create: item,
    })
  }

  console.log('✅ Created sample items')

  console.log('🎉 Seed database hoàn thành!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
