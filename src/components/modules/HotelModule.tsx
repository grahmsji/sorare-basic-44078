import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Hotel, Bed, Calendar, Sparkles } from 'lucide-react';
import { RoomManagement } from './hotel/RoomManagement';
import { ReservationManagement } from './hotel/ReservationManagement';
import { HotelServices } from './hotel/HotelServices';

export const HotelModule = () => {
  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Hotel className="w-8 h-8 text-primary" />
          <h2 className="text-2xl font-bold text-card-foreground">Gestion Hôtelière</h2>
        </div>
        <p className="text-muted-foreground text-sm">Système complet de gestion hôtelière</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-6 bg-success/10 rounded-xl border border-success/20">
          <p className="text-sm text-muted-foreground font-medium mb-1">Chambres Disponibles</p>
          <p className="text-4xl font-bold text-success">15</p>
        </div>
        <div className="p-6 bg-primary/10 rounded-xl border border-primary/20">
          <p className="text-sm text-muted-foreground font-medium mb-1">Chambres Occupées</p>
          <p className="text-4xl font-bold text-primary">45</p>
        </div>
        <div className="p-6 bg-warning/10 rounded-xl border border-warning/20">
          <p className="text-sm text-muted-foreground font-medium mb-1">Taux d'Occupation</p>
          <p className="text-4xl font-bold text-warning">75%</p>
        </div>
        <div className="p-6 bg-primary/10 rounded-xl border border-primary/20">
          <p className="text-sm text-muted-foreground font-medium mb-1">Réservations Actives</p>
          <p className="text-4xl font-bold text-primary">28</p>
        </div>
      </div>

      <Tabs defaultValue="rooms" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rooms" className="flex items-center gap-2">
            <Bed className="w-4 h-4" />
            Chambres
          </TabsTrigger>
          <TabsTrigger value="reservations" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Réservations
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Services
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="rooms" className="mt-6">
          <RoomManagement />
        </TabsContent>
        
        <TabsContent value="reservations" className="mt-6">
          <ReservationManagement />
        </TabsContent>
        
        <TabsContent value="services" className="mt-6">
          <HotelServices />
        </TabsContent>
      </Tabs>
    </div>
  );
};
