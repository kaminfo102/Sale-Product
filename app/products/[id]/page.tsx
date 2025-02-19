import { ProductClient } from "./product-client.tsx"

const products = [
  {
    id: "1",
    title: "بسته آموزشی محاسبات ذهنی - سطح مقدماتی",
    description: "آموزش اصول پایه محاسبات ذهنی برای کودکان",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    price: 2500000,
    features: [
      "آموزش مفاهیم پایه محاسبات ذهنی",
      "تمرین‌های متنوع و کاربردی",
      "پشتیبانی آنلاین",
      "گواهینامه معتبر",
    ],
    details: "این بسته آموزشی شامل تمامی مطالب مورد نیاز برای یادگیری اصول محاسبات ذهنی است. دانش‌آموزان با تمرین‌های متنوع و کاربردی، مهارت‌های خود را تقویت می‌کنند.",
    benefits: [
      "دسترسی به محتوای آموزشی به مدت نامحدود",
      "پشتیبانی ۲۴/۷ توسط اساتید مجرب",
      "گواهینامه معتبر پس از اتمام دوره",
    ],
  },
  {
    id: "2",
    title: "بسته آموزشی رباتیک - سطح پیشرفته",
    description: "آموزش ساخت و برنامه‌نویسی ربات‌های پیشرفته",
    image: "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c",
    price: 3500000,
    features: [
      "آموزش برنامه‌نویسی پیشرفته",
      "کیت رباتیک اختصاصی",
      "پروژه‌های عملی",
      "پشتیبانی ۲۴/۷",
    ],
    details: "در این دوره پیشرفته، دانش‌آموزان با مفاهیم پیچیده‌تر رباتیک و برنامه‌نویسی آشنا می‌شوند. هر دانش‌آموز یک کیت رباتیک اختصاصی دریافت می‌کند.",
    benefits: [
      "کیت رباتیک اختصاصی برای هر دانش‌آموز",
      "آموزش برنامه‌نویسی پیشرفته",
      "امکان شرکت در مسابقات رباتیک",
    ],
  },
  {
    id: "3",
    title: "بسته جامع خلاقیت و نوآوری",
    description: "پرورش خلاقیت و مهارت‌های حل مسئله",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    price: 2800000,
    features: [
      "تکنیک‌های خلاقیت",
      "حل مسئله",
      "کار گروهی",
      "پروژه‌های عملی",
    ],
    details: "این بسته جامع به دانش‌آموزان کمک می‌کند تا مهارت‌های خلاقیت و حل مسئله خود را تقویت کنند. تمرکز اصلی بر روی یادگیری عملی و کار گروهی است.",
    benefits: [
      "تقویت مهارت‌های حل مسئله",
      "یادگیری کار گروهی",
      "افزایش خلاقیت و نوآوری",
    ],
  },
]

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return null
  }

  return <ProductClient product={product} />
}