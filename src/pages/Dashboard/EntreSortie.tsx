import React from 'react';
 // Assuming you're importing these components from your own UI library
import { PackagePlus, PackageMinus } from "lucide-react";
import { CardDescription, Card, CardHeader, CardContent, CardTitle} from '../../components/ui/card';
import { TabsTrigger, Tabs, TabsList, TabsContent } from '../../components/ui/tabs';
import Historique from './Historique';


const EntreSortie: React.FC = () => {
  // State management for the form datad

 
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Left Column - Movement Form */}
      <div className="lg:col-span-2">
        <Tabs defaultValue="in" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="in" className="space-x-2 data-[state=active]:bg-green-600 data-[state=active]:text-white">
              <PackagePlus className="h-4 w-4" />
              <span>Entrée Stock</span>
            </TabsTrigger>
            <TabsTrigger value="out" className="space-x-2 data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <PackageMinus className="h-4 w-4" />
              <span>Sortie Stock</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="in">
            <Card className="border-2 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-600 flex items-center gap-2">
                  <PackagePlus className="h-5 w-5" />
                  Nouvelle Entrée
                </CardTitle>
                <CardDescription>Enregistrer une nouvelle entrée en stock</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    
                  </div>
                  <div className="space-y-2">
                    
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    
                  </div>
                  <div className="space-y-2">
                    
                   
                  </div>
                </div>

                <div className="space-y-2">
               
                </div>

                <div className="flex gap-4">
                  
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="out">
            <Card className="border-2 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2">
                  <PackageMinus className="h-5 w-5" />
                  Nouvelle Sortie
                </CardTitle>
                <CardDescription>Enregistrer une nouvelle sortie de stock</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add similar fields for "Sortie Stock" as needed */}
                {/* You can copy the form structure from above and modify for 'out' scenario */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <br /><br /><br />

        <div>
            <Historique />
        </div>
      </div>
    </div>
  );
};

export default EntreSortie;
