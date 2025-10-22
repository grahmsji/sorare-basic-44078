import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Bed } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const roomSchema = z.object({
  number: z.string().min(1, "Numéro de chambre requis"),
  type: z.string().min(1, "Type de chambre requis"),
  price: z.string().min(1, "Prix requis"),
  capacity: z.string().min(1, "Capacité requise"),
  floor: z.string().min(1, "Étage requis"),
  amenities: z.string(),
});

type Room = {
  id: string;
  number: string;
  type: string;
  price: number;
  capacity: number;
  floor: string;
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning';
  amenities: string[];
};

export const RoomManagement = () => {
  const { toast } = useToast();
  const [rooms, setRooms] = useState<Room[]>([
    { id: '1', number: '101', type: 'Standard', price: 15000, capacity: 2, floor: '1', status: 'available', amenities: ['WiFi', 'TV', 'Climatisation'] },
    { id: '2', number: '205', type: 'Suite', price: 35000, capacity: 4, floor: '2', status: 'occupied', amenities: ['WiFi', 'TV', 'Climatisation', 'Minibar', 'Jacuzzi'] },
    { id: '3', number: '310', type: 'Deluxe', price: 25000, capacity: 3, floor: '3', status: 'occupied', amenities: ['WiFi', 'TV', 'Climatisation', 'Minibar'] },
    { id: '4', number: '102', type: 'Standard', price: 15000, capacity: 2, floor: '1', status: 'cleaning', amenities: ['WiFi', 'TV', 'Climatisation'] },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const form = useForm<z.infer<typeof roomSchema>>({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      number: '',
      type: '',
      price: '',
      capacity: '',
      floor: '',
      amenities: '',
    },
  });

  const onSubmit = (values: z.infer<typeof roomSchema>) => {
    const amenitiesArray = values.amenities.split(',').map(a => a.trim()).filter(Boolean);
    
    if (editingRoom) {
      setRooms(rooms.map(r => r.id === editingRoom.id ? {
        ...r,
        number: values.number,
        type: values.type,
        price: parseFloat(values.price),
        capacity: parseInt(values.capacity),
        floor: values.floor,
        amenities: amenitiesArray,
      } : r));
      toast({ title: "Chambre modifiée avec succès" });
    } else {
      const newRoom: Room = {
        id: Date.now().toString(),
        number: values.number,
        type: values.type,
        price: parseFloat(values.price),
        capacity: parseInt(values.capacity),
        floor: values.floor,
        status: 'available',
        amenities: amenitiesArray,
      };
      setRooms([...rooms, newRoom]);
      toast({ title: "Chambre ajoutée avec succès" });
    }
    
    setIsDialogOpen(false);
    setEditingRoom(null);
    form.reset();
  };

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    form.reset({
      number: room.number,
      type: room.type,
      price: room.price.toString(),
      capacity: room.capacity.toString(),
      floor: room.floor,
      amenities: room.amenities.join(', '),
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setRooms(rooms.filter(r => r.id !== id));
    toast({ title: "Chambre supprimée" });
  };

  const handleStatusChange = (id: string, status: Room['status']) => {
    setRooms(rooms.map(r => r.id === id ? { ...r, status } : r));
    toast({ title: "Statut mis à jour" });
  };

  const getStatusColor = (status: Room['status']) => {
    switch (status) {
      case 'available': return 'bg-success/20 text-success';
      case 'occupied': return 'bg-primary/20 text-primary';
      case 'maintenance': return 'bg-destructive/20 text-destructive';
      case 'cleaning': return 'bg-warning/20 text-warning';
    }
  };

  const getStatusLabel = (status: Room['status']) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'occupied': return 'Occupée';
      case 'maintenance': return 'Maintenance';
      case 'cleaning': return 'Nettoyage';
    }
  };

  const filteredRooms = filter === 'all' ? rooms : rooms.filter(r => r.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-card-foreground">Gestion des Chambres</h3>
          <p className="text-sm text-muted-foreground">Gérez vos chambres et leur disponibilité</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingRoom(null); form.reset(); }}>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Chambre
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingRoom ? 'Modifier' : 'Nouvelle'} Chambre</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro</FormLabel>
                        <FormControl>
                          <Input placeholder="101" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <Input placeholder="Standard, Suite, Deluxe..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prix (FCFA)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="15000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacité</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="floor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Étage</FormLabel>
                        <FormControl>
                          <Input placeholder="1, 2, 3..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amenities"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Équipements (séparés par virgule)</FormLabel>
                        <FormControl>
                          <Input placeholder="WiFi, TV, Climatisation" {...field} />
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
                  <Button type="submit">
                    {editingRoom ? 'Modifier' : 'Ajouter'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-2">
        <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')}>
          Toutes
        </Button>
        <Button variant={filter === 'available' ? 'default' : 'outline'} onClick={() => setFilter('available')}>
          Disponibles
        </Button>
        <Button variant={filter === 'occupied' ? 'default' : 'outline'} onClick={() => setFilter('occupied')}>
          Occupées
        </Button>
        <Button variant={filter === 'cleaning' ? 'default' : 'outline'} onClick={() => setFilter('cleaning')}>
          Nettoyage
        </Button>
        <Button variant={filter === 'maintenance' ? 'default' : 'outline'} onClick={() => setFilter('maintenance')}>
          Maintenance
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Bed className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-lg text-card-foreground">Chambre {room.number}</h4>
              </div>
              <Badge className={getStatusColor(room.status)}>
                {getStatusLabel(room.status)}
              </Badge>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-muted-foreground">Type: <span className="text-card-foreground">{room.type}</span></p>
              <p className="text-sm text-muted-foreground">Prix: <span className="text-card-foreground font-medium">{room.price.toLocaleString()} FCFA/nuit</span></p>
              <p className="text-sm text-muted-foreground">Capacité: <span className="text-card-foreground">{room.capacity} personnes</span></p>
              <p className="text-sm text-muted-foreground">Étage: <span className="text-card-foreground">{room.floor}</span></p>
              <div className="flex flex-wrap gap-1 mt-2">
                {room.amenities.map((amenity, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">{amenity}</Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Select value={room.status} onValueChange={(value) => handleStatusChange(room.id, value as Room['status'])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Disponible</SelectItem>
                  <SelectItem value="occupied">Occupée</SelectItem>
                  <SelectItem value="cleaning">Nettoyage</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(room)}>
                  <Edit className="w-3 h-3 mr-1" />
                  Modifier
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleDelete(room.id)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
