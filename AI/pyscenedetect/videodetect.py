from scenedetect import detect, AdaptiveDetector, split_video_ffmpeg
import scenedetect
scene_list = detect('data\subway.mp4', AdaptiveDetector())
a= split_video_ffmpeg('data\subway.mp4', scene_list)
print(a)
# print(scene_list)
print(scenedetect.video_splitter.is_ffmpeg_available ( ))


"""
PySceneDetect is a scene cut/transition detection program. PySceneDetect takes
an input video, runs detection on it, and uses the resulting scene information
to generate output. The syntax for using PySceneDetect is:

    scenedetect -i video.mp4 [detector] [commands]

For [detector] use `detect-adaptive` or `detect-content` to find fast cuts,
and `detect-threshold` for fades in/out. If [detector] is not specified, a
default detector will be used.

Examples:

Split video wherever a new scene is detected:

    scenedetect -i video.mp4 split-video

Save scene list in CSV format with images at the start, middle, and end of
each scene:

    scenedetect -i video.mp4 list-scenes save-images

Skip the first 10 seconds of the input video:

    scenedetect -i video.mp4 time --start 10s detect-content

Show summary of all options and commands:

    scenedetect --help

Global options (e.g. -i/--input, -c/--config) must be specified before any
commands and their options. The order of commands is not strict, but each
command must only be specified once.

Options:
  -i, --input VIDEO             [REQUIRED] Input video file. Image sequences
                                and URLs are supported.
  -o, --output DIR              Output directory for created files. If unset,
                                working directory will be used. May be
                                overriden by command options.
  -c, --config FILE             Path to config file. If unset, tries to load
                                config from C:\Users\201-24\AppData\Local\PySc
                                eneDetect\scenedetect.cfg
  -s, --stats CSV               Stats file (.csv) to write frame metrics.
                                Existing files will be overwritten. Used for
                                tuning detection parameters and data analysis.
  -f, --framerate FPS           Override framerate with value as frames/sec.
  -m, --min-scene-len TIMECODE  Minimum length of any scene. TIMECODE can be
                                specified as number of frames (-m=10), time in
                                seconds followed by "s" (-m=2.5s), or timecode
                                (-m=00:02:53.633). [default: 0.6s]
  --drop-short-scenes           Drop scenes shorter than -m/--min-scene-len,
                                instead of combining with neighbors.
  --merge-last-scene            Merge last scene with previous if shorter than
                                -m/--min-scene-len.
  -b, --backend BACKEND         Backend to use for video input. Backend
                                options can be set using a config file
                                (-c/--config). [available: opencv, pyav]
                                [default: opencv]
  -d, --downscale N             Integer factor to downscale video by before
                                processing. If unset, value is selected based
                                on resolution. Set -d=1 to disable
                                downscaling.
  -fs, --frame-skip N           Skip N frames during processing. Reduces
                                processing speed at expense of accuracy. -fs=1
                                skips every other frame processing 50% of the
                                video, -fs=2 processes 33% of the video
                                frames, -fs=3 processes 25%, etc...  [default:
                                0]
  -v, --verbosity LEVEL         Amount of information to show. LEVEL must be
                                one of: debug, info, warning, error, none.
                                Overrides -q/--quiet. [default: info]
  -l, --logfile FILE            Save debug log to FILE. Appends to existing
                                file if present.
  -q, --quiet                   Suppress output to terminal/stdout. Equivalent
                                to setting --verbosity=none.
  -h, --help                    Show this message and exit.

Commands:
  about             Print license/copyright info.
  detect-adaptive   Perform adaptive detection algorithm on input video.
  detect-content    Perform content detection algorithm on input video.
  detect-threshold  Perform threshold detection algorithm on input video.
  export-html       Export scene list to HTML file.
  help              Print help for command (`help [command]`).
  list-scenes       Create scene list CSV file (will be named...
  load-scenes       Load scenes from CSV instead of detecting.
  save-images       Create images for each detected scene.
  split-video       Split input video using ffmpeg or mkvmerge.
  time -s 10s       Set start/end/duration of input video.
  version           Print PySceneDetect version.

Type "scenedetect [command] --help" for command usage. See
https://scenedetect.com/docs/ for online docs.


"""