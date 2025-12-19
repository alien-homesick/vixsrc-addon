const { addonBuilder } = require("stremio-addon-sdk");
const manifest = require("../manifest.json");

const builder = new addonBuilder(manifest);

builder.defineStreamHandler((args) => {
    const [imdbId, season, episode] = args.id.split(":");
    let streamUrl = "";

    if (args.type === "movie") {
        streamUrl = `https://vixsrc.to/embed/movie/${imdbId}`;
    } else if (args.type === "series") {
        streamUrl = `https://vixsrc.to/embed/tv/${imdbId}/${season || 1}/${episode || 1}`;
    }

    if (streamUrl) {
        return Promise.resolve({
            streams: [{
                name: "Vixsrc",
                title: "📺 Watch in HD",
                externalUrl: streamUrl
            }]
        });
    }
    return Promise.resolve({ streams: [] });
});

module.exports = (req, res) => {
    builder.getInterface().execute(req, res);
};
