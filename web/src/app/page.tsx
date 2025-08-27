import Hero from './components/Hero';
import Services from './components/Services';
import Footer from './components/Footer';

export default function Home() {
    return (
        <div className="min-h-screen">
            <Hero />
            <Services />
            <Footer />
        </div>
    );
}
