class Functions {
    getLat() {
        const lat = 49 + '.' + Math.floor(Math.random() * 999)
        return parseFloat(lat)
    }

    getLng() {
        const lng = 36 + '.' + Math.floor(Math.random() * 999)
        return parseFloat(lng)
    }
}

module.exports = new Functions()

