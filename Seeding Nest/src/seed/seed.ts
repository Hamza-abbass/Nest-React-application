import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { DataSource } from "typeorm";
import { seedRoles } from "./seed-data";
import { seedUser } from "./seedd.data";

async function runSeeder() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const dataSource = app.get(DataSource);
    try {
        await seedRoles(dataSource);
        await seedUser(dataSource);
        console.log("Database seeding complete!")
    } catch (error) {
        console.log("There is some error", error);
        
    } finally {
        await app.close();
    }
}

runSeeder();