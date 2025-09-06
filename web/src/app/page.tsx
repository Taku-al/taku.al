import Hero from './components/Hero';
import Services from './components/Services';
import NearMe from './components/NearMe';
import Footer from './components/Footer';

export default function Home() {
    return (
        <div className="min-h-screen">
            <Hero />
            <Services />
            <NearMe />
            <Footer />
        </div>
    );
}
