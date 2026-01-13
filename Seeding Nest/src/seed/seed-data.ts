import { DataSource } from "typeorm";
import { Rolee } from "./role.entity";
import { Role_LIST_WITH_UUID } from "./roles.seed";

export async function seedRoles(dataSource: DataSource): Promise<void> {
    const roleRepository = dataSource.getRepository(Rolee);
    const rolesList = Role_LIST_WITH_UUID;

    for (const role of rolesList) {
        console.log(role);
        
        const existingRole = await roleRepository.findOneBy({ code: role.code });
        
        if (!existingRole) {
            const newRole = roleRepository.create(role);
            await roleRepository.save(newRole);
            console.log(`Role "${role.name}" seeded.`);
        } else {
            console.log(`Role "${role.name}" already exists. Skipping.`);
        }
    }
}