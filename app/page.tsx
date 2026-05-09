const WORK_AREAS = [
  "Web Tasarım",
  "Full-Stack Develope",
  "Programcılık",
  "Seslendirmenlik",
  "Reklamcılık",
  "E-Ticaret",
];

const EDUCATION = [
  "İstanbul Üniversitesi - Yönetim Bilişim Sistemleri",
  "Atatürk Üniversitesi - İşletme (Lisans)",
  "Balıkesir Üniversitesi - Bilgisayar Programcılığı (Mavi Diploma)",
  "Anadolu Üniversitesi - Web Tasarımı ve Kodlama",
  "Sabancı MTAL - Bilişim Teknolojileri - Web Programcılığı",
];

const REFERENCES = [
  "furkaniskin.av.tr",
  "renovagayrimenkul.com",
  "asliyuksekotocekici.com.tr",
  "yalovagocukduzeltme.com.tr",
  "emaglobalyay.com.tr",
];

export default function Home() {
  return (
    <main className="page">
      <section className="panel">
        <h1>Atakan Timuçin</h1>
        <p>timucin.dev | atakan@timucin.dev</p>
      </section>

      <section className="panel">
        <h2>Hizmet Alanları</h2>
        <ul>
          {WORK_AREAS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2>Eğitimler</h2>
        <ul>
          {EDUCATION.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2>Referans Domainler</h2>
        <ul>
          {REFERENCES.map((item) => (
            <li key={item}>
              <a href={`https://${item}`} target="_blank" rel="noreferrer">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
