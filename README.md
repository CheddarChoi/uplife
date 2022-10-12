<p align="center">
<img src="https://github.com/CheddarChoi/uplife/blob/main/public/uplife_logo.png" width="20%"/>
<br/>
</p>
<p>This project is implemented for Design Project of <b>KAIST CS492: Data Visualization</b>.<p/>

## Project Name & Pitch

**Uplife** is made to help users 
* reflect on their phone usage pattern
* set goals for better usage habits

based on phone usage and emotional status data

## Build with

- [React.js](https://reactjs.org)
- [React-Bootstrap](https://react-bootstrap.github.io)
- [React-Plotly](https://plotly.com/javascript/react/)
- [Redux](https://redux.js.org/)

## Project Status

This project is deployed at https://uplife-dv.herokuapp.com/.
This project is almost completed. We are going to reflect user feedback after presentation.

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`

To Run Development Suite:

`npm start`

To Visit App:

`localhost:3000/`

## Project Screenshots
<figure class="half">
  <img src="https://github.com/CheddarChoi/uplife/blob/main/uplife_screenshot1.png"/>
  <img src="https://github.com/CheddarChoi/uplife/blob/main/uplife_screenshot2.png"/>
<figure>

## Project Structure

### Main Pages

#### `/`

Main page with several data visualizations supporting users to get insights on smartphone usage patterns.

#### `/goal`

Goal setting page showing current goals and types of goals that can be set.

#### `/goal/`

Page with quizzes for review each lecture. This quizzes are made by other classmates' questions.

#### `/goal/total`

Goal setting page for setting time limit on their phone usage

#### `/goal/category`

Goal setting page for setting time limit on certain category of applications

### Components

#### `/Graphs`

All graphs are at this directory. All graphs are made with React-plotly

#### `/Variables`

Global variables such as app categories and colors schemes.

#### `/Functions`

Additional functions for dealing with time data.

#### `Header.js`, `SectionTitle.js`
