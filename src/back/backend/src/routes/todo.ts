import { Request, Response, Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { AuthTokenClaims } from '@privy-io/server-auth';
import { prisma } from '../config';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const router = Router();

// Get tasks for a specific date
router.get('/tasks', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  const userId = req.verifiedClaims?.userId;
  if (!userId) return res.status(401).json({ error: 'User not authenticated' });

  const { date } = req.query;
  if (!date) return res.status(400).json({ error: 'Date parameter is required' });

  try {
    const startOfDay = dayjs(date.toString(), 'MM/DD/YYYY').startOf('day').toDate();
    const endOfDay = dayjs(date.toString(), 'MM/DD/YYYY').endOf('day').toDate();

    const tasks = await prisma.task.findMany({
      where: { 
        userId,
        scheduledDate: {
          gte: startOfDay,
          lte: endOfDay
        },
        state: {
          not: 'archived'
        }
      },
      orderBy: {
        index: 'asc'
      }
    });

    return res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Get days that have tasks
router.get('/days', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  const userId = req.verifiedClaims?.userId;
  if (!userId) return res.status(401).json({ error: 'User not authenticated' });

  try {
    // Get all tasks for the user that are not archived
    const tasks = await prisma.task.findMany({
      where: { 
        userId,
        state: {
          not: 'archived'
        }
      },
      select: {
        scheduledDate: true
      }
    });

    // Group by date and create the response
    const daysWithTasks = new Map<string, boolean>();
    
    tasks.forEach(task => {
      if (task.scheduledDate) {
        const dateKey = dayjs(task.scheduledDate).format('YYYY-MM-DD');
        daysWithTasks.set(dateKey, true);
      }
    });

    // Convert to array format expected by frontend
    const result = Array.from(daysWithTasks.entries()).map(([date]) => ({
      date,
      has_task: true
    }));

    return res.json(result);
  } catch (error) {
    console.error('Error fetching days with tasks:', error);
    return res.status(500).json({ error: 'Failed to fetch days with tasks' });
  }
});

// Get archived tasks
router.get('/archived', authMiddleware, async (req: Request & { verifiedClaims?: AuthTokenClaims }, res: Response) => {
  const userId = req.verifiedClaims?.userId;
  if (!userId) return res.status(401).json({ error: 'User not authenticated' });

  try {
    const archivedTasks = await prisma.task.findMany({
      where: { 
        userId,
        state: 'archived'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.json(archivedTasks);
  } catch (error) {
    console.error('Error fetching archived tasks:', error);
    return res.status(500).json({ error: 'Failed to fetch archived tasks' });
  }
});

export default router