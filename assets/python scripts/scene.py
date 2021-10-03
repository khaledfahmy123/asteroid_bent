import bpy
from math import radians


def clean():

    if bpy.context.object.mode == 'EDIT':

        bpy.ops.object.mode_set(mode='OBJECT')

    bpy.ops.object.select_all(action='SELECT')

    bpy.ops.object.delete()


class Scene:

    def __init__(self , infile:str , informat:str , outfile:str):

        self.scene = bpy.data.scenes["Scene"]

        self.infile  = infile
        self.outfile = outfile
        self.format = informat 
        
        self.inpath =  "C:/Users/moham/Documents/projects/Asteroid Bent/test/{}.{}".format(self.infile,self.format)
        self.outpath = "C:/Users/moham/Documents/projects/Asteroid Bent/input/{}.mkv".format(self.outfile)


        Scene.camera(self)
        Scene.light(self)
        Scene.output(self)
        Scene.object_add(self)

    def object_add(self):


        if self.format == 'stl':
            bpy.ops.import_mesh.stl(filepath = self.inpath)

        elif self.format == 'obj' :  
            bpy.ops.import_scene.obj(filepath = self.inpath)     

        elif self.format == 'fbx' :  
            bpy.ops.import_scene.fbx(filepath = self.inpath)  

        
        asteroid = bpy.data.objects[self.infile]
        bpy.ops.object.shade_smooth()
        asteroid.rotation_mode = 'XYZ'

        asteroid.rotation_euler = (0, 0, 0)
        asteroid.keyframe_insert('rotation_euler', index=2 ,frame=1)

        asteroid.rotation_euler = (0, 0, radians(360))
        asteroid.keyframe_insert('rotation_euler', index=2 ,frame=75) 
      
        kf = asteroid.animation_data.action.fcurves[0].keyframe_points[0]
        kf.interpolation = 'LINEAR'
        
    def camera(self):

        bpy.ops.object.camera_add(enter_editmode=False, align='VIEW', location=(8, 0, 0), rotation=(radians(90), 0, radians(90)), scale=(1, 1, 1))



    def light(self):
        
        bpy.ops.object.light_add(type='SPOT', radius=1, align='WORLD', location=(8, 0, 0), rotation = (radians(90), 0 ,radians(90)),scale=(1, 1, 1))

        light = bpy.data.objects['Spot']
        light.data.energy = 1500

        light.data.spot_size = 0.698132
        light.data.shadow_soft_size = 0.35


    def output(self):

        self.scene.render.film_transparent = True
        self.scene.render.resolution_x = 600
        self.scene.render.resolution_y = 600
        self.scene.frame_end = 75
        self.scene.render.fps = 30
        self.scene.render.image_settings.file_format = 'FFMPEG'
        self.scene.render.ffmpeg.format = 'MPEG4'
        self.scene.render.ffmpeg.codec = 'H264'
        self.scene.render.image_settings.color_mode = 'RGB'
        self.scene.render.use_file_extension = False
        self.scene.render.filepath = self.outpath 


clean()
#Scene("Golevka" , "stl" , "Golevka")
#Scene('Mithra' , 'stl' , 'Mithra')
#Scene('Kleopatra' , 'stl' , 'Kleopatra')
#Scene('Toutatis' , 'stl' , 'Toutatis')
#Scene('Geographos' , 'stl' , 'Geographos')
#Scene('hw1' , 'stl' , 'hw1')