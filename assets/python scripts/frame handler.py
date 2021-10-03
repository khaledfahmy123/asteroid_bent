import cv2
import numpy as np
import mahotas
from pylab import imshow, show
import os 
import matplotlib.pyplot as plt


class LightCurve:
    def __init__(self , video:str , title:str):

        self.lst , self.MeanData = [],[]

        self.newpath = r'C:/Users/moham/Documents/projects/Asteroid Bent/Asteroid Data/{}'.format(title) 
        if not os.path.exists(self.newpath):
            os.makedirs(self.newpath)

        cap= cv2.VideoCapture('./input/{}.mkv'.format(video))

        i=0

        while(cap.isOpened()):

            ret, frame = cap.read()

            if ret == False:
                break

            cv2.imwrite(self.newpath+ '/{}.png'.format(str(i)),frame)

            self.lst.append(i)
            self.MeanData.append(LightCurve.__curvebuild(self,str(i)))

            i+=1

        cap.release()
        cv2.destroyAllWindows()


        array = np.asarray(self.MeanData)
        np.savetxt('./array/{}.txt'.format(video) , self.MeanData)
        #print(array)
        LightCurve.export(self,video)

    def __curvebuild(self, im):

        img = mahotas.imread(self.newpath+ '/{}.png'.format(im))
        img = img[:, :, 0]
        mean = img.mean()
        return mean 


    def export(self, video):


        plt.plot(self.lst , self.MeanData)
        #plt.show()
        plt.title(video +" "+ "Asteroid Light Curve")
        plt.xlabel("Frame Number")
        plt.ylabel("Luminosity Variation")
        plt.savefig('./Light Curves/{}.png'.format(video))


# asteroid1 = LightCurve( 'Mithra', 'asteroid 1')
# asteroid2 = LightCurve( 'Golevka', 'asteroid 2')
#asteroid3 = LightCurve( 'Kleopatra', 'asteroid 3')
#asteroid4 = LightCurve( 'Toutatis', 'asteroid 4')
#asteroid5 = LightCurve( 'Geographos', 'asteroid 5')
#asteroid6 = LightCurve( 'hw1', 'asteroid 6')
asteroid7 = LightCurve( 'Rock', 'asteroid 7')




