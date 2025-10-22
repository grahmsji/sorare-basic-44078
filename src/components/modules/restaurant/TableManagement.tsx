import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, Users, Clock } from 'lucide-react';
import { z } from 'zod';

const tableSchema = z.object({
  number: z.string().min(1, "Numéro requis"),
  capacity: z.string().min(1, "Capacité requise"),
  zone: z.enum(['interieur', 'terrasse', 'bar', 'vip']),
});

type Table = {
  id: string;
  number: string;
  capacity: number;
  status: 'libre' | 'occupee' | 'reservee' | 'nettoyage';
  zone: 'interieur' | 'terrasse' | 'bar' | 'vip';
  currentOrder?: string;
  occupiedSince?: string;
};

export const TableManagement = () => {
  const [tables, setTables] = useState<Table[]>([
    { id: '1', number: '1', capacity: 4, status: 'libre', zone: 'interieur' },
    { id: '2', number: '2', capacity: 2, status: 'occupee', zone: 'interieur', currentOrder: '6,800', occupiedSince: '18:30' },
    { id: '3', number: '3', capacity: 6, status: 'reservee', zone: 'interieur' },
    { id: '4', number: '4', capacity: 4, status: 'libre', zone: 'terrasse' },
    { id: '5', number: '5', capacity: 4, status: 'occupee', zone: 'terrasse', currentOrder: '3,500', occupiedSince: '19:15' },
    { id: '6', number: '6', capacity: 8, status: 'libre', zone: 'vip' },
    { id: '7', number: '7', capacity: 2, status: 'nettoyage', zone: 'bar' },
    { id: '8', number: '8', capacity: 4, status: 'libre', zone: 'terrasse' },
  ]);

  const [filterZone, setFilterZone] = useState<string>('toutes');
  const [filterStatus, setFilterStatus] = useState<string>('tous');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    number: '',
    capacity: '',
    zone: 'interieur' as Table['zone'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      tableSchema.parse(formData);
      
      const newTable: Table = {
        id: Date.now().toString(),
        number: formData.number,
        capacity: parseInt(formData.capacity),
        status: 'libre',
        zone: formData.zone,
      };
      
      setTables([...tables, newTable]);
      setIsDialogOpen(false);
      setFormData({ number: '', capacity: '', zone: 'interieur' });
      
      toast({
        title: "Table ajoutée",
        description: "La nouvelle table a été ajoutée avec succès.",
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

  const updateTableStatus = (tableId: string, newStatus: Table['status']) => {
    setTables(tables.map(table => {
      if (table.id === tableId) {
        const updatedTable = { ...table, status: newStatus };
        if (newStatus === 'occupee') {
          updatedTable.occupiedSince = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        } else if (newStatus === 'libre') {
          delete updatedTable.currentOrder;
          delete updatedTable.occupiedSince;
        }
        return updatedTable;
      }
      return table;
    }));
    
    toast({
      title: "Statut mis à jour",
      description: `La table est maintenant ${newStatus}.`,
    });
  };

  const getStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'libre': return 'bg-success/20 text-success';
      case 'occupee': return 'bg-primary/20 text-primary';
      case 'reservee': return 'bg-warning/20 text-warning';
      case 'nettoyage': return 'bg-info/20 text-info';
    }
  };

  const getZoneLabel = (zone: Table['zone']) => {
    switch (zone) {
      case 'interieur': return 'Intérieur';
      case 'terrasse': return 'Terrasse';
      case 'bar': return 'Bar';
      case 'vip': return 'VIP';
    }
  };

  const filteredTables = tables.filter(table => {
    const matchesZone = filterZone === 'toutes' || table.zone === filterZone;
    const matchesStatus = filterStatus === 'tous' || table.status === filterStatus;
    return matchesZone && matchesStatus;
  });

  const groupedByZone = {
    interieur: filteredTables.filter(t => t.zone === 'interieur'),
    terrasse: filteredTables.filter(t => t.zone === 'terrasse'),
    bar: filteredTables.filter(t => t.zone === 'bar'),
    vip: filteredTables.filter(t => t.zone === 'vip'),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold text-card-foreground">Gestion des Tables</h3>
          <p className="text-sm text-muted-foreground">
            {tables.filter(t => t.status === 'occupee').length}/{tables.length} tables occupées
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Table
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvelle Table</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Numéro de table</Label>
                <Input
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  placeholder="Ex: 9"
                />
              </div>
              
              <div>
                <Label>Capacité</Label>
                <Input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  placeholder="Ex: 4"
                />
              </div>
              
              <div>
                <Label>Zone</Label>
                <Select value={formData.zone} onValueChange={(value: any) => setFormData({ ...formData, zone: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interieur">Intérieur</SelectItem>
                    <SelectItem value="terrasse">Terrasse</SelectItem>
                    <SelectItem value="bar">Bar</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button type="submit" className="w-full">Ajouter la table</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Select value={filterZone} onValueChange={setFilterZone}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Zone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="toutes">Toutes zones</SelectItem>
            <SelectItem value="interieur">Intérieur</SelectItem>
            <SelectItem value="terrasse">Terrasse</SelectItem>
            <SelectItem value="bar">Bar</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Tous statuts</SelectItem>
            <SelectItem value="libre">Libre</SelectItem>
            <SelectItem value="occupee">Occupée</SelectItem>
            <SelectItem value="reservee">Réservée</SelectItem>
            <SelectItem value="nettoyage">Nettoyage</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedByZone).map(([zone, zoneTables]) => (
          zoneTables.length > 0 && (
            <div key={zone}>
              <h4 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
                {zone === 'vip' && '⭐'}
                {getZoneLabel(zone as Table['zone'])} ({zoneTables.length})
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {zoneTables.map((table) => (
                  <div key={table.id} className="border border-border rounded-xl p-4 bg-card space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-2xl font-bold text-card-foreground">Table {table.number}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {table.capacity} places
                        </p>
                      </div>
                      <Badge className={getStatusColor(table.status)}>
                        {table.status}
                      </Badge>
                    </div>
                    
                    {table.status === 'occupee' && (
                      <div className="space-y-1 text-sm">
                        <p className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          Depuis {table.occupiedSince}
                        </p>
                        {table.currentOrder && (
                          <p className="font-semibold text-primary">{table.currentOrder} FCFA</p>
                        )}
                      </div>
                    )}
                    
                    <div className="flex flex-col gap-2 pt-2 border-t border-border">
                      {table.status === 'libre' && (
                        <>
                          <Button size="sm" onClick={() => updateTableStatus(table.id, 'occupee')}>
                            Occuper
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => updateTableStatus(table.id, 'reservee')}>
                            Réserver
                          </Button>
                        </>
                      )}
                      {table.status === 'occupee' && (
                        <>
                          <Button size="sm" className="bg-success hover:bg-success/90" onClick={() => updateTableStatus(table.id, 'nettoyage')}>
                            Libérer
                          </Button>
                        </>
                      )}
                      {table.status === 'reservee' && (
                        <>
                          <Button size="sm" onClick={() => updateTableStatus(table.id, 'occupee')}>
                            Arrivée
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => updateTableStatus(table.id, 'libre')}>
                            Annuler
                          </Button>
                        </>
                      )}
                      {table.status === 'nettoyage' && (
                        <Button size="sm" className="bg-success hover:bg-success/90" onClick={() => updateTableStatus(table.id, 'libre')}>
                          Prête
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};
