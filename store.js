import { getStore } from "@netlify/blobs";

// Ein einziger Blobs-Store für die gesamte App.
// GET  /.netlify/functions/store?key=dis_products      -> { value: "...json..." }
// POST /.netlify/functions/store?key=dis_products       body: { value: "...json..." }
export default async (req) => {
  const url = new URL(req.url);
  const key = url.searchParams.get("key");

  if (!key) {
    return new Response(JSON.stringify({ error: "key fehlt" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const store = getStore("praxislager-daten");

  if (req.method === "GET") {
    const value = await store.get(key);
    return new Response(JSON.stringify({ value: value || null }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (req.method === "POST") {
    try {
      const body = await req.json();
      await store.set(key, body.value ?? "[]");
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: String(e) }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config = {
  path: "/.netlify/functions/store",
};
