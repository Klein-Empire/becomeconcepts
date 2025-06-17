
import React from 'react';
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EngagementTracker from "@/components/EngagementTracker";
import type { EngagementData } from "@/components/EngagementTracker";

interface AdminListProps {
  section: string;
  items: any[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onUpdateEngagement?: (itemId: string, engagement: EngagementData) => void;
}

const AdminList: React.FC<AdminListProps> = ({
  section,
  items,
  onEdit,
  onDelete,
  onUpdateEngagement
}) => {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold">{item.title || item.name || item.text}</h4>
                <p className="text-sm text-gray-500">{item.description || item.excerpt || item.author || item.price}</p>
                {item.level && <Badge>{item.level}</Badge>}
                {item.popular && <Badge variant="destructive">Popular</Badge>}
                {item.isActive !== undefined && <Badge variant={item.isActive ? "default" : "secondary"}>{item.isActive ? "Active" : "Inactive"}</Badge>}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(item)}><Edit className="h-4 w-4" /></Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
            {item.engagement && onUpdateEngagement && (
              <div className="mt-4">
                <EngagementTracker 
                  itemId={item.id}
                  itemType={section as any}
                  engagement={item.engagement}
                  onUpdateEngagement={(engagement) => onUpdateEngagement(item.id, engagement)}
                  isAdmin
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminList;
