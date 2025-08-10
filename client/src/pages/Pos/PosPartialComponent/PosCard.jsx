import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function PosCard() {
  return (
    <Card className='p-2 flex-row hover:scale-105 transition-transform duration-300'>
      <img src='/wonder.png' alt='' className='w-full h-30 object-cover rounded-lg' />
      <p className='my-2'>7 Wonder</p>
      <div className='flex justify-between'>
        <p className='text-xs text-gray-500'>Price</p>
        <p className='text-xs text-gray-500'>Card Footer</p>
      </div>
    </Card>
  );
}
