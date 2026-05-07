import HeadphoneScroll from "./components/HeadphoneScroll";
import FeaturedProducts from "./components/FeaturedProducts";
import FeaturesSection from "./components/FeaturesSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white/90 overflow-x-hidden">
      {/* Premium Hero - Integrated banner with animation */}
      <HeadphoneScroll />

      {/* Features Showcase Section */}
      <FeaturesSection />

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Premium CTA Section */}
      <section className="relative px-6 py-24 md:px-10 md:py-32 bg-gradient-to-b from-black via-black to-black border-t border-white/5 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl opacity-10" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-t from-white/5 to-transparent rounded-full blur-3xl opacity-10" />
        </div>

        <div className="relative z-10">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/3 backdrop-blur-2xl p-8 md:p-16 overflow-hidden relative">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 mb-8">
                    <span className="w-2 h-2 bg-white/60 rounded-full" />
                    <span className="text-white/60 text-xs font-medium tracking-widest uppercase">
                      Ready to hear the difference?
                    </span>
                  </div>

                  <h2 className="text-white/95 font-bold tracking-tight text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
                    Experience Premium Sound
                    <br />
                    <span className="bg-gradient-to-r from-white/80 via-white/60 to-white/40 bg-clip-text text-transparent">
                      Today
                    </span>
                  </h2>

                  <p className="text-white/60 text-base md:text-lg max-w-xl leading-relaxed font-light">
                    Join thousands of audio enthusiasts who have discovered the pinnacle of wireless audio. Premium sound, premium comfort, premium experience.
                  </p>

                  {/* Trust indicators */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-6">
                    <div>
                      <div className="text-white font-bold text-2xl">98%</div>
                      <div className="text-white/60 text-sm">Customer Satisfaction</div>
                    </div>
                    <div>
                      <div className="text-white font-bold text-2xl">50K+</div>
                      <div className="text-white/60 text-sm">Happy Users</div>
                    </div>
                    <div>
                      <div className="text-white font-bold text-2xl">2-Yr</div>
                      <div className="text-white/60 text-sm">Warranty</div>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#products"
                    className="inline-flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 border border-white/30 hover:border-white/40 backdrop-blur-md px-8 py-4 text-white font-semibold text-base transition-all duration-300 hover:scale-105 whitespace-nowrap group"
                  >
                    Shop Now
                    <svg
                      className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 border border-white/20 backdrop-blur-md px-8 py-4 text-white/90 font-semibold text-base transition-all duration-300 hover:scale-105 whitespace-nowrap"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 md:px-10 bg-black/80 border-t border-white/5">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="text-white/90 font-semibold mb-4">Product</div>
              <ul className="space-y-3 text-white/60 text-sm">
                <li><a href="#" className="hover:text-white/90 transition-colors">All Models</a></li>
                <li><a href="#" className="hover:text-white/90 transition-colors">Specs</a></li>
                <li><a href="#" className="hover:text-white/90 transition-colors">Accessories</a></li>
              </ul>
            </div>
            <div>
              <div className="text-white/90 font-semibold mb-4">Support</div>
              <ul className="space-y-3 text-white/60 text-sm">
                <li><a href="#" className="hover:text-white/90 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white/90 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white/90 transition-colors">Warranty</a></li>
              </ul>
            </div>
            <div>
              <div className="text-white/90 font-semibold mb-4">Company</div>
              <ul className="space-y-3 text-white/60 text-sm">
                <li><a href="#" className="hover:text-white/90 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white/90 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white/90 transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <div className="text-white/90 font-semibold mb-4">Connect</div>
              <ul className="space-y-3 text-white/60 text-sm">
                <li><a href="#" className="hover:text-white/90 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white/90 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-white/90 transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-white/40 text-sm">
            <div>© 2024 SonicWave Pro. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white/60 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
