import { Car } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const VehiculeModule = () => {
  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Location de Véhicules</h2>
          <p className="text-muted-foreground text-sm mt-1">Gérez votre flotte de véhicules</p>
        </div>
        <Button>Nouvelle Location</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-5 bg-success/10 rounded-xl border border-success/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">Disponibles</p>
          <p className="text-3xl font-bold text-success">8</p>
        </div>
        <div className="p-5 bg-primary/10 rounded-xl border border-primary/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">En Location</p>
          <p className="text-3xl font-bold text-primary">12</p>
        </div>
        <div className="p-5 bg-warning/10 rounded-xl border border-warning/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">En Maintenance</p>
          <p className="text-3xl font-bold text-warning">2</p>
        </div>
        <div className="p-5 bg-info/10 rounded-xl border border-info/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">Revenus Mois</p>
          <p className="text-3xl font-bold text-info">850K</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { marque: 'Toyota Corolla', statut: 'Disponible', prix: '15,000', statusColor: 'success' },
          { marque: 'Honda Civic', statut: 'Loué', prix: '18,000', statusColor: 'primary' },
          { marque: 'Nissan Patrol', statut: 'Disponible', prix: '25,000', statusColor: 'success' },
          { marque: 'Mercedes Class C', statut: 'Loué', prix: '35,000', statusColor: 'primary' },
          { marque: 'Toyota RAV4', statut: 'Disponible', prix: '22,000', statusColor: 'success' },
          { marque: 'Peugeot 508', statut: 'Maintenance', prix: '20,000', statusColor: 'warning' },
        ].map((vehicule, idx) => (
          <div key={idx} className="border border-border rounded-xl p-5 hover:shadow-card-hover transition-all bg-card">
            <div className="flex items-center justify-center bg-secondary rounded-xl h-40 mb-4">
              <Car size={64} className="text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg text-card-foreground mb-1">{vehicule.marque}</h3>
            <p className="text-sm text-muted-foreground mb-3">{vehicule.prix} FCFA/jour</p>
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium ${
              vehicule.statusColor === 'success' ? 'bg-success/20 text-success' : 
              vehicule.statusColor === 'primary' ? 'bg-primary/20 text-primary' : 
              'bg-warning/20 text-warning'
            }`}>
              {vehicule.statut}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
