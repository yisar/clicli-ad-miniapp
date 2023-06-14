import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

function loader() {
    return {
        data: [{
            name: '妖精动漫',
            img: 'https://cdn-us.imgs.moe/2023/06/13/6487dd33af7c1.png',
            url: 'https://uqmbrm.com?dc=GDY'
        }, {
            name: '猫番APP',
            img: 'https://cdn-us.imgs.moe/2023/06/13/64885f5e858ba.png',
            url: 'https://npm.elemecdn.com/maocdn@1.0.1/index.html?agentId=4&channelCode=2'
        }, {
            name: '福利姬',
            img: 'https://cdn-us.imgs.moe/2023/06/13/648860b362833.png',
            url: 'https://4119.iftgxr.com/aff-9QB7'
        },
        {
            name: 'PiliPili',
            img: 'https://cdn-us.imgs.moe/2023/06/14/64897ae4446f6.png',
            url: 'https://9224.exyabi.com/?code=B7Gc&c=6751'
        },
        {
            name: '51动漫',
            img: 'https://i.hd-r.cn/a40baad092a74968d54962b5a474ced9.png',
            url: 'https://2419d8.usdtii.com/?code=mWRg&c=6751'
        }]
    }
}

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
        const ad = loader()
        return new Response(JSON.stringify(ad), {
            headers: {
                "content-type": 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        });
    }

    const entries = []

    if (pathname === '/slave.js' || pathname === '/master.js') {
        return getJs("https://npm.elemecdn.com/smallapp@latest/runtime/dist/" + pathname)
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