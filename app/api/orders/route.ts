import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { writeFile } from "fs/promises"
import { join } from "path"
import sharp from "sharp"
import nodemailer from "nodemailer"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("paymentImage") as File
    const nationalId = formData.get("nationalId") as string
    const mobileNumber = formData.get("mobileNumber") as string

    if (!file || !nationalId) {
      return NextResponse.json({ error: "Missing file or nationalId" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    let buffer = Buffer.from(bytes)

    // تعیین نام فایل با پیشوند کد ملی
    const fileExt = file.name.split(".").pop()
    const fileName = `${nationalId}_${mobileNumber}.${fileExt}`
    const filePath = join("public", "uploads", fileName)

    // اگر حجم فایل بیشتر از 1MB بود، آن را فشرده‌سازی کن
    if (buffer.length > 1024 * 1024) {
      buffer = await sharp(buffer).resize({ width: 800 }).toBuffer()
    }

    await writeFile(filePath, new Uint8Array(buffer))

    // ایجاد سفارش در دیتابیس
    const order = await prisma.order.create({
      data: {
        fullName: formData.get("fullName") as string,
        nationalId,
        birthDate: new Date(
          parseInt(formData.get("birthYear") as string),
          persianMonths.indexOf(formData.get("birthMonth") as string),
          parseInt(formData.get("birthDay") as string)
        ),
        educationLevel: formData.get("educationLevel") as string,
        city: formData.get("city") as string,
        mobileNumber: formData.get("mobileNumber") as string,
        phoneNumber: formData.get("phoneNumber") as string || null,
        paymentImage: `/uploads/${fileName}`,
      },
    })

    // ارسال ایمیل به مدیر
    await sendEmail(order)

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}

const persianMonths = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
]

// تابع ارسال ایمیل
async function sendEmail(order: any) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mirzae.uast@gmail.com",
      pass: "wvdc gqez oiuh xdbr", // **از App Password استفاده کنید**
    },
  })

  const filePath = join(process.cwd(), "public", order.paymentImage) // مسیر کامل فایل در سرور

  const mailOptions = {
    from: "mirzae.uast@gmail.com",
    to: "kaminfo.m@gmail.com",
    subject: "سفارش جدید دریافت شد",
    html: `
      <div style="direction: rtl; font-family: Tahoma, Arial; text-align: right; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="color: #007bff; text-align: center;">📢 سفارش جدید دریافت شد</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td><strong>نام و نام خانوادگی:</strong></td><td>${order.fullName}</td></tr>
          <tr><td><strong>کد ملی:</strong></td><td>${order.nationalId}</td></tr>
          <tr><td><strong>مقطع تحصیلی:</strong></td><td>${order.educationLevel}</td></tr>
          <tr><td><strong>شهر:</strong></td><td>${order.city}</td></tr>
          <tr><td><strong>شماره تماس:</strong></td><td>${order.mobileNumber}</td></tr>
        </table>
        <div style="text-align: center; margin-top: 20px;">
          <p>📎 تصویر پرداخت به این ایمیل پیوست شده است.</p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: order.paymentImage.split("/").pop(), // نام فایل از مسیر استخراج شده
        path: filePath, // مسیر کامل فایل
      },
    ],
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log("✅ ایمیل با موفقیت ارسال شد!")
  } catch (error) {
    console.error("❌ خطا در ارسال ایمیل:", error)
  }
}