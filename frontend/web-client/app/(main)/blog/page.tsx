"use client";
import React from "react";
import Container from "@/components/Container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const categories = [
  { id: "all", label: "Tất cả" },
  { id: "news", label: "Tin tức" },
  { id: "guides", label: "Hướng dẫn" },
  { id: "reviews", label: "Đánh giá" },
];

export default function BlogPage() {
  return (
    <Container className="bg-brand-1 flex flex-col gap-5 pt-6">
      <div className="min-h-[60vh]">
        <div className="bg-linear-to-r from-indigo-600 to-fuchsia-500 text-white">
          <Container>
            <div className="py-10 md:py-14 flex flex-col gap-6 md:gap-8">
              <h1 className="text-2xl md:text-4xl font-semibold tracking-tight">
                Blog & Tin tức
              </h1>
              <p className="text-white/90 max-w-2xl">
                Khám phá xu hướng mới, bài hướng dẫn và đánh giá sản phẩm.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Tìm bài viết..."
                  className="bg-white/95 text-gray-900"
                />
                <Button
                  variant="secondary"
                  className="bg-white text-gray-900 hover:bg-white/90"
                >
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </Container>
        </div>

        <div className="py-6 md:py-10 flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Button key={c.id} variant="outline" className="rounded-full">
                {c.label}
              </Button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video bg-gray-100" />
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    Tiêu đề bài viết nổi bật số {i + 1}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    Mô tả ngắn về bài viết để người dùng biết nội dung chính.
                  </p>
                  <div className="mt-4">
                    <Link
                      href={`/blog/${i + 1}`}
                      className="text-primary hover:underline"
                    >
                      Đọc tiếp
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
