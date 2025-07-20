import { atomWithStorage } from "jotai/utils";

// distance
export const distanceAtom = atomWithStorage("distance", 10);

// strength
export const strengthAtom = atomWithStorage("strength", 0.5);

// charge
export const chargeAtom = atomWithStorage("charge", 300);
