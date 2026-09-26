// components/ui/LoadingSpinner.tsx
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-3 border-ets-navy/20 border-t-ets-navy rounded-full animate-spin" />
    </div>
  );
}