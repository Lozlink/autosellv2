'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface CarModel {
  id: string
  name: string
  image: string
  brand: string
}

const carModels: CarModel[] = [
  { id: '1', name: 'Camry', image: '/public/next.svg', brand: 'Toyota' },
  { id: '2', name: 'Commodore', image: '/public/next.svg', brand: 'Holden' },
  { id: '3', name: 'Focus', image: '/public/next.svg', brand: 'Ford' },
  { id: '4', name: 'CX-5', image: '/public/next.svg', brand: 'Mazda' },
  { id: '5', name: 'i30', image: '/public/next.svg', brand: 'Hyundai' },
  { id: '6', name: 'X-Trail', image: '/public/next.svg', brand: 'Nissan' },
  { id: '7', name: 'Civic', image: '/public/next.svg', brand: 'Honda' },
  { id: '8', name: 'Golf', image: '/public/next.svg', brand: 'Volkswagen' },
  { id: '9', name: 'Outlander', image: '/public/next.svg', brand: 'Mitsubishi' },
  { id: '10', name: 'Forester', image: '/public/next.svg', brand: 'Subaru' },
  { id: '11', name: '3 Series', image: '/public/next.svg', brand: 'BMW' },
  { id: '12', name: 'C-Class', image: '/public/next.svg', brand: 'Mercedes-Benz' }
]

export default function CarModelsRotation() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayedModels, setDisplayedModels] = useState<CarModel[]>([])

  useEffect(() => {
    // Initialize with first 3 models
    setDisplayedModels(carModels.slice(0, 3))
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % carModels.length
        const nextModels = []
        
        // Get next 3 models in rotation
        for (let i = 0; i < 3; i++) {
          const modelIndex = (nextIndex + i) % carModels.length
          nextModels.push(carModels[modelIndex])
        }
        
        setDisplayedModels(nextModels)
        return nextIndex
      })
    }, 3000) // Rotate every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="contents"
        >
          {displayedModels.map((model, index) => (
            <div
              key={`${model.id}-${currentIndex}`}
              className="text-center group p-8 transition-shadow"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Brand Icon */}
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500 transition-colors">
                <span className="text-2xl font-bold text-red-500 group-hover:text-white transition-colors">
                  {model.brand.charAt(0)}
                </span>
              </div>
              
              {/* Brand Name */}
              <div className="text-xl font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">
                {model.brand}
              </div>
              
              {/* Model Name */}
              <div className="text-lg text-gray-300 mb-4">
                {model.name}
              </div>
              
              {/* Description */}
              <div className="text-sm text-gray-400 font-medium">
                ESTIMATED VALUE
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
