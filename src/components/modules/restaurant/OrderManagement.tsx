import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, Clock, CheckCircle, XCircle, Search } from 'lucide-react';
import { z } from 'zod';

const orderSchema = z.object({
  source: z.enum(['table', 'room', 'bar']),
  sourceNumber: z.string().min(1, "Numéro requis"),
  items: z.string().min(1, "Articles requis"),
  specialInstructions: z.string().optional(),
});

type Order = {
  id: string;
  source: 'table' | 'room' | 'bar';
  sourceNumber: string;
  items: string;
  amount: string;
  status: 'en-attente' | 'en-preparation' | 'pret' | 'servi' | 'annule';
  time: string;
  specialInstructions?: string;
};

export const OrderManagement = () => {
  const [orders, setOrders] = useState<Order[]>([
    { id: '1', source: 'table', sourceNumber: '5', items: 'Poulet braisé, Attiéké', amount: '3,500', status: 'en-preparation', time: '15 min' },
    { id: '2', source: 'room', sourceNumber: '204', items: 'Petit-déjeuner complet', amount: '5,000', status: 'en-preparation', time: '10 min' },
    { id: '3', source: 'bar', sourceNumber: 'Comptoir', items: '3 Bières, Brochettes', amount: '4,200', status: 'pret', time: '5 min' },
    { id: '4', source: 'table', sourceNumber: '2', items: 'Pizza, 2 Boissons', amount: '6,800', status: 'en-attente', time: '20 min' },
    { id: '5', source: 'room', sourceNumber: '105', items: 'Room Service - Dîner', amount: '8,500', status: 'en-preparation', time: '12 min' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('tous');
  const [filterSource, setFilterSource] = useState<string>('tous');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    source: 'table' as 'table' | 'room' | 'bar',
    sourceNumber: '',
    items: '',
    specialInstructions: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      orderSchema.parse(formData);
      
      const newOrder: Order = {
        id: Date.now().toString(),
        source: formData.source,
        sourceNumber: formData.sourceNumber,
        items: formData.items,
        amount: '0',
        status: 'en-attente',
        time: 'À l\'instant',
        specialInstructions: formData.specialInstructions,
      };
      
      setOrders([newOrder, ...orders]);
      setIsDialogOpen(false);
      setFormData({ source: 'table', sourceNumber: '', items: '', specialInstructions: '' });
      
      toast({
        title: "Commande créée",
        description: "La nouvelle commande a été ajoutée avec succès.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erreur de validation",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    toast({
      title: "Statut mis à jour",
      description: `La commande a été marquée comme ${newStatus}.`,
    });
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'en-attente': return 'bg-warning/20 text-warning';
      case 'en-preparation': return 'bg-info/20 text-info';
      case 'pret': return 'bg-success/20 text-success';
      case 'servi': return 'bg-primary/20 text-primary';
      case 'annule': return 'bg-destructive/20 text-destructive';
    }
  };

  const getSourceIcon = (source: Order['source']) => {
    switch (source) {
      case 'table': return '🍽️';
      case 'room': return '🏨';
      case 'bar': return '🍺';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.sourceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'tous' || order.status === filterStatus;
    const matchesSource = filterSource === 'tous' || order.source === filterSource;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const activeOrders = filteredOrders.filter(o => ['en-attente', 'en-preparation', 'pret'].includes(o.status));
  const completedOrders = filteredOrders.filter(o => o.status === 'servi');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold text-card-foreground">Gestion des Commandes</h3>
          <p className="text-sm text-muted-foreground">Tables, Chambres & Bar</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Commande
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvelle Commande</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Source de la commande</Label>
                <Select value={formData.source} onValueChange={(value: any) => setFormData({ ...formData, source: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="table">🍽️ Table</SelectItem>
                    <SelectItem value="room">🏨 Chambre</SelectItem>
                    <SelectItem value="bar">🍺 Bar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Numéro {formData.source === 'table' ? 'de table' : formData.source === 'room' ? 'de chambre' : ''}</Label>
                <Input
                  value={formData.sourceNumber}
                  onChange={(e) => setFormData({ ...formData, sourceNumber: e.target.value })}
                  placeholder={formData.source === 'table' ? 'Ex: 5' : formData.source === 'room' ? 'Ex: 204' : 'Ex: Comptoir'}
                />
              </div>
              
              <div>
                <Label>Articles</Label>
                <Input
                  value={formData.items}
                  onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                  placeholder="Poulet braisé, Attiéké..."
                />
              </div>
              
              <div>
                <Label>Instructions spéciales (optionnel)</Label>
                <Input
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
                  placeholder="Allergies, préférences..."
                />
              </div>
              
              <Button type="submit" className="w-full">Créer la commande</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher par numéro ou article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterSource} onValueChange={setFilterSource}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Toutes sources</SelectItem>
            <SelectItem value="table">Tables</SelectItem>
            <SelectItem value="room">Chambres</SelectItem>
            <SelectItem value="bar">Bar</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Tous statuts</SelectItem>
            <SelectItem value="en-attente">En attente</SelectItem>
            <SelectItem value="en-preparation">En préparation</SelectItem>
            <SelectItem value="pret">Prêt</SelectItem>
            <SelectItem value="servi">Servi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">
            <Clock className="w-4 h-4 mr-2" />
            Actives ({activeOrders.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            <CheckCircle className="w-4 h-4 mr-2" />
            Terminées ({completedOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {activeOrders.map((order) => (
              <div key={order.id} className="border border-border rounded-xl p-4 bg-card space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getSourceIcon(order.source)}</span>
                    <div>
                      <p className="font-semibold text-card-foreground">
                        {order.source === 'table' ? 'Table' : order.source === 'room' ? 'Chambre' : 'Bar'} {order.sourceNumber}
                      </p>
                      <p className="text-xs text-muted-foreground">{order.time}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground">{order.items}</p>
                
                {order.specialInstructions && (
                  <p className="text-xs text-warning bg-warning/10 p-2 rounded">
                    ⚠️ {order.specialInstructions}
                  </p>
                )}
                
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="font-bold text-card-foreground">{order.amount} FCFA</span>
                  <div className="flex gap-2">
                    {order.status === 'en-attente' && (
                      <Button size="sm" variant="outline" onClick={() => updateOrderStatus(order.id, 'en-preparation')}>
                        Préparer
                      </Button>
                    )}
                    {order.status === 'en-preparation' && (
                      <Button size="sm" className="bg-success hover:bg-success/90" onClick={() => updateOrderStatus(order.id, 'pret')}>
                        Prêt
                      </Button>
                    )}
                    {order.status === 'pret' && (
                      <Button size="sm" onClick={() => updateOrderStatus(order.id, 'servi')}>
                        Servir
                      </Button>
                    )}
                    <Button size="sm" variant="destructive" onClick={() => updateOrderStatus(order.id, 'annule')}>
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {completedOrders.map((order) => (
              <div key={order.id} className="border border-border rounded-xl p-4 bg-card opacity-75">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getSourceIcon(order.source)}</span>
                    <div>
                      <p className="font-semibold text-card-foreground">
                        {order.source === 'table' ? 'Table' : order.source === 'room' ? 'Chambre' : 'Bar'} {order.sourceNumber}
                      </p>
                      <p className="text-xs text-muted-foreground">{order.time}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{order.items}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-card-foreground">{order.amount} FCFA</span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
