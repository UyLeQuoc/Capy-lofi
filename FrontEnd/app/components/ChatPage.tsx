"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect } from 'react'
import * as signalR from "@microsoft/signalr";
import { toast } from 'sonner';

export default function ChatPage() {

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
          .configureLogging(signalR.LogLevel.Debug)
          .withUrl("https://ez-api.azurewebsites.net/notification-hub", {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets,
          })
          .build();
    
        connection.start()
        .then(() => {
          console.log("Connection started")
        })
        .catch(() => console.log("Error connecting to SignalR"));
    
        connection.on("ReceiveMessage", (user, message) => {
          console.log(user, message);
          toast.info(`${message}`);
        });
    
        return () => {
          connection.stop();
        };
      }, []);

  return (
    <div className='p-4 space-y-4'>
        <h1>ChatPage</h1>
        <div>
            <p>Chat with your friends</p>
            <h2>User Info</h2>
            <p>Username: John Doe</p>
            <p>Email: uydev@gmail.com</p>
            <p>Avatar: 
                <img src="https://avatars.githubusercontent.com/u/36305929?v=4" alt="avatar" className='h-10 w-10'/>
            </p>
        </div>

        {/* login gg btn */}
        <Button  type="button">Login with Google</Button>

        {/* chat */}

        <div className="container">
            <div className="row p-1">
                <div className="col-1">User</div>
                <div className="col-5"><Input type="text" id="userInput" /></div>
            </div>
            <div className="row p-1">
                <div className="col-1">Message</div>
                <div className="col-5"><Input type="text"   id="messageInput" /></div>
            </div>
            <div className="row p-1">
                <div className="col-6 text-end">
                    <Button type="button" id="sendButton">
                        Send
                    </Button>
                </div>
            </div>
            <div className="row p-1">
                <div className="col-6">
                    <hr />
                </div>
            </div>
            <div className="row p-1">
                <div className="col-6">
                    <ul id="messagesList"></ul>
                </div>
            </div>
        </div>
    </div>
  )
}
