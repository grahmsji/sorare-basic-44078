import { Hotel } from 'lucide-react';
import { RoomManagement } from './hotel/RoomManagement';
import { ReservationManagement } from './hotel/ReservationManagement';
import { HotelServices } from './hotel/HotelServices';

interface HotelModuleProps {
  defaultTab?: 'rooms' | 'reservations' | 'services';
}

export const HotelModule = ({ defaultTab = 'rooms' }: HotelModuleProps) => {
  const renderContent = () => {
    switch (defaultTab) {
      case 'rooms':
        return <RoomManagement />;
      case 'reservations':
        return <ReservationManagement />;
      case 'services':
        return <HotelServices />;
      default:
        return <RoomManagement />;
    }
  };
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

      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};
