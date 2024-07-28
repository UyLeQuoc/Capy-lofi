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

type User = {
  id: number;
  email: string;
  name: string;
  display_name: string;
  photo_url: string;
  coins: number;
  profile_info: string;
  isDeleted: number;
};

const mockData: User[] = [
  {
    id: 1,
    email: "user1@example.com",
    name: "User One",
    display_name: "userone",
    photo_url: "https://ui.shadcn.com/avatars/01.png",
    coins: 100,
    profile_info: "Loves coding",
    isDeleted: 0,
  },
  {
    id: 2,
    email: "user2@example.com",
    name: "User Two",
    display_name: "usertwo",
    photo_url: "https://ui.shadcn.com/avatars/01.png",
    coins: 200,
    profile_info: "Enjoys hiking",
    isDeleted: 0,
  },
  {
    id: 3,
    email: "user3@example.com",
    name: "User Three",
    display_name: "userthree",
    photo_url: "https://ui.shadcn.com/avatars/01.png",
    coins: 150,
    profile_info: "Likes music",
    isDeleted: 0,
  },
  {
    id: 4,
    email: "user4@example.com",
    name: "User Four",
    display_name: "userfour",
    photo_url: "https://ui.shadcn.com/avatars/02.png",
    coins: 250,
    profile_info: "Avid reader",
    isDeleted: 0,
  },
  {
    id: 5,
    email: "user5@example.com",
    name: "User Five",
    display_name: "userfive",
    photo_url: "https://ui.shadcn.com/avatars/03.png",
    coins: 300,
    profile_info: "Gamer",
    isDeleted: 0,
  },
  {
    id: 6,
    email: "user6@example.com",
    name: "User Six",
    display_name: "usersix",
    photo_url: "https://ui.shadcn.com/avatars/04.png",
    coins: 50,
    profile_info: "Traveler",
    isDeleted: 0,
  },
  {
    id: 7,
    email: "user6@example.com",
    name: "User Six",
    display_name: "usersix",
    photo_url: "https://ui.shadcn.com/avatars/05.png",
    coins: 50,
    profile_info: "Traveler",
    isDeleted: 0,
  }
  // Thêm các user khác vào đây
];

export default function Users() {
  const [userData, setUserData] = useState<User[]>(mockData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null);

  const handleSave = (newUser: User | null) => {
    if (!newUser) {
      setIsDialogOpen(false);
      setEditUser(null);
      return;
    }
    if (editUser) {
      setUserData(userData.map((u) => (u.id === newUser.id ? newUser : u)));
    } else {
      setUserData([...userData, { ...newUser, id: userData.length ? userData[userData.length - 1].id + 1 : 1 }]);
    }
    setIsDialogOpen(false);
    setEditUser(null);
  };

  const handleEdit = (user: User) => {
    setEditUser(user);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setUserData(userData.filter((u) => u.id !== id));
  };

  const handleView = (user: User) => {
    setViewUser(user);
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="deleted">Deleted</TabsTrigger>
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
                <DropdownMenuCheckboxItem>Deleted</DropdownMenuCheckboxItem>
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
                    Add User
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editUser ? "Edit User" : "Add User"}</DialogTitle>
                </DialogHeader>
                <UserForm user={editUser} onSave={handleSave} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage your users and view their details.
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
                    <TableHead>Email</TableHead>
                    <TableHead>Display Name</TableHead>
                    <TableHead>Coins</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userData.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt="User photo"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={user.photo_url}
                          width="64"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.display_name}</TableCell>
                      <TableCell>{user.coins}</TableCell>
                      <TableCell>
                        <Badge variant={user.isDeleted === 0 ? "outline" : "secondary"}>
                          {user.isDeleted === 0 ? "Active" : "Deleted"}
                        </Badge>
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
                            <DropdownMenuItem onClick={() => handleView(user)}>View</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(user)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(user.id)}>Delete</DropdownMenuItem>
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
                Showing <strong>1-10</strong> of <strong>{userData.length}</strong> users
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={!!viewUser} onOpenChange={() => setViewUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {viewUser && (
            <div>
              <Image
                alt="User photo"
                className="aspect-square rounded-md object-cover"
                height="128"
                src={viewUser.photo_url}
                width="128"
              />
              <p>Name: {viewUser.name}</p>
              <p>Email: {viewUser.email}</p>
              <p>Display Name: {viewUser.display_name}</p>
              <p>Coins: {viewUser.coins}</p>
              <p>Profile Info: {viewUser.profile_info}</p>
              <p>Status: {viewUser.isDeleted === 0 ? "Active" : "Deleted"}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

type UserFormProps = {
  user: User | null;
  onSave: (user: User | null) => void;
};

function UserForm({ user, onSave }: UserFormProps) {
  const [email, setEmail] = useState(user?.email || "");
  const [name, setName] = useState(user?.name || "");
  const [displayName, setDisplayName] = useState(user?.display_name || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photo_url || "");
  const [coins, setCoins] = useState(user?.coins || 0);
  const [profileInfo, setProfileInfo] = useState(user?.profile_info || "");
  const [isDeleted, setIsDeleted] = useState(user?.isDeleted || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: user?.id || 0,
      email,
      name,
      display_name: displayName,
      photo_url: photoUrl,
      coins,
      profile_info: profileInfo,
      isDeleted,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <Input
          placeholder="Photo URL"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          required
        />
        <Input
          placeholder="Coins"
          type="number"
          value={coins}
          onChange={(e) => setCoins(parseInt(e.target.value))}
          required
        />
        <Input
          placeholder="Profile Info"
          value={profileInfo}
          onChange={(e) => setProfileInfo(e.target.value)}
          required
        />
        <div className="flex items-center gap-4">
          <label>Status</label>
          <select
            value={isDeleted}
            onChange={(e) => setIsDeleted(parseInt(e.target.value))}
            className="border rounded p-2"
          >
            <option value={0}>Active</option>
            <option value={1}>Deleted</option>
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
