import { useQuery } from "@tanstack/react-query";
import { getMatches } from "@tauri-apps/plugin-cli";
import { useAtom } from "jotai";
import { cliLevelAtom, cliPathAtom } from "../store/store";

export const MenuBar = () => {
  const [cliPath, setCliPath] = useAtom(cliPathAtom);
  const [cliLevel, setCliLevel] = useAtom(cliLevelAtom);

  const cli = useQuery({
    queryKey: ["cli"],
    queryFn: async () => {
      const m = await getMatches();
      // TODO: setCliArgs...
      return m.args;
    },
  });
  return (
    <div className="flex gap-4">
      <p>MenuBar</p>
      <div className="flex gap-2">
        <p>Path: </p>
        <input
          type="text"
          value={cliPath}
          onChange={(e) => {
            setCliPath(e.target.value);
          }}
        />
      </div>
      <div className="flex gap-2">
        <p>Level: </p>
        <input
          type="number"
          min="1"
          max="10"
          value={cliLevel}
          onChange={(e) => {
            setCliLevel(parseInt(e.target.value));
          }}
        />
      </div>
    </div>
  );
};
