import React from "react";
import ReactPlayer from "react-player";

const VideoAd = () => (
  <div className="video-responsive">
    <a href="https://www.leadxchange.ai/" target="_blank">
    <ReactPlayer width="335" height="200" playing={true} muted={true} loop={true} url="https://www.techplusmedia.com/cxotv-lx-ad.mp4" />
    </a>
  </div>
);


export default VideoAd;