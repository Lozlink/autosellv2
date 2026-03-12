import type { Metadata } from 'next'
import Header from '@/components/Header'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
/* eslint-disable */

export const metadata: Metadata = {
  title: "Blog - Auto-Sell.ai",
  description: "Read the latest tips, guides, and insights about selling your car in Australia. Expert advice from Auto-Sell.ai.",
}

const blogPosts = [
  {
    id: 1,
    title: "How to Get the Best Price for Your Car in 2024",
    excerpt: "Learn the insider tips and tricks to maximize your car's value when selling in Australia.",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Selling Tips",
    image: "/images/blog/car-selling-tips.jpg"
  },
  {
    id: 2,
    title: "What to Do When Your Car Won't Start",
    excerpt: "Don't let a non-running car stop you from selling. We buy cars in any condition.",
    date: "2024-01-10",
    readTime: "3 min read",
    category: "Car Condition",
    image: "/images/blog/non-running-car.jpg"
  },
  {
    id: 3,
    title: "The Complete Guide to Car Valuation in Australia",
    excerpt: "Understand how car valuations work and what factors affect your car's worth.",
    date: "2024-01-05",
    readTime: "7 min read",
    category: "Valuation",
    image: "/images/blog/car-valuation.jpg"
  },
  {
    id: 4,
    title: "Selling vs Trading: Which is Better for You?",
    excerpt: "Compare the pros and cons of selling your car versus trading it in at a dealership.",
    date: "2024-01-01",
    readTime: "4 min read",
    category: "Comparison",
    image: "/images/blog/sell-vs-trade.jpg"
  },
  {
    id: 5,
    title: "Preparing Your Car for Sale: A Checklist",
    excerpt: "Get your car ready for sale with our comprehensive preparation checklist.",
    date: "2023-12-28",
    readTime: "6 min read",
    category: "Preparation",
    image: "/images/blog/car-preparation.jpg"
  },
  {
    id: 6,
    title: "Understanding Car Depreciation in Australia",
    excerpt: "Learn how depreciation affects your car's value and how to minimize its impact.",
    date: "2023-12-25",
    readTime: "5 min read",
    category: "Finance",
    image: "/images/blog/car-depreciation.jpg"
  }
]

export default async function BlogPage() {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  const dbPosts = (data || []).map((p: any) => ({
    id: p.slug || p.id,
    title: p.title,
    excerpt: p.excerpt || '',
    date: p.created_at,
    readTime: p.read_time || '',
    category: p.category || 'General',
    image: p.image_url || ''
  }));

  const posts = dbPosts.length ? dbPosts : blogPosts;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="text-gray-800 py-12" style={{ backgroundColor: '#FFC325' }}>
        <div className="px-4 sm:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Auto-Sell.ai Blog
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Expert tips, guides, and insights to help you sell your car for the best price in Australia.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 bg-gray-50">
        <div className="px-4 sm:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#FFC325] transition-all duration-300">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: '#FFC325' }}>
                    <span className="text-gray-800 text-4xl font-bold">{post.category.charAt(0)}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-[#FFC325]/20 text-[#FFC325] text-xs font-semibold px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-gray-600 text-sm">{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <time className="text-sm text-gray-600">
                      {new Date(post.date).toLocaleDateString('en-AU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-[#FFC325] hover:text-[#FFC325] font-semibold text-sm"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12" style={{ background: '#FFC325' }}>
        <div className="px-4 sm:px-8 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Stay Updated with Car Selling Tips
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Get the latest insights and tips delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#FFC325]"
            />
            <button className="bg-white text-[#FFC325] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
