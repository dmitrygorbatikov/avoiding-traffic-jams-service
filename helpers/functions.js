class Functions {
    getLat() {
        const lat = 49 + '.' + Math.floor(Math.random() * 999)
        return parseFloat(lat)
    }

    getLng() {
        const lng = 36 + '.' + Math.floor(Math.random() * 999)
        return parseFloat(lng)
    }

    getNear(lat1, lat2, lng1, lng2) {
        let lat3 = lat1 - lat2;
        if (lat3 < 0) lat3 *= -1;
        let lng3 = lng1 - lng2;
        if (lng3 < 0) lng3 *= -1;
        let lat = false;
        let lng = false;

        if (lat3 < 0.2) lat = true;
        if (lng3 < 0.2) lng = true;
        if (lat3 && lng3) {
            return true;
        } else {
            return false;

        }
    }
}

module.exports = new Functions()

