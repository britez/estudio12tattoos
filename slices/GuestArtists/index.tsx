import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `GuestArtists`.
 */
export type GuestArtistsProps = SliceComponentProps<Content.GuestArtistsSlice>;

/**
 * Component for "GuestArtists" Slices.
 */
const GuestArtists: FC<GuestArtistsProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for guest_artists (variation: {slice.variation})
      slices.
      <br />
      <strong>You can edit this slice directly in your code editor.</strong>
      {/**
       * 💡 Use the Prismic MCP server with your code editor
       * 📚 Docs: https://prismic.io/docs/ai#code-with-prismics-mcp-server
       */}
    </section>
  );
};

export default GuestArtists;
