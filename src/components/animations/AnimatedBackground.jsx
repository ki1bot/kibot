export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-0 top-0 h-80 w-full bg-gradient-to-b from-violet-500/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 h-96 w-full bg-gradient-to-t from-blue-600/12 to-transparent blur-3xl" />
      <div className="absolute right-0 top-1/4 h-[520px] w-72 bg-gradient-to-l from-cyan-400/8 to-transparent blur-3xl" />
      <div className="absolute left-0 top-1/3 h-[520px] w-72 bg-gradient-to-r from-violet-500/10 to-transparent blur-3xl" />
    </div>
  );
}
