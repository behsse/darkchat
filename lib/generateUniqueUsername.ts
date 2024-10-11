import prisma from "./prisma"

const generateUniqueUsername = async(name: string) => {
    let username = name
    let counter = 1

    while (true) {
        const existingUser = await prisma.user.findUnique({
            where: {
                username: username as string,
            },
        })

        if (!existingUser) {
            break
        }
        
        username = `${name}${counter}`
        counter++
    }
    return username
}

export default generateUniqueUsername