import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// distance
export const distanceAtom = atomWithStorage("distance", 10);

// strength
export const strengthAtom = atomWithStorage("strength", 0.5);

// charge
export const chargeAtom = atomWithStorage("charge", 300);

// cli-args
// cliPath: string;
export const cliPathAtom = atom(".");
// cliLevel: number;
export const cliLevelAtom = atom(1);
