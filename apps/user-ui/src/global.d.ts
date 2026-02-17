declare module '*.css' {
    const content: Record<string, string>
    export default content
}

type NavItemTypes = {
    title: string
    href: string
}