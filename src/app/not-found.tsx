import Image from "next/image";

export default function NotFoundPage() {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="font-bold text-3xl text-center mb-8">Ooops, we can&apos;t find this page...!</h1>
        <Image src="/img/layout/page-not-found.png" alt="Page Not Found" width={400} height={400} />
      </div>
    );
  }
