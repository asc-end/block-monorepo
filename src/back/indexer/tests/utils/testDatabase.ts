import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import * as path from 'path';

export class TestDatabase {
  private prisma: PrismaClient;
  private databaseUrl: string;

  constructor() {
    // Use a unique database URL for each test run
    const timestamp = Date.now();
    this.databaseUrl = `postgresql://postgres:postgres@localhost:5432/test_indexer_${timestamp}`;
    process.env.DATABASE_URL = this.databaseUrl;
    
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: this.databaseUrl,
        },
      },
    });
  }

  async setup(): Promise<void> {
    // Create test database
    const dbName = this.databaseUrl.split('/').pop();
    
    // First, try to create the postgres user if it doesn't exist
    try {
      // Use the current system user to create the postgres role
      execSync(`psql -d postgres -c "CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD 'postgres';"`, { 
        stdio: 'pipe'
      });
    } catch (error: any) {
      // Role might already exist, which is fine
      if (!error.message?.includes('already exists')) {
        console.log('Note: Could not create postgres role, it may already exist');
      }
    }
    
    // Now create the test database
    try {
      execSync(`psql -U postgres -c "CREATE DATABASE ${dbName};"`, { 
        stdio: 'pipe',
        env: { ...process.env, PGPASSWORD: 'postgres' }
      });
    } catch (error: any) {
      // Database might already exist, which is fine
      if (!error.message?.includes('already exists')) {
        console.error('Failed to create database:', error.message);
        throw error;
      }
    }

    // Run migrations
    const schemaPath = path.join(__dirname, '../../prisma/schema.prisma');
    execSync(`npx prisma migrate deploy --schema=${schemaPath}`, {
      env: { ...process.env, DATABASE_URL: this.databaseUrl },
    });
  }

  async teardown(): Promise<void> {
    await this.prisma.$disconnect();
    
    // Drop test database
    const dbName = this.databaseUrl.split('/').pop();
    try {
      execSync(`psql -U postgres -c "DROP DATABASE IF EXISTS ${dbName};"`, { 
        stdio: 'pipe',
        env: { ...process.env, PGPASSWORD: 'postgres' }
      });
    } catch (error) {
      // Ignore errors when dropping database
    }
  }

  getClient(): PrismaClient {
    return this.prisma;
  }

  async reset(): Promise<void> {
    // Clear all data without dropping the database
    await this.prisma.commitment.deleteMany();
    await this.prisma.user.deleteMany();
  }
}