export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-xs rounded-xl border border-pasar-ochre/40 bg-pasar-ink px-5 py-4 shadow-lg animate-[fadeIn_0.2s_ease-out]">
      <p className="font-body text-sm text-white">{message}</p>
    </div>
  );
}
