import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Dashboard } from '@/components/Dashboard';
import { HotelModule } from '@/components/modules/HotelModule';
import { RestaurantModule } from '@/components/modules/RestaurantModule';
import { VehiculeModule } from '@/components/modules/VehiculeModule';
import { LocativeModule } from '@/components/modules/LocativeModule';
import { 
  PiscineModule, 
  GymModule, 
  SalleFeteModule, 
  ClientsModule, 
  FinancesModule, 
  CalendrierModule, 
  ParametresModule 
} from '@/components/modules/OtherModules';

const Index = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'hotel':
        return <HotelModule />;
      case 'hotel-rooms':
        return <HotelModule defaultTab="rooms" />;
      case 'hotel-reservations':
        return <HotelModule defaultTab="reservations" />;
      case 'hotel-services':
        return <HotelModule defaultTab="services" />;
      case 'restaurant':
        return <RestaurantModule />;
      case 'restaurant-orders':
        return <RestaurantModule defaultTab="orders" />;
      case 'restaurant-menu':
        return <RestaurantModule defaultTab="menu" />;
      case 'restaurant-tables':
        return <RestaurantModule defaultTab="tables" />;
      case 'piscine':
        return <PiscineModule />;
      case 'gym':
        return <GymModule />;
      case 'salle-fete':
        return <SalleFeteModule />;
      case 'vehicule':
        return <VehiculeModule />;
      case 'locative':
        return <LocativeModule />;
      case 'clients':
        return <ClientsModule />;
      case 'finances':
        return <FinancesModule />;
      case 'calendrier':
        return <CalendrierModule />;
      case 'parametres':
        return <ParametresModule />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
