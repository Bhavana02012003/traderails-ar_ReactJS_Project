
import { Eye, Shield, Globe, Camera, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import Spline from '@splinetool/react-spline';


const FeaturesSection = () => {
  const features = [
    {
      icon: Eye,
      title: "3D/AR Visualization",
      description: "Experience slabs in augmented reality before making purchase decisions. View texture, patterns, and dimensions with precision.",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "Secure Escrow",
      description: "Protected transactions with multi-party verification, insurance coverage, and automated release conditions.",
      gradient: "from-sage-500 to-sage-600"
    },
    {
      icon: Star,
      title: "AI Quality Grading",
      description: "Automated quality assessment using computer vision to grade stone quality, patterns, and surface integrity.",
      gradient: "from-stone-500 to-stone-600"
    },
    {
      icon: Globe,
      title: "Global Logistics",
      description: "Integrated shipping, customs, and delivery tracking with preferred logistics partners worldwide.",
      gradient: "from-emerald-400 to-emerald-500"
    },
    {
      icon: Camera,
      title: "High-Res Imaging",
      description: "Professional photography with color-accurate imaging and detailed surface texture capture.",
      gradient: "from-sage-400 to-sage-500"
    },
    {
      icon: Shield,
      title: "Verified Suppliers",
      description: "KYC-verified suppliers with credit ratings, trade history, and quality certifications.",
      gradient: "from-stone-400 to-stone-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-green-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Advanced Features for Modern Trade
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Cutting-edge technology meets traditional stone trading, creating unprecedented transparency and efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group p-8 rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100 hover:from-white hover:to-stone-50 border border-stone-200 hover:border-emerald-200 transition-all hover:shadow-xl hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 mb-3">{feature.title}</h3>
              <p className="text-stone-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center glass-panel p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-stone-900 mb-4">
            Ready to Transform Your Stone Trading?
          </h3>
          <p className="text-stone-600 mb-6 max-w-xl mx-auto">
            Join thousands of suppliers and buyers already using StoneFlow to streamline their operations.
          </p>


          <Button size="lg" className="emerald-gradient text-white">
            Start Trading Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

    </section>
  );
};

export default FeaturesSection;
