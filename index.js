const { addonBuilder } = require("stremio-addon-sdk");
const manifest = require("./manifest.json");

const builder = new addonBuilder(manifest);

builder.defineStreamHandler((args) => {
    console.log("Stremio requested ID:", args.id); // This helps us debug in Vercel logs
    
    const idParts = args.id.split(":");
    const imdbId = idParts[0];
    let streamUrl = "";

    if (args.type === "movie") {
        streamUrl = `https://vixsrc.to/embed/movie/${imdbId}`;
    } else if (args.type === "series") {
        // Correctly handling Season and Episode for Vixsrc
        const season = idParts[1] || "1";
        const episode = idParts[2] || "1";
        streamUrl = `https://vixsrc.to/embed/tv/${imdbId}/${season}/${episode}`;
    }

    if (streamUrl) {
        return Promise.resolve({
            streams: [{
                name: "Vixsrc",
                title: `🔗 Open in Vixsrc (HD)`,
                externalUrl: streamUrl // Vixsrc works best as an external link
            }]
        });
    }

    return Promise.resolve({ streams: [] });
});

module.exports = (req, res) => {
    builder.getInterface().execute(req, res);
};
