import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handler(req) {
    const { pathname } = new URL(req.url)

    const entries2 = []

    for await (const entry of Deno.readDir(`./dist`)) {
        entries2.push(entry);
    }

    const file = entries.find(i => pathname.slice(6) === i.name)

    if (file && file.name) {
        const str = await Deno.readFile(`./dist/${file.name}`);
        return new Response(str, {
            headers: {
                "content-type": "application/javascript",
            }
        });
    }

    const file2 = entries2.find(i => pathname.slice(6) === i.name)

    if (file2 && file2.name) {
        const str = await Deno.readFile(`./demo/${file2.name}`);
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
        const worker = new Worker('https://miniapp.deno.dev/dist/master.js')
        workerdom({ worker })
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