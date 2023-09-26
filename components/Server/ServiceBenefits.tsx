const benefits = [
  [
    "Shorten Links",
    "Say goodbye to those sprawling URLs. LinkSwift effortlessly trims them down into sleek, shareable links.",
  ],
  [
    "QR Code Generation",
    "Enhance user accessibility by generating QR codes for your shortened links. It's quick, it's easy, and it's all right here.",
  ],
  [
    "Track with Confidence",
    "Securely log in to LinkSwift and gain complete control. Track link performance, monitor traffic sources, and manage your links, all from a user-friendly dashboard.",
  ],
  [
    "Absolutely Free",
    "Best of all, our premium features are at your fingertips, without costing you a dime. No hidden fees, no tricks – just powerful link management, free for you.",
  ],
];

const Benefit = ({
  heading,
  description,
}: {
  heading: string;
  description: string;
}) => {
  return (
    <li>
      <span className="font-semibold">{heading}:</span>{" "}
      <span>{description}</span>
    </li>
  );
};

const ServiceBenefits = () => {
  return (
    <article className="box-border sm:mx-6 md:mx-12 lg:mx-20 xl:mx-44">
      <h4 className="text-center text-3xl underline my-8 font-semibold">
        Why LinkSwift?
      </h4>
      <div className="bg-white my-8 shadow sm:rounded-md">
        <ul className="p-5 text-xl space-y-5">
          {benefits.map(([head, desc]) => (
            <Benefit key={head} heading={head} description={desc} />
          ))}
        </ul>
      </div>
    </article>
  );
};

export default ServiceBenefits;
