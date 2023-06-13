import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import Adget from './loaders/ad'

async function getJs(url) {
    const data = await fetch(url, {

    }).then(res => res.text())


    return new Response(data, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    });
}

async function handler(req) {
    const { pathname } = new URL(req.url)

    if (pathname === '/ad') {
        const ad = Adget()
        return new Response(JSON.stringify(ad), {
            headers: {
                "content-type": 'application/json'
            }
        });
    }

    const entries = []

    if (pathname === '/slave.js' || pathname === '/master.js') {
        return getJs("https://miniapp.deno.dev/dist" + pathname)
    }

    for await (const entry of Deno.readDir(`./dist`)) {
        entries.push(entry);
    }

    const file2 = entries.find(i => {
        console.log(pathname, i.name)
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
    <script src="/slave.js"></script>
    <script>
        const worker = new Worker('/master.js')
        workerdom({ worker })
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