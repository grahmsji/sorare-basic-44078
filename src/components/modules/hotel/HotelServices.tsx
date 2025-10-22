import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Plus, UtensilsCrossed, Sparkles, ShoppingBag, Clock, CheckCircle2, XCircle } from 'lucide-react';

const serviceRequestSchema = z.object({
  roomNumber: z.string().min(1, "Numéro de chambre requis"),
  serviceType: z.string().min(1, "Type de service requis"),
  description: z.string().min(5, "Description requise"),
  priority: z.string().min(1, "Priorité requise"),
});

type ServiceRequest = {
  id: string;
  roomNumber: string;
  serviceType: 'room-service' | 'housekeeping' | 'laundry' | 'maintenance' | 'concierge';
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  requestedAt: Date;
  completedAt?: Date;
};

const serviceTypes = [
  { value: 'room-service', label: 'Service de Chambre', icon: UtensilsCrossed },
  { value: 'housekeeping', label: 'Ménage', icon: Sparkles },
  { value: 'laundry', label: 'Blanchisserie', icon: ShoppingBag },
  { value: 'maintenance', label: 'Maintenance', icon: Clock },
  { value: 'concierge', label: 'Conciergerie', icon: CheckCircle2 },
];

export const HotelServices = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<ServiceRequest[]>([
    {
      id: '1',
      roomNumber: '205',
      serviceType: 'room-service',
      description: 'Petit-déjeuner pour 2 personnes',
      priority: 'medium',
      status: 'in-progress',
      requestedAt: new Date(2025, 9, 22, 8, 30),
    },
    {
      id: '2',
      roomNumber: '310',
      serviceType: 'housekeeping',
      description: 'Nettoyage supplémentaire',
      priority: 'low',
      status: 'pending',
      requestedAt: new Date(2025, 9, 22, 10, 15),
    },
    {
      id: '3',
      roomNumber: '102',
      serviceType: 'maintenance',
      description: 'Climatisation ne fonctionne pas',
      priority: 'urgent',
      status: 'pending',
      requestedAt: new Date(2025, 9, 22, 9, 0),
    },
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const form = useForm<z.infer<typeof serviceRequestSchema>>({
    resolver: zodResolver(serviceRequestSchema),
    defaultValues: {
      roomNumber: '',
      serviceType: '',
      description: '',
      priority: '',
    },
  });

  const onSubmit = (values: z.infer<typeof serviceRequestSchema>) => {
    const newRequest: ServiceRequest = {
      id: Date.now().toString(),
      roomNumber: values.roomNumber,
      serviceType: values.serviceType as ServiceRequest['serviceType'],
      description: values.description,
      priority: values.priority as ServiceRequest['priority'],
      status: 'pending',
      requestedAt: new Date(),
    };
    
    setRequests([newRequest, ...requests]);
    toast({ title: "Demande de service créée" });
    setIsDialogOpen(false);
    form.reset();
  };

  const handleStatusChange = (id: string, status: ServiceRequest['status']) => {
    setRequests(requests.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status,
          completedAt: status === 'completed' ? new Date() : undefined,
        };
      }
      return r;
    }));
    toast({ title: "Statut mis à jour" });
  };

  const getPriorityColor = (priority: ServiceRequest['priority']) => {
    switch (priority) {
      case 'low': return 'bg-muted text-muted-foreground';
      case 'medium': return 'bg-primary/20 text-primary';
      case 'high': return 'bg-warning/20 text-warning';
      case 'urgent': return 'bg-destructive/20 text-destructive';
    }
  };

  const getPriorityLabel = (priority: ServiceRequest['priority']) => {
    switch (priority) {
      case 'low': return 'Basse';
      case 'medium': return 'Moyenne';
      case 'high': return 'Haute';
      case 'urgent': return 'Urgente';
    }
  };

  const getStatusColor = (status: ServiceRequest['status']) => {
    switch (status) {
      case 'pending': return 'bg-warning/20 text-warning';
      case 'in-progress': return 'bg-primary/20 text-primary';
      case 'completed': return 'bg-success/20 text-success';
      case 'cancelled': return 'bg-destructive/20 text-destructive';
    }
  };

  const getStatusLabel = (status: ServiceRequest['status']) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'in-progress': return 'En cours';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
    }
  };

  const getServiceTypeLabel = (type: ServiceRequest['serviceType']) => {
    return serviceTypes.find(s => s.value === type)?.label || type;
  };

  const getServiceTypeIcon = (type: ServiceRequest['serviceType']) => {
    const serviceType = serviceTypes.find(s => s.value === type);
    return serviceType ? serviceType.icon : Clock;
  };

  const filteredRequests = activeTab === 'all' 
    ? requests 
    : requests.filter(r => r.serviceType === activeTab);

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-card-foreground">Services Hôteliers</h3>
          <p className="text-sm text-muted-foreground">Gérez les demandes de services</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Demande
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nouvelle Demande de Service</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="roomNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numéro de Chambre</FormLabel>
                        <FormControl>
                          <Input placeholder="205" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de Service</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {serviceTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Priorité</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Basse</SelectItem>
                            <SelectItem value="medium">Moyenne</SelectItem>
                            <SelectItem value="high">Haute</SelectItem>
                            <SelectItem value="urgent">Urgente</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Détails de la demande..." {...field} />
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
                  <Button type="submit">Créer</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">Tous</TabsTrigger>
          {serviceTypes.map((type) => (
            <TabsTrigger key={type.value} value={type.value}>
              {type.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          <div className="grid gap-4">
            {sortedRequests.map((request) => {
              const Icon = getServiceTypeIcon(request.serviceType);
              return (
                <Card key={request.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-card-foreground">
                            {getServiceTypeLabel(request.serviceType)} - Chambre {request.roomNumber}
                          </h4>
                          <Badge className={getPriorityColor(request.priority)}>
                            {getPriorityLabel(request.priority)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{request.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Demandé: {request.requestedAt.toLocaleString('fr-FR')}</span>
                          {request.completedAt && (
                            <span>Terminé: {request.completedAt.toLocaleString('fr-FR')}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Select 
                        value={request.status} 
                        onValueChange={(value) => handleStatusChange(request.id, value as ServiceRequest['status'])}
                      >
                        <SelectTrigger className="w-40">
                          <Badge className={getStatusColor(request.status)}>
                            {getStatusLabel(request.status)}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="in-progress">En cours</SelectItem>
                          <SelectItem value="completed">Terminé</SelectItem>
                          <SelectItem value="cancelled">Annulé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
