import SVGMap from "../CustomElements/SVGMap";


const _Create = (args) => {
    let payload = Object.assign({}, args);

    const self = [
        SVGMap()
    ];


    return self;
};

export default _Create;

