/** @type {import('../types').Pipe} */
export default async function RoutesPipe(args) {
  let { config, doc } = args;

  const ssrScript = doc.scripts.ssr;

  let fileName = doc.filename.split("/");
  const extension = fileName.pop();

  const routesIndex = fileName.findIndex(
    (value) => value === config.routes.split("/")[1]
  );
  fileName.splice(routesIndex + 1, 0, "$__svemix__");

  const fileToGenerate =
    fileName.join("/") +
    "/" +
    extension.replace(
      ".svelte",
      ssrScript.attrs && ssrScript.attrs.lang && ssrScript.attrs.lang === "ts"
        ? ".ts"
        : ".js"
    );

  let routesName =
    "/" +
    fileName.slice(routesIndex + 1).join("/") +
    "/" +
    extension.replace(".svelte", "").replace("index", "");

  routesName.split("/").forEach((segment) => {
    const param = segment.match(/\[(.*?)\]/);
    if (param && param.length > 0) {
      routesName = routesName.replace(
        param[0],
        '${page.params["' + param[1] + '"]}'
      );
    }
  });

  if (routesName.endsWith("/")) {
    routesName = routesName.slice(0, -1);
  }

  doc.route = {
    name: routesName,
    path: fileToGenerate,
  };

  return {
    config,
    continue: true,
    doc,
  };
}
