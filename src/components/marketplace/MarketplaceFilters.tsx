
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { MarketplaceFilters as Filters } from '@/types/marketplace';

interface MarketplaceFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

const MarketplaceFilters = ({ filters, onFiltersChange }: MarketplaceFiltersProps) => {
  const materials = ['granite', 'quartz'];
  const finishes = ['polished', 'flamed', 'leathered', 'honed'];
  const colors = ['white', 'black', 'gray', 'beige', 'brown', 'green', 'blue', 'red'];
  const countries = ['Italy', 'Brazil', 'India', 'Turkey', 'Spain', 'Norway', 'China'];

  const updateFilter = (key: keyof Filters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (key: 'material' | 'finish' | 'colors' | 'countries', value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    updateFilter(key, updated);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      material: [],
      finish: [],
      colors: [],
      countries: [],
      priceRange: [0, 1000],
      gradeMin: 1
    });
  };

  const hasActiveFilters = filters.material.length > 0 || filters.finish.length > 0 || 
    filters.colors.length > 0 || filters.countries.length > 0 || 
    filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 || filters.gradeMin > 1;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-stone-900">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        )}
      </div>

      {/* Material */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Material</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {materials.map(material => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox
                id={material}
                checked={filters.material.includes(material)}
                onCheckedChange={() => toggleArrayFilter('material', material)}
              />
              <Label htmlFor={material} className="text-sm capitalize">
                {material}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Finish */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Finish</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {finishes.map(finish => (
            <div key={finish} className="flex items-center space-x-2">
              <Checkbox
                id={finish}
                checked={filters.finish.includes(finish)}
                onCheckedChange={() => toggleArrayFilter('finish', finish)}
              />
              <Label htmlFor={finish} className="text-sm capitalize">
                {finish}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Colors */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
            {colors.map(color => (
              <button
                key={color}
                onClick={() => toggleArrayFilter('colors', color)}
                className={`aspect-square rounded-lg border-2 transition-all ${
                  filters.colors.includes(color) 
                    ? 'border-emerald-500 scale-110' 
                    : 'border-stone-300 hover:border-stone-400'
                }`}
                style={{ backgroundColor: color === 'white' ? '#f8f9fa' : color }}
                title={color}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Price Range ($/sqft)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
            max={1000}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-stone-600">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Country of Origin */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Country of Origin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {countries.map(country => (
            <div key={country} className="flex items-center space-x-2">
              <Checkbox
                id={country}
                checked={filters.countries.includes(country)}
                onCheckedChange={() => toggleArrayFilter('countries', country)}
              />
              <Label htmlFor={country} className="text-sm">
                {country}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Grade */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Minimum AI Grade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={[filters.gradeMin]}
            onValueChange={(value) => updateFilter('gradeMin', value[0])}
            max={5}
            min={1}
            step={0.1}
            className="w-full"
          />
          <div className="text-center text-sm text-stone-600">
            {filters.gradeMin.toFixed(1)} stars and above
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketplaceFilters;
