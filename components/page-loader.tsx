export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          {/* Spinning ring */}
          <div className="absolute inset-0 rounded-full border-2 border-muted" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber animate-spin" />
        </div>
        <p className="text-xs font-mono text-muted-foreground tracking-widest uppercase animate-pulse">
          Loading
        </p>
      </div>
    </div>
  );
}

export function PageLoaderInline() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-end gap-1 h-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-1.5 h-6 bg-amber rounded-full animate-loader"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
