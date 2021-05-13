export function getAvatarUrl(img) {
    return img ?? "/images/" + Math.floor(Math.random() * (9 - 1) + 1) + ".svg"
}