/// <reference path="../vendors/ml5.d.ts" />

let classifier_loader = ml5.imageClassifier("MobileNet");

export const classifier_ready = new Promise(async (res, rej) => {
    try {
        await classifier_loader;
        res();
    } catch(e) {
        rej(e);
    }
});

export async function classify(image) {
    const classifier = await classifier_loader;
    const res = await classifier.classify(image);
    return res;
}
