# 4-in-a-row in React

I based this project on the tic-tac-toe tutorial for React. The tutorial can be found here: https://reactjs.org/tutorial/tutorial.html

The design more or less follows that of the tutorial, and I've kept the time travel feature from the original implementation.

## Background

I've worked with React for a couple of years now, but never tried it from a beginner's perspective, nor had I tried the tutorials provided by the React team.
One day, I thought it was high time to try React the way the team wanted it to be learned, rather than entering the pool from the deep end.

Before I had gotten through just following the tic-tac-toe tutorial, I had decided that there were a few things I didn't like.
When it comes to React, my philosophy is that it's better to use functional components wherever possible, and thus, I set out to get rid of any class components.
Functional components gives one access to hooks, and I've found that certain hooks have a way of forcing you to think in ways that make you write better code.

I also wanted something with a little more complexity than tic-tac-toe, to at least provide some measure of challenge to a child (or very tired adult).
This sort of thing might serve as a handy illustration when explaining to my nephews (and other people) what I do for a living, I thought.

As I was working on it, my wife was disappointed at finding out that the game was strictly a two player affair.
Thus, I spent a little while making it play against you, introducing a very simple 'AI'.
I set a challenge for myself to do it entirely on my own, and did it without looking at how it's usually done.

I also implemented a 'chance' of having the AI make a mistake, just because I felt like it.

## Planned Changes

When I have the time and inclination to work on this again, I have some ideas on how to make it better.

### Dynamic Layout

Instead of using the current fixed layout, I've been considering a grid-based layout and functionality to let players adjust the height and width of the grid.
This should make the game more interesting to play, and probably also make for better code.

### Generating Winning Lines Differently

The game currently depends on a set of predetermined winning lines, borrowing the logic from the tic-tac-toe tutorial.
I like the simplicity of the solution I've borrowed my logic from, but dynamically generating a list of winning lines would let me manipulate the grid easier.

### More Game Modes

If wins can be calculated dynamically, and the size of the grid can be altered. Why not let the size of a winning row be set by the players?
I will likely set some sort of limitation, of course, but at least adding the options of three-in-a-row and five-in-a-row would make things more interesting.

### More players

Why stick to traditions? Letting three, or even more (computer-driven or human), players play against each other would really increase complexity and fun.

### Getting Rid of Time Travel

Currently, I'm not sure I see the point of it, other than as some sort of product demo for React itself.

### Optimization

As of now, the game plays fine on modern PC-hardware and phones (it'd be disconcerting if it didn't), but there's room for improvement.

### General Design

The very minimalistic design of the current UI isn't my own at all. It comes directly from the tutorial.
In time, I'd like a more colorful and interesting interface, to better appeal to my intended target audience. 

### Netplay

As of now, gameplay takes place purely per client/browser. Adding the possibility of playing against opponents online would make the game a lot mote interesting.

# I Started this project with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm i` or `npm install`

Installs the dependencies specified in the package.json of this project.

### `npm run cleanInstall`

Cleans out the node_modules folder of the project, and reinstalls the dependencies specified in the package.json of this project.

This is sometimes handy when dependencies have been drastically altered, especially when switching branches.

Note: The current iteration of this script is for windows only.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.