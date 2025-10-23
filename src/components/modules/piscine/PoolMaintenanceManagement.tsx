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
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, Plus, Wrench, AlertTriangle, CheckCircle2, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const maintenanceSchema = z.object({
  type: z.enum(['nettoyage', 'chimie', 'equipement', 'reparation', 'inspection']),
  description: z.string().min(5, 'Description requise'),
  priorite: z.enum(['basse', 'normale', 'haute', 'urgente']),
  datePrevu: z.date(),
  responsable: z.string().min(2, 'Responsable requis'),
  notes: z.string().optional(),
});

type Maintenance = z.infer<typeof maintenanceSchema> & {
  id: number;
  statut: 'planifie' | 'en-cours' | 'termine' | 'reporte';
  dateCreation: Date;
  dateCompletee?: Date;
};

type ChimieData = {
  date: Date;
  ph: number;
  chlore: number;
  alcalinite: number;
  temperature: number;
  notes: string;
};

export const PoolMaintenanceManagement = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [chimieOpen, setChimieOpen] = useState(false);
  const [editingMaintenance, setEditingMaintenance] = useState<Maintenance | null>(null);
  const [filterStatut, setFilterStatut] = useState<string>('tous');
  
  const [formData, setFormData] = useState<{
    type: 'nettoyage' | 'chimie' | 'equipement' | 'reparation' | 'inspection';
    description: string;
    priorite: 'basse' | 'normale' | 'haute' | 'urgente';
    datePrevu: Date;
    responsable: string;
    notes: string;
  }>({
    type: 'nettoyage',
    description: '',
    priorite: 'normale',
    datePrevu: new Date(),
    responsable: '',
    notes: '',
  });

  const [chimieData, setChimieData] = useState<ChimieData>({
    date: new Date(),
    ph: 7.2,
    chlore: 1.5,
    alcalinite: 120,
    temperature: 28,
    notes: '',
  });

  const [maintenances, setMaintenances] = useState<Maintenance[]>([
    {
      id: 1,
      type: 'nettoyage',
      description: 'Nettoyage quotidien - Surface et filtration',
      priorite: 'normale',
      datePrevu: new Date(2025, 9, 23),
      responsable: 'Kouassi Jean',
      statut: 'termine',
      dateCreation: new Date(2025, 9, 22),
      dateCompletee: new Date(2025, 9, 23, 8, 30),
      notes: 'RAS, tout ok',
    },
    {
      id: 2,
      type: 'chimie',
      description: 'Ajustement pH et chlore',
      priorite: 'haute',
      datePrevu: new Date(2025, 9, 23),
      responsable: 'Boni Marie',
      statut: 'en-cours',
      dateCreation: new Date(2025, 9, 23),
      notes: 'pH légèrement élevé',
    },
    {
      id: 3,
      type: 'equipement',
      description: 'Vérification pompe de filtration',
      priorite: 'normale',
      datePrevu: new Date(2025, 9, 24),
      responsable: 'Diallo Aïcha',
      statut: 'planifie',
      dateCreation: new Date(2025, 9, 22),
    },
    {
      id: 4,
      type: 'reparation',
      description: 'Réparation fuite système chloration',
      priorite: 'urgente',
      datePrevu: new Date(2025, 9, 23),
      responsable: 'Koffi Marc',
      statut: 'en-cours',
      dateCreation: new Date(2025, 9, 23),
      notes: 'Intervention prioritaire - Pièces commandées',
    },
    {
      id: 5,
      type: 'inspection',
      description: 'Inspection mensuelle complète',
      priorite: 'normale',
      datePrevu: new Date(2025, 9, 25),
      responsable: 'Kouassi Jean',
      statut: 'planifie',
      dateCreation: new Date(2025, 9, 20),
    },
  ]);

  const [chimieHistory] = useState<ChimieData[]>([
    {
      date: new Date(2025, 9, 23, 9, 0),
      ph: 7.4,
      chlore: 1.8,
      alcalinite: 125,
      temperature: 28,
      notes: 'Valeurs normales',
    },
    {
      date: new Date(2025, 9, 22, 9, 0),
      ph: 7.6,
      chlore: 1.2,
      alcalinite: 130,
      temperature: 27,
      notes: 'pH légèrement élevé, ajout correcteur',
    },
    {
      date: new Date(2025, 9, 21, 9, 0),
      ph: 7.2,
      chlore: 1.5,
      alcalinite: 120,
      temperature: 27,
      notes: 'RAS',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validated = maintenanceSchema.parse(formData);
      
      if (editingMaintenance) {
        setMaintenances(maintenances.map(m => 
          m.id === editingMaintenance.id 
            ? { ...m, ...validated }
            : m
        ));
        toast({
          title: 'Maintenance modifiée',
          description: 'La tâche a été mise à jour avec succès',
        });
      } else {
        const newMaintenance: Maintenance = {
          id: maintenances.length + 1,
          ...validated,
          statut: 'planifie',
          dateCreation: new Date(),
        };
        setMaintenances([newMaintenance, ...maintenances]);
        toast({
          title: 'Maintenance créée',
          description: 'La tâche a été ajoutée avec succès',
        });
      }
      
      setOpen(false);
      setEditingMaintenance(null);
      setFormData({
        type: 'nettoyage',
        description: '',
        priorite: 'normale',
        datePrevu: new Date(),
        responsable: '',
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

  const handleChimieSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Paramètres enregistrés',
      description: 'Les valeurs chimiques ont été enregistrées',
    });
    setChimieOpen(false);
  };

  const handleEdit = (maintenance: Maintenance) => {
    setEditingMaintenance(maintenance);
    setFormData({
      type: maintenance.type,
      description: maintenance.description,
      priorite: maintenance.priorite,
      datePrevu: maintenance.datePrevu,
      responsable: maintenance.responsable,
      notes: maintenance.notes || '',
    });
    setOpen(true);
  };

  const handleStatusChange = (id: number, newStatus: 'planifie' | 'en-cours' | 'termine' | 'reporte') => {
    setMaintenances(maintenances.map(m => {
      if (m.id === id) {
        return {
          ...m,
          statut: newStatus,
          dateCompletee: newStatus === 'termine' ? new Date() : undefined,
        };
      }
      return m;
    }));
    toast({
      title: 'Statut mis à jour',
      description: `La maintenance est maintenant ${newStatus}`,
    });
  };

  const filteredMaintenances = maintenances.filter(m => 
    filterStatut === 'tous' || m.statut === filterStatut
  );

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'nettoyage': 'Nettoyage',
      'chimie': 'Chimie',
      'equipement': 'Équipement',
      'reparation': 'Réparation',
      'inspection': 'Inspection',
    };
    return labels[type] || type;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reparation':
        return <Wrench className="w-4 h-4" />;
      case 'inspection':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Wrench className="w-4 h-4" />;
    }
  };

  const getPrioriteColor = (priorite: string) => {
    switch (priorite) {
      case 'basse':
        return 'bg-info/20 text-info';
      case 'normale':
        return 'bg-success/20 text-success';
      case 'haute':
        return 'bg-warning/20 text-warning';
      case 'urgente':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'planifie':
        return 'bg-info/20 text-info';
      case 'en-cours':
        return 'bg-warning/20 text-warning';
      case 'termine':
        return 'bg-success/20 text-success';
      case 'reporte':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getChimieStatus = (value: number, type: 'ph' | 'chlore' | 'alcalinite') => {
    if (type === 'ph') {
      if (value < 7.2 || value > 7.6) return 'text-destructive';
      return 'text-success';
    }
    if (type === 'chlore') {
      if (value < 1.0 || value > 3.0) return 'text-destructive';
      return 'text-success';
    }
    if (type === 'alcalinite') {
      if (value < 80 || value > 150) return 'text-destructive';
      return 'text-success';
    }
    return '';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-success/10 rounded-xl border border-success/20">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <p className="text-xs text-muted-foreground font-medium">Paramètres Chimiques</p>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-xs">pH:</span>
              <span className={`text-sm font-bold ${getChimieStatus(chimieHistory[0].ph, 'ph')}`}>
                {chimieHistory[0].ph}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Chlore:</span>
              <span className={`text-sm font-bold ${getChimieStatus(chimieHistory[0].chlore, 'chlore')}`}>
                {chimieHistory[0].chlore} ppm
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 bg-info/10 rounded-xl border border-info/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">Temp. Eau</p>
          <p className="text-3xl font-bold text-info">{chimieHistory[0].temperature}°C</p>
        </div>

        <div className="p-5 bg-warning/10 rounded-xl border border-warning/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">En Cours</p>
          <p className="text-3xl font-bold text-warning">
            {maintenances.filter(m => m.statut === 'en-cours').length}
          </p>
        </div>

        <div className="p-5 bg-primary/10 rounded-xl border border-primary/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">Planifiées</p>
          <p className="text-3xl font-bold text-primary">
            {maintenances.filter(m => m.statut === 'planifie').length}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-3">
          <Select value={filterStatut} onValueChange={setFilterStatut}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tous">Tous les statuts</SelectItem>
              <SelectItem value="planifie">Planifiée</SelectItem>
              <SelectItem value="en-cours">En cours</SelectItem>
              <SelectItem value="termine">Terminée</SelectItem>
              <SelectItem value="reporte">Reportée</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={() => setChimieOpen(true)}>
            <AlertTriangle className="w-4 h-4 mr-2" />
            Paramètres Chimie
          </Button>
        </div>

        <Dialog open={open} onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setEditingMaintenance(null);
            setFormData({
              type: 'nettoyage',
              description: '',
              priorite: 'normale',
              datePrevu: new Date(),
              responsable: '',
              notes: '',
            });
          }
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Maintenance
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>
                {editingMaintenance ? 'Modifier la Maintenance' : 'Ajouter une Maintenance'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nettoyage">Nettoyage</SelectItem>
                      <SelectItem value="chimie">Chimie</SelectItem>
                      <SelectItem value="equipement">Équipement</SelectItem>
                      <SelectItem value="reparation">Réparation</SelectItem>
                      <SelectItem value="inspection">Inspection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priorite">Priorité</Label>
                  <Select
                    value={formData.priorite}
                    onValueChange={(value: any) => setFormData({ ...formData, priorite: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basse">Basse</SelectItem>
                      <SelectItem value="normale">Normale</SelectItem>
                      <SelectItem value="haute">Haute</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description de la tâche..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date prévue</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(formData.datePrevu, 'PPP', { locale: fr })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.datePrevu}
                        onSelect={(date) => date && setFormData({ ...formData, datePrevu: date })}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsable">Responsable</Label>
                  <Input
                    id="responsable"
                    value={formData.responsable}
                    onChange={(e) => setFormData({ ...formData, responsable: e.target.value })}
                    placeholder="Nom du responsable"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optionnel)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Notes additionnelles..."
                  rows={2}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
                  Annuler
                </Button>
                <Button type="submit" className="flex-1">
                  {editingMaintenance ? 'Modifier' : 'Créer'}
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
                <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Description</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Priorité</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Date prévue</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Responsable</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Statut</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredMaintenances.map((maintenance) => (
                <tr key={maintenance.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(maintenance.type)}
                      <span className="text-sm font-medium">{getTypeLabel(maintenance.type)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm max-w-xs truncate">
                    {maintenance.description}
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={getPrioriteColor(maintenance.priorite)}>
                      {maintenance.priorite}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {format(maintenance.datePrevu, 'dd/MM/yyyy', { locale: fr })}
                  </td>
                  <td className="px-4 py-3 text-sm">{maintenance.responsable}</td>
                  <td className="px-4 py-3">
                    <Select
                      value={maintenance.statut}
                      onValueChange={(value: any) => handleStatusChange(maintenance.id, value)}
                    >
                      <SelectTrigger className={`w-[130px] ${getStatutColor(maintenance.statut)}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planifie">Planifiée</SelectItem>
                        <SelectItem value="en-cours">En cours</SelectItem>
                        <SelectItem value="termine">Terminée</SelectItem>
                        <SelectItem value="reporte">Reportée</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(maintenance)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={chimieOpen} onOpenChange={setChimieOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Paramètres Chimiques de l'Eau</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleChimieSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ph">pH (7.2 - 7.6)</Label>
                <Input
                  id="ph"
                  type="number"
                  step="0.1"
                  value={chimieData.ph}
                  onChange={(e) => setChimieData({ ...chimieData, ph: parseFloat(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chlore">Chlore (1.0 - 3.0 ppm)</Label>
                <Input
                  id="chlore"
                  type="number"
                  step="0.1"
                  value={chimieData.chlore}
                  onChange={(e) => setChimieData({ ...chimieData, chlore: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="alcalinite">Alcalinité (80 - 150 ppm)</Label>
                <Input
                  id="alcalinite"
                  type="number"
                  value={chimieData.alcalinite}
                  onChange={(e) => setChimieData({ ...chimieData, alcalinite: parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature">Température (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  value={chimieData.temperature}
                  onChange={(e) => setChimieData({ ...chimieData, temperature: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="chimie-notes">Notes</Label>
              <Textarea
                id="chimie-notes"
                value={chimieData.notes}
                onChange={(e) => setChimieData({ ...chimieData, notes: e.target.value })}
                placeholder="Observations..."
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setChimieOpen(false)} className="flex-1">
                Annuler
              </Button>
              <Button type="submit" className="flex-1">
                Enregistrer
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <h4 className="text-sm font-semibold mb-3">Historique récent</h4>
            <div className="space-y-2">
              {chimieHistory.map((entry, idx) => (
                <div key={idx} className="p-3 bg-muted/30 rounded-lg text-sm">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-medium">
                      {format(entry.date, 'dd/MM/yyyy HH:mm', { locale: fr })}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div>pH: <span className={getChimieStatus(entry.ph, 'ph')}>{entry.ph}</span></div>
                    <div>Cl: <span className={getChimieStatus(entry.chlore, 'chlore')}>{entry.chlore}</span></div>
                    <div>Alc: {entry.alcalinite}</div>
                    <div>T: {entry.temperature}°C</div>
                  </div>
                  {entry.notes && (
                    <p className="text-xs text-muted-foreground mt-1">{entry.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
