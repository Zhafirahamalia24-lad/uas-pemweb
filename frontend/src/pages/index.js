import Link from 'next/link'
export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">UTS PEMWEB - Productivity Insight</h1>
        <p className="mt-2">Template visual diadaptasi dari Property NextJS. Aplikasi monitoring produktivitas dengan ML.</p>
      </header>
      <section>
        <Link href="/dashboard"><a className="px-4 py-2 bg-blue-600 text-white rounded">Lihat Dashboard</a></Link>
        <Link href="/survey"><a className="ml-4 px-4 py-2 border rounded">Isi Kuesioner</a></Link>
      </section>
    </main>
  )
}
