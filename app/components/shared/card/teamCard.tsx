import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  imgSrc: string;
  memberName: string;
  memberPost: string;
}

interface Item {
  item: Props;
  index: number;
}

const TeamCard = ({ item, index }: Item) => {
  return (
    <>
      <div
        className={`${(index === 1 || index === 4) && "lg:mt-30"} ${
          (index === 2 || index === 5) && "lg:-mt-40"
        }`}
      >
        <div className="w-full rounded-2xl overflow-hidden">
          <img
            className={`w-full h-[50vh] object-cover opacity-60 rounded-2xl hover:opacity-85 hover:scale-[1.1] transition-all ease-in-out duration-200`}
            src={item.imgSrc}
            alt={item.imgSrc}
          />
        </div>
        <div className="py-5 flex justify-between items-center gap-3 border-b border-b-zinc-600">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.05vw] text-zinc-400 font-semibold">
            {item.memberName}
          </h3>
          <div className="w-1/3 my-2 flex justify-center gap-4">
            <span className="text-zinc-400 text-3xl lg:text-[2.05vw]">
              <Icon icon="line-md:facebook" />
            </span>
            <span className="text-zinc-400 text-3xl lg:text-[2.05vw]">
              <Icon icon="ri:twitter-fill" />
            </span>
            <span className="text-zinc-400 text-3xl lg:text-[2.05vw]">
              <Icon icon="ant-design:instagram-filled" />
            </span>
          </div>
        </div>
        <h4 className="pt-2 text-zinc-400 italic text-md md:text-lg lg:text-[1.2vw]">
          {item.memberPost}
        </h4>
      </div>
    </>
  );
};

export default TeamCard;
