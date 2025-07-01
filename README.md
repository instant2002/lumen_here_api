# Lumen Here API

NestJS + MySQL + Prisma + GraphQL + DDD 패턴을 사용한 API 서버입니다.

## 기술 스택

- **Framework**: NestJS
- **Database**: MySQL
- **ORM**: Prisma
- **API**: GraphQL (Apollo Server)
- **Architecture**: Domain-Driven Design (DDD)
- **Authentication**: JWT

## 프로젝트 구조

```
src/
├── user/                    # User 도메인
│   ├── domain/             # 도메인 계층
│   │   ├── entities/       # 엔티티
│   │   └── repositories/   # 리포지토리 인터페이스
│   ├── application/        # 애플리케이션 계층
│   │   └── services/       # 서비스
│   ├── infrastructure/     # 인프라스트럭처 계층
│   │   └── repositories/   # 리포지토리 구현체
│   └── interfaces/         # 인터페이스 계층
│       ├── dto/           # GraphQL DTO
│       └── graphql/       # GraphQL 리졸버
├── auth/                   # Auth 도메인
│   ├── services/          # Auth 서비스
│   ├── graphql/           # Auth 리졸버
│   ├── guards/            # JWT 가드
│   ├── strategies/        # JWT 전략
│   ├── decorators/        # 커스텀 데코레이터
│   └── dto/               # Auth DTO
└── shared/                # 공유 모듈
    └── infrastructure/    # 공유 인프라스트럭처
        └── prisma/        # Prisma 서비스
```

## 설치 및 설정

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
DATABASE_URL="mysql://root:password@localhost:3306/lumen_here_db"
JWT_SECRET="your-super-secret-jwt-key-here"
PORT=3000
NODE_ENV=development
```

### 3. 데이터베이스 설정

MySQL 데이터베이스를 생성하고 Prisma 마이그레이션을 실행하세요:

```bash
# Prisma 클라이언트 생성
npx prisma generate

# 데이터베이스 마이그레이션
npx prisma migrate dev --name init
```

### 4. 서버 실행

```bash
# 개발 모드
npm run start:dev

# 프로덕션 모드
npm run start:prod
```

서버가 실행되면 GraphQL Playground에 접속할 수 있습니다: http://localhost:3000/graphql

## API 사용법

### 사용자 등록

```graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    email
    name
    createdAt
    updatedAt
  }
}
```

변수:

```json
{
  "input": {
    "email": "user@example.com",
    "password": "password123",
    "name": "홍길동"
  }
}
```

### 로그인

```graphql
mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      id
      email
      name
      createdAt
      updatedAt
    }
  }
}
```

변수:

```json
{
  "input": {
    "email": "user@example.com",
    "password": "password123"
  }
}
```

### 보호된 엔드포인트 사용 (현재 사용자 정보 조회)

GraphQL Playground에서 HTTP Headers에 JWT 토큰을 추가하세요:

```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
}
```

그런 다음 다음 쿼리를 실행하세요:

```graphql
query GetCurrentUser {
  getCurrentUser {
    id
    email
    name
    createdAt
    updatedAt
  }
}
```

### 사용자 조회 (공개)

```graphql
query GetUserById($id: String!) {
  getUserById(id: $id) {
    id
    email
    name
    createdAt
    updatedAt
  }
}
```

## JWT 인증

이 프로젝트는 JWT(JSON Web Token) 기반 인증을 사용합니다:

### 인증 플로우

1. **사용자 등록**: `createUser` 뮤테이션으로 새 사용자 생성
2. **로그인**: `login` 뮤테이션으로 JWT 토큰 발급
3. **인증된 요청**: `Authorization: Bearer <token>` 헤더와 함께 보호된 엔드포인트 접근

### 보호된 엔드포인트

- `getCurrentUser`: 현재 로그인한 사용자 정보 조회 (JWT 토큰 필요)

### JWT 설정

- **만료 시간**: 1일
- **알고리즘**: HS256
- **시크릿 키**: 환경 변수 `JWT_SECRET`에서 설정

## DDD 패턴

이 프로젝트는 Domain-Driven Design 패턴을 따릅니다:

- **Domain Layer**: 비즈니스 로직과 엔티티
- **Application Layer**: 유스케이스와 서비스
- **Infrastructure Layer**: 데이터베이스 접근과 외부 서비스
- **Interface Layer**: API 엔드포인트와 DTO

각 도메인은 독립적으로 관리되며, 도메인 간 의존성은 최소화됩니다.
