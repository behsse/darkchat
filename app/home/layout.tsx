import Navbar from "@/components/Navbar"

export default async function HomeLayout({children} : Readonly<{children: React.ReactNode}>) {
    return(
        <div className="grid gap-20">
            <Navbar/>
            {children}
        </div>
    )
}