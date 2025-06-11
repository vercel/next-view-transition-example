import bpy
import os
import shutil
from mathutils import Vector
from math import radians

# === CONFIG ===
rotation_duration = 120
rotation_degrees = 360
rotation_axis_index = 2  # Z axis
camera_distance = 0.8
camera_height = 0.8
light_height = 5.0
output_folder = bpy.path.abspath("//frames/")

scene = bpy.context.scene

# === Remove frames/ folder if it exists ===
if os.path.exists(output_folder):
    shutil.rmtree(output_folder)
os.makedirs(output_folder, exist_ok=True)

# === Meshes ===
meshes = [obj for obj in scene.objects if obj.type == 'MESH']
if not meshes:
    raise Exception("No mesh objects found")

center = sum((obj.location for obj in meshes), Vector()) / len(meshes)

# === Empty pivot ===
empty = bpy.data.objects.get("Rotation_Empty")
if not empty:
    empty = bpy.data.objects.new("Rotation_Empty", None)
    empty.location = center
    empty.empty_display_type = 'PLAIN_AXES'
    bpy.context.collection.objects.link(empty)
    for obj in meshes:
        obj.parent = empty
else:
    empty.location = center

# === Rotate animation ===
start_frame = 1
end_frame = start_frame + rotation_duration
scene.frame_start = start_frame
scene.frame_end = end_frame

empty.animation_data_clear()

empty.rotation_euler = (0.0, 0.0, 0.0)
empty.keyframe_insert(data_path="rotation_euler", frame=start_frame)

rot = list(empty.rotation_euler)
rot[rotation_axis_index] += radians(rotation_degrees)
empty.rotation_euler = tuple(rot)
empty.keyframe_insert(data_path="rotation_euler", frame=end_frame)

action = empty.animation_data.action
for fcurve in action.fcurves:
    for kp in fcurve.keyframe_points:
        kp.interpolation = 'LINEAR'

# === Camera ===
camera = bpy.data.objects.get("Camera")
if not camera:
    cam_data = bpy.data.cameras.new("Camera")
    camera = bpy.data.objects.new("Camera", cam_data)
    bpy.context.collection.objects.link(camera)
    scene.camera = camera

camera.location = center + Vector((0.0, -camera_distance, camera_height))
direction = center - camera.location
camera.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()
camera.data.lens = 35

# === Light ===
light = bpy.data.objects.get("Key_Light")
if not light:
    light_data = bpy.data.lights.new(name="Key_Light", type='AREA')
    light_data.energy = 1000
    light = bpy.data.objects.new(name="Key_Light", object_data=light_data)
    bpy.context.collection.objects.link(light)

light.location = center + Vector((0.0, 0.0, light_height))
light.rotation_euler = (radians(-90), 0, 0)

# === Background ===
scene.world.use_nodes = True
bg_node = scene.world.node_tree.nodes.get('Background')
if bg_node:
    bg_node.inputs[1].default_value = 1.0

# === Render settings ===
scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_mode = 'RGBA'
scene.render.film_transparent = True
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080
scene.render.fps = 24
scene.render.filepath = os.path.join(output_folder, "frame_")

# === Render ===
bpy.ops.render.render(animation=True)

print(f"✅ Generated 'frames/' folder generated.")
