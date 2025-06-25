import path from 'node:path';
import { readdirSync } from 'fs';

async function runMigrations() {
    const migrationsDir = path.resolve(__dirname, 'migrations');
    const files = readdirSync(migrationsDir)
        .filter((f) => f.endsWith('.ts'))
        .sort();

    for (const file of files) {
        console.log(`Running ${file}...`);
        const migration = await import(path.join(migrationsDir, file));
        if (typeof migration.default === 'function') {
            await migration.default();
        } else {
            console.warn(`Skipping ${file}: no default function export`);
        }
    }

    console.log('✅ All migrations complete.');
}

runMigrations().catch((err) => {
    console.error('❌ Migration failed:', err);
    process.exit(1);
});
