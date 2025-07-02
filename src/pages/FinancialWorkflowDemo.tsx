
import FinancialWorkflowTrigger from '@/components/finance/FinancialWorkflowTrigger';

const FinancialWorkflowDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-stone-900 mb-2">Financial Workflow Trigger</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Controlled interface for managing credit, FX hedge, and escrow workflows after invoice approval
          </p>
        </div>
        
        <FinancialWorkflowTrigger
          invoiceId="INV-00983"
          amount={{
            inr: "₹18,45,000",
            usd: "USD $22,100"
          }}
          buyer="Rohan Marble Imports (NY, USA)"
          status="approved"
        />
      </div>
    </div>
  );
};

export default FinancialWorkflowDemo;
