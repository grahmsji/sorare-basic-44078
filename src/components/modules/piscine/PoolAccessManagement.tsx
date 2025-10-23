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
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, UserPlus, Users, Clock, Filter, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const accessSchema = z.object({
  nom: z.string().min(2, 'Nom requis'),
  type: z.enum(['abonne', 'journalier', 'client-hotel', 'invite']),
  dateDebut: z.date(),
  dateFin: z.date().optional(),
  nombrePersonnes: z.number().min(1).max(10),
});

type Access = z.infer<typeof accessSchema> & {
  id: number;
  statut: 'actif' | 'expire' | 'en-attente';
  heureEntree?: string;
};

export const PoolAccessManagement = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedAccess, setSelectedAccess] = useState<Access | null>(null);
  const [filterType, setFilterType] = useState<string>('tous');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState<{
    nom: string;
    type: 'abonne' | 'journalier' | 'client-hotel' | 'invite';
    dateDebut: Date;
    dateFin: Date | undefined;
    nombrePersonnes: number;
  }>({
    nom: '',
    type: 'journalier',
    dateDebut: new Date(),
    dateFin: undefined,
    nombrePersonnes: 1,
  });

  const [accesses, setAccesses] = useState<Access[]>([
    {
      id: 1,
      nom: 'Jean Kouadio',
      type: 'abonne',
      dateDebut: new Date(2025, 9, 1),
      dateFin: new Date(2025, 11, 31),
      nombrePersonnes: 1,
      statut: 'actif',
      heureEntree: '09:30',
    },
    {
      id: 2,
      nom: 'Marie Boni',
      type: 'journalier',
      dateDebut: new Date(2025, 9, 23),
      nombrePersonnes: 2,
      statut: 'actif',
      heureEntree: '14:15',
    },
    {
      id: 3,
      nom: 'Aïcha Diallo - Chambre 205',
      type: 'client-hotel',
      dateDebut: new Date(2025, 9, 20),
      dateFin: new Date(2025, 9, 25),
      nombrePersonnes: 4,
      statut: 'actif',
      heureEntree: '11:00',
    },
    {
      id: 4,
      nom: 'Marc Boni',
      type: 'abonne',
      dateDebut: new Date(2025, 8, 1),
      dateFin: new Date(2025, 9, 31),
      nombrePersonnes: 1,
      statut: 'expire',
    },
    {
      id: 5,
      nom: 'Sophie Koffi',
      type: 'invite',
      dateDebut: new Date(2025, 9, 24),
      nombrePersonnes: 3,
      statut: 'en-attente',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = accessSchema.parse(formData);
      
      const newAccess: Access = {
        id: accesses.length + 1,
        ...validated,
        statut: 'en-attente',
      };
      
      setAccesses([newAccess, ...accesses]);
      setOpen(false);
      
      toast({
        title: 'Accès créé',
        description: `Accès ${validated.type} créé avec succès`,
      });
      
      setFormData({
        nom: '',
        type: 'journalier',
        dateDebut: new Date(),
        dateFin: undefined,
        nombrePersonnes: 1,
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

  const filteredAccesses = accesses.filter(access => {
    const matchesSearch = access.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'tous' || access.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getTypeLabel = (type: string) => {
    const labels = {
      'abonne': 'Abonné',
      'journalier': 'Journalier',
      'client-hotel': 'Client Hôtel',
      'invite': 'Invité',
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'actif':
        return 'bg-success/20 text-success';
      case 'expire':
        return 'bg-destructive/20 text-destructive';
      case 'en-attente':
        return 'bg-warning/20 text-warning';
      default:
        return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'abonne':
        return 'bg-primary/20 text-primary';
      case 'journalier':
        return 'bg-info/20 text-info';
      case 'client-hotel':
        return 'bg-success/20 text-success';
      case 'invite':
        return 'bg-warning/20 text-warning';
      default:
        return 'bg-muted/20 text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <Input
            placeholder="Rechercher un visiteur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous les types</SelectItem>
              <SelectItem value="abonne">Abonnés</SelectItem>
              <SelectItem value="journalier">Journaliers</SelectItem>
              <SelectItem value="client-hotel">Clients Hôtel</SelectItem>
              <SelectItem value="invite">Invités</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Nouvel Accès
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Ajouter un Accès Piscine</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom du visiteur</Label>
                <Input
                  id="nom"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  placeholder="Jean Kouadio"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type d'accès</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="abonne">Abonné</SelectItem>
                    <SelectItem value="journalier">Journalier</SelectItem>
                    <SelectItem value="client-hotel">Client Hôtel</SelectItem>
                    <SelectItem value="invite">Invité</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date de début</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(formData.dateDebut, 'PPP', { locale: fr })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.dateDebut}
                        onSelect={(date) => date && setFormData({ ...formData, dateDebut: date })}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {(formData.type === 'abonne' || formData.type === 'client-hotel') && (
                  <div className="space-y-2">
                    <Label>Date de fin</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.dateFin ? format(formData.dateFin, 'PPP', { locale: fr }) : 'Sélectionner'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.dateFin}
                          onSelect={(date) => setFormData({ ...formData, dateFin: date })}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nombrePersonnes">Nombre de personnes</Label>
                <Input
                  id="nombrePersonnes"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.nombrePersonnes}
                  onChange={(e) => setFormData({ ...formData, nombrePersonnes: parseInt(e.target.value) || 1 })}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
                  Annuler
                </Button>
                <Button type="submit" className="flex-1">
                  Créer l'Accès
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
                <th className="px-4 py-3 text-left text-sm font-semibold">Visiteur</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Période</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Personnes</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Statut</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Entrée</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAccesses.map((access) => (
                <tr key={access.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 text-sm font-medium">{access.nom}</td>
                  <td className="px-4 py-3">
                    <Badge className={getTypeColor(access.type)}>
                      {getTypeLabel(access.type)}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {format(access.dateDebut, 'dd/MM/yyyy', { locale: fr })}
                    {access.dateFin && ` - ${format(access.dateFin, 'dd/MM/yyyy', { locale: fr })}`}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-sm">
                      <Users className="w-4 h-4" />
                      {access.nombrePersonnes}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={getStatutColor(access.statut)}>
                      {access.statut}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {access.heureEntree ? (
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="w-4 h-4" />
                        {access.heureEntree}
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedAccess(access);
                        setDetailsOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Détails de l'Accès</DialogTitle>
          </DialogHeader>
          {selectedAccess && (
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Visiteur</Label>
                <p className="text-lg font-semibold">{selectedAccess.nom}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Type</Label>
                  <p className="font-medium">{getTypeLabel(selectedAccess.type)}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Statut</Label>
                  <Badge className={getStatutColor(selectedAccess.statut)}>
                    {selectedAccess.statut}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Période</Label>
                <p className="font-medium">
                  {format(selectedAccess.dateDebut, 'PPP', { locale: fr })}
                  {selectedAccess.dateFin && ` - ${format(selectedAccess.dateFin, 'PPP', { locale: fr })}`}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground">Nombre de personnes</Label>
                <p className="font-medium">{selectedAccess.nombrePersonnes}</p>
              </div>
              {selectedAccess.heureEntree && (
                <div>
                  <Label className="text-muted-foreground">Heure d'entrée</Label>
                  <p className="font-medium">{selectedAccess.heureEntree}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
