export default function Hero() {
    return (
        <section id="home" className="relative text-white pt-16" style={{ background: 'linear-gradient(135deg, #13293d 0%, #16324f 50%, #18435a 100%)' }}>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                        Beauty & Wellness
                        <span className="block" style={{ color: '#3e92cc' }}>at Your Fingertips</span>
                    </h1>
                    
                    <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4" style={{ color: '#f2f2f2' }}>
                        Book your perfect haircut, salon treatment, or spa experience with our professional beauty experts.
                        Transform your look and rejuvenate your spirit.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
                        <button className="w-full sm:w-auto hover:opacity-90 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-lg text-base md:text-lg font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1" style={{ backgroundColor: '#3e92cc', color: '#ffffff' }}>
                            Book Appointment
                        </button>
                        <button className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-gray-800 px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-lg text-base md:text-lg font-semibold transition-colors">
                            View Services
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-2xl mx-auto px-4">
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold" style={{ color: '#3e92cc' }}>500+</div>
                            <div className="text-sm md:text-base" style={{ color: '#f2f2f2' }}>Happy Clients</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold" style={{ color: '#3e92cc' }}>50+</div>
                            <div className="text-sm md:text-base" style={{ color: '#f2f2f2' }}>Expert Stylists</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold" style={{ color: '#3e92cc' }}>100%</div>
                            <div className="text-sm md:text-base" style={{ color: '#f2f2f2' }}>Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Wave Element - Elegant Layered Waves */}
            <div className="absolute bottom-0 left-0 right-0 z-0">
                <svg
                    className="w-full h-24"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    style={{ fill: "#f2f2f2" }}
                >
                    <path
                        d="M0,60 C300,140 900,-20 1200,60 L1200,120 L0,120 Z"
                        opacity=".25"
                    ></path>
                    <path
                        d="M0,70 C300,160 900,0 1200,70 L1200,120 L0,120 Z"
                        opacity=".5"
                    ></path>
                    <path
                        d="M0,80 C300,180 900,20 1200,80 L1200,120 L0,120 Z"
                    ></path>
                </svg>
            </div>

        </section>
    );
}



