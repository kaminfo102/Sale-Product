"use client"

import { useState } from "react"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { Button } from "@/components/ui/button"
import { OrderForm } from "@/components/products/order-form"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, Package, Shield, Truck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  title: string
  description: string
  image: string
  price: number
  features: string[]
  details: string
  benefits: string[]
}

interface ProductClientProps {
  product: Product
}

export function ProductClient({ product }: ProductClientProps) {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/40">
          <div className="container py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                صفحه اصلی
              </Link>
              <ChevronLeft className="h-4 w-4" />
              <span className="text-foreground">{product.title}</span>
            </div>
          </div>
        </div>

        <div className="container py-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Benefits */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
                  <Package className="h-6 w-6 text-primary" />
                  <span className="text-sm">محتوای جامع</span>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="text-sm">گارانتی بازگشت وجه</span>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
                  <Truck className="h-6 w-6 text-primary" />
                  <span className="text-sm">ارسال سریع</span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">
                  پرفروش‌ترین
                </Badge>
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <h2 className="text-xl font-semibold">ویژگی‌ها</h2>
                <ul className="grid gap-2">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div className="space-y-2">
                <h2 className="text-xl font-semibold">مزایا</h2>
                <ul className="grid gap-2">
                  {product.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-secondary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">قیمت:</span>
                  <span className="text-3xl font-bold text-primary">
                    {product.price.toLocaleString("fa-IR")} تومان
                  </span>
                </div>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => setIsOrderFormOpen(true)}
                >
                  ثبت سفارش
                </Button>
              </div>

              <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
                <p>{product.details}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <OrderForm
        open={isOrderFormOpen}
        onOpenChange={setIsOrderFormOpen}
        product={product}
      />
    </div>
  )
}