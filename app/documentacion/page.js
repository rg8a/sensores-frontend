import React from 'react'
import { FileText, Book, DownloadIcon, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function DocumentationPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
      <Link href="/" passHref>
        <Image
            className="mx-auto my-10"
            src="/logoequipo.svg"
            alt="Next.js logo"
            width={220}
            height={38}
            priority
        />
      </Link>

        <h1 className="text-3xl font-bold text-white mb-8 text-center">Documentación</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Manual de Usuario Card */}
          <div className="bg-zinc-900/50 rounded-lg p-6 hover:bg-zinc-900/70 transition-colors group">
            <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Manual de usuario</h2>
            <p className="text-zinc-400 mb-6">
              Guía completa para usuarios del sistema.
            </p>
            <a 
              href="/manual-usuario.pdf" 
              download
              className="inline-flex items-center px-4 py-2 bg-zinc-800 text-sm text-white rounded-full hover:bg-zinc-700 transition-colors"
            >
              Descargar Manual
              <DownloadIcon className="ml-2 h-4 w-4" />
            </a>
          </div>

          {/* Manual Técnico Card */}
          <div className="bg-zinc-900/50 rounded-lg p-6 hover:bg-zinc-900/70 transition-colors group">
            <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
              <Book className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">Manual técnico</h2>
            <p className="text-zinc-400 mb-6">
              Documentación técnica detallada del sistema.
            </p>
            <a 
              href="/manual-tecnico.pdf" 
              download
              className="inline-flex items-center px-4 py-2 bg-zinc-800 text-sm text-white rounded-full hover:bg-zinc-700 transition-colors"
            >
              Descargar Manual
              <DownloadIcon className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <Link href="/" className="inline-flex items-center px-4 py-2 border border-zinc-900 text-sm text-white rounded-full hover:bg-zinc-700 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Regresar al inicio
          </Link>
        </div>
      </div>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center my-24">
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
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/rg8a/sensores-frontend"
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
          Frontend Github →
        </a>
      </footer>
    </div>
  )
}