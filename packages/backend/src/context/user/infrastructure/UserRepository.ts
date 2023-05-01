import { User } from "../domain/User";
import { IUserRepository } from "../domain/IUserRepository";
import { MemoryRepository } from "../../shared/infrastructure/MemoryRepository";

export class UserRepository extends MemoryRepository<User> implements IUserRepository {
    async getByNickname(nickname: string): Promise<User | undefined> {
        const user = this.entities.find((u) => u.nickname.toString() === nickname);
        return user;
    }
}
