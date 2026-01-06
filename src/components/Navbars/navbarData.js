import { v4 as uuidv4 } from "uuid";
import InternationalContent from "@/components/Navbars/InternationalContent";
import DomesticContent from "@/components/Navbars/DomesticContent";
import ExplorePackagesContent from "@/components/Navbars/ExplorePackagesContent";

const navbarData = [
  {
    id: uuidv4(),
    title: "International",
    hasDropdown: true,
    dropdownContent: (props) => <InternationalContent {...props} />,
  },
  {
    id: uuidv4(),
    title: "Domestic",
    hasDropdown: true,
    dropdownContent: (props) => <DomesticContent {...props} />,
  },
  {
    id: uuidv4(),
    title: "Group Departure",
    hasDropdown: false,
    href: "/group-departure",
  },
  {
    id: uuidv4(),
    title: "Explore Packages",
    hasDropdown: true,
    dropdownContent: (props) => <ExplorePackagesContent {...props} />,
  },
  {
    id: uuidv4(),
    title: "About Us",
    hasDropdown: false,
    href: "/about",
  },
];

export default navbarData;
