
import { Shield, CreditCard, Globe, Award } from 'lucide-react';

const TrustSection = () => {
  const partners = [
    { name: "Lloyd's Insurance", icon: Shield, description: "Coverage up to $2M" },
    { name: "Wise Payments", icon: CreditCard, description: "Multi-currency support" },
    { name: "Global Escrow", icon: Globe, description: "Secure transactions" },
    { name: "ISO Certified", icon: Award, description: "Quality assurance" },
  ];

  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Our partnerships ensure your transactions are secure, compliant, and protected at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div 
              key={partner.name}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all hover:scale-105 animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center">
                <div className="w-16 h-16 emerald-gradient rounded-xl flex items-center justify-center mx-auto mb-4">
                  <partner.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-stone-900 mb-2">{partner.name}</h3>
                <p className="text-sm text-stone-600">{partner.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="animate-fade-in">
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">$2.5B+</div>
            <div className="text-stone-600">Total Trade Volume</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">45+</div>
            <div className="text-stone-600">Countries Served</div>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-2">99.8%</div>
            <div className="text-stone-600">Transaction Success</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
