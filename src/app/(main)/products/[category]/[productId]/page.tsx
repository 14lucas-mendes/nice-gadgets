import IdCard from "@/components/IdCard";

export default async function ProductId({ params }: { params: Promise<{ productId: string }> }) {
    const { productId } = await params;
    

  return (
    <div>
        <IdCard params={{ productId: productId }} />    
    </div>
  );
}