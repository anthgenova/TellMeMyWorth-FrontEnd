
const assets = [
    {
        _id: 1,
        project: { _id: "5b21ca3eeb7f6", name: "ADA" }, 
        asset: "ADA", 
        value: 114.997203,
    },
    {
        _id: 2,
        project: { _id: "5b21ca3eeb7f6fbccd471818", name: "Rhino Generation" },
        asset: "RhinoGeneration #1415",
        value: 25,
    },
    {
        _id: 3,
        project: { _id: "5b21ca3eeb7f6fbccd471818", name: "Rhino Generation" },
        asset: "RhinoGeneration #1085",
        value: 20,
    },
    {
        _id: 4,
        project: { _id: "5b21ca3eeb7f6fbccd471818", name: "Rhino Generation" },
        asset: "RhinoGeneration #0899",
        value: 20,
    },
    {
        _id: 5,
        project: { _id: "5b21ca3eeb7f6fbccd471818", name: "Rhino Generation" },
        asset: "RhinoGeneration #2573",
        value: 20,
    },
    {
        _id: 6,
        project: { _id: "5b21ca3eeb7f6fbccd471818", name: "Rhino Generation" },
        asset: "RhinoGeneration #2012",
        value: 20,
    },
    {
        _id: 7,
        project: { _id: "5b21ca3eeb7f6fbccd471814", name: "Tiger Society Tigers" },
        asset: "TIGER #7035",
        value: 27,
    },
    {
        _id: 8,
        project: { _id: "5b21ca3eeb7f6fbccd471814", name: "Tiger Society Tigers" },
        asset: "TIGER #8766",
        value: 30,
    },
    {
        _id: 9,
        project: { _id: "5b21ca3eeb7f6fbccd471814", name: "Tiger Society Tigers" },
        asset: "TIGER #103",
        value: 40,
    },
    {
        _id: 10,
        project: { _id: "5b21ca3eeb7f6fbccd471814", name: "Tiger Society Tigers" },
        asset: "TIGER #6296",
        value: 26,
    },
    {
        _id: 11,
        project: { _id: "5b21ca3eeb7f6fbccd471820", name: "Derp Birds" },
        asset: "Perfect Uncommon Derp Bird #02916",
        value: 1350,
    },
    {
        _id: 12,
        project: { _id: "5b21ca3eeb7f6fbccd471820", name: "Derp Birds" },
        asset: "Common Derp Bird #01832",
        value: 110,
    },
    {
        _id: 13,
        project: { _id: "5b21ca3eeb7f6fbccd471820", name: "Derp Birds" },
        asset: "Uncommon Derp Bird #09578",
        value: 105,
    },
    {
        _id: 14,
        project: { _id: "5b21ca3eeb7f6fbccd47182", name: "Derplings" },
        asset: "Derpling #02205",
        value: 50,
    },
    {
        _id: 15,
        project: { _id: "5b21ca3eeb7f6fbccd47182", name: "Derplings" },
        asset: "Derpling #00665",
        value: 68,
    },
    {
        _id: 16,
        project: { _id: "5b21ca3eeb7f6fbccd4718", name: "Derp Apes" },
        asset: "Derp Ape #01154",
        value: 45,
    },
    {
        _id: 17,
        project: { _id: "5b21ca3eeb7f6fbccd471", name: "PREDs – Derp Birds" },
        asset: "Pred #06376",
        value: 94,
    },
    {
        _id: 18,
        project: { _id: "5b21ca3eeb7f6fbccd471", name: "PREDs – Derp Birds" },
        asset: "Pred #02641",
        value: 180,
    },
    {
        _id: 19,
        project: { _id: "5b21ca3eeb7f6fbccd471", name: "PREDs – Derp Birds" },
        asset: "Pred #12498",
        value: 150,
    },
]

export function getAssets() {
    return assets
}

export function getTotalValue() {
    return assets.reduce((a,b) => a + (b.value || 0), 0)
}

// export function getAssets(name){
//     return assets.find
// }