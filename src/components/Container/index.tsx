type ContainerProps = {
    children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
    return (
            <div className="w-full mx-auto flex flex-col items-center px-4 pt-14 pb-20 sm:px-6 md:px-8 max-w-screen-xl">
                {children}
            </div>
    )
}