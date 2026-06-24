import Instrument from "./instrument/page";

// Single-direction site: the root renders the Instrument page directly.
// The Datasheet direction is kept in app/_datasheet (hidden, not routed).
export default function Page() {
  return <Instrument />;
}
