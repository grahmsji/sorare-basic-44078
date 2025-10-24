import { useState } from 'react';
import { Hotel, Car, Home, Users, Calendar, DollarSign, BarChart3, Settings, Menu, X, Utensils, Waves, Dumbbell, PartyPopper, ChevronDown, ChevronRight, Bed, CalendarCheck, Sparkles, ShoppingCart, UtensilsCrossed, Users as UsersIcon } from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface ModuleItem {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  children?: ModuleItem[];
}

const modules: ModuleItem[] = [
  { id: 'dashboard', name: 'Tableau de Bord', icon: BarChart3 },
  { 
    id: 'hotel', 
    name: 'Gestion Hôtelière', 
    icon: Hotel,
    children: [
      { id: 'hotel-rooms', name: 'Chambres', icon: Bed },
      { id: 'hotel-reservations', name: 'Réservations', icon: CalendarCheck },
      { id: 'hotel-services', name: 'Services', icon: Sparkles },
    ]
  },
  { 
    id: 'restaurant', 
    name: 'Bar & Restaurant', 
    icon: Utensils,
    children: [
      { id: 'restaurant-orders', name: 'Commandes', icon: ShoppingCart },
      { id: 'restaurant-menu', name: 'Menu', icon: UtensilsCrossed },
      { id: 'restaurant-tables', name: 'Tables', icon: UsersIcon },
    ]
  },
  { id: 'piscine', name: 'Piscine', icon: Waves },
  { id: 'gym', name: 'Salle de Gym', icon: Dumbbell },
  { id: 'salle-fete', name: 'Location Salle de Fête', icon: PartyPopper },
  { id: 'vehicule', name: 'Location Véhicules', icon: Car },
  { id: 'locative', name: 'Gestion Locative', icon: Home },
  { id: 'clients', name: 'Clients', icon: Users },
  { id: 'finances', name: 'Finances', icon: DollarSign },
  { id: 'calendrier', name: 'Calendrier', icon: Calendar },
  { id: 'parametres', name: 'Paramètres', icon: Settings },
];

export const Sidebar = ({ activeModule, setActiveModule, sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [expandedModules, setExpandedModules] = useState<string[]>(['hotel', 'restaurant']);
  return (
    <>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-sidebar text-sidebar-foreground p-2 rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-sidebar text-sidebar-foreground transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-sidebar-border">
            <h1 className="text-2xl font-bold text-sidebar-primary">MultiGest Pro</h1>
            <p className="text-sm text-sidebar-foreground/70 mt-1">Gestion Multi-Services</p>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            {modules.map((module) => {
              const Icon = module.icon;
              const isExpanded = expandedModules.includes(module.id);
              const hasChildren = module.children && module.children.length > 0;
              
              return (
                <div key={module.id}>
                  <button
                    onClick={() => {
                      if (hasChildren) {
                        setExpandedModules(prev => 
                          prev.includes(module.id) 
                            ? prev.filter(id => id !== module.id)
                            : [...prev, module.id]
                        );
                      } else {
                        setActiveModule(module.id);
                        if (window.innerWidth < 1024) setSidebarOpen(false);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-6 py-3 transition-colors ${
                      activeModule === module.id
                        ? 'bg-sidebar-accent text-sidebar-primary border-l-4 border-sidebar-primary'
                        : 'hover:bg-sidebar-accent/50'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm font-medium flex-1 text-left">{module.name}</span>
                    {hasChildren && (
                      isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                    )}
                  </button>
                  
                  {hasChildren && isExpanded && (
                    <div className="bg-sidebar-accent/30">
                      {module.children!.map((child) => {
                        const ChildIcon = child.icon;
                        return (
                          <button
                            key={child.id}
                            onClick={() => {
                              setActiveModule(child.id);
                              if (window.innerWidth < 1024) setSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-12 py-2.5 transition-colors ${
                              activeModule === child.id
                                ? 'bg-sidebar-accent text-sidebar-primary border-l-4 border-sidebar-primary'
                                : 'hover:bg-sidebar-accent/50'
                            }`}
                          >
                            <ChildIcon size={18} />
                            <span className="text-sm">{child.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 p-3 bg-sidebar-accent rounded-lg">
              <div className="w-10 h-10 bg-sidebar-primary rounded-full flex items-center justify-center text-sidebar-primary-foreground font-bold">
                AD
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-sidebar-foreground/70">admin@multigest.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};
