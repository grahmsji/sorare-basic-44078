import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const PiscineModule = () => (
  <div className="bg-card rounded-xl shadow-card p-6">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold text-card-foreground">Gestion Piscine</h2>
        <p className="text-muted-foreground text-sm mt-1">Abonnements et accès piscine</p>
      </div>
      <Button>Nouvel Abonnement</Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="p-5 bg-primary/10 rounded-xl border border-primary/20">
        <p className="text-xs text-muted-foreground font-medium mb-1">Abonnés Actifs</p>
        <p className="text-3xl font-bold text-primary">156</p>
      </div>
      <div className="p-5 bg-success/10 rounded-xl border border-success/20">
        <p className="text-xs text-muted-foreground font-medium mb-1">Visiteurs Jour</p>
        <p className="text-3xl font-bold text-success">34</p>
      </div>
      <div className="p-5 bg-warning/10 rounded-xl border border-warning/20">
        <p className="text-xs text-muted-foreground font-medium mb-1">Capacité</p>
        <p className="text-3xl font-bold text-warning">34/50</p>
      </div>
      <div className="p-5 bg-info/10 rounded-xl border border-info/20">
        <p className="text-xs text-muted-foreground font-medium mb-1">Revenus Mois</p>
        <p className="text-3xl font-bold text-info">2.8M</p>
      </div>
    </div>
  </div>
);

export const GymModule = () => (
  <div className="bg-card rounded-xl shadow-card p-6">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold text-card-foreground">Salle de Gym</h2>
        <p className="text-muted-foreground text-sm mt-1">Gestion des membres et cours</p>
      </div>
      <Button>Nouveau Membre</Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="p-5 bg-primary/10 rounded-xl border border-primary/20">
        <p className="text-xs text-muted-foreground font-medium mb-1">Membres Actifs</p>
        <p className="text-3xl font-bold text-primary">218</p>
      </div>
      <div className="p-5 bg-success/10 rounded-xl border border-success/20">
        <p className="text-xs text-muted-foreground font-medium mb-1">Présents</p>
        <p className="text-3xl font-bold text-success">42</p>
      </div>
      <div className="p-5 bg-warning/10 rounded-xl border border-warning/20">
        <p className="text-xs text-muted-foreground font-medium mb-1">Séances Coaching</p>
        <p className="text-3xl font-bold text-warning">8</p>
      </div>
      <div className="p-5 bg-info/10 rounded-xl border border-info/20">
        <p className="text-xs text-muted-foreground font-medium mb-1">Revenus Mois</p>
        <p className="text-3xl font-bold text-info">4.2M</p>
      </div>
    </div>
  </div>
);

export const SalleFeteModule = () => (
  <div className="bg-card rounded-xl shadow-card p-6">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-2xl font-bold text-card-foreground">Location Salle de Fête</h2>
        <p className="text-muted-foreground text-sm mt-1">Réservations événements</p>
      </div>
      <Button>Nouvelle Réservation</Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="p-5 bg-primary/10 rounded-xl border border-primary/20">
        <p className="text-xs text-muted-foreground font-medium mb-1">Réservations Mois</p>
        <p className="text-3xl font-bold text-primary">18</p>
      </div>
      <div className="p-5 bg-success/10 rounded-xl border border-success/20">
        <p className="text-xs text-muted-foreground font-medium mb-1">À Venir</p>
        <p className="text-3xl font-bold text-success">7</p>
      </div>
      <div className="p-5 bg-warning/10 rounded-xl border border-warning/20">
        <p className="text-xs text-muted-foreground font-medium mb-1">Taux Occupation</p>
        <p className="text-3xl font-bold text-warning">65%</p>
      </div>
      <div className="p-5 bg-info/10 rounded-xl border border-info/20">
        <p className="text-xs text-muted-foreground font-medium mb-1">Revenus Mois</p>
        <p className="text-3xl font-bold text-info">3.5M</p>
      </div>
    </div>
  </div>
);

export const ClientsModule = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const clients = [
    { id: 1, nom: 'Jean Kouadio', email: 'jean.kouadio@email.ci', tel: '+225 07 12 34 56 78', type: 'VIP', depenses: '850,000', derniereVisite: '20/10/2025' },
    { id: 2, nom: 'Marie Boni', email: 'marie.boni@email.ci', tel: '+225 05 98 76 54 32', type: 'Régulier', depenses: '420,000', derniereVisite: '22/10/2025' },
    { id: 3, nom: 'Aïcha Diallo', email: 'aicha.diallo@email.ci', tel: '+225 01 23 45 67 89', type: 'VIP', depenses: '1,200,000', derniereVisite: '21/10/2025' },
    { id: 4, nom: 'Marc Boni', email: 'marc.boni@email.ci', tel: '+225 07 11 22 33 44', type: 'Nouveau', depenses: '85,000', derniereVisite: '23/10/2025' },
    { id: 5, nom: 'Sophie Koffi', email: 'sophie.koffi@email.ci', tel: '+225 05 55 66 77 88', type: 'Régulier', depenses: '650,000', derniereVisite: '19/10/2025' },
  ];

  const filteredClients = clients.filter(client =>
    client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Gestion Clients</h2>
          <p className="text-muted-foreground text-sm mt-1">Base de données clients</p>
        </div>
        <Button>Nouveau Client</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-5 bg-primary/10 rounded-xl border border-primary/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">Total Clients</p>
          <p className="text-3xl font-bold text-primary">487</p>
        </div>
        <div className="p-5 bg-success/10 rounded-xl border border-success/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">Clients VIP</p>
          <p className="text-3xl font-bold text-success">68</p>
        </div>
        <div className="p-5 bg-info/10 rounded-xl border border-info/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">Nouveaux ce mois</p>
          <p className="text-3xl font-bold text-info">42</p>
        </div>
        <div className="p-5 bg-warning/10 rounded-xl border border-warning/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">Taux Fidélité</p>
          <p className="text-3xl font-bold text-warning">87%</p>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un client..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Nom</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Email</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Téléphone</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Type</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Dépenses Total</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Dernière Visite</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredClients.map((client) => (
              <tr key={client.id} className="hover:bg-muted/30">
                <td className="px-4 py-3 text-sm font-medium text-card-foreground">{client.nom}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{client.email}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{client.tel}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    client.type === 'VIP' ? 'bg-primary/20 text-primary' :
                    client.type === 'Régulier' ? 'bg-success/20 text-success' :
                    'bg-info/20 text-info'
                  }`}>
                    {client.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-card-foreground">{client.depenses} FCFA</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{client.derniereVisite}</td>
                <td className="px-4 py-3">
                  <Button variant="outline" size="sm">Détails</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const FinancesModule = () => {
  const transactions = [
    { id: 1, date: '23/10/2025', type: 'Revenu', categorie: 'Hôtel', description: 'Réservation Chambre 205', montant: '+85,000', statut: 'Validé' },
    { id: 2, date: '23/10/2025', type: 'Revenu', categorie: 'Restaurant', description: 'Commandes du jour', montant: '+125,000', statut: 'Validé' },
    { id: 3, date: '23/10/2025', type: 'Dépense', categorie: 'Maintenance', description: 'Réparation climatisation', montant: '-35,000', statut: 'Payé' },
    { id: 4, date: '22/10/2025', type: 'Revenu', categorie: 'Piscine', description: 'Abonnements mensuels', montant: '+180,000', statut: 'Validé' },
    { id: 5, date: '22/10/2025', type: 'Dépense', categorie: 'Fournitures', description: 'Produits nettoyage', montant: '-42,000', statut: 'Payé' },
  ];

  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Finances</h2>
          <p className="text-muted-foreground text-sm mt-1">Comptabilité et rapports</p>
        </div>
        <Button>Nouveau Rapport</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-5 bg-success/10 rounded-xl border border-success/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">Revenus Mois</p>
          <p className="text-3xl font-bold text-success">12.5M</p>
          <p className="text-xs text-success mt-1">+15% vs mois dernier</p>
        </div>
        <div className="p-5 bg-destructive/10 rounded-xl border border-destructive/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">Dépenses Mois</p>
          <p className="text-3xl font-bold text-destructive">4.8M</p>
          <p className="text-xs text-destructive mt-1">+8% vs mois dernier</p>
        </div>
        <div className="p-5 bg-primary/10 rounded-xl border border-primary/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">Bénéfice Net</p>
          <p className="text-3xl font-bold text-primary">7.7M</p>
          <p className="text-xs text-primary mt-1">Marge: 62%</p>
        </div>
        <div className="p-5 bg-info/10 rounded-xl border border-info/20">
          <p className="text-xs text-muted-foreground font-medium mb-1">Trésorerie</p>
          <p className="text-3xl font-bold text-info">18.2M</p>
          <p className="text-xs text-info mt-1">Disponible</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-muted/30 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Revenus par Service</h3>
          <div className="space-y-3">
            {[
              { service: 'Hôtel', montant: '5.2M', pourcentage: '42%', color: 'bg-primary' },
              { service: 'Restaurant', montant: '3.8M', pourcentage: '30%', color: 'bg-success' },
              { service: 'Location Véhicules', montant: '1.5M', pourcentage: '12%', color: 'bg-info' },
              { service: 'Piscine & Gym', montant: '1.2M', pourcentage: '10%', color: 'bg-warning' },
              { service: 'Autres', montant: '0.8M', pourcentage: '6%', color: 'bg-muted' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-card-foreground">{item.service}</span>
                  <span className="text-sm font-bold text-card-foreground">{item.montant}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className={`${item.color} h-2 rounded-full`} style={{ width: item.pourcentage }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted/30 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">Dépenses par Catégorie</h3>
          <div className="space-y-3">
            {[
              { categorie: 'Salaires', montant: '2.1M', pourcentage: '44%' },
              { categorie: 'Fournitures', montant: '1.2M', pourcentage: '25%' },
              { categorie: 'Maintenance', montant: '0.8M', pourcentage: '17%' },
              { categorie: 'Utilities', montant: '0.5M', pourcentage: '10%' },
              { categorie: 'Autres', montant: '0.2M', pourcentage: '4%' },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-card rounded-lg">
                <div>
                  <p className="text-sm font-medium text-card-foreground">{item.categorie}</p>
                  <p className="text-xs text-muted-foreground">{item.pourcentage} du total</p>
                </div>
                <span className="text-sm font-bold text-destructive">{item.montant}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Transactions Récentes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Catégorie</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Description</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Montant</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-card-foreground">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 text-sm text-muted-foreground">{transaction.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.type === 'Revenu' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-card-foreground">{transaction.categorie}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{transaction.description}</td>
                  <td className={`px-4 py-3 text-sm font-bold ${
                    transaction.type === 'Revenu' ? 'text-success' : 'text-destructive'
                  }`}>
                    {transaction.montant} FCFA
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                      {transaction.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const CalendrierModule = () => {
  const [currentDate] = useState(new Date(2025, 9, 23)); // 23 octobre 2025
  
  const evenements = [
    { id: 1, titre: 'Check-in Groupe 15 personnes', heure: '14:00', type: 'Hôtel', couleur: 'bg-primary' },
    { id: 2, titre: 'Réservation Salle VIP', heure: '18:00', type: 'Salle Fête', couleur: 'bg-warning' },
    { id: 3, titre: 'Cours Yoga Matinal', heure: '07:00', type: 'Gym', couleur: 'bg-success' },
    { id: 4, titre: 'Maintenance Véhicule Toyota', heure: '10:00', type: 'Véhicule', couleur: 'bg-info' },
    { id: 5, titre: 'Réunion Staff Restaurant', heure: '09:30', type: 'Restaurant', couleur: 'bg-destructive' },
  ];

  const semaine = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Calendrier</h2>
          <p className="text-muted-foreground text-sm mt-1">Planning et réservations</p>
        </div>
        <Button>Nouvel Événement</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-muted/30 rounded-xl p-5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-card-foreground">
                {mois[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">←</Button>
                <Button variant="outline" size="sm">→</Button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2">
              {semaine.map((jour) => (
                <div key={jour} className="text-center text-sm font-semibold text-muted-foreground py-2">
                  {jour}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((day, idx) => (
                <div
                  key={idx}
                  className={`aspect-square flex items-center justify-center rounded-lg text-sm ${
                    day === null
                      ? 'bg-transparent'
                      : day === 23
                      ? 'bg-primary text-primary-foreground font-bold'
                      : 'bg-card hover:bg-muted/50 cursor-pointer text-card-foreground'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 bg-muted/30 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Statistiques de la Semaine</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-card rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Total Événements</p>
                <p className="text-2xl font-bold text-primary">48</p>
              </div>
              <div className="p-4 bg-card rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Check-ins</p>
                <p className="text-2xl font-bold text-success">15</p>
              </div>
              <div className="p-4 bg-card rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Réservations</p>
                <p className="text-2xl font-bold text-info">22</p>
              </div>
              <div className="p-4 bg-card rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Maintenances</p>
                <p className="text-2xl font-bold text-warning">11</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-muted/30 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">
              Aujourd'hui - {currentDate.getDate()} {mois[currentDate.getMonth()]}
            </h3>
            <div className="space-y-3">
              {evenements.map((event) => (
                <div key={event.id} className="bg-card rounded-lg p-4 border-l-4" style={{ borderColor: `hsl(var(--${event.couleur.replace('bg-', '')}))` }}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-muted-foreground">{event.heure}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${event.couleur}/20 text-${event.couleur.replace('bg-', '')}`}>
                      {event.type}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-card-foreground">{event.titre}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 bg-muted/30 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Événements à Venir</h3>
            <div className="space-y-3">
              {[
                { date: '24 Oct', titre: 'Mariage Koffi', type: 'Salle Fête' },
                { date: '25 Oct', titre: 'Groupe Touristes', type: 'Hôtel' },
                { date: '28 Oct', titre: 'Séminaire Entreprise', type: 'Restaurant' },
              ].map((event, idx) => (
                <div key={idx} className="flex gap-3 p-3 bg-card rounded-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex flex-col items-center justify-center">
                    <span className="text-xs text-primary font-semibold">{event.date.split(' ')[0]}</span>
                    <span className="text-xs text-primary">{event.date.split(' ')[1]}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-card-foreground">{event.titre}</p>
                    <p className="text-xs text-muted-foreground">{event.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ParametresModule = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [langue, setLangue] = useState('fr');

  return (
    <div className="bg-card rounded-xl shadow-card p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Paramètres</h2>
          <p className="text-muted-foreground text-sm mt-1">Configuration système</p>
        </div>
        <Button>Sauvegarder</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-muted/30 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Informations Entreprise</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-card-foreground block mb-2">Nom de l'entreprise</label>
                <input
                  type="text"
                  defaultValue="MultiGest Pro"
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-card-foreground block mb-2">Email de contact</label>
                <input
                  type="email"
                  defaultValue="contact@multigest.ci"
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-card-foreground block mb-2">Téléphone</label>
                <input
                  type="tel"
                  defaultValue="+225 27 20 00 00 00"
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-card-foreground block mb-2">Adresse</label>
                <textarea
                  defaultValue="Abidjan, Côte d'Ivoire"
                  rows={3}
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Préférences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-card-foreground">Notifications</p>
                  <p className="text-xs text-muted-foreground">Recevoir les alertes système</p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-card-foreground">Mode Sombre</p>
                  <p className="text-xs text-muted-foreground">Interface en thème sombre</p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    darkMode ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="text-sm font-medium text-card-foreground block mb-2">Langue</label>
                <select
                  value={langue}
                  onChange={(e) => setLangue(e.target.value)}
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-muted/30 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Utilisateurs & Permissions</h3>
            <div className="space-y-3">
              {[
                { nom: 'Admin User', role: 'Administrateur', email: 'admin@multigest.com', actif: true },
                { nom: 'Manager Hôtel', role: 'Manager', email: 'manager.hotel@multigest.com', actif: true },
                { nom: 'Réceptionniste', role: 'Employé', email: 'reception@multigest.com', actif: true },
                { nom: 'Comptable', role: 'Finance', email: 'finance@multigest.com', actif: false },
              ].map((user, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-card rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                      {user.nom.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-card-foreground">{user.nom}</p>
                      <p className="text-xs text-muted-foreground">{user.role}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.actif ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
                  }`}>
                    {user.actif ? 'Actif' : 'Inactif'}
                  </span>
                </div>
              ))}
              <Button variant="outline" className="w-full">Ajouter un utilisateur</Button>
            </div>
          </div>

          <div className="bg-muted/30 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Sécurité</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Changer le mot de passe
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Authentification à deux facteurs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Historique des connexions
              </Button>
            </div>
          </div>

          <div className="bg-muted/30 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Système</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                <span className="text-sm text-muted-foreground">Version</span>
                <span className="text-sm font-semibold text-card-foreground">2.1.0</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-card rounded-lg">
                <span className="text-sm text-muted-foreground">Dernière mise à jour</span>
                <span className="text-sm font-semibold text-card-foreground">15/10/2025</span>
              </div>
              <Button variant="outline" className="w-full">
                Sauvegarder les données
              </Button>
              <Button variant="destructive" className="w-full">
                Réinitialiser les paramètres
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
