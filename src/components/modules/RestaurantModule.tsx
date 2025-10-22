import { Button } from '@/components/ui/button';

export const RestaurantModule = () => {
  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Bar & Restaurant</h2>
          <p className="text-muted-foreground text-sm mt-1">Gestion des commandes et du service</p>
        </div>
        <Button>Nouvelle Commande</Button>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-lg mb-4 text-card-foreground">Commandes en Cours</h3>
          <div className="space-y-3">
            {[
              { table: 'Table 5', items: 'Poulet braisé, Attiéké', montant: '3,500', temps: '15 min' },
              { table: 'Table 2', items: 'Pizza, 2 Boissons', montant: '6,800', temps: '8 min' },
              { table: 'Bar', items: '3 Bières, Brochettes', montant: '4,200', temps: '5 min' },
            ].map((cmd, idx) => (
              <div key={idx} className="border border-border rounded-xl p-4 hover:shadow-card transition-shadow bg-card">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-primary">{cmd.table}</span>
                  <span className="text-xs bg-warning/20 text-warning px-3 py-1 rounded-full font-medium">
                    {cmd.temps}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{cmd.items}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-card-foreground">{cmd.montant} FCFA</span>
                  <Button size="sm" className="bg-success hover:bg-success/90">
                    Servir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-4 text-card-foreground">Menu Populaire</h3>
          <div className="space-y-3">
            {[
              { nom: 'Poulet Braisé', prix: '2,500', ventes: '23' },
              { nom: 'Attiéké Poisson', prix: '1,800', ventes: '18' },
              { nom: 'Riz Sauce', prix: '1,500', ventes: '15' },
              { nom: 'Pizza Royale', prix: '4,500', ventes: '12' },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors">
                <div>
                  <p className="font-semibold text-card-foreground">{item.nom}</p>
                  <p className="text-sm text-muted-foreground">{item.prix} FCFA</p>
                </div>
                <span className="text-sm text-primary font-semibold">{item.ventes} vendus</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
