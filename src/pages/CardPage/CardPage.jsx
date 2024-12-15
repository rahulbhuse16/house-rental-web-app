import { RoughNotation } from "react-rough-notation";
import { useRef } from "react";

import useIsInViewport from "@/hooks/useIsInViewport";

import FeatureCard from "@/pages/CardPage/FeatureCard";
import SectionHeading from "@/components/SectionHeading";
const cardData = [
  {
    id: 1,
    title: "List Your Property",
    desc: "Easily add your rental property to our platform and reach potential tenants in minutes.",
  },
  {
    id: 2,
    title: "Tenant Screening",
    desc: "Get detailed tenant background checks, including credit and rental history reports.",
  },
  {
    id: 3,
    title: "Rental Insights",
    desc: "Access market trends and pricing insights to maximize your rental income.",
  },
  {
    id: 4,
    title: "Maintenance Requests",
    desc: "Streamline maintenance management by tracking and resolving tenant issues efficiently.",
  },
  {
    id: 5,
    title: "Secure Payments",
    desc: "Simplify rent collection with automated payment tracking and reminders.",
  },
];

const CardPage = () => {
  const componentRef = useRef(null);
  const isInViewport = useIsInViewport(componentRef);

  const renderFeaturesCard = cardData.map((card) => (
    <FeatureCard key={card.id} {...card} />
  ));

  return (
    <section ref={componentRef}>
      <SectionHeading className="text-center">
        Become a House owner <br />
        <RoughNotation
          type="highlight"
          className="text-muted"
          show={isInViewport}
          animationDelay={100}
        >
          in 5 easy steps
        </RoughNotation>
      </SectionHeading>

      <div className="flex flex-wrap justify-evenly mt-10 gap-12">
        {renderFeaturesCard}
      </div>
    </section>
  );
};

export default CardPage;
