# Using Zod To OpenAPI with NestJS

[zod](https://zod.dev/)を使用してAPIを定義し、[NestJS](https://nestjs.com/)で使用するサンプルです。

## 使い方
### 1. install
```shell
npm i
```

### 2. server start
```shell
cd apps/server && npm run start
```

### 3. client start
```shell
cd apps/web && npm run dev
```

## 想定している開発フロー
### 1. API定義
`packages/openapi`でAPIを定義します。その際、スキーマはzodで定義します。

OpenAPIドキュメントは、[zod-to-openapi](https://github.com/asteasolutions/zod-to-openapi)を使用して作成します。

### 2. 実装
#### server
`apps/server`に`packages/openapi`をimportして定義したAPIを実装します。

#### web
`apps/web`に`packages/openapi`をimportしてAPIをリクエストするように実装します。

