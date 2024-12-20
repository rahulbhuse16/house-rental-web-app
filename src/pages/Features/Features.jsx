import HouseCardList from "@/app/home/HouseCardList";
import SectionHeading from "@/components/SectionHeading";

const Features = () => {
  return (
    <section className="py-6 space-y-6">
      <SectionHeading>Recently Sold Houses</SectionHeading>
      <HouseCardList limit={3} />
    </section>
  );
};

export default Features;
