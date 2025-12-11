import React from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  ShieldCheck,
  Users,
  TrendingUp,
  Heart,
  Sprout,
} from "lucide-react";
import { Button } from "../components/Button";

export const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url("../assets/img/plant.jpeg")',
          }}
        >
          <div className="absolute inset-0 bg-gray-900/85" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-farm-500/10 border border-farm-500/20 text-farm-500 mb-6">
            <span className="text-xs font-bold tracking-widest uppercase">
              Our Story
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Cultivating the Future of{" "}
            <span className="text-farm-500">Finance</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We bridge the gap between Wall Street and Main Street farms, making
            agricultural investment accessible, transparent, and sustainable for
            everyone.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Democratizing Land Ownership
            </h2>
            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>
                For centuries, farmland has been one of the most stable and
                appreciative asset classes, yet it was reserved for the
                ultra-wealthy and institutional giants. FarmStock changes that
                equation.
              </p>
              <p>
                We use data-driven insights to identify high-yield agricultural
                opportunities and break them down into accessible shares. This
                allows everyday investors to diversify their portfolios while
                providing farmers with the capital they need to modernize and
                expand.
              </p>
              <p>
                By connecting capital directly to the soil, we are building a
                food system that is more resilient, more local, and more
                profitable for everyone involved.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 flex gap-8">
              <div>
                <span className="block text-3xl font-bold text-white mb-1">
                  2021
                </span>
                <span className="text-sm text-gray-500">Founded</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-white mb-1">
                  $45M+
                </span>
                <span className="text-sm text-gray-500">Funded</span>
              </div>
              <div>
                <span className="block text-3xl font-bold text-white mb-1">
                  12
                </span>
                <span className="text-sm text-gray-500">Countries</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-farm-500/20 rounded-2xl blur-lg"></div>
            <img
              src="https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=2070&auto=format&fit=crop"
              alt="Hands holding soil"
              className="relative rounded-2xl shadow-2xl border border-gray-700 w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-gray-800/30 py-24 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-400">
              We believe that financial growth and ethical responsibility go
              hand in hand. These principles guide every decision we make.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-700/50 hover:border-farm-500/30 transition-colors group">
              <div className="w-12 h-12 bg-farm-500/10 rounded-lg flex items-center justify-center text-farm-500 mb-6 group-hover:scale-110 transition-transform">
                <Leaf size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Sustainability First
              </h3>
              <p className="text-gray-400">
                We only fund projects that adhere to strict environmental
                standards, ensuring the land remains fertile for generations to
                come.
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-xl border border-gray-700/50 hover:border-blue-500/30 transition-colors group">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Radical Transparency
              </h3>
              <p className="text-gray-400">
                From yield reports to fee structures, we provide complete
                visibility. No hidden costs, just honest data.
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-colors group">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Community Focused
              </h3>
              <p className="text-gray-400">
                We support local farming communities by providing fair capital
                and creating jobs, strengthening rural economies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Meet the Team</h2>
          <p className="text-gray-400">
            Experts in agriculture, finance, and technology.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              name: "Sarah Jenkins",
              role: "CEO & Co-Founder",
              img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
            },
            {
              name: "David Chen",
              role: "Head of Agriculture",
              img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
            },
            {
              name: "Elena Rodriguez",
              role: "Chief Financial Officer",
              img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
            },
            {
              name: "Marcus Johnson",
              role: "CTO",
              img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
            },
          ].map((member, i) => (
            <div key={i} className="text-center group">
              <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-2 border-gray-700 group-hover:border-farm-500 transition-colors">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-white">{member.name}</h3>
              <p className="text-sm text-farm-500 font-medium uppercase tracking-wide">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-farm-900 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Sprout size={48} className="text-farm-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to grow your portfolio?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of investors who are already backing the future of
            agriculture. Sign up today and browse our exclusive opportunities.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              to="/invest"
              variant="primary"
              className="px-8 py-3 text-lg"
            >
              View Opportunities
            </Button>
            <Button variant="outline" className="px-8 py-3 text-lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
