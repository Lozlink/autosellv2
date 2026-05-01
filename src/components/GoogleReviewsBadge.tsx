

export default function GoogleReviewsBadge() {
  return (
    <a
      href='https://www.google.com/maps/place/Auto-Sell.AI/@-33.8490153,150.8962532,16z/data=!4m18!1m9!3m8!1s0x6b12974f9c62484b:0x7dc9ecf85fabfd4!2sAuto-Sell.AI!8m2!3d-33.8490153!4d150.8962532!9m1!1b1!16s%2Fg%2F11xp96nncw!3m7!1s0x6b12974f9c62484b:0x7dc9ecf85fabfd4!8m2!3d-33.8490153!4d150.8962532!9m1!1b1!16s%2Fg%2F11xp96nncw?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D'
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Rated 5.0 stars on Google Reviews — read what customers say"
      className="block bg-gradient-to-r from-yellow-50 via-white to-yellow-50 border-b border-yellow-100 hover:via-yellow-50 transition-colors group"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-center gap-2 text-xs sm:text-sm">
        {/* Google G logo */}
        <svg
          aria-hidden="true"
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0"
          viewBox="0 0 24 24"
        >
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>

        {/* Stars */}
        <div className="flex items-center" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="#FFC325" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
            </svg>
          ))}
        </div>

        <span className="font-bold text-gray-800 tabular-nums">5.0</span>

        <span className="text-gray-500 hidden sm:inline">on Google Reviews</span>
        <span className="text-gray-500 sm:hidden">on Google</span>

        <span className="hidden md:inline text-[#d4a017] font-semibold ml-1 group-hover:underline">
          Read reviews →
        </span>
      </div>
    </a>
  )
}
