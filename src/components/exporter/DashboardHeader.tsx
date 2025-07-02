
const DashboardHeader = () => {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 mb-2">
            Hello, StoneX Factory
          </h1>
          <p className="text-stone-600">
            Manage your stone listings and track business performance
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
