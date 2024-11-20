function updateSingleVideo() {
    var demo = document.getElementById("single-menu-demos").value;
    var task = document.getElementById("single-menu-tasks").value;
    var inst = document.getElementById("single-menu-instances").value;

    console.log("single", demo, task, inst)

    var video = document.getElementById("single-task-result-video");
    video.src = "https://cliport.github.io/media/results_web/" + 
                task + 
                "-two_stream_full_clip_lingunet_lat_transporter-n" + 
                demo + 
                "-train/videos/" + 
                task +
                "-0000" + 
                inst + 
                ".mp4";
    video.playbackRate = 2.0;
    video.play();
}

function updateMultiVideo() {
    var demo = document.getElementById("multi-menu-demos").value;
    var task = document.getElementById("multi-menu-tasks").value;
    var inst = document.getElementById("multi-menu-instances").value;

    console.log("multi", demo, task, inst)

    var video = document.getElementById("multi-task-result-video");
    video.src = "https://cliport.github.io/media/results_web/" + 
                task + 
                "-two_stream_full_clip_lingunet_lat_transporter-n" + 
                demo + 
                "-train/videos/multi-language-conditioned-" + 
                task +
                "-0000" + 
                inst + 
                ".mp4";
    video.playbackRate = 2.0;
    video.play();
}