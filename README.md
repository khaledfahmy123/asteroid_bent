# Asteroid-Bent

## Introduction and Overview
Asteroid Bent is more like an educational tool for investigating how the irregularities of the shapes can affect their light curves and we are talking here about asteroid especially Trojans.

Trojan asteroids are located in the orbit of Jupiter. Due to the long distance, they are barely detected and appear as single unresolved points in sky. To tackle this problem we have to use a technique called backward modeling to predict the shape of the asteroid from  given data like rotation span, axis of rotation, etc. However, in this project we have used the forward modeling approach, which in turn is very useful to collect data which can be fed to a machine learning model to detect patterns.

## Simulation

we have used blender-python API to create a scene resembles the solar system condition, it is primitive as it seems. The whole scene is rendered from one perspective (cam position is fixed).

<p align ="center">
<img src="https://user-images.githubusercontent.com/59314933/144955388-ebbc6fcc-3925-482f-9428-df8df6614c84.gif">
</p>



## Algorithm
We begin with the rendered video came from the scene. 
- split to frames
- apply color-map to git rid of noise
- calculate pixels mean value
- plot light curve (frame number vs mean value)

It turns out we got beautiful sinusoidal-looking graphs! 

### Sample:

Toutatis Asteroid           |  Geographos Asteroid
:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/59314933/144957505-b99a5903-9c1d-4e22-b663-8fee8bc7a3a4.png)  |  ![](https://user-images.githubusercontent.com/59314933/144957520-c987ab47-9961-4720-b88d-1788426e80a9.png)



## GUI
The last piece. An interactive window where you can choose your object and closely study its real-time generated light curve. It is implemented in electron.js 
   
<p align ="center">
<img src ="https://user-images.githubusercontent.com/59314933/144955390-211be556-fc76-4142-94b1-26eadbe49fa5.gif">

</p>

