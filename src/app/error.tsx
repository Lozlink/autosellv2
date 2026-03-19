'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Something Went Wrong
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        We encountered an unexpected error. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="px-8 py-3.5 bg-[#FFC325] text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
      >
        Try Again
      </button>
    </main>
  );
}
