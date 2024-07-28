"use client"


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
  Coins,
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
} from "@/components/ui/dialog"; // Add this line to import Dialog components
import { Input } from "@/components/ui/input"; // Add this line to import your Input component

type Music = {
  id: number;
  name: string;
  music_url: string;
  size: number;
  duration: number;
  thumbnail_url: string;
  price: number;
  status: string;
};

const mockData: Music[] = [
  {
    id: 1,
    name: "Chill Beats",
    music_url: "/music/chill-beats.mp3",
    size: 3.5,
    duration: 210,
    thumbnail_url: "/CapyLofiLogo.png",
    price: 12,
    status: "active",
  },
  {
    id: 2,
    name: "Lofi Study",
    music_url: "/music/lofi-study.mp3",
    size: 4.2,
    duration: 250,
    thumbnail_url: "/CapyLofiLogo.png",
    price: 12,
    status: "inactive",
  },
  // Thêm các bản nhạc khác vào đây
];

export default function Music() {
  const [musicData, setMusicData] = useState<Music[]>(mockData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMusic, setEditMusic] = useState<Music | null>(null);
  const [viewMusic, setViewMusic] = useState<Music | null>(null);

  const handleSave = (newMusic: Music) => {
    if (editMusic) {
      setMusicData(musicData.map((m) => (m.id === newMusic.id ? newMusic : m)));
    } else {
      setMusicData([...musicData, { ...newMusic, id: musicData.length + 1 }]);
    }
    setIsDialogOpen(false);
    setEditMusic(null);
  };

  const handleEdit = (music: Music) => {
    setEditMusic(music);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setMusicData(musicData.filter((m) => m.id !== id));
  };

  const handleView = (music: Music) => {
    setViewMusic(music);
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Inactive</TabsTrigger>
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
                    Add Music
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editMusic ? "Edit Music" : "Add Music"}</DialogTitle>
                </DialogHeader>
                <MusicForm music={editMusic} onSave={handleSave} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Music</CardTitle>
              <CardDescription>
                Manage your music and view their sales performance.
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
                    <TableHead className="hidden md:table-cell">Duration (s)</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {musicData.map((music) => (
                    <TableRow key={music.id}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="Music thumbnail"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={music.thumbnail_url}
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{music.name}</TableCell>
                      <TableCell>
                        <Badge variant={music.status === "active" ? "outline" : "secondary"}>
                          {music.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell font-bold items-center gap-2">
                        <div className="flex items-center gap-2">
                          {music.price}
                          <Candy className="text-red-600" />
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{music.size}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {Math.floor(music.duration / 60)}:{music.duration % 60}
                      </TableCell>
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
                            <DropdownMenuItem onClick={() => handleView(music)}>View</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(music)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(music.id)}>Delete</DropdownMenuItem>
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
                Showing <strong>1-10</strong> of <strong>{musicData.length}</strong> music items
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!viewMusic} onOpenChange={() => setViewMusic(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Music Details</DialogTitle>
          </DialogHeader>
          {viewMusic && (
            <div>
              <Image
                alt="Music thumbnail"
                className="aspect-square rounded-md object-cover"
                height="128"
                src={viewMusic.thumbnail_url}
                width="128"
              />
              <p>Name: {viewMusic.name}</p>
              <p>Size: {viewMusic.size} MB</p>
              <p>Duration: {Math.floor(viewMusic.duration / 60)}:{viewMusic.duration % 60} minutes</p>
              <p>Price: {viewMusic.price} coins</p>
              <p>Status: {viewMusic.status}</p>
              <audio controls src={viewMusic.music_url}>
                Your browser does not support the audio element.
              </audio>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

type MusicFormProps = {
  music: Music | null;
  onSave: (music: Music) => void;
};

function MusicForm({ music, onSave }: MusicFormProps) {
  const [name, setName] = useState(music?.name || "");
  const [musicUrl, setMusicUrl] = useState(music?.music_url || "");
  const [thumbnailUrl, setThumbnailUrl] = useState(music?.thumbnail_url || "");
  const [size, setSize] = useState(music?.size || 0);
  const [duration, setDuration] = useState(music?.duration || 0);
  const [price, setPrice] = useState(music?.price || 0);
  const [status, setStatus] = useState(music?.status || "active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: music?.id || 0,
      name,
      music_url: musicUrl,
      thumbnail_url: thumbnailUrl,
      size,
      duration,
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
          placeholder="Music URL"
          value={musicUrl}
          onChange={(e) => setMusicUrl(e.target.value)}
          required
        />
        <Input
          placeholder="Thumbnail URL"
          value={thumbnailUrl}
          onChange={(e) => setThumbnailUrl(e.target.value)}
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
          placeholder="Duration (s)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value))}
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
          <Button variant="outline" type="button" onClick={() => {}}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </div>
    </form>
  );
}
