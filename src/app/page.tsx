import HeadphoneScroll from "./components/HeadphoneScroll";
import FeaturedProducts from "./components/FeaturedProducts";
import FeaturesSection from "./components/FeaturesSection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-deep-black overflow-x-hidden">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navbar />

      {/* Premium Hero - Integrated banner with animation */}
      <HeadphoneScroll />

      {/* Features Showcase Section */}
      <FeaturesSection />

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Premium CTA Section */}
      <section className="relative py-32 md:py-48 bg-zinc-black overflow-hidden">
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 radial-vignette pointer-events-none opacity-40" />

        <div className="premium-container relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
            <div className="flex-1 text-center lg:text-left">
              <span className="label-mono mb-6 block text-red-highlight">
                Final Call for Excellence
              </span>
              <h2 className="heading-hero text-ghost-white mb-8">
                HEAR THE<br />
                <span className="text-red-highlight">FUTURE</span>
              </h2>
              <p className="text-ghost-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Join the elite circle of audiophiles who refuse to compromise.
                Experience sonic perfection in every vibration.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="btn-premium min-w-[200px]">
                Pre-order Now
              </button>
              <button className="btn-premium min-w-[200px] border-white/5 hover:border-white/20">
                View Collection
              </button>
            </div>
          </div>

          <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-white/5">
            {[
              { label: "Precision", value: "0.01mm" },
              { label: "Battery", value: "60HRS" },
              { label: "Latency", value: "2MS" },
              { label: "Weight", value: "280G" },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="label-mono text-[10px] mb-2">{stat.label}</p>
                <p className="text-white font-nature font-black text-2xl md:text-3xl tracking-tighter">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
