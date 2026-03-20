import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `SeminarList`.
 */
export type SeminarListProps = SliceComponentProps<Content.SeminarListSlice>;

/**
 * Component for "SeminarList" Slices.
 */
const SeminarList: FC<SeminarListProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for seminar_list (variation: {slice.variation}) slices.
      <br />
      <strong>You can edit this slice directly in your code editor.</strong>
    </section>
  );
};

export default SeminarList;
