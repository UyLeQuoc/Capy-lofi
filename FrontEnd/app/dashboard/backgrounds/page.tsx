"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Candy,
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type Background = {
  id: number;
  name: string;
  background_url: string;
  size: number;
  price: number;
  status: string;
};

const mockData: Background[] = [
  {
    id: 1,
    name: "Sunset",
    background_url: "https://i.pinimg.com/originals/04/63/b9/0463b94db6f1e49e08d14e2b6e7362c1.gif",
    size: 2.5,
    price: 10,
    status: "active",
  },
  {
    id: 2,
    name: "Forest",
    background_url: "https://i.pinimg.com/originals/eb/50/87/eb50875a68b04b0480fa929af2c7547c.gif",
    size: 3.0,
    price: 12,
    status: "inactive",
  },
  {
    id: 3,
    name: "Mountain",
    background_url: "https://i.pinimg.com/originals/de/1a/0d/de1a0d60ba98d22aa76f07e781205e72.gif",
    size: 3.2,
    price: 15,
    status: "active",
  },
  {
    id: 4,
    name: "City",
    background_url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f8ee8325-5265-49bb-bc5a-e458dbe61c44/d9ox9q6-4bfb43dc-ff9a-414c-aea4-eb2a6c8565f2.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y4ZWU4MzI1LTUyNjUtNDliYi1iYzVhLWU0NThkYmU2MWM0NFwvZDlveDlxNi00YmZiNDNkYy1mZjlhLTQxNGMtYWVhNC1lYjJhNmM4NTY1ZjIuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.bAIeJtEa28kV9EiPzJOeSuOBjIRxpWe3Gg8_EwVdsdE",
    size: 2.8,
    price: 11,
    status: "active",
  },
  {
    id: 5,
    name: "Beach",
    background_url: "https://openseauserdata.com/files/f31951c71f80fa6deced10611d1cbf02.gif",
    size: 3.5,
    price: 14,
    status: "inactive",
  },
  {
    id: 6,
    name: "Desert",
    background_url: "https://images.squarespace-cdn.com/content/v1/551a19f8e4b0e8322a93850a/1578070512843-7JMUNWOF0I3ZA9FND4KQ/image-asset.gif?format=1500w",
    size: 2.9,
    price: 13,
    status: "active",
  },
  // Thêm các backgrounds khác vào đây
];

export default function Backgrounds() {
  const [backgroundData, setBackgroundData] = useState<Background[]>(mockData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editBackground, setEditBackground] = useState<Background | null>(null);
  const [viewBackground, setViewBackground] = useState<Background | null>(null);

  const handleSave = (newBackground: Background | null) => {
    if (!newBackground) {
      setIsDialogOpen(false);
      setEditBackground(null);
      return;
    }
    if (editBackground) {
      setBackgroundData(backgroundData.map((b) => (b.id === newBackground.id ? newBackground : b)));
    } else {
      setBackgroundData([...backgroundData, { ...newBackground, id: backgroundData.length ? backgroundData[backgroundData.length - 1].id + 1 : 1 }]);
    }
    setIsDialogOpen(false);
    setEditBackground(null);
  };

  const handleEdit = (background: Background) => {
    setEditBackground(background);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setBackgroundData(backgroundData.filter((b) => b.id !== id));
  };

  const handleView = (background: Background) => {
    setViewBackground(background);
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Inactive</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1" onClick={() => setIsDialogOpen(true)}>
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Add Background
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editBackground ? "Edit Background" : "Add Background"}</DialogTitle>
                </DialogHeader>
                <BackgroundForm background={editBackground} onSave={handleSave} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Backgrounds</CardTitle>
              <CardDescription>
                Manage your backgrounds and view their details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Price</TableHead>
                    <TableHead className="hidden md:table-cell">Size (MB)</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {backgroundData.map((background) => (
                    <TableRow key={background.id}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Background thumbnail"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={background.background_url}
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{background.name}</TableCell>
                      <TableCell>
                        <Badge variant={background.status === "active" ? "outline" : "secondary"}>
                          {background.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell font-bold items-center gap-2">
                        <div className="flex items-center gap-2">
                          {background.price}
                          <Candy className="text-red-600" />
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{background.size}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleView(background)}>View</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(background)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(background.id)}>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>{backgroundData.length}</strong> backgrounds
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!viewBackground} onOpenChange={() => setViewBackground(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Background Details</DialogTitle>
          </DialogHeader>
          {viewBackground && (
            <div>
              <Image
                alt="Background thumbnail"
                className="aspect-square rounded-md object-cover"
                height="128"
                src={viewBackground.background_url}
                width="128"
              />
              <p>Name: {viewBackground.name}</p>
              <p>Size: {viewBackground.size} MB</p>
              <p>Price: {viewBackground.price} coins</p>
              <p>Status: {viewBackground.status}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

type BackgroundFormProps = {
  background: Background | null;
  onSave: (background: Background | null) => void;
};

function BackgroundForm({ background, onSave }: BackgroundFormProps) {
  const [name, setName] = useState(background?.name || "");
  const [backgroundUrl, setBackgroundUrl] = useState(background?.background_url || "");
  const [size, setSize] = useState(background?.size || 0);
  const [price, setPrice] = useState(background?.price || 0);
  const [status, setStatus] = useState(background?.status || "active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: background?.id || 0,
      name,
      background_url: backgroundUrl,
      size,
      price,
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          placeholder="Background URL"
          value={backgroundUrl}
          onChange={(e) => setBackgroundUrl(e.target.value)}
          required
        />
        <Input
          placeholder="Size (MB)"
          type="number"
          value={size}
          onChange={(e) => setSize(parseFloat(e.target.value))}
          required
        />
        <Input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          required
        />
        <div className="flex items-center gap-4">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded p-2"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={() => onSave(null)}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </div>
    </form>
  );
}
