import { AuthenticationController } from "../presentation/controllers/auth-controller"
import { AuthenticationUseCase } from "../domain/usecases/authenticate"
import { UserRepository } from "../infrastructure/repositories/prisma-auth-repository"

export const userRepository = new UserRepository();

export function createAuthController() {
    const authenticationUsecase = new AuthenticationUseCase(userRepository);
    const authenticationController = new AuthenticationController(authenticationUsecase);
    return { authenticationController };
}
