/**
 *
 * Amend rawg image url to crop the returned image
 */

const croppedImageUrl = (url: string) => {
    if (url) {
        const target = 'media/'
        const index = url.indexOf(target) + target.length
        return url.slice(0, index) + 'crop/600/400/' + url.slice(index)
    } else {
        return url
    }
}

export default croppedImageUrl
