import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  id: string
  title: string
  description: string
  image: string
  price: number
}

export function ProductCard({ id, title, description, image, price }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative aspect-video">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-primary">
          {price.toLocaleString("fa-IR")} تومان
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/products/${id}`} className="w-full">
          <Button className="w-full" size="lg">
            مشاهده جزئیات
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}