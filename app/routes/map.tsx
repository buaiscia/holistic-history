import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useEffect, useRef, useState } from 'react';
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { chart } from "~/components/dataSvg";
import { getNodeListItems } from "~/models/node.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const nodeListItems = await getNodeListItems({ userId });
  return json({ nodeListItems });
};

export default function NodesPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [svg, setSvg] = useState<SVGSVGElement | null>(null);


  // useEffect(() => {
  //   if (containerRef.current && chart instanceof SVGSVGElement && svg !== null) {
  //     containerRef.current.appendChild(svg);
  //   }
  // }, [svg]);

  useEffect(() => {
    chart.then(svg => {
      setSvg(svg);
      if (containerRef.current && svg instanceof SVGSVGElement) {
        containerRef.current.appendChild(svg);
      }
    });
  }, []);

  console.log({ svg })


  return (
    // insert svg chart here
    <div ref={containerRef} />
  );
}
