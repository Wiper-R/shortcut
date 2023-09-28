const HeroSection = () => {
  return (
    <section className="mx-5 mb-6 mt-24 md:mt-36">
      <h2 className="text-5xl xl:text-6xl font-extrabold whitespace-break-spaces max-xsm:max-w-lg max-xsm:mx-auto xsm:space-x-4 xsm:text-center xl:mt-20">
        <span className="max-xsm:block text-primary">Success</span>
        <span className="max-xsm:block">Begins</span>
        <span className="max-lg:block text-center">with</span>

        <span className="max-xsm:text-end xsm:space-x-4">
          <span className="max-xsm:block text-primary">Simplified</span>
          <span className="max-xsm:block">Sharing!</span>
        </span>
      </h2>
      <p className="text-gray-700 my-8 text-center text-xl md:text-2xl">
        Are you tired of clunky links cluttering your online presence? Look no
        further!
        <br /> <b>LinkSwift</b> is your trusted companion for streamlining your
        web sharing experience.
      </p>
    </section>
  );
};

export default HeroSection;
