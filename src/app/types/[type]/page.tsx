import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/Header'
import CarSellForm from '@/components/CarSellForm'
import { Suspense } from 'react'

interface TypePageProps {
	params: Promise<{ type: string }>
}

const displayNames: Record<string, { plural: string; singular: string }> = {
	suvs: { plural: 'SUVs', singular: 'SUV' },
	utes: { plural: 'Utes', singular: 'Ute' },
	trucks: { plural: 'Trucks', singular: 'Truck' },
	vans: { plural: 'Vans', singular: 'Van' },
	motorcycles: { plural: 'Motorcycles', singular: 'Motorcycle' },
	cars: { plural: 'Cars', singular: 'Car' },
}

function getDisplayName(typeParam: string) {
	const entry = displayNames[typeParam.toLowerCase()]
	if (entry) return entry
	const capitalized = typeParam.charAt(0).toUpperCase() + typeParam.slice(1)
	return { plural: capitalized, singular: capitalized }
}

export async function generateMetadata({ params }: TypePageProps): Promise<Metadata> {
	const { type: typeParam } = await params
	const { plural: titleType } = getDisplayName(typeParam)
	return {
		title: `Sell ${titleType} - Auto-Sell.ai`,
		description: `We buy all ${titleType} in any condition. Free quote in 30 minutes and same-day OSKO payment.`,
		alternates: {
			canonical: `https://auto-sell.ai/sell-${typeParam}`,
		},
		openGraph: {
			url: `https://auto-sell.ai/sell-${typeParam}`,
		},
	}
}

export default async function TypePage({ params }: TypePageProps) {
	const { type: typeParam } = await params
	const { plural, singular } = getDisplayName(typeParam)

	return (
		<div className="min-h-screen bg-white">
			<Header />
			<section className="text-gray-800 py-12 bg-gray-50">
				<div className="px-4 sm:px-8">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="order-2 lg:order-1">
							<h1 className="text-4xl md:text-6xl font-bold mb-6">
								Sell Your {singular}
								<span className="block" style={{ color: '#FFC325' }}>Fast, Easy, Same-Day Payment</span>
							</h1>
							<p className="text-xl md:text-2xl text-gray-700 mb-8">
								We buy all {plural} in any condition. Get your free quote in 30 minutes and same-day payment.
							</p>
						</div>

						<div className="order-1 lg:order-2">
							<Suspense fallback={<div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 animate-pulse h-96"></div>}>
								<CarSellForm heading={`Sell Your ${singular}`} subheading="Get Your Free Quote Now" />
							</Suspense>
						</div>
					</div>
				</div>
			</section>

			{/* Type Showcase with Car Cutout */}
			<section className="py-16 bg-white overflow-hidden">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-2 gap-8 items-center">
						<div>
							<h2 className="text-3xl font-bold text-gray-900 mb-4">
								Sell Your {singular} the Easy Way
							</h2>
							<p className="text-lg text-gray-600 mb-6">
								No matter the age, mileage, or condition of your {singular.toLowerCase()}, we&apos;ll give you a competitive offer. Skip the hassle of private sales and get paid today.
							</p>
							<div className="space-y-3">
								<div className="flex items-center gap-3">
									<span className="text-xl" style={{ color: '#FFC325' }}>✓</span>
									<span className="text-gray-700">Free quote in 30 minutes</span>
								</div>
								<div className="flex items-center gap-3">
									<span className="text-xl" style={{ color: '#FFC325' }}>✓</span>
									<span className="text-gray-700">Same-day OSKO payment</span>
								</div>
								<div className="flex items-center gap-3">
									<span className="text-xl" style={{ color: '#FFC325' }}>✓</span>
									<span className="text-gray-700">We handle all paperwork</span>
								</div>
							</div>
						</div>
						<div className="flex justify-center items-center">
							<div className="relative w-full max-w-md">
								<Image
									src={`/images/cars/types/${typeParam}-cutout.png`}
									alt={`Sell your ${singular}`}
									width={600}
									height={400}
									sizes="(max-width: 1024px) 100vw, 50vw"
									priority
									className="object-contain drop-shadow-xl"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
