interface ErrorBoundaryProps {
  error: any;
}

export const err = ({ error }: ErrorBoundaryProps) => {
  return (
    <div>
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error?.message}</pre>
    </div>
  );
};
