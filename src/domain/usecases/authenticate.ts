import { AuthenticationRepository } from '../../infrastructure/repositories/prisma-auth-repository'

export class AuthenticationUseCase {

    constructor(private authenticationRepository: AuthenticationRepository) { }

    public doSomething() {
        this.authenticationRepository.save()
    }
}

