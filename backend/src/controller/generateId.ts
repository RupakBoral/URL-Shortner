import crypto from "crypto";

export const getUniqueId = (len: number) => {
    const size = Math.ceil(len / 2);
    return crypto.randomBytes(size).toString("hex");
}