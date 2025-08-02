import Image from "next/image";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl font-extrabold text-center mb-4 mt-">Oops! we can&apos;t find this page...</h1>
            <Image 
                src="/img/page-not-found.png" 
                alt="Page not found illustration"
                className="items-center justify-center mx-auto"
                width={500}
                height={400}
            />
        </div>
    );
}