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
import { Separator } from "@/components/ui/separator";

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

type Background = {
  id: number;
  name: string;
  background_url: string;
  size: number;
  price: number;
  status: string;
};

type Order = {
  id: number;
  user_id: number;
  item_id: number;
  item_type: string;
  order_date: string;
  price: number;
  user?: User;
  music?: Music;
  background?: Background;
};

const mockData: Order[] = [
  {
    id: 1,
    user_id: 1,
    item_id: 101,
    item_type: "music",
    order_date: "2023-07-20",
    price: 25,
    user: {
      id: 1,
      email: "user6@example.com",
      name: "UyDev",
      display_name: "usersix",
      photo_url: "https://ui.shadcn.com/avatars/05.png",
      coins: 50,
      profile_info: "Traveler",
      isDeleted: 0,
    },
    music: {
      id: 1,
      name: "Chill Beats",
      music_url: "/music/chill-beats.mp3",
      size: 3.5,
      duration: 210,
      thumbnail_url: "/CapyLofiLogo.png",
      price: 12,
      status: "active",
    },
  },
  {
    id: 2,
    user_id: 2,
    item_id: 102,
    item_type: "background",
    order_date: "2023-07-21",
    price: 15,
    user: {
      id: 2,
      email: "uydev@example.com",
      name: "UyDev 2",
      display_name: "usersix",
      photo_url: "https://ui.shadcn.com/avatars/05.png",
      coins: 50,
      profile_info: "Traveler",
      isDeleted: 0,
    },
    background: {
      id: 2,
      name: "Forest",
      background_url: "https://i.pinimg.com/originals/eb/50/87/eb50875a68b04b0480fa929af2c7547c.gif",
      size: 3.0,
      price: 12,
      status: "inactive",
    },
  },
  {
    id: 3,
    user_id: 1,
    item_id: 103,
    item_type: "background",
    order_date: "2023-07-22",
    price: 20,
    user: {
      id: 1,
      email: "user6@example.com",
      name: "UyDev",
      display_name: "usersix",
      photo_url: "https://ui.shadcn.com/avatars/05.png",
      coins: 50,
      profile_info: "Traveler",
      isDeleted: 0,
    },
    background: {
      id: 3,
      name: "Mountain",
      background_url: "https://i.pinimg.com/originals/de/1a/0d/de1a0d60ba98d22aa76f07e781205e72.gif",
      size: 3.2,
      price: 15,
      status: "active",
    },
  },
  {
    id: 4,
    user_id: 3,
    item_id: 104,
    item_type: "music",
    order_date: "2023-07-23",
    price: 30,
    user: {
      id: 3,
      email: "user3@example.com",
      name: "User Three",
      display_name: "userthree",
      photo_url: "https://ui.shadcn.com/avatars/03.png",
      coins: 150,
      profile_info: "Likes music",
      isDeleted: 0,
    },
    music: {
      id: 2,
      name: "Lofi Study",
      music_url: "/music/lofi-study.mp3",
      size: 4.2,
      duration: 250,
      thumbnail_url: "/CapyLofiLogo.png",
      price: 12,
      status: "inactive",
    },
  },
  {
    id: 5,
    user_id: 4,
    item_id: 105,
    item_type: "background",
    order_date: "2023-07-24",
    price: 10,
    user: {
      id: 4,
      email: "user4@example.com",
      name: "User Four",
      display_name: "userfour",
      photo_url: "https://ui.shadcn.com/avatars/04.png",
      coins: 250,
      profile_info: "Avid reader",
      isDeleted: 0,
    },
    background: {
      id: 4,
      name: "City",
      background_url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f8ee8325-5265-49bb-bc5a-e458dbe61c44/d9ox9q6-4bfb43dc-ff9a-414c-aea4-eb2a6c8565f2.gif",
      size: 2.8,
      price: 11,
      status: "active",
    },
  },
  {
    id: 6,
    user_id: 2,
    item_id: 106,
    item_type: "music",
    order_date: "2023-07-25",
    price: 40,
    user: {
      id: 2,
      email: "uydev@example.com",
      name: "UyDev 2",
      display_name: "usersix",
      photo_url: "https://ui.shadcn.com/avatars/05.png",
      coins: 50,
      profile_info: "Traveler",
      isDeleted: 0,
    },
    music: {
      id: 1,
      name: "Chill Beats",
      music_url: "/music/chill-beats.mp3",
      size: 3.5,
      duration: 210,
      thumbnail_url: "/CapyLofiLogo.png",
      price: 12,
      status: "active",
    },
  },
  // Thêm các orders khác vào đây
];

export default function Orders() {
  const [orderData, setOrderData] = useState<Order[]>(mockData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  const handleSave = (newOrder: Order | null) => {
    if (!newOrder) {
      setIsDialogOpen(false);
      setEditOrder(null);
      return;
    }
    if (editOrder) {
      setOrderData(orderData.map((o) => (o.id === newOrder.id ? newOrder : o)));
    } else {
      setOrderData([...orderData, { ...newOrder, id: orderData.length ? orderData[orderData.length - 1].id + 1 : 1 }]);
    }
    setIsDialogOpen(false);
    setEditOrder(null);
  };

  const handleEdit = (order: Order) => {
    setEditOrder(order);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setOrderData(orderData.filter((o) => o.id !== id));
  };

  const handleView = (order: Order) => {
    setViewOrder(order);
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Your Orders</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 gap-1" onClick={() => setIsDialogOpen(true)}>
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Order
                    </span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editOrder ? "Edit Order" : "Add Order"}</DialogTitle>
                  </DialogHeader>
                  <OrderForm order={editOrder} onSave={handleSave} />
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>This Week</CardDescription>
              <CardTitle className="text-4xl">
                  <div className="flex items-center gap-2">
                      432
                    <Candy className="text-red-600" />
                  </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +25% from last week
              </div>
            </CardContent>
            <CardFooter>
              {/* <Progress value={25} aria-label="25% increase" /> */}
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>This Month</CardDescription>
              <CardTitle className="text-4xl">
                <div className="flex items-center gap-2">
                      1842
                    <Candy className="text-red-600" />
                  </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +10% from last month
              </div>
            </CardContent>
            <CardFooter>
              {/* <Progress value={12} aria-label="12% increase" /> */}
            </CardFooter>
          </Card>
        </div>
        <Tabs defaultValue="week">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Fulfilled
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Declined
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Refunded
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                size="sm"
                variant="outline"
                className="h-7 gap-1 text-sm"
              >
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button>
            </div>
          </div>
          <TabsContent value="week">
            <Card>
              <CardHeader className="px-7">
                <CardTitle>Orders</CardTitle>
                <CardDescription>
                  Recent orders from your store.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Item Type</TableHead>
                      <TableHead>Order Date</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderData.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {order.user?.photo_url && (
                              <Image
                                alt="User photo"
                                className="aspect-square rounded-md object-cover"
                                height="32"
                                src={order.user.photo_url}
                                width="32"
                              />
                            )}
                            <div>{order.user?.name || "Unknown"}</div>
                          </div>
                        </TableCell>
                        <TableCell>{order.item_type}</TableCell>
                        <TableCell>{order.order_date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center gap-2">
                            {order.price}
                            <Candy className="text-red-600" />
                          </div>
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
                              <DropdownMenuItem onClick={() => handleView(order)}>View</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEdit(order)}>Edit</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDelete(order.id)}>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Order Details
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  {/* <Copy className="h-3 w-3" /> */}
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription>Date: {viewOrder?.order_date}</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Button size="sm" variant="outline" className="h-8 gap-1">
                {/* <Truck className="h-3.5 w-3.5" /> */}
                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                  Track Order
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    {/* <MoreVertical className="h-3.5 w-3.5" /> */}
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Trash</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          {viewOrder && (
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Order Details</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Order ID</span>
                    <span>{viewOrder.id}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Customer</span>
                    <div className="flex items-center gap-2">
                      {viewOrder.user?.photo_url && (
                        <Image
                          alt="User photo"
                          className="aspect-square rounded-md object-cover"
                          height="32"
                          src={viewOrder.user.photo_url}
                          width="32"
                        />
                      )}
                      <div>{viewOrder.user?.name || "Unknown"}</div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Item Type</span>
                    <span>{viewOrder.item_type}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Order Date</span>
                    <span>{viewOrder.order_date}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <div className="flex items-center gap-2">
                      {viewOrder.price}
                      <Candy className="text-red-600" />
                    </div>
                  </li>
                </ul>
                {viewOrder.item_type === "music" && viewOrder.music && (
                  <div className="grid gap-3">
                    <Separator className="my-2" />
                    <div className="font-semibold">Music Details</div>
                    <Image
                      alt="Music thumbnail"
                      className="aspect-video rounded-md object-cover"
                      height="128"
                      src={viewOrder.music.thumbnail_url}
                      width="128"
                    />
                    <p>Name: {viewOrder.music.name}</p>
                    <p>Size: {viewOrder.music.size} MB</p>
                    <p>Duration: {Math.floor(viewOrder.music.duration / 60)}:{viewOrder.music.duration % 60} minutes</p>
                    <p className="flex gap-2 items-center">Price: 
                      <div className="flex items-center gap-2">
                      {viewOrder.music.price}
                            <Candy className="text-red-600" />
                          </div>
                    </p>
                    <p>Status: {viewOrder.music.status}</p>
                    <audio controls src={viewOrder.music.music_url}>
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
                {viewOrder.item_type === "background" && viewOrder.background && (
                  <div className="grid gap-3">
                    <Separator className="my-2" />
                    <div className="font-semibold">Background Details</div>
                    <Image
                      alt="Background thumbnail"
                      className="aspect-video rounded-md object-cover w-full"
                      height="128"
                      src={viewOrder.background.background_url}
                      width="128"
                    />
                    <p>Name: {viewOrder.background.name}</p>
                    <p>Size: {viewOrder.background.size} MB</p>
                    <p className="flex gap-2 items-center">Price: 
                      <div className="flex items-center gap-2">
                      {viewOrder.background.price}
                            <Candy className="text-red-600" />
                          </div>
                    </p>
                    <p>Status: {viewOrder.background.status}</p>
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </main>
  );
}

type OrderFormProps = {
  order: Order | null;
  onSave: (order: Order | null) => void;
};

function OrderForm({ order, onSave }: OrderFormProps) {
  const [userId, setUserId] = useState(order?.user_id || 0);
  const [itemId, setItemId] = useState(order?.item_id || 0);
  const [itemType, setItemType] = useState(order?.item_type || "background");
  const [orderDate, setOrderDate] = useState(order?.order_date || "");
  const [price, setPrice] = useState(order?.price || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: order?.id || 0,
      user_id: userId,
      item_id: itemId,
      item_type: itemType,
      order_date: orderDate,
      price,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <Input
          placeholder="User ID"
          type="number"
          value={userId}
          onChange={(e) => setUserId(parseInt(e.target.value))}
          required
        />
        <Input
          placeholder="Item ID"
          type="number"
          value={itemId}
          onChange={(e) => setItemId(parseInt(e.target.value))}
          required
        />
        <Input
          placeholder="Item Type"
          value={itemType}
          onChange={(e) => setItemType(e.target.value)}
          required
        />
        <Input
          placeholder="Order Date"
          type="date"
          value={orderDate}
          onChange={(e) => setOrderDate(e.target.value)}
          required
        />
        <Input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          required
        />
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
