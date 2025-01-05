import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import {  Clock } from 'lucide-react'; // Adjust this to your icon library import
import { ScrollArea } from '../../components/ui/scroll-area';
import { Badge } from '../../components/ui/badge';
const Historique: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        <Card className="border-orange-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Activité Récente</CardTitle>
              
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px] px-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                  <span className="flex h-2 w-2 translate-y-3 rounded-full bg-orange-500" />
                  <div className="space-y-1">
                    <div className="flex items-center justify-between space-x-4">
                      <p className="text-sm font-medium leading-none">
                        {i % 2 === 0 ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                            Entrée
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-red-100 text-red-700 hover:bg-red-100">
                            Sortie
                          </Badge>
                        )}
                        <span className="ml-2">Article {i + 1}</span>
                      </p>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Il y a {i + 1}h
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Quantité: {(i + 1) * 50} unités
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Par: John Doe
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Historique;
