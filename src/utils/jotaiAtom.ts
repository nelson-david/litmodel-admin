import { atomWithStorage } from "jotai/utils";

export const isLoggedIn = atomWithStorage("isLoggedIn", false);
export const tokenDetails = atomWithStorage("token", "");
export const allModels = atomWithStorage<any[]>("allModels", []);
export const allScoutedModels = atomWithStorage<any[]>("allScoutedModels", []);
export const userAtom = atomWithStorage<any>("user", null);
