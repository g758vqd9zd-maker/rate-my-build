import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create test user (matches the mock user in Navigation.tsx)
  const user = await prisma.user.upsert({
    where: { discordId: 'mock-user-id-123' },
    update: {},
    create: {
      id: 'mock-user-id-123',
      discordId: 'mock-user-id-123',
      username: 'ShadowGod42',
      email: 'shadowgod42@example.com',
    },
  });

  console.log('✓ Created user:', user.username);

  // Initialize reputation for the user
  const reputation = await prisma.reputation.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      currentScore: 4.8,
      totalSessions: 234,
      completedSessions: 220,
      noShows: 2,
      lateArrivals: 5,
      currentStreak: 15,
      longestStreak: 42,
      isGracePeriod: false,
      graceSessions: 5,
      goodSessionsBank: 10,
    },
  });

  console.log('✓ Created reputation:', reputation.currentScore);

  // Create some reputation events for history
  const events = [
    {
      eventType: 'SESSION_COMPLETED',
      scoreChange: 0.02,
      reason: 'Completed Mythic+ dungeon run',
    },
    {
      eventType: 'SESSION_ON_TIME',
      scoreChange: 0.03,
      reason: 'Arrived on time',
    },
    {
      eventType: 'HOST_ENDORSEMENT',
      scoreChange: 0.05,
      reason: 'Great teamwork and communication',
    },
    {
      eventType: 'STREAK_BONUS',
      scoreChange: 0.1,
      reason: '10 session streak achieved!',
    },
  ];

  for (const eventData of events) {
    await prisma.reputationEvent.create({
      data: {
        reputationId: reputation.id,
        ...eventData,
      },
    });
  }

  console.log(`✓ Created ${events.length} reputation events`);

  // Create a few more test users
  const testUsers = [
    { id: 'user-pro-123', discordId: 'pro-123', username: 'ProGamer9000', score: 4.9 },
    { id: 'user-casual-456', discordId: 'casual-456', username: 'CasualPlayer', score: 3.2 },
    { id: 'user-toxic-789', discordId: 'toxic-789', username: 'RageQuitter', score: 1.5 },
  ];

  for (const userData of testUsers) {
    const testUser = await prisma.user.upsert({
      where: { discordId: userData.discordId },
      update: {},
      create: {
        id: userData.id,
        discordId: userData.discordId,
        username: userData.username,
        email: `${userData.username.toLowerCase()}@example.com`,
      },
    });

    await prisma.reputation.upsert({
      where: { userId: testUser.id },
      update: {},
      create: {
        userId: testUser.id,
        currentScore: userData.score,
        totalSessions: Math.floor(Math.random() * 100) + 50,
        completedSessions: Math.floor(Math.random() * 80) + 40,
        noShows: Math.floor(Math.random() * 5),
        lateArrivals: Math.floor(Math.random() * 10),
        currentStreak: Math.floor(Math.random() * 20),
        longestStreak: Math.floor(Math.random() * 50) + 10,
      },
    });

    console.log(`✓ Created user: ${testUser.username} (${userData.score} reputation)`);
  }

  console.log('\n🎉 Seeding complete!\n');
  console.log('Test users created:');
  console.log('  • ShadowGod42 (4.8) - matches Navigation mock user');
  console.log('  • ProGamer9000 (4.9)');
  console.log('  • CasualPlayer (3.2)');
  console.log('  • RageQuitter (1.5)');
  console.log('\nRun "npm run db:studio" to view the database!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
