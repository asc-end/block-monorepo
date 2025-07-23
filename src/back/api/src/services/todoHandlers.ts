import { prisma } from '../config';
import { wsManager } from './init';
import { Task, TaskState } from '@prisma/client';
import dayjs from 'dayjs';

interface TaskWithTemporaryId extends Partial<Task> {
  temporaryId?: string;
}

interface SaveTasksPayload {
  userId: string;
  insert: TaskWithTemporaryId[];
  update: TaskWithTemporaryId[];
  remove: TaskWithTemporaryId[];
}
//TODO maybe use db events

export async function handleSaveTasks(userId: string, payload: SaveTasksPayload) {
  try {
    const { insert, update, remove } = payload;

    // Handle inserts
    for (const task of insert) {
      if (!task.task || task.scheduledDate === undefined) continue;

      const scheduledDate = dayjs(task.scheduledDate).toDate();

      const newTask = await prisma.task.create({
        data: {
          userId,
          task: task.task,
          state: (task.state as TaskState) || 'unchecked',
          index: task.index || 0,
          tags: task.tags || [],
          scheduledDate,
        },
      });

      // Emit task_insert event with temporaryId if it exists
      wsManager.sendMessageToUser(userId, {
        type: 'task_insert',
        payload: {
          ...newTask,
          ...(task.temporaryId && { temporaryId: task.temporaryId })
        },
      });
    }

    // Handle updates
    for (const task of update) {
      if (!task.id) continue;

      try {
        // First check if the task exists and belongs to the user
        const existingTask = await prisma.task.findFirst({
          where: { 
            id: task.id,
            userId: userId
          }
        });

        if (!existingTask) {
          console.warn(`Task ${task.id} not found for user ${userId}, skipping update`);
          continue;
        }

        const updatedTask = await prisma.task.update({
          where: { id: task.id },
          data: {
            ...(task.task !== undefined && { task: task.task }),
            ...(task.state !== undefined && { state: task.state as TaskState }),
            ...(task.index !== undefined && { index: task.index }),
            ...(task.tags !== undefined && { tags: task.tags }),
            ...(task.scheduledDate !== undefined && { scheduledDate: dayjs(task.scheduledDate).toDate() }),
          },
        });

        // Emit task_update event
        wsManager.sendMessageToUser(userId, {
          type: 'task_update',
          payload: updatedTask,
        });
      } catch (error) {
        console.error(`Error updating task ${task.id}:`, error);
      }
    }

    // Handle removes
    for (const task of remove) {
      if (!task.id) continue;

      await prisma.task.delete({
        where: { id: task.id },
      });

      // Emit task_delete event
      wsManager.sendMessageToUser(userId, {
        type: 'task_delete',
        payload: task,
      });
    }
  } catch (error) {
    console.error('Error in handleSaveTasks:', error);
  }
}