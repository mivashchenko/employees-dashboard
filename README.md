node v 20

## Backend setup

### Prerequisites
Google Client id and Secret

![img.png](img.png)

### .env file
```dotenv
DATABASE_URL=your db url
GOOGLE_CLIENT_ID=client id
GOOGLE_CLIENT_SECRET=client secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/google-callback
HOST=localhost
PORT=8080
NODE_ENV=development
COOKIE_DOMAIN=localhost
```

### DB: postgres or any supported by [Prisma](https://www.prisma.io/docs/orm/reference/supported-databases)

use you own **DATABASE_URL** in .env file

OR use Docker to run the database (be sure to have Docker installed)

add **DATABASE_URL** in .env file:
`postgresql://postgres:prisma@localhost:5432/postgres?schema=public`

```bash
docker compose -f docker-compose.postgres.yml up --build
```

SERVER
```bash
cd server
npx prisma migrate dev --name init

npm run prisma:init && npm run db:deploy && npm run dev
```

after initial setup, you can run the following command to start the server
```bash
npm run dev
```

## Frontend setup

### .env file

```dotenv
NEXT_PUBLIC_BASE_API_URL=http://localhost:8080/api
```

```bash
cd frontend
pnpm install
pnpm run dev
```

Some improvements to be made:
1.	Add tests.
2.	Implement lightweight global state management (e.g., Zustand) to keep dashboard filters accessible from any component.
   - This would improve React Query usage by making data fetching more efficient and cleaner; help to avoid props drilling. Currently, data is re-fetched with filter parameters after a mutation to ensure cache consistency:
   - ```typescript
     onSuccess: (data) => {
        console.log('Mutation successful:', data)

        queryClient.invalidateQueries({queryKey: ['employees', params]})
      }
    ```
3.	Add a global notification system (using toasts) to notify users about the success or failure of operations.
4.  Finalize the error-handling strategy.
5.	Enable TypeScript strict mode and resolve all TypeScript errors.
6.	Optimize the project structure.
7.	Improve naming conventions.
8.	Encapsulate React Query logic within custom hooks.
9. Optimize re-usage of different code parts.


Current errors in the project that need to be fixed/investigated:

Discussion:
https://github.com/TanStack/query/issues/6591

``` 
⨯ Error: Server Functions cannot be called during initial render. This would create a fetch waterfall. Try to use a Server Component to pass data to Client Components instead.
    at queryFn (src/data/query/query-employees.ts:16:24)
    at DashboardTable (src/app/_components/table/table.tsx:60:45)
  14 |   queryKey: ['employees', params],
  15 |   queryFn: async () => {
> 16 |     return getEmployees(params);
     |                        ^
  17 |   },
  18 |   placeholderData: { data: [] as Employee[], totalEmployees: 0, total: 0 },
  19 | }); {
  digest: '3844569331'
```