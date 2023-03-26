from flask import Flask, render_template, Response
from camera import *

app = Flask(__name__)

headings = ("Name","Album","Artist","URL")
featuredPlaylist = music_rec()
featuredPlaylist = featuredPlaylist.head(15)
@app.route('/')
def index():
    print(featuredPlaylist.to_json(orient='records'))
    return render_template('index.html', headings=headings, data=featuredPlaylist)

def gen(camera):
    while True:
        global featuredPlaylist
        frame, featuredPlaylist = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen(VideoCamera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/t')
def gen_table():
    return featuredPlaylist.to_json(orient='records')

if __name__ == '__main__':
    app.debug = True
    app.run()
