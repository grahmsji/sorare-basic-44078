import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export const LocativeModule = () => {
  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Gestion Locative</h2>
          <p className="text-muted-foreground text-sm mt-1">Gérez vos biens immobiliers</p>
        </div>
        <Button>Nouveau Bien</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-5 bg-primary/10 rounded-xl border border-primary/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">Biens Totaux</p>
          <p className="text-3xl font-bold text-primary">25</p>
        </div>
        <div className="p-5 bg-success/10 rounded-xl border border-success/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">Loués</p>
          <p className="text-3xl font-bold text-success">22</p>
        </div>
        <div className="p-5 bg-warning/10 rounded-xl border border-warning/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">Disponibles</p>
          <p className="text-3xl font-bold text-warning">3</p>
        </div>
        <div className="p-5 bg-info/10 rounded-xl border border-info/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">Revenus Mois</p>
          <p className="text-3xl font-bold text-info">12.5M</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { nom: 'Appartement F3 Cocody', type: '3 chambres', loyer: '200,000', statut: 'Loué' },
          { nom: 'Studio Plateau', type: '1 chambre', loyer: '120,000', statut: 'Loué' },
          { nom: 'Villa Riviera', type: '5 chambres', loyer: '800,000', statut: 'Disponible' },
          { nom: 'F2 Marcory', type: '2 chambres', loyer: '150,000', statut: 'Loué' },
          { nom: 'Duplex Angré', type: '4 chambres', loyer: '500,000', statut: 'Loué' },
          { nom: 'Studio Yopougon', type: '1 chambre', loyer: '100,000', statut: 'Disponible' },
        ].map((bien, idx) => (
          <div key={idx} className="border border-border rounded-xl p-5 hover:shadow-card-hover transition-all bg-card">
            <div className="flex items-center justify-center bg-secondary rounded-xl h-40 mb-4">
              <Home size={64} className="text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg text-card-foreground mb-1">{bien.nom}</h3>
            <p className="text-sm text-muted-foreground mb-1">{bien.type}</p>
            <p className="text-lg font-bold text-primary mb-3">{bien.loyer} FCFA/mois</p>
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium ${
              bien.statut === 'Loué' ? 'bg-primary/20 text-primary' : 'bg-success/20 text-success'
            }`}>
              {bien.statut}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
