import SVGMap from "../CustomElements/SVGMap";

const _Create = (args) => {
    let payload = Object.assign({}, args);

    const self = [
        SVGMap({ src: "Eberswalder5.svg" })
    ];


    return self;
};

export default _Create;

