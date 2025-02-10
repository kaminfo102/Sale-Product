import { Facebook, Instagram, Mail, Phone } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">فروشگاه چرتکه</h3>
            <p className="text-sm">
              ارائه دهنده بهترین خدمات آموزشی در زمینه محاسبات ذهنی و رباتیک
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:underline">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">
                  قوانین و مقررات
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">اطلاعات تماس</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@example.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">شبکه‌های اجتماعی</h4>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-secondary">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" className="hover:text-secondary">
                <Facebook className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-primary-foreground/10 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  )
}