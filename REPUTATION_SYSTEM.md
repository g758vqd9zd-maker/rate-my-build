# Reputation System Documentation

## Overview

The Rate My Build reputation system tracks user behavior across gaming sessions and calculates a trust score from 0.0 to 5.0. New users start at 3.0 and can increase or decrease their reputation based on actions.

## 📊 Reputation Scoring

### Base Configuration
- **Starting Score**: 3.0
- **Range**: 0.0 - 5.0
- **Grace Period**: First 5 sessions (mistakes don't count)

### Score Increases ✅

| Action | Points | Description |
|--------|--------|-------------|
| Complete session | +0.02 | Successfully finish a gaming session |
| Complete on time | +0.03 | Arrive on time (0 minutes late) |
| Host endorsement | +0.05 | Receive endorsement from session host |
| 10-session streak | +0.10 | Complete 10 sessions in a row |
| Season completion | +0.15 | Complete a full team season |

### Score Decreases ❌

| Action | Points | Description |
|--------|--------|-------------|
| Late (10-20 min) | -0.05 | Arrive 10-20 minutes late |
| No-show (>20 min) | -0.15 | Don't show up or >20 min late |
| Leave early (<70%) | -0.10 | Leave before 70% session completion |
| Cancel within 2h | -0.08 | Cancel less than 2 hours before start |
| Toxic behavior | -0.25 | Reported for harassment/toxicity |
| Kicked from group | -0.20 | Removed by host during session |

## 🔄 Decay & Forgiveness

### Time Decay
- Events older than **90 days** get **50% weight**
- Scores naturally drift toward equilibrium over time
- Recent behavior matters more than old mistakes

### Grace Period
- New users get **5 "grace" sessions**
- Negative actions during grace period don't affect score
- Helps new users learn the system

### Forgiveness System
- Every good session adds 1 credit to "forgiveness bank"
- Good credits can offset bad sessions (1:1 ratio)
- Allows recovery from mistakes

### Seasonal Soft Reset
- Scores drift toward **3.5** (not full reset)
- Keeps historical context while allowing fresh starts
- Applied at season transitions

## 🎮 Session Tracking

### Session Lifecycle

1. **Create Session**
```typescript
import { SessionTracker } from '@/lib/reputation/session-tracker';

const session = await SessionTracker.createSession(hostId, {
  title: "Mythic+ Dungeon Run",
  description: "Need tank + healer",
  scheduledStart: new Date("2024-01-15T20:00:00"),
  scheduledEnd: new Date("2024-01-15T22:00:00"),
});
```

2. **Add Participants**
```typescript
await SessionTracker.addParticipant(session.id, userId);
```

3. **Start Session**
```typescript
await SessionTracker.startSession(session.id);
```

4. **Track Participant Joins** (automatically calculates late time)
```typescript
await SessionTracker.markParticipantJoined(session.id, userId);
```

5. **Complete Session** (auto-calculates reputation for all)
```typescript
await SessionTracker.completeSession(session.id);
```

### Manual Actions

**Participant leaves early:**
```typescript
await SessionTracker.markParticipantLeftEarly(session.id, userId);
```

**Kick participant:**
```typescript
await SessionTracker.kickParticipant(session.id, userId);
```

**Cancel participation:**
```typescript
await SessionTracker.cancelParticipant(session.id, userId, sessionStartTime);
```

## 🏆 Endorsements

Hosts can endorse players after a session:

```typescript
import { ReputationCalculator } from '@/lib/reputation/calculator';

await ReputationCalculator.recordEndorsement(
  hostId,           // Who's giving the endorsement
  participantId,    // Who's receiving it
  sessionId         // Optional: link to session
);
// +0.05 reputation
```

## 🚫 Reports

Report toxic behavior:

```typescript
await fetch('/api/reputation/report', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    reporterId: currentUserId,
    reportedId: toxicUserId,
    reason: 'TOXIC_BEHAVIOR',
    details: 'Harassment in chat',
    sessionId: session.id,
  }),
});
// -0.25 reputation for toxic behavior
```

## 📱 Frontend Usage

### Display Reputation

#### Compact (Navigation)
```tsx
import ReputationDisplay from '@/app/components/ReputationDisplay';

<ReputationDisplay userId={user.id} variant="compact" />
// Output: ⭐ 4.8 (234 games)
```

#### Badge (Profile Cards)
```tsx
<ReputationDisplay userId={user.id} variant="badge" />
// Output: ⭐⭐⭐⭐⭐ 4.8 (234)
```

#### Full (Profile Page)
```tsx
<ReputationDisplay
  userId={user.id}
  variant="full"
  showStats={true}
/>
// Shows complete stats, streak, reliability meter
```

### API Endpoints

#### Get User Reputation
```typescript
GET /api/reputation/[userId]

Response:
{
  success: true,
  data: {
    score: 4.8,
    stars: "⭐⭐⭐⭐⭐",
    totalGames: 234,
    display: "⭐⭐⭐⭐⭐ 4.8 (234 games)",
    stats: {
      completed: 220,
      noShows: 2,
      lateArrivals: 5,
      currentStreak: 15,
      longestStreak: 42
    }
  }
}
```

#### Record Session Completion
```typescript
POST /api/reputation/session-complete

Body:
{
  userId: "user123",
  sessionId: "session456",
  status: "COMPLETED",
  minutesLate: 0,
  completionPercent: 100,
  wasKicked: false
}
```

#### Give Endorsement
```typescript
POST /api/reputation/endorse

Body:
{
  giverId: "host123",
  receiverId: "player456",
  sessionId: "session789"
}
```

## 🗄️ Database Setup

### 1. Install Dependencies
```bash
npm install prisma @prisma/client
npm install -D prisma
```

### 2. Set Environment Variables
Create `.env` file:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/ratemybuild?schema=public"
```

### 3. Initialize Prisma (Already Done)
```bash
npx prisma init
```

### 4. Generate Prisma Client
```bash
npx prisma generate
```

### 5. Push Schema to Database
```bash
npx prisma db push
```

### 6. Seed Initial Data (Optional)
```bash
npx prisma db seed
```

## 📊 Display Format

```
⭐⭐⭐⭐⭐ 4.8 (234 games)
         ↑     ↑
      score  proof
```

### Color Coding
- **Green (4.5-5.0)**: Excellent reputation
- **Cyan (4.0-4.4)**: Great reputation
- **Yellow (3.0-3.9)**: Good reputation
- **Orange (2.0-2.9)**: Poor reputation
- **Red (0.0-1.9)**: Bad reputation

## 🔧 Advanced Features

### Seasonal Reset
Run at end of season:
```typescript
await ReputationCalculator.applySeasonalReset(userId, 0.1);
// Drifts 10% toward 3.5
```

### Manual Score Recalculation
```typescript
await ReputationCalculator.recalculateScore(userId);
```

### Get Full History
```typescript
const history = await SessionTracker.getUserSessionHistory(userId, 50);
```

## 📈 Best Practices

1. **Always call `completeSession()`** when a session ends
   - Automatically calculates reputation for all participants
   - Handles no-shows, late arrivals, early leaves

2. **Use grace period wisely**
   - Don't penalize new users learning the system
   - First 5 sessions are forgiving

3. **Encourage endorsements**
   - Positive reinforcement for good behavior
   - Builds trust in community

4. **Handle reports carefully**
   - Toxic behavior penalty is severe (-0.25)
   - Should require review/moderation

5. **Monitor decay**
   - Old events automatically lose weight
   - Recent behavior matters most

## 🚀 Quick Start Example

```typescript
// 1. Create a gaming session
const session = await SessionTracker.createSession(hostId, {
  title: "Raid Night",
  scheduledStart: new Date("2024-01-20T20:00:00"),
});

// 2. Add players
await SessionTracker.addParticipant(session.id, player1Id);
await SessionTracker.addParticipant(session.id, player2Id);

// 3. Start session when ready
await SessionTracker.startSession(session.id);

// 4. Players join (automatically tracks late time)
await SessionTracker.markParticipantJoined(session.id, player1Id); // On time
setTimeout(() => {
  await SessionTracker.markParticipantJoined(session.id, player2Id); // 15 min late
}, 15 * 60 * 1000);

// 5. Complete session (auto-calculates reputation)
await SessionTracker.completeSession(session.id);
// Player 1: +0.02 (complete) + 0.03 (on time) = +0.05
// Player 2: +0.02 (complete) - 0.05 (late) = -0.03

// 6. Host endorses player 1
await ReputationCalculator.recordEndorsement(hostId, player1Id, session.id);
// Player 1: +0.05 more

// Final:
// Player 1: 3.0 + 0.05 + 0.05 = 3.10
// Player 2: 3.0 - 0.03 = 2.97
```

## 🛠️ Troubleshooting

### "Prisma Client not found"
```bash
npx prisma generate
```

### "Database not found"
```bash
npx prisma db push
```

### "Cannot find module '@/lib/reputation/calculator'"
Check `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Reputation not updating in UI
- Check API route is working: `GET /api/reputation/[userId]`
- Verify userId is correct
- Check browser console for errors
- Clear cache and refresh

## 📝 TODO / Future Enhancements

- [ ] Add authentication (Discord OAuth)
- [ ] Admin dashboard for moderation
- [ ] Automated seasonal resets (cron job)
- [ ] Reputation leaderboards
- [ ] Badge system tied to reputation milestones
- [ ] Appeal system for penalties
- [ ] Team reputation (average of members)
- [ ] Export reputation history
