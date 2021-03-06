# Olivia Dill's Final Project

## Annotating Ancient Faces

For my final visualization project, I wrote a piece of software to allow a user to manually annotate an image of a face, mark the 68 facial features, and save those annotations to a .csv file. This project was motivated by my work this summer with a set of ~150 portraits from 2nd century AD Egypt.  Automatic facial recognition, which was trained to work on photographs, did not work for the majority of my portraits and I needed a way to extract the information for those which had failed.  I used Bokeh, with javascript callbacks, to develop this tool. The code (1) loads and formats an image to be displayed, (2) sets up a data source to store the location of the points, (3) sets up callbacks to read and store the location of mouse clicks and other actions, and (4) writes out the final data. 

[A live version is available here.](https://ageller.github.io/IDEAS_FSS-Vis/FinalStudentProjects/2017/OliviaDill/Annotation.html)
