
import { AlertTriangle, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const TransactionMonitor = () => {
  const transactions = [
    {
      id: 'TXN-2024-001',
      orgName: 'Stone Craft Co.',
      status: 'Escrow',
      amount: '$45,000',
      flags: ['FX Expiry Soon'],
      lastUpdate: '2 hours ago'
    },
    {
      id: 'TXN-2024-002',
      orgName: 'Marble Masters Ltd.',
      status: 'In Transit',
      amount: '$67,500',
      flags: ['Delayed Shipment'],
      lastUpdate: '1 day ago'
    },
    {
      id: 'TXN-2024-003',
      orgName: 'Granite Solutions Inc.',
      status: 'Invoice',
      amount: '$32,000',
      flags: ['Missing Docs'],
      lastUpdate: '3 hours ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Escrow': return 'bg-yellow-100 text-yellow-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Invoice': return 'bg-purple-100 text-purple-800';
      case 'Released': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">Transaction Monitor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Flags</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-medium">{txn.id}</TableCell>
                  <TableCell>{txn.orgName}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(txn.status)}>
                      {txn.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-semibold">{txn.amount}</TableCell>
                  <TableCell>
                    {txn.flags.map((flag, index) => (
                      <div key={index} className="flex items-center text-red-600 text-sm">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {flag}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionMonitor;
