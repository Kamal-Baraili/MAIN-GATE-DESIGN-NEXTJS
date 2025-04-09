const Video = () => {
  return (
    <>
      <div className="mt-30 relative">
        <div className="w-full h-30 lg:h-80 bg-gradient-to-b from-black via-black/50 to-transparent absolute top-0"></div>
        <video loop autoPlay muted className="w-full h-[60vh] lg:h-screen object-cover">
          <source
            src="https://res.cloudinary.com/dzwqf8snn/video/upload/v1742794793/x6yll3l6mupthcywi7im.mp4"
            type="video/mp4"
          />
        </video>
        <div className="w-full h-30 lg:h-80 bg-gradient-to-t from-black via-black/50 to-transparent absolute bottom-0"></div>
      </div>
    </>
  );
};

export default Video;
