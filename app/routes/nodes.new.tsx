import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";
import {
  getGeographicalAreaListItems,
  getModernCountryListItems,
} from "~/models/areas";

import { createNode } from "~/models/node.server";
import { getTimePeriodListItems } from "~/models/timePeriod.server";
import { requireUserId } from "~/session.server";

export const action = async ({ request }: ActionArgs) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  const tags = formData.get("tags");
  const timePeriods = formData.get("timePeriods");
  const geographicalArea = formData.get("geographicalArea");
  const modernCountry = formData.get("modernCountry");

  if (typeof title !== "string" || title.length === 0) {
    return json(
      {
        errors: {
          body: null,
          title: "Title is required",
          tags: null,
          timePeriods: null,
          geographicalArea: null,
          modernCountry: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof body !== "string" || body.length === 0) {
    return json(
      {
        errors: {
          body: "Body is required",
          title: null,
          tags: null,
          timePeriods: null,
          geographicalArea: null,
          modernCountry: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof tags !== "string" || tags.length === 0) {
    return json(
      {
        errors: {
          body: null,
          title: null,
          tags: "Tags are required",
          timePeriods: null,
          geographicalArea: null,
          modernCountry: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof timePeriods !== "string" || timePeriods.length === 0) {
    return json(
      {
        errors: {
          body: null,
          title: null,
          tags: null,
          timePeriods: "Time period is required",
          geographicalArea: null,
          modernCountry: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof geographicalArea !== "string" || geographicalArea.length === 0) {
    return json(
      {
        errors: {
          body: null,
          title: null,
          tags: null,
          timePeriods: null,
          geographicalArea: "Geographical area is required",
          modernCountry: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof modernCountry !== "string" || modernCountry.length === 0) {
    return json(
      {
        errors: {
          body: null,
          title: null,
          tags: null,
          timePeriods: null,
          geographicalArea: null,
          modernCountry: "Modern country is required",
        },
      },
      { status: 400 }
    );
  }

  const tagsArray = tags.split(",").map((tag) => tag.trim());
  const tagObjects = tagsArray.map((name, index) => ({
    name: name.toString(),
  }));

  const node = await createNode({
    body,
    title,
    tags: tagObjects,
    timePeriodId: timePeriods,
    geographicalAreaId: geographicalArea,
    modernCountryId: modernCountry,
    userId,
  });

  return redirect(`/nodes/${node.id}`);
};

export const loader = async ({ request }: LoaderArgs) => {
  const timePeriodsListItems = await getTimePeriodListItems();
  const geographicalAreasListItems = await getGeographicalAreaListItems();
  const modernCountriesListItems = await getModernCountryListItems();

  return json({
    timePeriodsListItems,
    geographicalAreasListItems,
    modernCountriesListItems,
  });
};

export default function NewNodePage() {
  const data = useLoaderData<typeof loader>();

  const actionData = useActionData<typeof action>();
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const tagsRef = useRef<HTMLTextAreaElement>(null);
  const timePeriodsRef = useRef<HTMLSelectElement>(null);
  const geographicalAreaRef = useRef<HTMLSelectElement>(null);
  const modernCountryRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.body) {
      bodyRef.current?.focus();
    } else if (actionData?.errors?.tags) {
      tagsRef.current?.focus();
    } else if (actionData?.errors?.timePeriods) {
      timePeriodsRef.current?.focus();
    } else if (actionData?.errors?.geographicalArea) {
      geographicalAreaRef.current?.focus();
    } else if (actionData?.errors?.modernCountry) {
      modernCountryRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Title: </span>
          <input
            ref={titleRef}
            name="title"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.title ? true : undefined}
            aria-errormessage={
              actionData?.errors?.title ? "title-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.title ? (
          <div className="pt-1 text-red-700" id="title-error">
            {actionData.errors.title}
          </div>
        ) : null}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Body: </span>
          <textarea
            ref={bodyRef}
            name="body"
            rows={8}
            className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
            aria-invalid={actionData?.errors?.body ? true : undefined}
            aria-errormessage={
              actionData?.errors?.body ? "body-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.body ? (
          <div className="pt-1 text-red-700" id="body-error">
            {actionData.errors.body}
          </div>
        ) : null}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Tags (comma separated): </span>
          <textarea
            ref={tagsRef}
            name="tags"
            rows={8}
            className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
            aria-invalid={actionData?.errors?.body ? true : undefined}
            aria-errormessage={
              actionData?.errors?.body ? "body-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.body ? (
          <div className="pt-1 text-red-700" id="body-error">
            {actionData.errors.body}
          </div>
        ) : null}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Time Period: </span>
          <select
            ref={timePeriodsRef}
            name="timePeriods"
            className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
            aria-invalid={actionData?.errors?.timePeriods ? true : undefined}
            aria-errormessage={
              actionData?.errors?.timePeriods ? "timePeriods-error" : undefined
            }
          >
            {data.timePeriodsListItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        {actionData?.errors?.timePeriods ? (
          <div className="pt-1 text-red-700" id="timePeriods-error">
            {actionData.errors.timePeriods}
          </div>
        ) : null}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Geographical Area: </span>
          <select
            ref={timePeriodsRef}
            name="geographicalArea"
            className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
            aria-invalid={
              actionData?.errors?.geographicalArea ? true : undefined
            }
            aria-errormessage={
              actionData?.errors?.geographicalArea
                ? "geographicalArea-error"
                : undefined
            }
          >
            {data.geographicalAreasListItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        {actionData?.errors?.geographicalArea ? (
          <div className="pt-1 text-red-700" id="timePeriods-error">
            {actionData.errors.geographicalArea}
          </div>
        ) : null}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Modern Country Correspondence: </span>
          <select
            ref={timePeriodsRef}
            name="modernCountry"
            className="w-full flex-1 rounded-md border-2 border-blue-500 px-3 py-2 text-lg leading-6"
            aria-invalid={actionData?.errors?.modernCountry ? true : undefined}
            aria-errormessage={
              actionData?.errors?.modernCountry
                ? "modernCountry-error"
                : undefined
            }
          >
            {data.modernCountriesListItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        {actionData?.errors?.modernCountry ? (
          <div className="pt-1 text-red-700" id="timePeriods-error">
            {actionData.errors.modernCountry}
          </div>
        ) : null}
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
