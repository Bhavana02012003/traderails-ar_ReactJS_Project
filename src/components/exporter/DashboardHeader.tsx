

const DashboardHeader = () => {
  return (
    <div className="bg-white/60 backdrop-blur-sm border-b border-stone-200/50">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-stone-800 mb-3 tracking-tight">
            Hello, StoneX Factory
          </h1>
          <p className="text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
            Manage your stone listings and track business performance
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

