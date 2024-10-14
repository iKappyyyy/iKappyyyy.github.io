# juvSoccerLayout
W.I.P

Features that need to be done:
- Create First Webpage
- Create Second Webpage
- Phone Integration

here's a quick sketch I created of how I want the first page to look like:
![image](https://github.com/user-attachments/assets/38a3acfd-dc87-4627-a2d5-0ccb76ee06ab)

after that I wanna be transitioned into a page that resembles this quick sketch:
![image](https://github.com/user-attachments/assets/86b8eea9-46e8-4097-8497-927e6c481ff9)
I couldn't fit in every example card but I wanna be able to click the card and have a list
of players to choose from. whether that list is on the side or is kind of like a dropdown menu I am yet to decide

I think I'll make 2 separate html pages and then move the data via the url but we'll have to see how things will go

WORK
=======================
UPDATE!

![image](https://github.com/user-attachments/assets/ae05b459-a396-4440-af98-8bbc615958cc)

so I started by asking ChatGPT to make me some sort of base I could start working with, and when it horribly failed I started working.

I started by making the cycle part, which works perfectly except for the fact that it doesn't do anything at the moment,
and I'm currently working on how I wanna position the players/dots on the field.

when I asked chatgpt for some help they initially set some obscure top and left value to each dot and then changed it everytime you change the layout - this is super bad,
because not only do I have to pretty much GUESS what the player's values are, it also looks really shitty in the code.

So instead, I split the field into a grid, and right now I'm trying to figure out what the size of the grid needs to be, so I could position the players in a square everytime, making it more consistent in the process.
It might come at a cost of not being able to animate the movement but, I'd rather do it this way than have to work with obscure pixel values.


UPDATE #2!!
okay so I realized I know nothing about soccer. no matter how much I try to research it I don't really get what they want and how to do it so instead I'm gonna do this:
I'm gonna wait till my little brother wakes up (because he asked me to make this website) and ask him to position players on this grid:

![image](https://github.com/user-attachments/assets/1b89cb4a-05cd-45d3-81e2-c8815d34a4e9)

and tell me which layouts he positioned or if he needs a bigger grid or something - that way I know I'm not getting anything wrong, and I'm only adding the useful layouts (I don't know how soccer works)

right now I'm gonna test if the animations work and then maybe begin construction of the other page while I wait for him to wake up

DAY 2
==================
so the animations do NOT work, maybe I'll find a way to add them in the future but it's fine for now.
I got my little brother to start working on the thing and for now I wanna try and add mobile support and design the DONE button

website should work on mobile up until like ~180 px width (hopefully no one has a screen that thin)
gonna work on done button now

DAY 3
=================
so the reason I haven't been updating is because I realized I get really bored telling nothing and no one what I'm trying to do, so instead I might just write a quick check-up every day or so if I feel like it.

at this point I pretty much finished the first page

![image](https://github.com/user-attachments/assets/cdd86503-feab-4d8f-9c08-ef48a12bf064)

it should have mobile integration but we'll see if it works after I release this, I added a bunch more shit but the main thing I gotta work on right now is the second page.
A couple problems I thought about, I have no clue how I'm gonna be able to take a picture of JUST the middle part (which is where the photo is) I guess if I REALLLYYYY can't do it I'll just take a picture of the whole page and it should be fine but
idk I hope I can make it work. plus on mobile it might look reallyyyy weird so we'll see about that too.

for now I wanna check on how to do the image thing and I wanna figure out how to align this grid

![image](https://github.com/user-attachments/assets/dba9755c-b67c-4f43-a8d2-714e81105c8e)

I was HOPING for it to align but it seems like things are just ever so slightly wrong, and the dots and lines don't perfectly align with the cells of the grid. So we'll see about that TOO.
I need the pictures to add and I need to design a thing to click in order to pick the player on each position but I think right now it's more important to figure out how to lay out the positions themselves.


