"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Loader2, Upload } from "lucide-react"

const formSchema = z.object({
  fullName: z.string().min(3, "نام و نام خانوادگی باید حداقل ۳ حرف باشد"),
  nationalId: z
    .string()
    .length(10, "کد ملی باید ۱۰ رقم باشد")
    .regex(/^\d+$/, "کد ملی باید فقط شامل اعداد باشد"),
  birthDay: z
    .string()
    .min(1, "روز تولد را وارد کنید")
    .refine(
      (value) => {
        const day = parseInt(value)
        return day >= 1 && day <= 31
      },
      { message: "روز تولد باید بین ۱ تا ۳۱ باشد" }
    ),
  birthMonth: z.string().min(1, "ماه تولد را انتخاب کنید"),
  birthYear: z
    .string()
    .length(4, "سال تولد باید ۴ رقم باشد")
    .refine(
      (value) => {
        const year = parseInt(value)
        return year >= 1300 && year <= 1420
      },
      { message: "سال تولد باید بین ۱۳۰۰ تا ۱۴۲۰ باشد" }
    ).optional(),
  educationLevel: z.string().min(1, "مقطع تحصیلی را انتخاب کنید"),
  city: z.string().min(2, "نام شهر را وارد کنید"),
  mobileNumber: z
    .string()
    .regex(/^09\d{9}$/, "شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد"),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, "شماره تلفن باید فقط شامل اعداد باشد")
    .optional()
    .or(z.literal("")),
  paymentImage: z
    .any()
    .refine((files) => files?.length > 0, "تصویر فیش پرداخت را آپلود کنید")
    .refine(
      (files) => files?.[0]?.type?.startsWith("image/"),
      "فقط فایل‌های تصویری مجاز هستند"
    )
    .refine(
      (files) => files?.[0]?.size <= 5 * 1024 * 1024,
      "حجم تصویر نباید بیشتر از ۵ مگابایت باشد"
    ).optional(),
})

const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
]

const educationLevels = [
  "ابتدایی",
  "متوسطه اول",
  "متوسطه دوم",
  "کاردانی",
  "کارشناسی",
  "کارشناسی ارشد",
  "دکتری",
]

interface OrderFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: {
    id: string
    title: string
    price: number
  }
}

export function OrderForm({ open, onOpenChange, product }: OrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      nationalId: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      educationLevel: "",
      city: "",
      mobileNumber: "",
      phoneNumber: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      
      const formData = new FormData()
      formData.append("productId", product.id)
      Object.entries(values).forEach(([key, value]) => {
        if (key === "paymentImage") {
          if (value[0]) {
            formData.append(key, value[0])
          }
        } else {
          formData.append(key, value as string)
        }
      })

      const response = await fetch("/api/orders", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("خطا در ثبت سفارش")
      }

      toast.success("سفارش شما با موفقیت ثبت شد", {
        description: "همکاران ما به زودی با شما تماس خواهند گرفت",
      })
      onOpenChange(false)
      form.reset()
    } catch (error) {
      toast.error("خطا در ثبت سفارش", {
        description: "لطفا دوباره تلاش کنید",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>ثبت سفارش {product.title}</DialogTitle>
        </DialogHeader>

        <div className="rounded-lg bg-muted p-4">
          <div className="flex items-baseline justify-between">
            <span className="text-sm">مبلغ قابل پرداخت:</span>
            <span className="font-bold text-primary">
              {product.price.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </div>

        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام و نام خانوادگی</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: علی محمدی" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* National ID */}
            <FormField
              control={form.control}
              name="nationalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>کد ملی</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="مثال: ۰۱۲۳۴۵۶۷۸۹"
                      maxLength={10}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Birth Date */}
            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="birthDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>روز تولد</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="31"
                        placeholder="مثال: ۱۵"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ماه تولد</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب ماه" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {persianMonths.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>سال تولد</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1300"
                        max="1420"
                        placeholder="مثال: ۱۳۸۰"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Education Level */}
            <FormField
              control={form.control}
              name="educationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>مقطع تحصیلی</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="انتخاب مقطع تحصیلی" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {educationLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شهر</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: تهران" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mobile Number */}
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شماره موبایل</FormLabel>
                  <FormControl>
                    <Input
                      dir="ltr"
                      placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                      maxLength={11}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شماره ثابت (اختیاری)</FormLabel>
                  <FormControl>
                    <Input
                      dir="ltr"
                      placeholder="مثال: ۰۲۱۱۲۳۴۵۶۷۸"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Payment Image */}
            <FormField
              control={form.control}
              name="paymentImage"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>تصویر فیش پرداخت</FormLabel>
                  <FormControl>
                    <div className="grid gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onChange(e.target.files)}
                        {...field}
                        className="hidden"
                        id="payment-image"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          document.getElementById("payment-image")?.click()
                        }}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        انتخاب تصویر فیش پرداخت
                      </Button>
                      {value?.[0] && (
                        <p className="text-sm text-muted-foreground">
                          فایل انتخاب شده: {value[0].name}
                        </p>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  در حال ثبت سفارش...
                </>
              ) : (
                "ثبت سفارش"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}