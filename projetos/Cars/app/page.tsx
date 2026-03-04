import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import FeaturedVehicle from '@/components/FeaturedVehicle';
import BrandShowcase from '@/components/BrandShowcase';
import VisualSection from '@/components/VisualSection';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <FeaturedVehicle />
      <BrandShowcase />
      <VisualSection />
      
      {/* Footer Placeholder */}
      <footer className="py-20 px-8 border-t border-white/5 bg-black text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded-sm flex items-center justify-center">
              <span className="text-black font-bold text-sm italic">K</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tighter uppercase">Karzone</span>
          </div>
          <p className="text-white/20 text-sm">© 2024 Karzone Luxury Automotive. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map(item => (
              <a key={item} href="#" className="text-xs uppercase tracking-widest text-white/40 hover:text-accent transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
