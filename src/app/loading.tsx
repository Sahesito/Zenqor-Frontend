export default function Loading() {
  return (
    <div className="min-h-screen bg-[#07111B] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-10 h-10 border-2 border-[#C89B5A]/20 rounded-full" />
          <div className="w-10 h-10 border-2 border-t-[#C89B5A] rounded-full animate-spin absolute inset-0" />
        </div>
        <p className="text-xs text-[#9CA3AF]">Loading ZENQOR...</p>
      </div>
    </div>
  );
}