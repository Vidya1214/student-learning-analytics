export default function Layout({ children }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute top-40 -right-24 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[36rem] rounded-full bg-fuchsia-400/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-gradient-to-tr from-indigo-500 to-emerald-400" />
            <div>
              <div className="text-base font-semibold">Student Performance Dashboard</div>
              <div className="text-xs text-black/60 dark:text-white/60">Insights across cognitive skills and outcomes</div>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-black/60 dark:text-white/70">
            <a className="hover:underline" href="#charts">Charts</a>
            <span>·</span>
            <a className="hover:underline" href="#students">Students</a>
            <span>·</span>
            <a className="hover:underline" href="#insights">Insights</a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}


