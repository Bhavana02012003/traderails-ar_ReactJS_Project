import { useState } from 'react';
import { Search, Filter, MoreHorizontal, Edit, Trash2, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const SlabInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const slabs = [
    {
      slabId: 'SX-4201',
      blockId: 'BLK-8901',
      material: 'Granite',
      color: 'Imperial Red',
      status: 'Available',
      price: '₹850/sqft',
      dimensions: '320 × 200 × 3cm'
    },
    {
      slabId: 'SX-4202',
      blockId: 'BLK-8902',
      material: 'Quartz',
      color: 'Calacatta Gold',
      status: 'Reserved',
      price: '₹1,200/sqft',
      dimensions: '300 × 160 × 2cm'
    },
    {
      slabId: 'SX-4203',
      blockId: 'BLK-8903',
      material: 'Granite',
      color: 'Kashmir White',
      status: 'Sold',
      price: '₹750/sqft',
      dimensions: '280 × 180 × 3cm'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-emerald-100 text-emerald-800';
      case 'Reserved': return 'bg-amber-100 text-amber-800';
      case 'Sold': return 'bg-stone-100 text-stone-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  };

  return (
    <Card className="glass-panel border-0">
      <CardHeader>
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <CardTitle>Slab Inventory</CardTitle>
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div className="relative w-full sm:w-64">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
        <Input
          placeholder="Search slabs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full"
        />
      </div>
      <Button variant="outline" size="sm" className="w-full sm:w-auto">
        <Filter className="w-4 h-4 mr-2" />
        Filters
      </Button>
    </div>
  </div>
</CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Slab ID</TableHead>
              <TableHead>Block ID</TableHead>
              <TableHead>Material</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Dimensions</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {slabs.map((slab) => (
              <TableRow key={slab.slabId}>
                <TableCell className="font-medium">{slab.slabId}</TableCell>
                <TableCell>{slab.blockId}</TableCell>
                <TableCell>{slab.material}</TableCell>
                <TableCell>{slab.color}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(slab.status)}>
                    {slab.status}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{slab.price}</TableCell>
                <TableCell className="text-sm text-stone-600">{slab.dimensions}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <BarChart className="mr-2 h-4 w-4" />
                        Analytics
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SlabInventory;
