#Initial Setup of Backend Server

###Setting up Apache-Flask with Docker Log

##__Docker:__

*Tutorial on how to initailly setup docker can be found here: 
..*Windows: (https://docs.docker.com/windows/)
..*Ubuntu: (https://docs.docker.com/engine/installation/linux/ubuntulinux/)

*Step 1 of the installation requires enabling virtualization. I checked if my computer had it enabled in the task manager here (highlighted in green): *insert Pic*

..**(NB: This method of checking if Virtualization is enabled via Task Manager, can only done on Windows 8 and above. If running an older version of Windows, you have to run a special tool which is linked in the Docker installation guide. Luckily I am running Windows 10.)*

*Initially it was disabled on my laptop and so to change it I had to go into the BIOS to change it.
*When my laptop boots I have to press F10 to get into the BIOS. I hadn’t realised that this would be different for an HP laptop so i was pressing del. It wasn’t until i googled my model number that I found out it was F2 i should be pressing. It is important to consult the motherboard manual, or google the laptop's model number to find out which button to press (usually either F2, F10, F12 or del).
*After I had figured out how to get into the BIOS I restarted my laptop. The problem I had here was that my laptop was skipping the motherboard screen entirely so I couldn’t get into the BIOS. Windows 8 and above have a technology called Hybrid Shutdown enabled by default. This improves laptop startup and shutdown speeds but skips the motherboard screen on startup. I had to do a full shutdown by holding the SHIFT key while shutting down the laptop. After the full shutdown and turning the laptop back on, I could successfully get into the BIOS by pressing F10.
*This screenshot shows where to enable Virtualization. Where this is located will vary across different laptops and motherboards. But it should be found somewhere *insert pic*

*From here on, installing Docker was easy on my laptop.
*However I had new problems with installing Docker on my desktop at home.
..*After installation was complete and I ran the Docker Quickstart Terminal, I would get an error saying that “bash is missing”.
..*My desktop has the Windows OS installed on an SSD and I installed Docker on my HDD which I use for storage.
..*This error was fixed by installing Docker on my SSD, the same drive which Windows is installed on, which is the C drive. ALWAYS install on C drive.

##Apache-Flask

*Initially decided to use Node.js as the Framework but opted to go with Flask by Layne’s recommendation. Flask is a Python microframework for generating web pages. There are implementations already out there, meaning all we have to do is fork their repo and start sticking our code in. We are using Apache to serve the webpages in the docker image. We could have ran Flask directly but it would have been a lot less reliable than if we have a server handling things like concurrency etc.

*Layne forked repo into project git from:
..*(https://github.com/muneeb-ali/apache-flask)
*I forked repo from project git into my repo from:
..*(https://github.com/operationzombie/apache-flask)

*Tried using the instructions on the gits readme to install flask and get it running but I could not progress from step 5:
..*docker build -t=YOUR_TAG .
..*This command just would not work for me. I didn’t know what “YOUR_TAG” meant so I spent hours googling and then trying different things in the command such as replacing it with “latest”, but had no success. I moved on to Ubuntu
..*Same issues on Ubuntu
..*The problem was you need to include the '.' at the end

*Ran step 6 but I couldn’t view the test page so I couldn’t confirm if I had actually done it. 
..*Tried viewing test page on http://localhost/ like the readme suggested with no success.
..*Tried using http://localhost/80 because we were using port 80 but still no success and I was stumped.
..*Callum comes in tells me that Docker uses its own ip, and the test page will be there.
..*Tried 192.168.99.100 which is the ip for the Docker container and finally I have a test page that I can see.
*3 days later, we have successfully set up the tools to create our server.
..*(Tuesday 10/5/16 - Thursday 12/5/16)