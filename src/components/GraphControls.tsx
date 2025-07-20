import { useAtom } from "jotai";
import { chargeAtom, distanceAtom, strengthAtom } from "../store/store";

export function GraphControls() {
  const [d, setv] = useAtom(distanceAtom);
  const [s, sets] = useAtom(strengthAtom);
  const [ch, setch] = useAtom(chargeAtom);

  return (
    <div className="flex gap-4">
      <div className="flex gap-2">
        <p>Distance {d}</p>
        <input
          type="range"
          min="10"
          max="200"
          value={d}
          onChange={(e) => {
            setv(parseInt(e.target.value));
          }}
        />
      </div>
      <div className="flex gap-2">
        <p>Strenght {s}</p>
        <input
          type="range"
          min="5"
          max="100"
          value={s * 100}
          onChange={(e) => {
            sets(parseInt(e.target.value) / 100);
          }}
        />
      </div>
      <div className="flex gap-2">
        <p>Charge {ch}</p>
        <input
          type="range"
          min="200"
          max="1500"
          value={ch}
          onChange={(e) => {
            setch(parseInt(e.target.value));
          }}
        />
      </div>
    </div>
  );
}
