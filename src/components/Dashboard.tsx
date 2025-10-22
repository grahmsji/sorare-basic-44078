import { BarChart3, Hotel, Utensils, Car } from 'lucide-react';

const stats = [
  { label: 'Chambres Occupées', value: '45/60', color: 'bg-primary', icon: Hotel },
  { label: 'Véhicules Loués', value: '12/20', color: 'bg-success', icon: Car },
  { label: 'Revenus du Jour', value: '125,000 FCFA', color: 'bg-info', icon: BarChart3 },
  { label: 'Réservations', value: '28', color: 'bg-warning', icon: Utensils },
];

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Tableau de Bord</h2>
        <p className="text-muted-foreground mt-1">Vue d'ensemble de vos activités</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-card rounded-xl shadow-card hover:shadow-card-hover transition-shadow p-6">
              <div className={`w-12 h-12 ${stat.color} rounded-lg mb-4 flex items-center justify-center text-white`}>
                <Icon size={24} />
              </div>
              <h3 className="text-muted-foreground text-sm font-medium">{stat.label}</h3>
              <p className="text-2xl font-bold text-card-foreground mt-2">{stat.value}</p>
            </div>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl shadow-card p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Réservations Récentes</h3>
          <div className="space-y-3">
            {['Chambre 205 - Jean Kouadio', 'Véhicule Toyota - Marie Boni', 'Salle de Fête - Événement Pro'].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
                <span className="text-sm text-card-foreground font-medium">{item}</span>
                <span className="text-xs text-muted-foreground bg-background px-3 py-1 rounded-full">Aujourd'hui</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-card rounded-xl shadow-card p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Activités du Jour</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg">
              <Hotel size={20} className="text-primary" />
              <span className="text-sm text-card-foreground font-medium">15 Check-ins prévus</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-success/10 rounded-lg">
              <Utensils size={20} className="text-success" />
              <span className="text-sm text-card-foreground font-medium">32 Commandes restaurant</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-info/10 rounded-lg">
              <Car size={20} className="text-info" />
              <span className="text-sm text-card-foreground font-medium">5 Retours de véhicules</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
