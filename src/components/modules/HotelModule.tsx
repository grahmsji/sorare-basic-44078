import { Button } from '@/components/ui/button';

export const HotelModule = () => {
  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Gestion Hôtelière</h2>
          <p className="text-muted-foreground text-sm mt-1">Gérez vos chambres et réservations</p>
        </div>
        <Button>Nouvelle Réservation</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-card-foreground">Chambre</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-card-foreground">Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-card-foreground">Client</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-card-foreground">Statut</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-card-foreground">Check-out</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-secondary/50 transition-colors">
              <td className="px-6 py-4 text-card-foreground font-medium">101</td>
              <td className="px-6 py-4 text-muted-foreground">Standard</td>
              <td className="px-6 py-4 text-muted-foreground">Disponible</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-success/20 text-success rounded-full text-xs font-medium">Libre</span>
              </td>
              <td className="px-6 py-4 text-muted-foreground">-</td>
            </tr>
            <tr className="hover:bg-secondary/50 transition-colors">
              <td className="px-6 py-4 text-card-foreground font-medium">205</td>
              <td className="px-6 py-4 text-muted-foreground">Suite</td>
              <td className="px-6 py-4 text-card-foreground">Jean Kouadio</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">Occupée</span>
              </td>
              <td className="px-6 py-4 text-muted-foreground">25/10/2025</td>
            </tr>
            <tr className="hover:bg-secondary/50 transition-colors">
              <td className="px-6 py-4 text-card-foreground font-medium">310</td>
              <td className="px-6 py-4 text-muted-foreground">Deluxe</td>
              <td className="px-6 py-4 text-card-foreground">Marie Diallo</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">Occupée</span>
              </td>
              <td className="px-6 py-4 text-muted-foreground">27/10/2025</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
