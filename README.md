## Miesta QR Menü

Miesta Bakırköy için Next.js 14 (App Router), TypeScript ve Tailwind CSS kullanılarak hazırlanmış yumuşak tonlu QR menü deneyimi. Tasarım, chill kafe atmosferini vurgulayan pastel degradeler, cam efektli kartlar ve mobil odaklı bir yerleşim içerir.

## Çalıştırma

```bash
npm install
npm run dev
```

Ardından tarayıcıdan `http://localhost:3000` adresini ziyaret ederek menüyü görüntüleyebilirsiniz.

## Öne Çıkanlar

- Hero bölümünde adres, çalışma saatleri ve QR kod kartı ile hızlı giriş.
- `menuSections` verisi üzerinden dinamik olarak oluşturulan menü kartları.
- Her ürün için pastel çizimli yerel görseller ve tag rozetleriyle kolay filtreleme.

## Yapı

- `src/app/page.tsx`: Sayfa düzeni, hero blok, QR kartı ve menü ızgarası.
- `src/components/MenuSection.tsx`: Bir menü bölümündeki ürün kartlarını render eden bileşen.
- `src/data/menu.ts`: Menü kategorileri ve ürün içerikleri için tek kaynaklı veri dosyası.
- `public/images/*.svg`: Ürün kartlarında kullanılan pastel tonlu örnek görseller.
- `public/qr-miesta.svg`: Demo amaçlı QR görseli (gerçek kod ile değiştirilmeli).

## Özelleştirme İpuçları

- Menüde fiyat veya tanım güncellemek için `src/data/menu.ts` dosyasını düzenleyin.
- Yeni kategori eklerken aynı dosyada `menuSections` dizisine yeni bir nesne ekleyin.
- Renk tonları ve gölgeler Tailwind sınıfları üzerinden düzenlenebilir.
- `public/qr-miesta.svg` dosyasını gerçek QR kodunuzla değiştirerek menüyü yayına hazır hale getirin.
