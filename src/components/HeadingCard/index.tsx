type HeadingCardProps = {
    children: React.ReactNode;
    as: 'h1' | 'h2' | 'h3' | 'h4';
}

export function HeadingCard({children, as: Tag}: HeadingCardProps) {
    const headingClass = {
        h1: 'text-5xl tracking-tighter font-extrabold',
        h2: 'text-4xl tracking-tight font-extrabold',
        h3: 'text-3xl font-medium',
        h4: 'text-2xl font-normal',  
    }

    return (
        <Tag className={`${headingClass[Tag]} text-[#0F0F11]`}>
            {children}
        </Tag>
    )

}
