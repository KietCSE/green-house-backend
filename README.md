
## Project Overview
Greenhouse Backend is a modern web application for IOT, which built with Express, Prisma, Adafruit


## Structure of project 
```plaintext=
docs/                     # swagger
src/
├── fatory/               # factory pattern for create controller (do injection)    
├── config/               # general config 
│
├── domain/               # Layer ứng dụng (Application Layer)
│   ├── usecases/         # Chứa các business logic
│   └── dtos/             # Data Transfer Objects
│   └── repositories/     # Interfaces cho repositories
│
├── infrastructure/       # Layer cơ sở hạ tầng (Infrastructure Layer)
│   ├── repositories/     # Implementations của repositories
│   └── services/         # Các dịch vụ bên ngoài (email, storage, etc.)
│
├── interfaces/           # Layer giao diện (Interface Layer)
│   ├── controllers/      # Các controllers (REST, GraphQL, etc.)
│   ├── routes/           # Định nghĩa routes
│   └── middleware/       # Middleware
│
└── index.js               # Entry point của ứng dụng
```

## API Flow
```plaintext=

router -> controller -> domain/interfaces 
                        (usecase interface) 
                                |
                                V
                         domain/usecases 
                                |
                                V
                        domain/repositories   --->  infrastructure/repository    
                    (repositories interfaces)
```



## Setup 
```plaintext=
npm install    // get dependencies 
npm run dev    // run project  

```