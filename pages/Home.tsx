import React from "react";
import {
  ArrowRight,
  Trophy,
  Users,
  Globe,
  Search,
  PieChart,
  TrendingUp,
  Sprout,
  ShieldCheck,
  Banknote,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { MOCK_PROJECTS } from "../constants";
import { InvestmentCard } from "../components/InvestmentCard";

export const Home: React.FC = () => {
  // Get featured projects (limit to first 3)
  const featuredProjects = MOCK_PROJECTS.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax-like fixity */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop")',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-gray-900" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-farm-500/10 border border-farm-500/30 text-farm-500 mb-6 backdrop-blur-md">
            <span className="animate-pulse w-2 h-2 rounded-full bg-farm-500"></span>
            <span className="text-sm font-medium tracking-wide">
              Sustainable Agriculture for the Future
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
            Grow Your Wealth with the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-farm-500 to-green-300">
              Land We Cultivate.
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of investors in securing high-yield returns through
            premium agricultural assets. Real farms, real growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/invest">
              <Button
                variant="primary"
                className="text-lg px-10 py-4 h-auto w-full sm:w-auto shadow-farm-500/40"
              >
                Start Investing
              </Button>
            </Link>
            <Link to="/about">
                <Button
                variant="outline"
                className="text-lg px-10 py-4 h-auto w-full sm:w-auto border-white text-white hover:bg-white/10 hover:text-white hover:border-white"
                >
                How it Works
                </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-400">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 border-y border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50">
              <div className="p-3 bg-farm-500/10 rounded-lg text-farm-500">
                <Trophy size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">18.5%</h3>
                <p className="text-gray-400">Avg. Annual Returns</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50">
              <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
                <Users size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">12k+</h3>
                <p className="text-gray-400">Active Investors</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-gray-800/30 rounded-2xl border border-gray-700/50">
              <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
                <Globe size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">450k</h3>
                <p className="text-gray-400">Acres Managed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Opportunities Section */}
      <section className="py-24 bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Featured Opportunities
              </h2>
              <p className="text-gray-400 max-w-xl">
                Hand-picked agricultural assets open for immediate investment.
                Diversify your portfolio with tangible growth.
              </p>
            </div>
            <Link to="/invest">
              <Button variant="outline" className="group">
                View All Assets{" "}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <InvestmentCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gray-800/30 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-farm-500 font-semibold tracking-wider uppercase text-sm">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              How FarmStock Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Start your journey into agricultural investing in three simple
              steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-farm-500/0 via-farm-500/50 to-farm-500/0 border-t border-dashed border-gray-600 z-0"></div>

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gray-900 rounded-full border border-gray-700 flex items-center justify-center mb-6 shadow-xl shadow-black/20">
                <Search className="w-10 h-10 text-farm-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                1. Browse Assets
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Explore vetted farms, vineyards, and timberland projects with
                detailed financial projections and risk assessments.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gray-900 rounded-full border border-gray-700 flex items-center justify-center mb-6 shadow-xl shadow-black/20">
                <PieChart className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                2. Invest Fractions
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Purchase fractional shares of high-value land starting at just
                $5,000. You legally own a piece of the entity.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-gray-900 rounded-full border border-gray-700 flex items-center justify-center mb-6 shadow-xl shadow-black/20">
                <TrendingUp className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                3. Earn Returns
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Receive annual cash payouts from harvest yields and capital
                appreciation when the property is eventually sold.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Why add <span className="text-farm-500">Farmland</span> to your
                portfolio?
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Historically, farmland has delivered strong returns with low
                volatility, acting as an excellent hedge against inflation while
                providing essential resources for a growing world population.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-farm-500/10 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-farm-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Inflation Hedge
                    </h3>
                    <p className="text-gray-400 mt-1">
                      Farmland values historically rise alongside CPI,
                      protecting your purchasing power.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Banknote className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Passive Income
                    </h3>
                    <p className="text-gray-400 mt-1">
                      Earn regular cash dividends from crop sales and lease
                      payments.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <Sprout className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Uncorrelated Asset
                    </h3>
                    <p className="text-gray-400 mt-1">
                      Farmland performance is largely independent of the stock
                      market and crypto cycles.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-farm-500/20 to-blue-500/20 rounded-2xl blur-lg"></div>
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop"
                alt="Aerial view of farmland"
                className="relative w-full rounded-2xl shadow-2xl border border-gray-700"
              />
              {/* Floating Stats Card */}
              <div className="absolute -bottom-8 -left-8 bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl hidden md:block">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    Average Annual Return
                  </span>
                </div>
                <div className="text-3xl font-bold text-white">11.5%</div>
                <div className="text-xs text-gray-500 mt-1">
                  Past 20 Years (NCREIF Index)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Gallery Section */}
      <section className="py-24 bg-gray-800/30 relative border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Past Successes
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our track record speaks for itself. Explore some of our fully
              funded and maturing projects that have delivered exceptional
              value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[300px]">
            {/* Card 1 - Large */}
            <div className="group relative rounded-2xl overflow-hidden shadow-2xl md:col-span-2 row-span-1 md:row-span-2 cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1551431009-a802ee6a807d?q=80&w=2070&auto=format&fit=crop"
                alt="Project Success"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 p-8">
                <div className="bg-farm-500 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-3">
                  COMPLETED
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Emerald Valley Corn
                </h3>
                <p className="text-xl text-farm-400 font-bold mb-4">
                  22% ROI Achieved
                </p>
                <p className="text-gray-300 line-clamp-2">
                  A flagship project in the heart of the corn belt that
                  outperformed yield expectations by 15%.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1596245362947-f47c32791443?q=80&w=2070&auto=format&fit=crop"
                alt="Project Success"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white">
                  Napa Organic Vine
                </h3>
                <p className="text-lg text-farm-400 font-bold">16.4% ROI</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1574943320219-55edeb7053aa?q=80&w=2070&auto=format&fit=crop"
                alt="Project Success"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white">
                  Highland Barley
                </h3>
                <p className="text-lg text-farm-400 font-bold">14.1% ROI</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative rounded-2xl overflow-hidden shadow-2xl lg:col-span-1 cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop"
                alt="Project Success"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white">
                  Delta Soy Beans
                </h3>
                <p className="text-lg text-farm-400 font-bold">19% ROI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-farm-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to start growing?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Create your free account today and browse our exclusive list of
            high-yield agricultural opportunities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" className="text-lg px-8 py-4">
              Create Free Account
            </Button>
            <Link to="/invest">
              <Button
                variant="outline"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-gray-900"
              >
                Explore Investments
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};