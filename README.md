# PICode

### Project-Integrated COllaborative Development Environment

## What is the PICode?

---

PIcode is a web page that supports all development environments of the project so that users can collaborate without additional programs.

## What's the difference from other IDEs?

---

### Work without any external modules

If you are going to start a project, you need a program for document management function, chat function to communicate with team members, and issue management function in addition to the code editor. However, if you use PICode, you can use all of the above functions on just a single web page.

-   code edit function

![codespacegif](https://user-images.githubusercontent.com/37172677/140647058-60321941-dc6e-4f3c-be4c-9882ad6b657c.gif)

-   chat function

![chatspace](https://user-images.githubusercontent.com/37172677/140647008-74eb4717-81dc-49e4-9fec-51b6ca466745.gif)

-   note function

![module_note](https://user-images.githubusercontent.com/28240077/132638418-a97da4c3-a315-4681-9679-4e38c5f2efb8.gif)

### Possible collaboration

Through PICode real-time communication, you can see in real time where your team members are working, what they are working on. Therefore, you can work on documents or codes with them, or you can discuss the team's work by chatting in real time.

![collaborate_code](https://user-images.githubusercontent.com/28240077/132559165-3f49e62d-d0f9-4ef7-a25f-c8fee82e3c02.gif)

### Visualization

Through container visualization, you can see all workspace structures and states. In addition, you can simply control network creation, container and network connection, and connection between containers by clicking nodes and buttons. Also you can turn on and off Container in this page.

![container3](https://user-images.githubusercontent.com/37172677/140646913-59bcb934-9193-46b7-a31a-62e06f60fbbb.gif)

### Work without changing environment

If you want to work in vscode editor, use the vscode extension supported by PICode.
Connect with PICode server, input ID and password in the vscode extension. Once you login, select workspace then you can get the selected workspace codes and work in the vscode.

![extension_vscode](https://user-images.githubusercontent.com/28240077/132559602-a2a90470-b371-4331-901d-ef9f5300d8ea.gif)

## Development Environment

---

-   Linux or related OS
-   Docker v20.X
-   npm v7.X
-   node v14.X

## How to start PICode?

---

1. Install all of our npm module on terminal ( `npm i` )
2. Create .env file (essential)
3. Enter in env file. (essential)
```
PORT=Front server port
NEXT_FE_API_URL=Backend server url
NEXT_PUBLIC_WS_PORT=Plz write websocket port you want 
NEXT_PUBLIC_WS_URL=Front end URL(not includes port, protocol)
NODE_ENV=production
```
6. Enter `npm run-script build` on terminal
7. Enter `npm run-script start` on terminal
8. Enter the url on web browser and login
9. it's worked!

## Documentation

---

Documentation is on our website.

<https://picode-team.github.io/picode-page/>

## CONTRIBUTE

---

If you want contribute our projcect, please read it!

[contribute](https://github.com/PICode-Team/PICode/blob/develop/contribute)

## LICENSE

---

[license](https://github.com/PICode-Team/PICode-Client/blob/develop/License)

## Contact us

---

[Nevation](https://github.com/Nevation)
[EunPyoLee1010](https://github.com/EunPyoLee1010)
[benovice](https://github.com/benovice)
[wlsrn3684](https://github.com/wlsrn3684)
