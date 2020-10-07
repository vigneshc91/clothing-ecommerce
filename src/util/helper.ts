import { createHash } from 'crypto';

/**
 * Get the random string of given number
 * @param length number
 */
export function getRandomString(length: number = 6) {
    return Math.random().toString(36).substr(2, length);
}

/**
 * Get the SHA512 hash of the given string
 * @param value string
 */
export function getSHA512Hash(value: string) {
    const hash = createHash('sha512');
    return hash.update(value).digest('hex');
}

/**
 * Get the unique number using the timestamp
 */
export function getUniqueNumber() {
    return `${Date.now()}${Math.round(Math.random() * 1E9)}`;
}