const { addonBuilder } = require("stremio-addon-sdk");
const manifest = require("../manifest.json");

const builder = new addonBuilder(manifest);

builder.defineStreamHandler((args) => {
    const idParts = args.id.split(":");
    const imdbId = idParts[0];
    let streamUrl = "";

    if (args.type === "movie") {
        streamUrl = `https://vixsrc.to/embed/movie/${imdbId}`;
    } else if (args.type === "series") {
        const season = idParts[1] || "1";
        const episode = idParts[2] || "1";
        streamUrl = `https://vixsrc.to/embed/tv/${imdbId}/${season}/${episode}`;
    }

    if (streamUrl) {
        return Promise.resolve({
            streams: [{
                name: "Vixsrc",
                title: "📺 Watch it",
                externalUrl: streamUrl
            }]
        });
    }
    return Promise.resolve({ streams: [] });
});

module.exports = (req, res) => {
    builder.getInterface().execute(req, res);
};
