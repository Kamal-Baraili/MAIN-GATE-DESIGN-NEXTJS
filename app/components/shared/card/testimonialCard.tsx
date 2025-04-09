interface Props {
  imgSrc: string;
  reviewDesc: string;
  reviewName: string;
  reviewPost: string;
}

const TestimonialCard = ({
  imgSrc,
  reviewDesc,
  reviewName,
  reviewPost,
}: Props) => {
  return (
    <>
      <div className="p-8 border border-zinc-800 rounded-2xl hover:bg-[#121212] cursor-default hover:border-zinc-700">
        <div className="flex gap-4 items-center">
          <img
            className="w-10 h-10 lg:w-[2.5vw] lg:h-[5vh] rounded-full"
            src={imgSrc}
            alt=""
          />
          <div>
            <h3 className="text-zinc-500 font-semibold text-base lg:text-[1.0125vw]">
              {reviewName}
            </h3>
            <h4 className="text-sm text-zinc-600 italic text-sm lg:text-[0.9vw]">
              {reviewPost}
            </h4>
          </div>
        </div>
        <p className="text-zinc-400 mt-10 text-base lg:text-[1.0125vw]">
          {reviewDesc}
        </p>
      </div>
    </>
  );
};

export default TestimonialCard;
