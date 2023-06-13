import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handler(req) {
    const { pathname } = new URL(req.url)

    const entries = []

    for await (const entry of Deno.readDir(`./dist`)) {
        entries.push(entry);
    }

    console.log(pathname.pathname,entries)

    const file2 = entries.find(i => {
        console.log(pathname,i.name)
        return pathname.slice(1) === i.name
    })

    if (file2 && file2.name) {
        const str = await Deno.readFile(`./dist/${file2.name}`);
        return new Response(str, {
            headers: {
                "content-type": file2.name.includes('json') ? 'application/json' : file2.name.includes('css') ? "text/css" : "application/javascript"
            }
        });
    }

    const str = ` 
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fre miniapp</title>
    <link rel="stylesheet" href="https://miniapp.deno.dev/default.css">
</head>
<body>
    <script src="https://miniapp.deno.dev/dist/slave.js"></script>
    <script>
    function getWorkerURL( url ) {
        const content = \`importScripts( "\${ url }" );\`;
        return URL.createObjectURL( new Blob( [ content ], { type: "text/javascript" } ) );
      }
      const url = getWorkerURL('https://miniapp.deno.dev/dist/master.js')
        const worker = new Worker(url)
        workerdom({ worker })
        URL.revokeObjectURL( url );
    </script>
    <script>
        // var vConsole = new VConsole();
    </script>
</body>

</html>`
    return new Response(str, {
        headers: {
            "content-type": "text/html",
        }
    });

}

serve(handler);