import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, UtensilsCrossed, Wine, Coffee, Dessert } from 'lucide-react';
import { z } from 'zod';

const menuItemSchema = z.object({
  name: z.string().min(1, "Nom requis"),
  category: z.enum(['plats', 'boissons', 'desserts', 'petit-dejeuner']),
  price: z.string().min(1, "Prix requis"),
  description: z.string().optional(),
});

type MenuItem = {
  id: string;
  name: string;
  category: 'plats' | 'boissons' | 'desserts' | 'petit-dejeuner';
  price: string;
  description?: string;
  available: boolean;
  popularity: number;
};

export const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: 'Poulet Braisé', category: 'plats', price: '2,500', description: 'Poulet grillé avec épices', available: true, popularity: 23 },
    { id: '2', name: 'Attiéké Poisson', category: 'plats', price: '1,800', description: 'Attiéké avec poisson frit', available: true, popularity: 18 },
    { id: '3', name: 'Riz Sauce', category: 'plats', price: '1,500', description: 'Riz avec sauce tomate', available: true, popularity: 15 },
    { id: '4', name: 'Pizza Royale', category: 'plats', price: '4,500', description: 'Pizza avec garniture complète', available: true, popularity: 12 },
    { id: '5', name: 'Café Expresso', category: 'boissons', price: '500', available: true, popularity: 30 },
    { id: '6', name: 'Jus d\'Orange Frais', category: 'boissons', price: '1,000', available: true, popularity: 25 },
    { id: '7', name: 'Bière Locale', category: 'boissons', price: '800', available: true, popularity: 20 },
    { id: '8', name: 'Tarte Tatin', category: 'desserts', price: '1,500', available: true, popularity: 8 },
    { id: '9', name: 'Petit-Déjeuner Continental', category: 'petit-dejeuner', price: '3,500', description: 'Pain, confiture, café, jus', available: true, popularity: 15 },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'plats' as MenuItem['category'],
    price: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      menuItemSchema.parse(formData);
      
      if (editingItem) {
        setMenuItems(menuItems.map(item => 
          item.id === editingItem.id 
            ? { ...item, ...formData }
            : item
        ));
        toast({
          title: "Article mis à jour",
          description: "L'article du menu a été modifié avec succès.",
        });
      } else {
        const newItem: MenuItem = {
          id: Date.now().toString(),
          ...formData,
          available: true,
          popularity: 0,
        };
        setMenuItems([...menuItems, newItem]);
        toast({
          title: "Article ajouté",
          description: "Le nouvel article a été ajouté au menu.",
        });
      }
      
      setIsDialogOpen(false);
      setEditingItem(null);
      setFormData({ name: '', category: 'plats', price: '', description: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Erreur de validation",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    toast({
      title: "Article supprimé",
      description: "L'article a été retiré du menu.",
    });
  };

  const toggleAvailability = (id: string) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const getCategoryIcon = (category: MenuItem['category']) => {
    switch (category) {
      case 'plats': return <UtensilsCrossed className="w-4 h-4" />;
      case 'boissons': return <Wine className="w-4 h-4" />;
      case 'desserts': return <Dessert className="w-4 h-4" />;
      case 'petit-dejeuner': return <Coffee className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: MenuItem['category']) => {
    switch (category) {
      case 'plats': return 'Plats';
      case 'boissons': return 'Boissons';
      case 'desserts': return 'Desserts';
      case 'petit-dejeuner': return 'Petit-Déjeuner';
    }
  };

  const plats = menuItems.filter(item => item.category === 'plats');
  const boissons = menuItems.filter(item => item.category === 'boissons');
  const desserts = menuItems.filter(item => item.category === 'desserts');
  const petitDejeuner = menuItems.filter(item => item.category === 'petit-dejeuner');

  const renderMenuItems = (items: MenuItem[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.id} className="border border-border rounded-xl p-4 bg-card space-y-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {getCategoryIcon(item.category)}
                <h4 className="font-semibold text-card-foreground">{item.name}</h4>
              </div>
              {item.description && (
                <p className="text-xs text-muted-foreground">{item.description}</p>
              )}
            </div>
            <Badge variant={item.available ? "default" : "secondary"}>
              {item.available ? 'Disponible' : 'Indisponible'}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t border-border">
            <div>
              <p className="text-lg font-bold text-primary">{item.price} FCFA</p>
              <p className="text-xs text-muted-foreground">{item.popularity} vendus</p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => toggleAvailability(item.id)}>
                {item.available ? 'Désactiver' : 'Activer'}
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                <Edit className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-card-foreground">Gestion du Menu</h3>
          <p className="text-sm text-muted-foreground">{menuItems.length} articles au menu</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingItem(null);
            setFormData({ name: '', category: 'plats', price: '', description: '' });
          }
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nouvel Article
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Modifier l\'article' : 'Nouvel Article'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Nom de l'article</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Poulet braisé"
                />
              </div>
              
              <div>
                <Label>Catégorie</Label>
                <Select value={formData.category} onValueChange={(value: any) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plats">🍽️ Plats</SelectItem>
                    <SelectItem value="boissons">🍷 Boissons</SelectItem>
                    <SelectItem value="desserts">🍰 Desserts</SelectItem>
                    <SelectItem value="petit-dejeuner">☕ Petit-Déjeuner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Prix (FCFA)</Label>
                <Input
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="2,500"
                />
              </div>
              
              <div>
                <Label>Description (optionnel)</Label>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description de l'article..."
                />
              </div>
              
              <Button type="submit" className="w-full">
                {editingItem ? 'Mettre à jour' : 'Ajouter'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="plats" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="plats" className="flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4" />
            Plats ({plats.length})
          </TabsTrigger>
          <TabsTrigger value="boissons" className="flex items-center gap-2">
            <Wine className="w-4 h-4" />
            Boissons ({boissons.length})
          </TabsTrigger>
          <TabsTrigger value="desserts" className="flex items-center gap-2">
            <Dessert className="w-4 h-4" />
            Desserts ({desserts.length})
          </TabsTrigger>
          <TabsTrigger value="petit-dejeuner" className="flex items-center gap-2">
            <Coffee className="w-4 h-4" />
            Petit-Déj ({petitDejeuner.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plats" className="mt-6">
          {renderMenuItems(plats)}
        </TabsContent>

        <TabsContent value="boissons" className="mt-6">
          {renderMenuItems(boissons)}
        </TabsContent>

        <TabsContent value="desserts" className="mt-6">
          {renderMenuItems(desserts)}
        </TabsContent>

        <TabsContent value="petit-dejeuner" className="mt-6">
          {renderMenuItems(petitDejeuner)}
        </TabsContent>
      </Tabs>
    </div>
  );
};
