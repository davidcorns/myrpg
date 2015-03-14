# myrpg

Installation:

1. install nodejs and npm
2. clone this repository
3. in the project directory, run comand:
    npm install express  loglevel  moment nodejs-websocket
4. in the myrpg/node-modules direcotry, clone the mylog repository
5. to start the server, run command:
    nodejs main.js
6. opne the client at browser, url: http://localhost:8080
7. use w, a, s, d to move the player!

--------------------------------------------------------------------

Design:

Client       Server(Presentation Servers <--------------------------> Game Logic <-------> Database)

        <--         |- http: for static contents
        
        <--         |- restful: for resources delivering
        
        <-->        |- websocket: for realtime game communication
