import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { HeroSlider } from "@/components/home/hero-slider"
import { ProductCard } from "@/components/home/product-card"

const products = [
  {
    id: "1",
    title: "بسته آموزشی محاسبات ذهنی - سطح مقدماتی",
    description: "آموزش اصول پایه محاسبات ذهنی برای کودکان",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    price: 2500000,
  },
  {
    id: "2",
    title: "بسته آموزشی رباتیک - سطح پیشرفته",
    description: "آموزش ساخت و برنامه‌نویسی ربات‌های پیشرفته",
    image: "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c",
    price: 3500000,
  },
  {
    id: "3",
    title: "بسته جامع خلاقیت و نوآوری",
    description: "پرورش خلاقیت و مهارت‌های حل مسئله",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    price: 2800000,
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSlider />
        
        {/* Products Section */}
        <section className="container py-16">
          <h2 className="mb-8 text-center text-3xl font-bold">بسته‌های آموزشی</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="bg-muted py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold">درباره موسسه</h2>
              <p className="text-lg leading-relaxed">
                موسسه آموزشی چرتکه با هدف ارتقای سطح آموزش کودکان و نوجوانان در زمینه‌های محاسبات ذهنی و رباتیک تاسیس شده است. ما با بهره‌گیری از جدیدترین متدهای آموزشی و مربیان مجرب، محیطی پویا و خلاق برای یادگیری فراهم می‌کنیم.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="container py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">تماس با ما</h2>
            <p className="mb-8 text-lg">
              برای کسب اطلاعات بیشتر و مشاوره رایگان با ما در تماس باشید
            </p>
            <div className="flex justify-center gap-8">
              <div>
                <h3 className="mb-2 font-semibold">شماره تماس</h3>
                <p className="text-lg">۰۲۱-۱۲۳۴۵۶۷۸</p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">ایمیل</h3>
                <p className="text-lg">info@example.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}