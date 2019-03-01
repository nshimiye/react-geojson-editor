class Data {};
class Polygon {};

const geometry = {
    spherical: {
        computeSignedArea: () => 0
    }
};

export const google = {
    maps: {
        Data,
        Polygon,
        geometry,
    }
};

export default google;
