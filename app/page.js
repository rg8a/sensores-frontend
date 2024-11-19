import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="mx-auto"
          src="/logoequipo.svg"
          alt="Next.js logo"
          width={250}
          height={38}
          priority
        />
        <p className="text-sm text-center font-[family-name:var(--font-geist-mono)] w-[600px]">Diseño de prototipo de un sistema digital capaz de obtener datos mediante el uso de sensores, procesarlos y depositarlos como información en una plataforma en internet, para su análisis y visualización.</p>
        <ol className="mx-auto mt-4 list-inside list-decimal text-sm text-center font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Ricardo Gaspar Ochoa -
            <code className="bg-black/[.05] dark:bg-white/[.06] ml-1 px-1 py-0.5 rounded font-semibold">
              A00838841
            </code>
            .
          </li>
          <li className="mb-2">
          Emiliano Enríquez López -
            <code className="bg-black/[.05] dark:bg-white/[.06] ml-1 px-1 py-0.5 rounded font-semibold">
            A01174554
            </code>
            .
          </li>
          <li className="mb-2">
          Jose Manuel Sanchez Perez -
            <code className="bg-black/[.05] dark:bg-white/[.06] ml-1 px-1 py-0.5 rounded font-semibold">
            A01178230
            </code>
            .
          </li>
          <li className="mb-2">
            Octavio Ramos Treviño -
            <code className="bg-black/[.05] dark:bg-white/[.06] ml-1 px-1 py-0.5 rounded font-semibold">
              A00840145
            </code>
            .
          </li>
          <li className="mb-2">
          Edmundo Ruelas Angulo -
            <code className="bg-black/[.05] dark:bg-white/[.06] ml-1 px-1 py-0.5 rounded font-semibold">
            A01742824
            </code>
            .
          </li>
        </ol>

        <div className="mx-auto flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/dashboard"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Ver Datos
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver Documentación
          </a>
        </div>

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Documentación
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://lookerstudio.google.com/reporting/10eee32e-c578-4589-ba04-749eeef34dc5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Looker Studio →
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/rg8a/sensores-backend"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Backend Github →
        </a>
      </footer>
    </div>
  );
}
