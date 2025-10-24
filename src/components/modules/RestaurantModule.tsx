import { UtensilsCrossed } from 'lucide-react';
import { OrderManagement } from './restaurant/OrderManagement';
import { MenuManagement } from './restaurant/MenuManagement';
import { TableManagement } from './restaurant/TableManagement';

interface RestaurantModuleProps {
  defaultTab?: 'orders' | 'menu' | 'tables';
}

export const RestaurantModule = ({ defaultTab = 'orders' }: RestaurantModuleProps) => {
  const renderContent = () => {
    switch (defaultTab) {
      case 'orders':
        return <OrderManagement />;
      case 'menu':
        return <MenuManagement />;
      case 'tables':
        return <TableManagement />;
      default:
        return <OrderManagement />;
    }
  };
  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <UtensilsCrossed className="w-8 h-8 text-primary" />
          <h2 className="text-2xl font-bold text-card-foreground">Bar & Restaurant</h2>
        </div>
        <p className="text-muted-foreground text-sm">Gestion complète du restaurant, bar et room service</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-5 bg-success/10 rounded-xl border border-success/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">Commandes Jour</p>
          <p className="text-3xl font-bold text-success">47</p>
        </div>
        <div className="p-5 bg-primary/10 rounded-xl border border-primary/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">En Cours</p>
          <p className="text-3xl font-bold text-primary">12</p>
        </div>
        <div className="p-5 bg-warning/10 rounded-xl border border-warning/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">CA Jour</p>
          <p className="text-3xl font-bold text-warning">185K</p>
        </div>
        <div className="p-5 bg-info/10 rounded-xl border border-info/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">Tables Occupées</p>
          <p className="text-3xl font-bold text-info">8/15</p>
        </div>
      </div>

      <div className="mt-6">
        {renderContent()}
      </div>
    </div>
  );
};
