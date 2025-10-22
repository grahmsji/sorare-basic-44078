import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Calendar as CalendarIcon, Search, Eye, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

const reservationSchema = z.object({
  clientName: z.string().min(2, "Nom du client requis"),
  clientPhone: z.string().min(8, "Téléphone requis"),
  clientEmail: z.string().email("Email invalide").optional().or(z.literal('')),
  roomNumber: z.string().min(1, "Numéro de chambre requis"),
  checkIn: z.date({ required_error: "Date d'arrivée requise" }),
  checkOut: z.date({ required_error: "Date de départ requise" }),
  guests: z.string().min(1, "Nombre de personnes requis"),
  specialRequests: z.string().optional(),
}).refine((data) => data.checkOut > data.checkIn, {
  message: "La date de départ doit être après la date d'arrivée",
  path: ["checkOut"],
});

type Reservation = {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  roomNumber: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  status: 'pending' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  specialRequests?: string;
  totalPrice: number;
};

export const ReservationManagement = () => {
  const { toast } = useToast();
  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: '1',
      clientName: 'Jean Kouadio',
      clientPhone: '+225 07 12 34 56 78',
      clientEmail: 'jean.k@email.com',
      roomNumber: '205',
      checkIn: new Date(2025, 9, 23),
      checkOut: new Date(2025, 9, 25),
      guests: 2,
      status: 'confirmed',
      totalPrice: 70000,
    },
    {
      id: '2',
      clientName: 'Marie Diallo',
      clientPhone: '+225 05 98 76 54 32',
      roomNumber: '310',
      checkIn: new Date(2025, 9, 24),
      checkOut: new Date(2025, 9, 27),
      guests: 3,
      status: 'checked-in',
      totalPrice: 75000,
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const form = useForm<z.infer<typeof reservationSchema>>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      roomNumber: '',
      guests: '',
      specialRequests: '',
    },
  });

  const onSubmit = (values: z.infer<typeof reservationSchema>) => {
    const nights = Math.ceil((values.checkOut.getTime() - values.checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const pricePerNight = 25000;
    
    const newReservation: Reservation = {
      id: Date.now().toString(),
      clientName: values.clientName,
      clientPhone: values.clientPhone,
      clientEmail: values.clientEmail,
      roomNumber: values.roomNumber,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      guests: parseInt(values.guests),
      status: 'pending',
      specialRequests: values.specialRequests,
      totalPrice: nights * pricePerNight,
    };
    
    setReservations([...reservations, newReservation]);
    toast({ title: "Réservation créée avec succès" });
    setIsDialogOpen(false);
    form.reset();
  };

  const handleStatusChange = (id: string, status: Reservation['status']) => {
    setReservations(reservations.map(r => r.id === id ? { ...r, status } : r));
    toast({ title: "Statut mis à jour" });
  };

  const getStatusColor = (status: Reservation['status']) => {
    switch (status) {
      case 'pending': return 'bg-warning/20 text-warning';
      case 'confirmed': return 'bg-primary/20 text-primary';
      case 'checked-in': return 'bg-success/20 text-success';
      case 'checked-out': return 'bg-muted text-muted-foreground';
      case 'cancelled': return 'bg-destructive/20 text-destructive';
    }
  };

  const getStatusLabel = (status: Reservation['status']) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmée';
      case 'checked-in': return 'Arrivé';
      case 'checked-out': return 'Parti';
      case 'cancelled': return 'Annulée';
    }
  };

  const filteredReservations = reservations.filter(r => {
    const matchesSearch = r.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         r.roomNumber.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-card-foreground">Gestion des Réservations</h3>
          <p className="text-sm text-muted-foreground">Gérez vos réservations et check-in/out</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Réservation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nouvelle Réservation</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Nom du Client</FormLabel>
                        <FormControl>
                          <Input placeholder="Jean Kouadio" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clientPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="+225 07 12 34 56 78" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clientEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email (optionnel)</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="client@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="roomNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro de Chambre</FormLabel>
                        <FormControl>
                          <Input placeholder="101" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre de Personnes</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="checkIn"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date d'Arrivée</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button variant="outline" className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                {field.value ? format(field.value, "PPP", { locale: fr }) : "Sélectionner"}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} initialFocus />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="checkOut"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date de Départ</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button variant="outline" className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                {field.value ? format(field.value, "PPP", { locale: fr }) : "Sélectionner"}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} initialFocus />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Demandes Spéciales (optionnel)</FormLabel>
                        <FormControl>
                          <Input placeholder="Lit bébé, étage élevé, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">Créer Réservation</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher par nom ou numéro de chambre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="confirmed">Confirmée</SelectItem>
            <SelectItem value="checked-in">Arrivé</SelectItem>
            <SelectItem value="checked-out">Parti</SelectItem>
            <SelectItem value="cancelled">Annulée</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Client</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Chambre</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Arrivée</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Départ</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Personnes</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Montant</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Statut</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredReservations.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-card-foreground">{reservation.clientName}</p>
                    <p className="text-xs text-muted-foreground">{reservation.clientPhone}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-card-foreground font-medium">{reservation.roomNumber}</td>
                <td className="px-4 py-3 text-muted-foreground text-sm">{format(reservation.checkIn, 'dd/MM/yyyy', { locale: fr })}</td>
                <td className="px-4 py-3 text-muted-foreground text-sm">{format(reservation.checkOut, 'dd/MM/yyyy', { locale: fr })}</td>
                <td className="px-4 py-3 text-muted-foreground">{reservation.guests}</td>
                <td className="px-4 py-3 text-card-foreground font-medium">{reservation.totalPrice.toLocaleString()} FCFA</td>
                <td className="px-4 py-3">
                  <Select value={reservation.status} onValueChange={(value) => handleStatusChange(reservation.id, value as Reservation['status'])}>
                    <SelectTrigger className="w-32">
                      <Badge className={getStatusColor(reservation.status)}>
                        {getStatusLabel(reservation.status)}
                      </Badge>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="confirmed">Confirmée</SelectItem>
                      <SelectItem value="checked-in">Arrivé</SelectItem>
                      <SelectItem value="checked-out">Parti</SelectItem>
                      <SelectItem value="cancelled">Annulée</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-3">
                  <Button variant="outline" size="sm" onClick={() => setSelectedReservation(reservation)}>
                    <Eye className="w-3 h-3" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!selectedReservation} onOpenChange={(open) => !open && setSelectedReservation(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Détails de la Réservation</DialogTitle>
          </DialogHeader>
          {selectedReservation && (
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground">Client</Label>
                <p className="text-card-foreground font-medium">{selectedReservation.clientName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Téléphone</Label>
                  <p className="text-card-foreground">{selectedReservation.clientPhone}</p>
                </div>
                {selectedReservation.clientEmail && (
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="text-card-foreground">{selectedReservation.clientEmail}</p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Chambre</Label>
                  <p className="text-card-foreground font-medium">{selectedReservation.roomNumber}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Personnes</Label>
                  <p className="text-card-foreground">{selectedReservation.guests}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Arrivée</Label>
                  <p className="text-card-foreground">{format(selectedReservation.checkIn, 'PPP', { locale: fr })}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Départ</Label>
                  <p className="text-card-foreground">{format(selectedReservation.checkOut, 'PPP', { locale: fr })}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Montant Total</Label>
                <p className="text-card-foreground text-xl font-bold">{selectedReservation.totalPrice.toLocaleString()} FCFA</p>
              </div>
              {selectedReservation.specialRequests && (
                <div>
                  <Label className="text-muted-foreground">Demandes Spéciales</Label>
                  <p className="text-card-foreground">{selectedReservation.specialRequests}</p>
                </div>
              )}
              <div>
                <Label className="text-muted-foreground">Statut</Label>
                <Badge className={getStatusColor(selectedReservation.status)}>
                  {getStatusLabel(selectedReservation.status)}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
