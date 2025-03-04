import { AuthenticationController } from "../presentation/controllers/auth-controller"
import { AuthenticationUseCase } from "../domain/usecases/authenticate"
import { AuthenticationRepository } from "../infrastructure/repositories/prisma-auth-repository"

export function createAuthController() {
    const authenticationRepository = new AuthenticationRepository();
    const authenticationUsecase = new AuthenticationUseCase(authenticationRepository);
    const authenticationController = new AuthenticationController(authenticationUsecase);
    return { authenticationController };
}
