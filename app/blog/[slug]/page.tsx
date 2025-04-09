import Link from "next/link";
import RelatedBlogs from "../../components/ui/related-blogs/relatedBlogs";
import { blogCardData } from "@/app/db/mockdata";
import { notFound } from "next/navigation";

const BlogDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const blogdetail = blogCardData.find(
    (blog: { slug: string }) => blog.slug === slug
  );

  if (!blogdetail) return notFound();

  const { title, imgSrc, authorImg, author, date } = blogdetail;

  return (
    <>
      <div className="w-11/12 md:w-7/11 lg:w-5/11 mx-auto mt-25 lg:mt-[13vh]">
        <div className="w-12">
          <Link href="/blog">
            <div className=" flex gap-2 text-zinc-300 opacity-70 hover:opacity-90 hover:text-zinc-100 hover:gap-3 transition-all ease-in-out duration-100">
              <img className="" src="/blog/arrow-left.svg" alt="" />
              <span className="text-base lg:text-[1.05vw]">Back</span>
            </div>
          </Link>
        </div>
        <div className=" mx-auto mt-10 rounded-2xl flex flex-col gap-4 items-start">
          <div className="flex flex-col gap-20">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.3vw]  mb-2 pt-2 text-zinc-400">
              {title}
            </h3>
          </div>
          <div className="w-full mx-auto my-5 flex justify-between pb-10 border-b border-b-zinc-700 text-zinc-400">
            <div className="flex gap-2 items-center">
              <img
                className="w-8 h-8 lg:w-[2vw] lg:h-[4vh] rounded-full"
                src={authorImg}
                alt="author-image"
              />
              <span className="text-sm sm:text-base lg:text-[1.05vw]">
                {author}
              </span>
            </div>
            <span className="text-[13px] sm:text-sm lg:text-[0.9125vw]">
              {date}
            </span>
          </div>
          <img
            className={`w-full rounded-2xl opacity-75 h-[40vh] sm:h-[50vh] md:h-[60vh] object-cover`}
            src={imgSrc}
            alt="blog-image"
          />
        </div>
        <p className="mt-10 tracking-wider text-zinc-500 text-base lg:text-[1.05vw]">
          Unveiling the Mysteries of Vaastu Shastra for Main Gate Are you
          seeking harmony and positive energy in your home? If so, then
          understanding the ancient art of Vaastu Shastra for your main gate
          could be the key to unlocking balance and prosperity in your life.{" "}
          <br /> <br />
          Let’s delve into the fascinating world of Vaastu Shastra and explore
          how it can positively impact your living space through the design and
          placement of your main gate. The Importance of Main Gate in Vaastu
          Shastra In Vaastu Shastra, the main gate of a house holds immense
          significance as it serves as the primary entry point for energy to
          flow into the home.
        </p>
        <h2 className="text-2xl lg:text-[1.6vw] my-5 pt-2 text-zinc-400 capitalize">
          What really are the The Importance of Main Gate Design and Fabrication
          in Nepal
        </h2>
        <p className="tracking-wider text-zinc-500 text-base lg:text-[1.05vw]">
          Each direction corresponds to different elements and energies,
          impacting various aspects of life. For example, a main gate facing
          east attracts abundance and prosperity, while a gate facing west
          promotes stability and emotional well-being.  Symbols and
          Decorations: The main gate should be adorned with auspicious symbols
          and decorations that invite positive energy into the home. <br />
          <br /> Consider incorporating elements such as Om symbols, Swastikas,
          or Torans to enhance the gate’s energy and create a welcoming
          entrance.  Obstacles and Blockages: Ensure that the main gate is free
          from any obstacles or blockages that could obstruct the flow of
          energy. Keep the pathway clear and well-lit to allow for smooth entry
          and exit, promoting a sense of ease and harmony.
          <br /> <br /> This energy, known as “Prana,” plays a vital role in
          determining the overall atmosphere and well-being of the inhabitants.
          Therefore, the design and placement of the main gate can either
          attract positive energy or block its flow, affecting various aspects
          of life such as health, relationships, and success. Factors to
          Consider for Main Gate Placement  Direction: According to Vaastu
          Shastra, the main gate should ideally face a favorable direction based
          on the owner’s birth chart.
        </p>
        <h2 className="text-2xl lg:text-[1.6vw] my-5 pt-2 text-zinc-400 capitalize">
          Conclusion
        </h2>
        <p className="tracking-wider text-zinc-500 text-base lg:text-[1.05vw]">
          Implementing Vaastu Shastra Principles for Your Main Gate Now that you
          understand the fundamental aspects of Vaastu Shastra for your main
          gate, it’s time to put these principles into practice. By following
          these guidelines, you can create a harmonious and balanced environment
          that fosters positivity and well-being within home. <br />
          <br /> Tips for Implementing Vaastu Shastra for Main Gate  Consult
          with a Vaastu expert to determine the most suitable direction and
          placement for your main gate based on your specific needs and
          circumstances.  Ensure that the main gate is kept well-maintained, as
          any signs of neglect or disrepair can disrupt the flow of energy and
          create negative vibrations. <br />
          <br /> Incorporate elements of nature such as plants, water features,
          or natural materials near the main gate to enhance the overall energy
          and create a serene ambiance. Vaastu Shastra offers a holistic
          approach to harmonizing energy flow within your living space, with the
          main gate serving as a gateway to invite positivity and abundance into
          your life. By understanding and implementing the principles of Vaastu
          Shastra for your main gate, you can create a harmonious environment
          that nurtures well-being and prosperity for you and your loved ones.
        </p>
      </div>
      <RelatedBlogs />
    </>
  );
};

export default BlogDetail;
