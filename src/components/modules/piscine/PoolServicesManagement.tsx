import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Package, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const serviceSchema = z.object({
  type: z.enum(['transat', 'serviette', 'cabine', 'boisson', 'snack', 'parasol']),
  client: z.string().min(2, 'Nom requis'),
  quantite: z.number().min(1),
  emplacement: z.string().optional(),
  notes: z.string().optional(),
});

type Service = z.infer<typeof serviceSchema> & {
  id: number;
  heure: string;
  statut: 'actif' | 'retourne' | 'annule';
  prix: number;
};

export const PoolServicesManagement = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [filterType, setFilterType] = useState<string>('tous');
  
  const [formData, setFormData] = useState<{
    type: 'transat' | 'serviette' | 'cabine' | 'boisson' | 'snack' | 'parasol';
    client: string;
    quantite: number;
    emplacement: string;
    notes: string;
  }>({
    type: 'transat',
    client: '',
    quantite: 1,
    emplacement: '',
    notes: '',
  });

  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      type: 'transat',
      client: 'Jean Kouadio',
      quantite: 2,
      emplacement: 'Zone A - Transats 12-13',
      heure: '10:30',
      statut: 'actif',
      prix: 5000,
      notes: '',
    },
    {
      id: 2,
      type: 'serviette',
      client: 'Marie Boni',
      quantite: 3,
      emplacement: '',
      heure: '11:15',
      statut: 'actif',
      prix: 1500,
      notes: '',
    },
    {
      id: 3,
      type: 'cabine',
      client: 'Aïcha Diallo',
      quantite: 1,
      emplacement: 'Cabine VIP 5',
      heure: '09:00',
      statut: 'actif',
      prix: 15000,
      notes: 'Toute la journée',
    },
    {
      id: 4,
      type: 'boisson',
      client: 'Marc Boni',
      quantite: 2,
      emplacement: 'Bar Piscine',
      heure: '14:30',
      statut: 'actif',
      prix: 4000,
      notes: 'Cocktails tropical',
    },
    {
      id: 5,
      type: 'transat',
      client: 'Sophie Koffi',
      quantite: 2,
      emplacement: 'Zone B - Transats 24-25',
      heure: '08:30',
      statut: 'retourne',
      prix: 5000,
      notes: '',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = serviceSchema.parse(formData);
      
      const prix = getPrixByType(validated.type) * validated.quantite;
      
      if (editingService) {
        setServices(services.map(s => 
          s.id === editingService.id 
            ? { ...s, ...validated, prix }
            : s
        ));
        toast({
          title: 'Service modifié',
          description: 'Le service a été mis à jour avec succès',
        });
      } else {
        const newService: Service = {
          id: services.length + 1,
          ...validated,
          heure: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          statut: 'actif',
          prix,
        };
        setServices([newService, ...services]);
        toast({
          title: 'Service ajouté',
          description: `${getTypeLabel(validated.type)} enregistré avec succès`,
        });
      }
      
      setOpen(false);
      setEditingService(null);
      setFormData({
        type: 'transat',
        client: '',
        quantite: 1,
        emplacement: '',
        notes: '',
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: 'Erreur',
          description: error.errors[0].message,
          variant: 'destructive',
        });
      }
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      type: service.type,
      client: service.client,
      quantite: service.quantite,
      emplacement: service.emplacement || '',
      notes: service.notes || '',
    });
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    setServices(services.filter(s => s.id !== id));
    toast({
      title: 'Service supprimé',
      description: 'Le service a été supprimé',
    });
  };

  const handleStatusChange = (id: number, newStatus: 'actif' | 'retourne' | 'annule') => {
    setServices(services.map(s => 
      s.id === id ? { ...s, statut: newStatus } : s
    ));
    toast({
      title: 'Statut mis à jour',
      description: `Le service est maintenant ${newStatus}`,
    });
  };

  const getPrixByType = (type: string): number => {
    const prix: Record<string, number> = {
      'transat': 2500,
      'serviette': 500,
      'cabine': 15000,
      'boisson': 2000,
      'snack': 3000,
      'parasol': 1500,
    };
    return prix[type] || 0;
  };

  const filteredServices = services.filter(service => 
    filterType === 'tous' || service.type === filterType
  );

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'transat': 'Transat',
      'serviette': 'Serviette',
      'cabine': 'Cabine',
      'boisson': 'Boisson',
      'snack': 'Snack',
      'parasol': 'Parasol',
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'transat': 'bg-primary/20 text-primary',
      'serviette': 'bg-info/20 text-info',
      'cabine': 'bg-warning/20 text-warning',
      'boisson': 'bg-success/20 text-success',
      'snack': 'bg-destructive/20 text-destructive',
      'parasol': 'bg-muted text-muted-foreground',
    };
    return colors[type] || 'bg-muted/20 text-muted-foreground';
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'actif':
        return 'bg-success/20 text-success';
      case 'retourne':
        return 'bg-info/20 text-info';
      case 'annule':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-muted/20 text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[200px]">
            <Package className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tous">Tous les services</SelectItem>
            <SelectItem value="transat">Transats</SelectItem>
            <SelectItem value="serviette">Serviettes</SelectItem>
            <SelectItem value="cabine">Cabines</SelectItem>
            <SelectItem value="boisson">Boissons</SelectItem>
            <SelectItem value="snack">Snacks</SelectItem>
            <SelectItem value="parasol">Parasols</SelectItem>
          </SelectContent>
        </Select>

        <Dialog open={open} onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setEditingService(null);
            setFormData({
              type: 'transat',
              client: '',
              quantite: 1,
              emplacement: '',
              notes: '',
            });
          }
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingService ? 'Modifier le Service' : 'Ajouter un Service'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type de service</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transat">Transat (2,500 FCFA)</SelectItem>
                    <SelectItem value="serviette">Serviette (500 FCFA)</SelectItem>
                    <SelectItem value="cabine">Cabine (15,000 FCFA)</SelectItem>
                    <SelectItem value="boisson">Boisson (2,000 FCFA)</SelectItem>
                    <SelectItem value="snack">Snack (3,000 FCFA)</SelectItem>
                    <SelectItem value="parasol">Parasol (1,500 FCFA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="client">Nom du client</Label>
                <Input
                  id="client"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  placeholder="Jean Kouadio"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantite">Quantité</Label>
                <Input
                  id="quantite"
                  type="number"
                  min="1"
                  value={formData.quantite}
                  onChange={(e) => setFormData({ ...formData, quantite: parseInt(e.target.value) || 1 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emplacement">Emplacement (optionnel)</Label>
                <Input
                  id="emplacement"
                  value={formData.emplacement}
                  onChange={(e) => setFormData({ ...formData, emplacement: e.target.value })}
                  placeholder="Zone A - Transat 12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optionnel)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Informations complémentaires..."
                  rows={3}
                />
              </div>

              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Prix total:</span>
                  <span className="text-lg font-bold text-primary">
                    {(getPrixByType(formData.type) * formData.quantite).toLocaleString()} FCFA
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
                  Annuler
                </Button>
                <Button type="submit" className="flex-1">
                  {editingService ? 'Modifier' : 'Ajouter'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Heure</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Service</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Client</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Qté</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Emplacement</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Prix</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Statut</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 text-sm text-muted-foreground">{service.heure}</td>
                  <td className="px-4 py-3">
                    <Badge className={getTypeColor(service.type)}>
                      {getTypeLabel(service.type)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium">{service.client}</td>
                  <td className="px-4 py-3 text-sm">{service.quantite}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {service.emplacement || '-'}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold">
                    {service.prix.toLocaleString()} FCFA
                  </td>
                  <td className="px-4 py-3">
                    <Select
                      value={service.statut}
                      onValueChange={(value: any) => handleStatusChange(service.id, value)}
                    >
                      <SelectTrigger className={`w-[120px] ${getStatutColor(service.statut)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="actif">Actif</SelectItem>
                        <SelectItem value="retourne">Retourné</SelectItem>
                        <SelectItem value="annule">Annulé</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(service)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(service.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
