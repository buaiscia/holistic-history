import { Link } from "@remix-run/react";

export default function NoteIndexPage() {
  return (
    <p>
      No node selected. Select a node on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new node.
      </Link>
    </p>
  );
}
