
import { createContext, useContext, useReducer, ReactNode } from 'react';

interface Buyer {
  id: string;
  name: string;
  location: string;
  country: string;
  preferredPort: string;
  preferredCurrency: 'USD' | 'INR';
  creditEligible: boolean;
}

interface SelectedSlab {
  id: string;
  name: string;
  material: string;
  finish: string;
  dimensions: { length: number; width: number; thickness: number };
  pricePerSqft: number;
  quantity: number;
  totalSqft: number;
  totalPrice: number;
  blockId: string;
  image: string;
}

interface QuoteState {
  selectedBuyer: Buyer | null;
  selectedSlabs: SelectedSlab[];
  currency: 'USD' | 'INR';
  shippingTerms: 'FOB' | 'CIF';
  validityPeriod: number;
  allowPartialFulfillment: boolean;
  showCreditTerms: boolean;
  fxLockingEnabled: boolean;
  fxRate: number;
  escrowEnabled: boolean;
  buyerMessage: string;
  freightEstimate: number;
}

type QuoteAction = 
  | { type: 'SET_BUYER'; payload: Buyer }
  | { type: 'ADD_SLAB'; payload: SelectedSlab }
  | { type: 'REMOVE_SLAB'; payload: string }
  | { type: 'UPDATE_SLAB_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'SET_CURRENCY'; payload: 'USD' | 'INR' }
  | { type: 'SET_SHIPPING_TERMS'; payload: 'FOB' | 'CIF' }
  | { type: 'SET_VALIDITY_PERIOD'; payload: number }
  | { type: 'SET_PARTIAL_FULFILLMENT'; payload: boolean }
  | { type: 'SET_CREDIT_TERMS'; payload: boolean }
  | { type: 'SET_FX_LOCKING'; payload: boolean }
  | { type: 'SET_FX_RATE'; payload: number }
  | { type: 'SET_ESCROW'; payload: boolean }
  | { type: 'SET_BUYER_MESSAGE'; payload: string }
  | { type: 'SET_FREIGHT_ESTIMATE'; payload: number };

const initialState: QuoteState = {
  selectedBuyer: null,
  selectedSlabs: [],
  currency: 'USD',
  shippingTerms: 'FOB',
  validityPeriod: 30,
  allowPartialFulfillment: false,
  showCreditTerms: false,
  fxLockingEnabled: false,
  fxRate: 83.45,
  escrowEnabled: true,
  buyerMessage: '',
  freightEstimate: 0,
};

const quoteReducer = (state: QuoteState, action: QuoteAction): QuoteState => {
  switch (action.type) {
    case 'SET_BUYER':
      return { 
        ...state, 
        selectedBuyer: action.payload,
        currency: action.payload.preferredCurrency,
      };
    case 'ADD_SLAB':
      return { 
        ...state, 
        selectedSlabs: [...state.selectedSlabs, action.payload] 
      };
    case 'REMOVE_SLAB':
      return { 
        ...state, 
        selectedSlabs: state.selectedSlabs.filter(slab => slab.id !== action.payload) 
      };
    case 'UPDATE_SLAB_QUANTITY':
      return {
        ...state,
        selectedSlabs: state.selectedSlabs.map(slab => 
          slab.id === action.payload.id 
            ? { 
                ...slab, 
                quantity: action.payload.quantity,
                totalPrice: slab.totalSqft * slab.pricePerSqft * action.payload.quantity
              }
            : slab
        )
      };
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload };
    case 'SET_SHIPPING_TERMS':
      return { ...state, shippingTerms: action.payload };
    case 'SET_VALIDITY_PERIOD':
      return { ...state, validityPeriod: action.payload };
    case 'SET_PARTIAL_FULFILLMENT':
      return { ...state, allowPartialFulfillment: action.payload };
    case 'SET_CREDIT_TERMS':
      return { ...state, showCreditTerms: action.payload };
    case 'SET_FX_LOCKING':
      return { ...state, fxLockingEnabled: action.payload };
    case 'SET_FX_RATE':
      return { ...state, fxRate: action.payload };
    case 'SET_ESCROW':
      return { ...state, escrowEnabled: action.payload };
    case 'SET_BUYER_MESSAGE':
      return { ...state, buyerMessage: action.payload };
    case 'SET_FREIGHT_ESTIMATE':
      return { ...state, freightEstimate: action.payload };
    default:
      return state;
  }
};

const QuoteContext = createContext<{
  state: QuoteState;
  dispatch: React.Dispatch<QuoteAction>;
} | null>(null);

export const QuoteProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(quoteReducer, initialState);

  return (
    <QuoteContext.Provider value={{ state, dispatch }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};
