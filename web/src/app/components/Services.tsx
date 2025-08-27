export default function Services() {
    const businessTypes = [
        {
            id: 1,
            title: "Hair Salons",
            description: "Professional hair styling, cutting, coloring, and treatments from top-rated salons",
            icon: "💇‍♀️",
            category: "beauty",
            featured: true
        },
        {
            id: 2,
            title: "Barbershops",
            description: "Classic and modern barbering services for men's grooming and styling needs",
            icon: "✂️",
            category: "grooming",
            featured: true
        },
        {
            id: 3,
            title: "Spa Centers",
            description: "Relaxing spa treatments, massages, and wellness therapies for ultimate relaxation",
            icon: "🧘‍♀️",
            category: "wellness",
            featured: true
        },
        {
            id: 4,
            title: "Nail Studios",
            description: "Professional manicures, pedicures, and nail art from skilled technicians",
            icon: "💅",
            category: "beauty",
            featured: false
        },
        {
            id: 5,
            title: "Wellness Centers",
            description: "Holistic wellness services including yoga, meditation, and alternative therapies",
            icon: "🌸",
            category: "wellness",
            featured: false
        },
        {
            id: 6,
            title: "Beauty Clinics",
            description: "Advanced beauty treatments, skincare, and aesthetic procedures",
            icon: "✨",
            category: "beauty",
            featured: false
        },
        {
            id: 7,
            title: "Massage Therapy",
            description: "Professional massage services from licensed therapists and wellness centers",
            icon: "🛁",
            category: "wellness",
            featured: false
        },
        {
            id: 8,
            title: "Fitness & Wellness",
            description: "Personal training, fitness classes, and wellness coaching services",
            icon: "💪",
            category: "wellness",
            featured: false
        },
        {
            id: 9,
            title: "Alternative Therapies",
            description: "Acupuncture, aromatherapy, and other holistic healing services",
            icon: "🌿",
            category: "wellness",
            featured: false
        }
    ];

    const categories = [
        { id: "all", name: "All Businesses", icon: "🌟", count: businessTypes.length },
        { id: "beauty", name: "Beauty & Hair", icon: "💄", count: businessTypes.filter(b => b.category === "beauty").length },
        { id: "grooming", name: "Grooming", icon: "✂️", count: businessTypes.filter(b => b.category === "grooming").length },
        { id: "wellness", name: "Wellness & Spa", icon: "🧘‍♀️", count: businessTypes.filter(b => b.category === "wellness").length }
    ];

    return (
        <section id="services" className="py-12 md:py-20" style={{ backgroundColor: '#f2f2f2' }}>
            {/* Hero Section */}
            <div className="text-center mb-12 md:mb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6" style={{ color: '#1E1E1E' }}>
                        Discover Amazing Businesses
                    </h2>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed px-4" style={{ color: '#9a9696' }}>
                        Book appointments with the best hair salons, barbershops, spas, and wellness centers in your area.
                        Find and book trusted professionals for all your beauty and wellness needs.
                    </p>
                </div>
            </div>

            {/* Category Filter */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 md:mb-16">
                <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 md:gap-4">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className="group flex flex-col md:flex-row items-center gap-2 md:gap-3 p-4 md:px-6 md:py-4 rounded-xl md:rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                            style={{ backgroundColor: '#ffffff' }}
                        >
                            <span className="text-xl md:text-2xl">{category.icon}</span>
                            <div className="text-center md:text-left">
                                <div className="font-semibold text-sm md:text-base" style={{ color: '#1E1E1E' }}>{category.name}</div>
                                <div className="text-xs md:text-sm" style={{ color: '#9a9696' }}>{category.count} businesses</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Featured Businesses */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16 md:mb-20">
                <div className="text-center mb-8 md:mb-12">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4" style={{ color: '#1E1E1E' }}>
                        Featured Business Types
                    </h3>
                    <p className="text-base md:text-lg px-4" style={{ color: '#9a9696' }}>
                        Most popular categories our users love to book
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {businessTypes.filter(business => business.featured).map((business) => (
                        <div
                            key={business.id}
                            className="group relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
                            style={{ backgroundColor: '#ffffff' }}
                        >
                            <div className="p-6 md:p-8">
                                <div className="text-5xl md:text-6xl mb-4 md:mb-6">{business.icon}</div>
                                <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4" style={{ color: '#1E1E1E' }}>
                                    {business.title}
                                </h3>
                                <p className="text-base md:text-lg mb-4 md:mb-6 leading-relaxed" style={{ color: '#9a9696' }}>
                                    {business.description}
                                </p>
                                <button className="w-full py-3 md:py-4 px-4 md:px-6 rounded-xl md:rounded-2xl text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl" style={{ backgroundColor: '#3e92cc', color: '#ffffff' }}>
                                    Browse Businesses
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* All Business Types Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12 md:mb-16">
                <div className="text-center mb-8 md:mb-12">
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4" style={{ color: '#1E1E1E' }}>
                        All Business Categories
                    </h3>
                    <p className="text-base md:text-lg px-4" style={{ color: '#9a9696' }}>
                        Explore all types of beauty and wellness businesses
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {businessTypes.map((business) => (
                        <div
                            key={business.id}
                            className={`group relative overflow-hidden rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                                business.featured ? 'ring-2 ring-offset-2 md:ring-offset-4' : ''
                            }`}
                            style={{
                                backgroundColor: '#ffffff',
                                borderColor: business.featured ? '#3e92cc' : 'transparent'
                            }}
                        >
                            <div className="p-5 md:p-6">
                                <div className="flex items-start justify-between mb-3 md:mb-4">
                                    <div className="text-3xl md:text-4xl">{business.icon}</div>
                                    {business.featured && (
                                        <span className="px-2 md:px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: '#3e92cc' }}>
                      Featured
                    </span>
                                    )}
                                </div>

                                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3" style={{ color: '#1E1E1E' }}>
                                    {business.title}
                                </h3>

                                <p className="mb-3 md:mb-4 leading-relaxed text-sm md:text-base" style={{ color: '#9a9696' }}>
                                    {business.description}
                                </p>

                                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-full font-medium" style={{
                      backgroundColor: business.featured ? '#3e92cc' : '#f2f2f2',
                      color: business.featured ? '#ffffff' : '#9a9696'
                  }}>
                    {business.category}
                  </span>

                                    <button className="px-3 md:px-4 py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg" style={{ backgroundColor: '#3e92cc', color: '#ffffff' }}>
                                        Browse
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="text-center">
                    <div className="rounded-2xl md:rounded-3xl shadow-2xl p-8 md:p-12" style={{ backgroundColor: '#ffffff' }}>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6" style={{ color: '#1E1E1E' }}>
                            Ready to Book Your Next Appointment?
                        </h3>
                        <p className="text-base md:text-lg mb-6 md:mb-8 leading-relaxed px-2" style={{ color: '#9a9696' }}>
                            Discover amazing local businesses and book appointments with trusted professionals.
                            Your beauty and wellness journey starts here.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                            <button className="px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl" style={{ backgroundColor: '#3e92cc', color: '#ffffff' }}>
                                Explore All Businesses
                            </button>
                            <button className="px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105 border-2 border-gray-300 hover:border-gray-400" style={{ color: '#1E1E1E' }}>
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}



