export default function pluralize(number, singularWord, pluralWord) {
    if (!number) return `0 ${pluralWord}`
    if (number == 1) return `${number} ${singularWord}`;
    return `${number} ${pluralWord}`;
}