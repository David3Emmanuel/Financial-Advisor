import React, { useState } from 'react'
import {
  Search,
  TrendingUp,
  AlertTriangle,
  Newspaper,
  Cpu,
  ArrowRight,
  BarChart3,
  Github,
  Twitter,
  ExternalLink,
  Loader2,
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { analyzeQuery } from './services/api'

const App = () => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState<any>(null)
  const [view, setView] = useState('home') // 'home' or 'result'
  const [error, setError] = useState<string | null>(null)
  const [analysisText, setAnalysisText] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return

    setLoading(true)
    setError(null)

    try {
      const response = await analyzeQuery(query)
      setAnalysisText(response.text)

      // For demo purposes, create a simple report structure
      // In production, you might parse the markdown response or use structured data
      setReport({
        ticker: query.replace('$', '').toUpperCase(),
        analysis: response.text,
      })

      setView('result')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error analyzing query:', err)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setView('home')
    setQuery('')
    setReport(null)
    setError(null)
    setAnalysisText('')
  }

  return (
    <div className='min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100'>
      {/* Navigation */}
      <nav className='border-b bg-white/80 backdrop-blur-md sticky top-0 z-50'>
        <div className='max-w-5xl mx-auto px-4 h-16 flex items-center justify-between'>
          <div
            className='flex items-center gap-2 cursor-pointer'
            onClick={reset}
          >
            <div className='bg-blue-600 p-1.5 rounded-lg'>
              <Cpu className='w-5 h-5 text-white' />
            </div>
            <span className='font-bold text-xl tracking-tight'>FinAgent</span>
          </div>
          <div className='flex gap-4'>
            <a
              href='#'
              className='text-slate-500 hover:text-blue-600 transition-colors'
            >
              <Twitter className='w-5 h-5' />
            </a>
            <a
              href='#'
              className='text-slate-500 hover:text-blue-600 transition-colors'
            >
              <Github className='w-5 h-5' />
            </a>
          </div>
        </div>
      </nav>

      <main className='max-w-5xl mx-auto px-4 py-12'>
        {view === 'home' ? (
          <div className='flex flex-col items-center text-center space-y-8 max-w-2xl mx-auto py-12'>
            <div className='space-y-4'>
              <h1 className='text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900'>
                AI Agent for{' '}
                <span className='text-blue-600'>Financial Intelligence</span>
              </h1>
              <p className='text-lg text-slate-600'>
                Real-time market analysis powered by Gemini, Finnhub, and
                Tavily.
              </p>
            </div>

            <form onSubmit={handleSearch} className='w-full relative'>
              <input
                type='text'
                placeholder="Ask about $TSLA, Bitcoin, or 'Should I buy NVDA?'"
                className='w-full p-4 pl-12 pr-32 rounded-2xl border border-slate-200 shadow-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-lg'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Search className='absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5' />
              <button
                type='submit'
                disabled={loading}
                className='absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 disabled:opacity-50'
              >
                {loading ? (
                  <Loader2 className='w-4 h-4 animate-spin' />
                ) : (
                  'Analyze'
                )}
              </button>
            </form>

            {error && (
              <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm'>
                <strong>Error:</strong> {error}
              </div>
            )}

            <div className='flex flex-wrap justify-center gap-3'>
              {['$BTC', '$NVDA', 'Forex Trends', 'Ethereum News'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className='px-4 py-1.5 rounded-full border border-slate-200 bg-white text-sm text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-all'
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className='space-y-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500'>
            <button
              onClick={reset}
              className='text-slate-500 hover:text-blue-600 flex items-center gap-1 text-sm font-medium mb-4'
            >
              ← Start New Analysis
            </button>

            {/* Report Header Card */}
            <div className='bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6'>
              <div className='flex justify-between items-start'>
                <div>
                  <h2 className='text-3xl font-bold'>
                    {report.ticker} Analysis
                  </h2>
                  <p className='text-slate-500'>
                    Generated via Gemini Analyst Agent
                  </p>
                </div>
              </div>

              <div className='pt-6 border-t border-slate-100'>
                <div className='flex items-center gap-2 mb-4'>
                  <Cpu className='w-5 h-5 text-blue-600' />
                  <h3 className='font-bold text-lg'>AI Analysis</h3>
                </div>
                <div className='text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-slate-100 prose prose-slate max-w-none'>
                  <ReactMarkdown>{analysisText}</ReactMarkdown>
                </div>
              </div>

              <div className='flex items-center justify-between pt-4'>
                <span className='text-xs text-slate-400'>
                  Sources: Tavily, Finnhub via Gemini
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className='mt-auto py-8 border-t bg-white'>
        <div className='max-w-5xl mx-auto px-4 text-center'>
          <p className='text-slate-400 text-sm'>
            Built for the Financial Agent Software Engineer Application.
            Prototype v1.0.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
