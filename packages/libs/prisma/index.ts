import { PrismaClient } from '@prisma/client'

declare global {
    namespace globalThis {
        // eslint-disable-next-line no-var
        var prismadb: PrismaClient | undefined
    }
}

const prismaClientSingleton = () => new PrismaClient()

const prisma = globalThis.prismadb ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
    globalThis.prismadb = prisma
}

export default prisma